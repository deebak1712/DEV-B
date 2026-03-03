import random
import time

otp_store = {}

def generate_otp():
    return str(random.randint(100000, 999999))

def save_otp(user_id, otp):
    otp_store[user_id] = {
        "otp": otp,
        "expires": time.time() + 300
    }

def verify_otp(user_id, otp):
    record = otp_store.get(user_id)

    if not record:
        return False

    if time.time() > record["expires"]:
        del otp_store[user_id]
        return False

    if record["otp"] == otp:
        del otp_store[user_id]
        return True

    return False