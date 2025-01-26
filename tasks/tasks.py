import json
import time
from prisma import Prisma
from Matching import MatchingEngine
from OrderBook import OrderBook
from Order import Order

prisma = Prisma()
prisma.connect()

def process_orders(company_id):
    """
    Process orders for a specific company using Prisma.
    """
    print(f"Worker started for company {company_id}")

    order_book = OrderBook()  # Company-specific order book
    matching_engine = MatchingEngine(order_book)

    while True:
        print(f"Fetching orders for company {company_id}...")
        orders = prisma.order.find_many(
            where={"companyId": company_id}, order={"time": "asc"}
        )

        if orders:
            for order_data in orders:
                order = Order(
                    order_id=order_data["order_id"],
                    time=order_data["time"],
                    order_type=order_data["order_type"],
                    quantity=order_data["quantity"],
                    price=order_data["price"],
                    company_id=order_data["companyId"],
                )
                print(f"Processing order {order.order_id} for company {company_id}")
                matching_engine.process_order(order)

                # Mark order as processed (e.g., delete or update status)
                prisma.order.update(
                    where={"id": order_data["id"]},
                    data={"processed": True},
                )
        else:
            print(f"No new orders for company {company_id}. Sleeping...")
            time.sleep(5)
