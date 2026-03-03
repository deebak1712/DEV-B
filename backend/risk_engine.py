from rules import (
    amount_rule,
    frequency_rule,
    time_rule,
    location_rule,
    device_rule,
    failed_attempt_rule
)


def calculate_risk(data):
    total_score = 0
    reasons = []

    rules = [
        amount_rule(data["amount"]),
        frequency_rule(data["tx_count_last_min"]),
        time_rule(data["time"]),
        location_rule(data["location"]),
        device_rule(data["device"]),
        failed_attempt_rule(data["failed_attempts"])
    ]

    for score, reason in rules:
        total_score += score
        if reason:
            reasons.append(reason)

    # ✅ return MUST be outside the loop
    return min(total_score, 100), reasons
# -------------------------
# LAYER 2: BEHAVIOUR ENGINE (AI simulation)
# -------------------------
def behaviour_risk(data):
    score = 0
    reasons = []

    if data["device"].lower() == "new":
        score += 10
        reasons.append("Behaviour deviation: new device")

    if "00:00" <= data["time"] <= "05:00":
        score += 10
        reasons.append("Behaviour deviation: unusual transaction time")

    return score, reasons


# -------------------------
# LAYER 3: CONTEXT ENGINE
# -------------------------
def context_risk(data):
    score = 0
    reasons = []

    high_risk_locations = ["Delhi", "Unknown"]
    if data["location"] in high_risk_locations:
        score += 15
        reasons.append("High-risk transaction location")

    return score, reasons


# -------------------------
# # -------------------------
# FINAL RISK ENGINE (BANK STYLE)
# -------------------------
def calculate_final_risk(data):
    rule_score, rule_reasons = calculate_risk(data)
    behaviour_score, behaviour_reasons = behaviour_risk(data)
    context_score, context_reasons = context_risk(data)

    final_score = min(rule_score + behaviour_score + context_score, 100)

    decision = decision_engine(final_score)

    return {
        "rule_score": rule_score,
        "behaviour_score": behaviour_score,
        "context_score": context_score,
        "final_risk_score": final_score,
        "decision": decision,
        "reasons": rule_reasons + behaviour_reasons + context_reasons
    }
# -------------------------
# DECISION ENGINE
# -------------------------
def decision_engine(final_score):
    if final_score <= 30:
        return "APPROVE"
    elif final_score <= 70:
        return "OTP_REQUIRED"
    else:
        return "BLOCK"