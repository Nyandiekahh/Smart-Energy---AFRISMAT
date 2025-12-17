/**
 * ML-Powered Energy Prediction Engine
 * Uses historical data to predict consumption and recommend payments
 */

class EnergyMLPredictor {
  constructor() {
    this.historicalData = [];
  }

  /**
   * Add historical payment/usage data
   * @param {Array} data - Array of {date, amount, kWh, dayOfWeek, month}
   */
  loadHistoricalData(data) {
    this.historicalData = data;
  }

  /**
   * Calculate average daily consumption
   */
  getAverageDailyConsumption() {
    if (this.historicalData.length === 0) return 0;
    
    const totalKwh = this.historicalData.reduce((sum, record) => sum + record.kWh, 0);
    const totalDays = this.historicalData.length;
    
    return (totalKwh / totalDays).toFixed(2);
  }

  /**
   * Predict consumption for next N days using Linear Regression
   * Formula: y = mx + b (trend line)
   */
  predictConsumption(days = 7) {
    if (this.historicalData.length < 3) {
      return { daily: 18.5, weekly: 129.5, confidence: 'low' };
    }

    const n = this.historicalData.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    // Calculate regression
    this.historicalData.forEach((record, index) => {
      sumX += index;
      sumY += record.kWh;
      sumXY += index * record.kWh;
      sumX2 += index * index;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict next day
    const nextDayConsumption = slope * n + intercept;
    const weeklyPrediction = nextDayConsumption * days;

    return {
      daily: Math.max(0, nextDayConsumption).toFixed(2),
      weekly: Math.max(0, weeklyPrediction).toFixed(2),
      monthly: Math.max(0, nextDayConsumption * 30).toFixed(2),
      trend: slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable',
      confidence: n >= 30 ? 'high' : n >= 14 ? 'medium' : 'low'
    };
  }

  /**
   * Detect consumption patterns (weekday vs weekend)
   */
  analyzePatterns() {
    const weekdayData = this.historicalData.filter(d => d.dayOfWeek >= 1 && d.dayOfWeek <= 5);
    const weekendData = this.historicalData.filter(d => d.dayOfWeek === 0 || d.dayOfWeek === 6);

    const avgWeekday = weekdayData.reduce((sum, d) => sum + d.kWh, 0) / weekdayData.length || 0;
    const avgWeekend = weekendData.reduce((sum, d) => sum + d.kWh, 0) / weekendData.length || 0;

    const difference = ((avgWeekday - avgWeekend) / avgWeekend * 100).toFixed(1);

    return {
      weekdayAvg: avgWeekday.toFixed(2),
      weekendAvg: avgWeekend.toFixed(2),
      difference: Math.abs(difference),
      pattern: avgWeekday > avgWeekend ? 'Higher on weekdays' : 'Higher on weekends'
    };
  }

  /**
   * Recommend optimal payment amount based on ML predictions
   */
  recommendPaymentAmount(currentBalance = 0, ratePerKwh = 20) {
    const prediction = this.predictConsumption(7);
    const patterns = this.analyzePatterns();

    // Calculate recommended amounts for different periods
    const dailyCost = parseFloat(prediction.daily) * ratePerKwh;
    const weeklyCost = parseFloat(prediction.weekly) * ratePerKwh;
    const monthlyCost = parseFloat(prediction.monthly) * ratePerKwh;

    // Smart recommendations
    const recommendations = [
      {
        period: '7 days',
        amount: Math.ceil(weeklyCost),
        reason: `Based on predicted ${prediction.weekly} kWh usage`,
        confidence: prediction.confidence
      },
      {
        period: '14 days',
        amount: Math.ceil(weeklyCost * 2),
        reason: 'Two-week security buffer',
        confidence: prediction.confidence
      },
      {
        period: '30 days',
        amount: Math.ceil(monthlyCost),
        reason: 'Full month coverage',
        confidence: prediction.confidence
      }
    ];

    // Add buffer for safety
    const recommendedAmount = Math.ceil(weeklyCost * 1.1); // 10% safety buffer

    return {
      recommended: recommendedAmount,
      minimum: Math.ceil(dailyCost * 3), // 3 days minimum
      optimal: Math.ceil(weeklyCost * 2), // 2 weeks optimal
      economical: Math.ceil(monthlyCost), // Best rate
      recommendations,
      insight: this.generateInsight(prediction, patterns, currentBalance, ratePerKwh)
    };
  }

  /**
   * Generate AI-powered insight message
   */
  generateInsight(prediction, patterns, balance, rate) {
    const daysRemaining = (balance / (parseFloat(prediction.daily) * rate)).toFixed(1);
    
    let insight = '';

    if (prediction.trend === 'increasing') {
      insight = `⚠️ Your consumption is trending upward. Consider topping up KES ${Math.ceil(parseFloat(prediction.weekly) * rate * 1.2)} to cover increasing usage.`;
    } else if (prediction.trend === 'decreasing') {
      insight = `✅ Great! Your consumption is decreasing. KES ${Math.ceil(parseFloat(prediction.weekly) * rate * 0.9)} should be sufficient.`;
    } else {
      insight = `📊 Your usage is stable at ${prediction.daily} kWh/day. Top up KES ${Math.ceil(parseFloat(prediction.weekly) * rate)} for the week.`;
    }

    return insight;
  }

  /**
   * Detect anomalies in spending
   */
  detectAnomalies() {
    if (this.historicalData.length < 7) return [];

    const amounts = this.historicalData.map(d => d.kWh);
    const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const variance = amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);

    const anomalies = this.historicalData.filter(record => {
      const zScore = Math.abs((record.kWh - mean) / stdDev);
      return zScore > 2; // 2 standard deviations
    });

    return anomalies.map(a => ({
      date: a.date,
      kWh: a.kWh,
      deviation: ((a.kWh - mean) / mean * 100).toFixed(1) + '%',
      type: a.kWh > mean ? 'spike' : 'drop'
    }));
  }

  /**
   * Calculate credit runway (days until balance runs out)
   */
  calculateRunway(currentBalance, ratePerKwh = 20) {
    const prediction = this.predictConsumption();
    const dailyCost = parseFloat(prediction.daily) * ratePerKwh;
    
    if (dailyCost === 0) return Infinity;
    
    const days = Math.floor(currentBalance / dailyCost);
    const runoutDate = new Date();
    runoutDate.setDate(runoutDate.getDate() + days);

    return {
      days,
      runoutDate: runoutDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      urgency: days < 3 ? 'critical' : days < 7 ? 'warning' : 'safe'
    };
  }
}

export default EnergyMLPredictor;