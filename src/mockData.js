export const vehicles = [
  {
    id: "VEH001",
    vin: "MHFRTN24A001",
    brand: "Toyota",
    model: "Fortuner",
    variant: "4x4 Diesel AT",
    year: 2024,
    category: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    color: "White Pearl",
    mileage: 12000,
    price: 4500000,
    stock: 12,
    reorderLevel: 5,
    status: "In Stock",
    rating: 4.8,
    soldUnits: 32,
    image:
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: "VEH002",
    vin: "MHCRETA24B002",
    brand: "Hyundai",
    model: "Creta",
    variant: "SX(O) 1.5 Petrol",
    year: 2024,
    category: "SUV",
    fuel: "Petrol",
    transmission: "Manual",
    color: "Titan Grey",
    mileage: 8500,
    price: 1850000,
    stock: 9,
    reorderLevel: 5,
    status: "In Stock",
    rating: 4.7,
    soldUnits: 28,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: "VEH003",
    vin: "MHKIA24C003",
    brand: "Kia",
    model: "Seltos",
    variant: "HTX 1.5 Diesel",
    year: 2024,
    category: "SUV",
    fuel: "Diesel",
    transmission: "Manual",
    color: "Aurora Black",
    mileage: 14600,
    price: 1690000,
    stock: 4,
    reorderLevel: 6,
    status: "Low Stock",
    rating: 4.6,
    soldUnits: 24,
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: "VEH004",
    vin: "MHBLENO24D004",
    brand: "Maruti",
    model: "Baleno",
    variant: "Zeta 1.2 Petrol",
    year: 2024,
    category: "Hatchback",
    fuel: "Petrol",
    transmission: "Manual",
    color: "Nexa Blue",
    mileage: 7200,
    price: 845000,
    stock: 18,
    reorderLevel: 7,
    status: "In Stock",
    rating: 4.5,
    soldUnits: 24,
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: "VEH005",
    vin: "MHCITY24E005",
    brand: "Honda",
    model: "City",
    variant: "V CVT Petrol",
    year: 2024,
    category: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Platinum White",
    mileage: 6300,
    price: 1420000,
    stock: 7,
    reorderLevel: 5,
    status: "In Stock",
    rating: 4.6,
    soldUnits: 18,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85"
  },

  {
    id: "VEH006",
    vin: "MHXUV24F006",
    brand: "Mahindra",
    model: "XUV700",
    variant: "AX7 Diesel AT",
    year: 2025,
    category: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    color: "Midnight Black",
    mileage: 3200,
    price: 2450000,
    stock: 10,
    reorderLevel: 5,
    status: "In Stock",
    rating: 4.8,
    soldUnits: 21,
    image:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1000&q=85"
  }
];


export const customers = [
  {
    id: "CUS001",
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    totalPurchases: 3,
    totalSpent: 2460000,
    memberSince: "Jan 2024",
    status: "Premium"
  },

  {
    id: "CUS002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 98234 56120",
    totalPurchases: 2,
    totalSpent: 1850000,
    memberSince: "Mar 2024",
    status: "Regular"
  },

  {
    id: "CUS003",
    name: "Amit Verma",
    email: "amit.verma@email.com",
    phone: "+91 99123 45678",
    totalPurchases: 1,
    totalSpent: 1420000,
    memberSince: "Jun 2024",
    status: "Regular"
  },

  {
    id: "CUS004",
    name: "Vikram Mehta",
    email: "vikram.mehta@email.com",
    phone: "+91 99887 66554",
    totalPurchases: 4,
    totalSpent: 3850000,
    memberSince: "Nov 2023",
    status: "Premium"
  }
];


export const testDrives = [
  {
    id: "TD001",
    customer: "Rahul Sharma",
    vehicle: "Toyota Fortuner",
    date: "2026-08-21",
    time: "11:00 AM",
    status: "Confirmed"
  },

  {
    id: "TD002",
    customer: "Priya Patel",
    vehicle: "Kia Seltos",
    date: "2026-08-21",
    time: "02:00 PM",
    status: "Confirmed"
  },

  {
    id: "TD003",
    customer: "Amit Verma",
    vehicle: "Hyundai Creta",
    date: "2026-08-22",
    time: "10:00 AM",
    status: "Pending"
  },

  {
    id: "TD004",
    customer: "Vikram Mehta",
    vehicle: "Mahindra XUV700",
    date: "2026-08-23",
    time: "04:30 PM",
    status: "Confirmed"
  }
];


export const salesData = [
  {
    month: "Jan",
    sales: 4200000,
    profit: 950000
  },

  {
    month: "Feb",
    sales: 5800000,
    profit: 1200000
  },

  {
    month: "Mar",
    sales: 5100000,
    profit: 1050000
  },

  {
    month: "Apr",
    sales: 6900000,
    profit: 1500000
  },

  {
    month: "May",
    sales: 8200000,
    profit: 2050000
  },

  {
    month: "Jun",
    sales: 7100000,
    profit: 1650000
  },

  {
    month: "Jul",
    sales: 7900000,
    profit: 1900000
  },

  {
    month: "Aug",
    sales: 8600000,
    profit: 2200000
  }
];


export const recentActivity = [
  {
    id: 1,
    user: "Rahul Sharma",
    action: "Purchased Toyota Fortuner",
    time: "10:30 AM"
  },

  {
    id: 2,
    user: "Priya Patel",
    action: "Booked test drive — Kia Seltos",
    time: "09:15 AM"
  },

  {
    id: 3,
    user: "Amit Verma",
    action: "Purchased Honda City",
    time: "Yesterday"
  },

  {
    id: 4,
    user: "Vikram Mehta",
    action: "Booked test drive — XUV700",
    time: "Yesterday"
  }
];


export const aiInsights = [
  {
    id: 1,
    type: "Demand Forecast",
    title: "SUV demand rising",
    description:
      "SUV demand is predicted to increase over the next 30 days.",
    value: "+22%",
    action: "View Forecast"
  },

  {
    id: 2,
    type: "Smart Restock",
    title: "Kia Seltos needs restocking",
    description:
      "Current sales velocity indicates that stock may run low soon.",
    value: "5 units",
    action: "Restock Now"
  },

  {
    id: 3,
    type: "Price Opportunity",
    title: "Hyundai Creta pricing",
    description:
      "Market demand supports a potential price adjustment.",
    value: "+2.5%",
    action: "Review Price"
  }
];


export const dashboardStats = {
  vehicles: 1284,
  sales: 845000000,
  customers: 3256,
  testDrives: 156,
  lowStock: 12,

  vehicleGrowth: 12.5,
  salesGrowth: 18.2,
  customerGrowth: 8.4,
  testDriveGrowth: 14.0
};
