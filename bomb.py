import requests
import random
import uuid
import time

# Define API endpoint
API_URL = "http://127.0.0.1:3000/add_order"

# Ranges for random order data
PRICE_RANGE = (400, 500)  # Random prices between 400 and 500
QUANTITY_RANGE = (1, 50)  # Random quantities between 1 and 50

# Number of orders to bombard
TOTAL_ORDERS = 10
DELAY = 0.05  # Delay between requests in seconds (optional)

# List of dummy companies and their associated IDs
companies = [
    {"id": 1, "name": "Google"},
    {"id": 2, "name": "Facebook"},
    {"id": 3, "name": "Instagram"},
    {"id": 4, "name": "Spotify"},
    {"id": 5, "name": "Dropbox"},
    {"id": 6, "name": "Reddit"},
    {"id": 7, "name": "Netflix"},
    {"id": 8, "name": "Pinterest"},
    {"id": 9, "name": "Quora"},
    {"id": 10, "name": "YouTube"},
    {"id": 11, "name": "Lyft"},
    {"id": 12, "name": "Uber"},
    {"id": 13, "name": "LinkedIn"},
    {"id": 14, "name": "Slack"},
    {"id": 15, "name": "Etsy"},
    {"id": 16, "name": "Mozilla"},
    {"id": 17, "name": "NASA"},
    {"id": 18, "name": "IBM"},
    {"id": 19, "name": "Intel"},
    {"id": 20, "name": "Microsoft"},
]
users=[
    {"id": 1,
        "name": 'John Doe',
        "email": 'johndoe@example.com',
        "password": 'password123', 
      },
      {
       "id": 2,
        "name": 'Jane Smith',
        "email": 'janesmith@example.com',
        "password": 'password123', 
      },

]

# Generate and send orders
for i in range(TOTAL_ORDERS):
    # Randomly select a company
    company = random.choice(companies)
    user=random.choice(users)

    # Generate a random order
    order = {
        "companyId": company["id"],  # Correct field name
        "userId": user["id"],        # Include userId
        "order_id": str(uuid.uuid4()),  # Unique order ID
        "time": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),  # Formatting as ISO 8601
        "order_type": random.choice(["buy", "sell"]),  # Random order type
        "quantity": random.randint(*QUANTITY_RANGE),   # Random quantity
        "price": random.randint(*PRICE_RANGE),         # Random price
    }

    # Print the order to debug
    print(f"Sending order {i+1}/{TOTAL_ORDERS}: {order}")

    # Send the order to the API
    response = requests.post(API_URL, json=order)

    # Print response status and data for debugging
    if response.status_code in [200, 201]:
        print(f"Order {i+1}/{TOTAL_ORDERS} added successfully: {order}")
    else:
        print(f"Failed to add order {i+1}/{TOTAL_ORDERS}: {response.status_code} - {response.json()}")

    # Optional: Delay to avoid overloading the server
    time.sleep(DELAY)
