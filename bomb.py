import requests
import random
import time
from datetime import datetime

# Base URL of the application
BASE_URL = "http://localhost:3000"

# Number of orders to generate
NUM_ORDERS = 10

# Companies in the database (ensure IDs match your database)
COMPANIES = [1, 2, 3, 4]

# Random order types
ORDER_TYPES = ["buy", "sell"]

def generate_order():
    """
    Generate a random order for testing.
    """
    return {
        "order_id": f"order_{random.randint(1000, 9999)}",
        "time": datetime.utcnow().isoformat() + "Z",  # Current UTC timestamp
        "order_type": random.choice(ORDER_TYPES),
        "quantity": round(random.uniform(1, 1000), 2),  # Random quantity
        "price": round(random.uniform(10, 10000), 2),  # Random price
        "company_id": random.choice(COMPANIES)
    }

def send_order(order):
    """
    Send a single order to the server.
    """
    try:
        response = requests.post(f"{BASE_URL}/add_order", json=order)
        if response.status_code == 200:
            print(f"Order sent successfully: {order['order_id']}")
        else:
            print(f"Failed to send order {order['order_id']}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error sending order {order['order_id']}: {e}")

def bomb_server():
    """
    Bomb the server with multiple orders.
    """
    print(f"Starting bomb test with {NUM_ORDERS} orders...")
    for _ in range(NUM_ORDERS):
        order = generate_order()
        send_order(order)
        # Optionally, add a short delay between requests to simulate real-world usage
        time.sleep(0.01)  # 10ms delay
    print("Bomb test completed!")

if __name__ == "__main__":
    bomb_server()
