from pydantic import BaseModel

class Transaction(BaseModel):
    user_id: str
    amount: float
    time: str
    location: str
    device: str
    tx_count_last_min: int
    failed_attempts: int