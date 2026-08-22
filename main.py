from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


# =========================================================
# AUTOELITE AI BACKEND
# =========================================================

app = FastAPI(
    title="AutoElite AI Backend",
    description="Backend API for AutoElite AI Dealership Copilot",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# REQUEST MODEL
# =========================================================

class ChatRequest(BaseModel):
    message: str


# =========================================================
# RESPONSE MODEL
# =========================================================

class ChatResponse(BaseModel):
    response: str


# =========================================================
# PREDEFINED AUTOELITE DATA
#
# Later this can be replaced with MySQL/database queries.
# =========================================================

DEALERSHIP_DATA = {
    "inventory": {
        "total_vehicles": 1284,
        "available": 1172,
        "reserved": 68,
        "sold": 44,
        "low_stock": 12,
    },

    "sales": {
        "monthly_revenue": "₹84.5 Cr",
        "monthly_sales": 156,
        "growth": "18.2%",
        "target": "₹90 Cr",
    },

    "customers": {
        "total": 3256,
        "active": 2841,
        "new_this_month": 186,
    },

    "appointments": {
        "total": 248,
        "today": 14,
        "completed": 182,
        "pending": 52,
    },

    "test_drives": {
        "monthly": 156,
        "completed": 118,
        "scheduled": 38,
    },

    "purchases": {
        "orders": 26,
        "value": "₹6.17 Cr",
        "pending": 8,
        "completed": 14,
        "processing": 3,
        "cancelled": 1,
    },

    "vehicles": {
        "popular": [
            "Toyota Fortuner",
            "Hyundai Creta",
            "Kia Seltos",
            "Mahindra XUV700",
            "Tata Harrier",
        ]
    },
}


# =========================================================
# HELPER
# =========================================================

def contains_any(text: str, keywords: List[str]) -> bool:
    return any(
        keyword in text
        for keyword in keywords
    )


# =========================================================
# AI RESPONSE ENGINE
# =========================================================

def generate_response(message: str) -> str:

    text = message.lower().strip()


    # -----------------------------------------------------
    # GREETING
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "hello",
            "hi",
            "hey",
            "good morning",
            "good afternoon",
            "good evening",
        ],
    ):
        return (
            "Hello! I'm AutoElite AI. 👋\n\n"
            "I can help you with:\n"
            "• Inventory\n"
            "• Vehicles\n"
            "• Sales\n"
            "• Customers\n"
            "• Appointments\n"
            "• Test drives\n"
            "• Purchases\n"
            "• Dealership analytics"
        )


    # -----------------------------------------------------
    # INVENTORY
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "inventory",
            "stock",
            "vehicles available",
            "available vehicles",
            "how many vehicles",
        ],
    ):

        data = DEALERSHIP_DATA["inventory"]

        return (
            "📦 **Current Inventory Overview**\n\n"
            f"• Total vehicles: {data['total_vehicles']:,}\n"
            f"• Available: {data['available']:,}\n"
            f"• Reserved: {data['reserved']:,}\n"
            f"• Sold: {data['sold']:,}\n"
            f"• Low stock vehicles: {data['low_stock']}\n\n"
            "Inventory is currently being monitored "
            "across the dealership."
        )


    # -----------------------------------------------------
    # LOW STOCK
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "low stock",
            "low-stock",
            "shortage",
            "running low",
        ],
    ):

        return (
            "⚠️ **Low Stock Alert**\n\n"
            "There are currently **12 vehicles** "
            "flagged as low stock.\n\n"
            "Recommended action:\n"
            "• Review low-stock models\n"
            "• Check upcoming purchase orders\n"
            "• Prioritize high-demand vehicles"
        )


    # -----------------------------------------------------
    # SALES
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "sales",
            "revenue",
            "selling",
            "sold",
            "sales performance",
        ],
    ):

        data = DEALERSHIP_DATA["sales"]

        return (
            "📈 **Sales Performance**\n\n"
            f"• Monthly revenue: {data['monthly_revenue']}\n"
            f"• Vehicles sold: {data['monthly_sales']}\n"
            f"• Growth: {data['growth']}\n"
            f"• Monthly target: {data['target']}\n\n"
            "Sales performance is currently showing "
            "positive growth."
        )


    # -----------------------------------------------------
    # CUSTOMERS
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "customers",
            "customer",
            "clients",
        ],
    ):

        data = DEALERSHIP_DATA["customers"]

        return (
            "👥 **Customer Overview**\n\n"
            f"• Total customers: {data['total']:,}\n"
            f"• Active customers: {data['active']:,}\n"
            f"• New this month: {data['new_this_month']}\n\n"
            "The customer base continues to grow."
        )


    # -----------------------------------------------------
    # APPOINTMENTS
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "appointment",
            "appointments",
            "schedule",
            "scheduled meetings",
        ],
    ):

        data = DEALERSHIP_DATA["appointments"]

        return (
            "📅 **Appointment Overview**\n\n"
            f"• Total this month: {data['total']}\n"
            f"• Today's appointments: {data['today']}\n"
            f"• Completed: {data['completed']}\n"
            f"• Pending: {data['pending']}\n"
        )


    # -----------------------------------------------------
    # TEST DRIVES
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "test drive",
            "test drives",
            "drive",
        ],
    ):

        data = DEALERSHIP_DATA["test_drives"]

        return (
            "🚗 **Test Drive Overview**\n\n"
            f"• Monthly test drives: {data['monthly']}\n"
            f"• Completed: {data['completed']}\n"
            f"• Scheduled: {data['scheduled']}\n\n"
            "The sales team can prioritize follow-ups "
            "for completed test drives."
        )


    # -----------------------------------------------------
    # PURCHASES
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "purchase",
            "purchases",
            "procurement",
            "purchase orders",
            "suppliers",
        ],
    ):

        data = DEALERSHIP_DATA["purchases"]

        return (
            "📋 **Purchase Overview**\n\n"
            f"• Purchase orders: {data['orders']}\n"
            f"• Procurement value: {data['value']}\n"
            f"• Pending: {data['pending']}\n"
            f"• Processing: {data['processing']}\n"
            f"• Completed: {data['completed']}\n"
            f"• Cancelled: {data['cancelled']}\n"
        )


    # -----------------------------------------------------
    # POPULAR VEHICLES
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "popular vehicles",
            "popular cars",
            "top vehicles",
            "best selling vehicles",
            "best selling cars",
        ],
    ):

        vehicles = DEALERSHIP_DATA[
            "vehicles"
        ]["popular"]

        vehicle_list = "\n".join(
            f"• {vehicle}"
            for vehicle in vehicles
        )

        return (
            "🏆 **Popular Vehicles**\n\n"
            f"{vehicle_list}\n\n"
            "These models can be prioritized "
            "for sales and inventory planning."
        )


    # -----------------------------------------------------
    # BUSINESS SUMMARY
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "summary",
            "overview",
            "business performance",
            "dealership performance",
            "dealership summary",
        ],
    ):

        inventory = DEALERSHIP_DATA["inventory"]
        sales = DEALERSHIP_DATA["sales"]
        customers = DEALERSHIP_DATA["customers"]
        purchases = DEALERSHIP_DATA["purchases"]

        return (
            "📊 **AutoElite Dealership Summary**\n\n"
            f"🚗 Inventory: {inventory['total_vehicles']:,} vehicles\n"
            f"💰 Monthly revenue: {sales['monthly_revenue']}\n"
            f"📈 Sales growth: {sales['growth']}\n"
            f"👥 Customers: {customers['total']:,}\n"
            f"📋 Purchase orders: {purchases['orders']}\n\n"
            "Overall dealership activity is healthy, "
            "with positive sales growth and active "
            "inventory movement."
        )


    # -----------------------------------------------------
    # HELP
    # -----------------------------------------------------

    if contains_any(
        text,
        [
            "help",
            "what can you do",
            "features",
        ],
    ):

        return (
            "✨ **AutoElite AI can help with:**\n\n"
            "• Inventory and stock\n"
            "• Low-stock alerts\n"
            "• Vehicle performance\n"
            "• Sales and revenue\n"
            "• Customers\n"
            "• Appointments\n"
            "• Test drives\n"
            "• Purchases\n"
            "• Dealership summaries\n\n"
            "Try asking:\n"
            "\"Give me the inventory status\"\n"
            "\"Show sales performance\"\n"
            "\"What are the pending purchases?\""
        )


    # -----------------------------------------------------
    # DEFAULT
    # -----------------------------------------------------

    return (
        "I can help you with AutoElite dealership "
        "operations.\n\n"
        "Try asking about:\n"
        "• Inventory\n"
        "• Vehicles\n"
        "• Sales\n"
        "• Customers\n"
        "• Appointments\n"
        "• Test drives\n"
        "• Purchases\n"
        "• Dealership performance"
    )


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "application": "AutoElite AI",
        "status": "running",
        "version": "1.0.0",
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "database": "predefined",
        "ai": "predefined response engine",
    }


# =========================================================
# CHAT API
# =========================================================

@app.post(
    "/chat",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    message = request.message.strip()

    if not message:

        return ChatResponse(
            response=(
                "Please enter a question so I can "
                "help you."
            )
        )

    response = generate_response(message)

    return ChatResponse(
        response=response
    )


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
