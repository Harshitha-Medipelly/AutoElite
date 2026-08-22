import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "./components/AppLayout";

/* =========================================================
   AUTH
   ========================================================= */

import Login from "./pages/Login";

/* =========================================================
   PAGES
   ========================================================= */

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import Appointments from "./pages/Appointments";
import TestDrives from "./pages/TestDrives";
import Sales from "./pages/Sales";
import PurchaseFlow from "./pages/PurchaseFlow";
import Analytics from "./pages/Analytics";
import AIInsights from "./pages/AIInsights";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

/* =========================================================
   PROTECTED ROUTE
   ========================================================= */

function ProtectedRoute() {
  const authenticated =
    localStorage.getItem("autoelite_auth") === "true";

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

/* =========================================================
   PUBLIC ROUTE
   ========================================================= */

function PublicRoute() {
  const authenticated =
    localStorage.getItem("autoelite_auth") === "true";

  if (authenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}

/* =========================================================
   APPLICATION
   ========================================================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            PUBLIC
            ================================================= */}

        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>

        {/* =================================================
            PROTECTED
            ================================================= */}

        <Route element={<ProtectedRoute />}>

          {/* =================================================
              APPLICATION LAYOUT
              ================================================= */}

          <Route element={<AppLayout />}>

            {/* =================================================
                DASHBOARD
                ================================================= */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* =================================================
                INVENTORY
                ================================================= */}

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            {/* =================================================
                VEHICLES
                ================================================= */}

            <Route
              path="/vehicles"
              element={<Vehicles />}
            />

            <Route
              path="/vehicles/:vehicleId"
              element={<VehicleDetails />}
            />

            {/* =================================================
                CRM
                ================================================= */}

            <Route
              path="/leads"
              element={<Leads />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            {/* =================================================
                APPOINTMENTS
                ================================================= */}

            <Route
              path="/appointments"
              element={<Appointments />}
            />

            <Route
              path="/test-drives"
              element={<TestDrives />}
            />

            {/* =================================================
                SALES
                ================================================= */}

            <Route
              path="/sales"
              element={<Sales />}
            />

            {/* =================================================
                PURCHASES
                IMPORTANT:
                There is NO Purchases.jsx.
                Therefore /purchases directly opens
                PurchaseFlow.
                ================================================= */}

            <Route
              path="/purchases"
              element={<PurchaseFlow />}
            />

            {/* =================================================
                PURCHASE FLOW WITH VEHICLE
                ================================================= */}

            <Route
              path="/purchase/:vehicleId"
              element={<PurchaseFlow />}
            />

            {/* =================================================
                INTELLIGENCE
                ================================================= */}

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/insights"
              element={<AIInsights />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            {/* =================================================
                SETTINGS
                ================================================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Route>
        </Route>

        {/* =================================================
            ROOT
            ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* =================================================
            FALLBACK
            ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
