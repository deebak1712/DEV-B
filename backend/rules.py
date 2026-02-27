def amount_rule(amount):
    if amount > 20000:
        return 30, "High transaction amount"
    return 0, None


def frequency_rule(tx_count_last_min):
    if tx_count_last_min >= 4:
        return 25, "High transaction frequency"
    return 0, None


def time_rule(time):
    if "00:00" <= time <= "05:00":
        return 15, "Unusual transaction time"
    return 0, None


def location_rule(location):
    if location.lower() != "chennai":
        return 20, "Unusual location"
    return 0, None


def device_rule(device):
    if device.lower() == "new":
        return 25, "New device detected"
    return 0, None


def failed_attempt_rule(failed_attempts):
    if failed_attempts >= 2:
        return 15, "Multiple failed attempts"
    return 0, None