const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const checkFraudApi = async (transactionData) => {
  await delay(800)

  const riskScore = Math.floor(Math.random() * 100)

  let decision = "Approved"
  if (riskScore >= 70) decision = "Blocked"
  else if (riskScore >= 40) decision = "Step-Up"

  return {
    transaction_id: "TXN-" + Math.floor(Math.random() * 10000),
    risk_score: riskScore,
    decision,
    rule_layer: {
      Velocity_Check: riskScore > 60 ? "Failed" : "Passed",
      Geo_Location: "Consistent",
      Blocklist_Check: "Clear",
      Amount_Threshold: riskScore > 70 ? "Exceeded" : "Normal",
    },
    ai_layer: {
      Spending_Pattern: riskScore > 50 ? "Unusual" : "Normal",
      Device_Fingerprint: "Recognized",
      Time_Analysis: "Expected",
    },
    context_layer: {
      Device_Trust: "Medium",
      Channel_Risk: transactionData.channel,
      Customer_Profile: "Stable",
      Location_Risk: "Low",
    },
  }
}

export const getLogsApi = async () => {
  await delay(500)

  return {
    logs: [
      {
        transaction_id: "TXN-8847",
        amount: 125000,
        channel: "Card",
        risk_score: 94,
        decision: "Blocked",
        time: "2 min ago",
      },
      {
        transaction_id: "TXN-8846",
        amount: 8500,
        channel: "UPI",
        risk_score: 12,
        decision: "Approved",
        time: "5 min ago",
      },
      {
        transaction_id: "TXN-8845",
        amount: 45000,
        channel: "Internet Banking",
        risk_score: 62,
        decision: "Step-Up",
        time: "8 min ago",
      },
    ],
  }
}

export const getAnalyticsApi = async () => {
  await delay(600)

  return {
    total_transactions: 24847,
    fraud_detected: 142,
    medium_risk: 387,
    fraud_rate: 0.57,
    trend: [
      { label: "Mon", transactions: 3200, fraud: 18 },
      { label: "Tue", transactions: 3800, fraud: 24 },
      { label: "Wed", transactions: 3500, fraud: 16 },
      { label: "Thu", transactions: 4200, fraud: 28 },
      { label: "Fri", transactions: 3900, fraud: 22 },
      { label: "Sat", transactions: 2800, fraud: 12 },
      { label: "Sun", transactions: 3400, fraud: 20 },
    ],
    risk_distribution: {
      low: 78,
      medium: 18,
      high: 4,
    },
    recent_activity: [
      {
        message: "Transaction #TXN-8847 blocked",
        risk_score: 94,
        decision: "Blocked",
        time: "2m ago",
      },
      {
        message: "Step-up auth for #TXN-8845",
        risk_score: 62,
        decision: "Step-Up",
        time: "8m ago",
      },
      {
        message: "Batch approved",
        risk_score: 12,
        decision: "Approved",
        time: "15m ago",
      },
    ],
    metrics: {
      accuracy: 99.2,
      false_positive: 0.8,
      response_time: 45,
    },
    channels: [
      { channel: "UPI", transactions: 8500, fraud: 42 },
      { channel: "Card", transactions: 5200, fraud: 58 },
      { channel: "Mobile Banking", transactions: 6300, fraud: 28 },
      { channel: "Internet Banking", transactions: 4800, fraud: 14 },
    ],
  }
}