import csv
import random
from datetime import datetime, timedelta

random.seed(42)

DATA_DIR = "data"

# -----------------------------
# CUSTOMERS
# -----------------------------

customers = []

first_names = [
    "Rahul", "Aman", "Priya", "Neha", "Rohit",
    "Ankit", "Sneha", "Vikas", "Pooja", "Arjun",
    "Karan", "Simran", "Nikhil", "Riya", "Aditya"
]

last_names = [
    "Sharma", "Verma", "Gupta", "Singh", "Kumar",
    "Patel", "Agarwal", "Jain", "Mehta", "Yadav"
]

for customer_id in range(1, 1001):

    name = f"{random.choice(first_names)} {random.choice(last_names)}"

    # Create three customer groups:
    # active, occasional, inactive
    group = random.choices(
        ["active", "occasional", "inactive"],
        weights=[50, 20, 30]
    )[0]

    if group == "active":
        days_since_purchase = random.randint(1, 30)

    elif group == "occasional":
        days_since_purchase = random.randint(31, 75)

    else:
        days_since_purchase = random.randint(76, 180)

    last_purchase = datetime.now() - timedelta(
        days=days_since_purchase
    )

    customers.append({
        "customer_id": customer_id,
        "name": name,
        "segment": group,
        "last_purchase_date": last_purchase.strftime("%Y-%m-%d"),
        "days_since_purchase": days_since_purchase
    })


# -----------------------------
# SAVE CUSTOMERS
# -----------------------------

with open(
    f"{DATA_DIR}/customers.csv",
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=[
            "customer_id",
            "name",
            "segment",
            "last_purchase_date",
            "days_since_purchase"
        ]
    )

    writer.writeheader()
    writer.writerows(customers)


# -----------------------------
# TRANSACTIONS
# -----------------------------

transactions = []

transaction_id = 1

start_date = datetime.now() - timedelta(days=90)

for _ in range(6000):

    customer = random.choice(customers)

    transaction_date = start_date + timedelta(
        days=random.randint(0, 89),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59)
    )

    amount = random.choice([
        299,
        399,
        499,
        599,
        699,
        799,
        899,
        999,
        1199,
        1499,
        1999,
        2499,
        2999
    ])

    transactions.append({
        "transaction_id": transaction_id,
        "customer_id": customer["customer_id"],
        "transaction_date": transaction_date.strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
        "amount": amount
    })

    transaction_id += 1


# -----------------------------
# SAVE TRANSACTIONS
# -----------------------------

with open(
    f"{DATA_DIR}/transactions.csv",
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=[
            "transaction_id",
            "customer_id",
            "transaction_date",
            "amount"
        ]
    )

    writer.writeheader()
    writer.writerows(transactions)


# -----------------------------
# SUMMARY
# -----------------------------

inactive_count = sum(
    1 for customer in customers
    if customer["segment"] == "inactive"
)

print()
print("GrowthPilot demo data generated!")
print()
print(f"Customers: {len(customers)}")
print(f"Transactions: {len(transactions)}")
print(f"Inactive customers: {inactive_count}")
print()
print("Files:")
print("data/customers.csv")
print("data/transactions.csv")