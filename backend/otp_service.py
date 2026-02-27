import random

# ----------------------
# In-memory OTP store (demo only)
# ----------------------
otp_store = {}  # key = user_id, value = otp

# ----------------------
# Generate OTP
# ----------------------
def generate_otp():
    return str(random.randint(100000, 999999))

# ----------------------
# Save OTP for user_id
# ----------------------
def save_otp(user_id, otp):
    otp_store[user_id] = otp

# ----------------------
# Verify OTP
# ----------------------
def verify_otp(user_id, otp):
    if otp_store.get(user_id) == otp:
        del otp_store[user_id]  # OTP used, remove it
        return True
    return False
# ----------------------
# Send OTP (wrapper function)
# ----------------------
def send_otp(user_id):
    otp = generate_otp()
    save_otp(user_id, otp)
    print(f"OTP for {user_id} is {otp}")  # demo purpose