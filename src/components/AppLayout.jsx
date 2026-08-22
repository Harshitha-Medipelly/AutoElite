import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AIChatbot from "./AIChatbot";

/* =========================================================
   AUTOELITE APPLICATION LAYOUT

   Structure:
   Sidebar
      ↓
   Topbar
      ↓
   Current Page
      ↓
   AutoElite AI Chatbot
   ========================================================= */

function AppLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#050912]
        text-white
      "
    >

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />


      {/* =====================================================
          MAIN APPLICATION AREA
          ===================================================== */}

      <div
        className="
          min-h-screen
          w-full
          lg:pl-[248px]
          transition-[padding]
          duration-300
          ease-out
        "
      >

        {/* ===================================================
            TOPBAR
            =================================================== */}

        <Topbar
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />


        {/* ===================================================
            PAGE CONTENT
            =================================================== */}

        <main
          className="
            min-h-[calc(100vh-76px)]
            w-full
            px-4
            py-5
            sm:px-6
            sm:py-6
            lg:px-7
            lg:py-7
          "
        >
          <Outlet />
        </main>

      </div>


      {/* =====================================================
          AUTOELITE AI DEALERSHIP COPILOT

          This stays outside the page content so the chatbot
          remains fixed at the bottom-right on every page.

          Available on:
          Dashboard
          Inventory
          Vehicles
          Leads
          Customers
          Appointments
          Test Drives
          Sales
          Purchases
          Analytics
          AI Insights
          Reports
          Settings
          ===================================================== */}

      <AIChatbot />

    </div>
  );
}

export default AppLayout;
