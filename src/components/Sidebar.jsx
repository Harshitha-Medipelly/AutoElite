import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  CarFront,
  UserRoundSearch,
  Users,
  CalendarDays,
  ClipboardList,
  ShoppingCart,
  CreditCard,
  BarChart3,
  Sparkles,
  FileBarChart,
  Settings,
  UserCog,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   NAVIGATION DATA
   ========================================================= */

const workspaceItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: Boxes,
    badge: "12",
    badgeType: "danger",
  },
  {
    label: "Vehicles",
    path: "/vehicles",
    icon: CarFront,
  },
  {
    label: "Leads",
    path: "/leads",
    icon: UserRoundSearch,
    badge: "8",
    badgeType: "info",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    label: "Appointments",
    path: "/appointments",
    icon: CalendarDays,
    badge: "4",
    badgeType: "info",
  },
  {
    label: "Test Drives",
    path: "/test-drives",
    icon: ClipboardList,
  },
  {
    label: "Sales",
    path: "/sales",
    icon: ShoppingCart,
  },
  {
    label: "Purchases",
    path: "/purchases",
    icon: CreditCard,
  },
];

const intelligenceItems = [
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "AI Insights",
    path: "/insights",
    icon: Sparkles,
    ai: true,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
];

const managementItems = [
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Users & Roles",
    path: "/users",
    icon: UserCog,
    disabled: true,
  },
];

/* =========================================================
   LOGO
   ========================================================= */

function Logo({ collapsed }) {
  return (
    <div
      className={`flex h-12 items-center ${
        collapsed ? "justify-center" : "gap-3"
      }`}
    >
      <div
        className="
          relative
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-[#18E0C4]
          via-[#28D7FF]
          to-[#8B5CF6]
          shadow-[0_0_25px_rgba(24,224,196,0.18)]
        "
      >
        <CarFront
          size={22}
          strokeWidth={2.2}
          className="text-[#041016]"
        />

        <span
          className="
            absolute
            bottom-0.5
            left-1/2
            h-[2px]
            w-4
            -translate-x-1/2
            rounded-full
            bg-white/70
          "
        />
      </div>

      {!collapsed && (
        <div className="leading-none">
          <div
            className="
              text-[20px]
              font-bold
              tracking-[-0.04em]
              text-white
            "
          >
            Auto
            <span className="text-[#18E0C4]">
              Elite
            </span>
          </div>

          <div
            className="
              mt-1
              text-[8px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-slate-500
            "
          >
            Dealership Intelligence
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SECTION LABEL
   ========================================================= */

function SectionLabel({ children }) {
  return (
    <div
      className="
        mb-3
        px-2
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-slate-600
      "
    >
      {children}
    </div>
  );
}

/* =========================================================
   NAVIGATION ITEM
   ========================================================= */

function NavigationItem({
  item,
  collapsed,
  onNavigate,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const Icon = item.icon;

  const active =
    location.pathname === item.path ||
    (
      item.path !== "/dashboard" &&
      location.pathname.startsWith(
        `${item.path}/`
      )
    );

  /* -------------------------------------------------------
     DISABLED ITEM
     ------------------------------------------------------- */

  if (item.disabled) {
    return (
      <div
        className={`
          flex
          min-h-[46px]
          items-center
          rounded-xl
          px-3
          ${
            collapsed
              ? "justify-center"
              : "gap-3"
          }
          cursor-not-allowed
          text-slate-700
        `}
        title={
          collapsed
            ? `${item.label} — Coming soon`
            : undefined
        }
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon
            size={19}
            strokeWidth={1.7}
          />
        </div>

        {!collapsed && (
          <>
            <span className="flex-1 text-[13px] font-medium">
              {item.label}
            </span>

            <span className="text-[8px] uppercase tracking-wider text-slate-700">
              Soon
            </span>
          </>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------
     NORMAL ITEM
     ------------------------------------------------------- */

  const handleNavigation = () => {
    navigate(item.path);

    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      title={
        collapsed
          ? item.label
          : undefined
      }
      className={`
        group
        relative
        flex
        min-h-[46px]
        w-full
        items-center
        rounded-xl
        px-3
        text-left
        transition-all
        duration-200

        ${
          collapsed
            ? "justify-center"
            : "gap-3"
        }

        ${
          active
            ? `
              border
              border-[#18E0C4]/10
              bg-gradient-to-r
              from-[#18E0C4]/15
              via-[#18E0C4]/7
              to-transparent
              text-[#18E0C4]
            `
            : `
              border
              border-transparent
              text-slate-400
              hover:bg-white/[0.035]
              hover:text-slate-200
            `
        }
      `}
    >
      {/* ACTIVE BAR */}

      {active && (
        <span
          className="
            absolute
            left-0
            top-1/2
            h-6
            w-[3px]
            -translate-y-1/2
            rounded-r-full
            bg-gradient-to-b
            from-[#18E0C4]
            to-[#28D7FF]
            shadow-[0_0_12px_rgba(24,224,196,0.7)]
          "
        />
      )}

      {/* ICON */}

      <span
        className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center

          ${
            active
              ? "text-[#18E0C4]"
              : "text-slate-500 group-hover:text-slate-300"
          }
        `}
      >
        <Icon
          size={19}
          strokeWidth={
            active ? 2.2 : 1.8
          }
        />

        {item.ai && (
          <span
            className="
              absolute
              -right-0.5
              -top-0.5
              h-1.5
              w-1.5
              rounded-full
              bg-[#A855F7]
              shadow-[0_0_7px_rgba(168,85,247,0.8)]
            "
          />
        )}
      </span>

      {/* LABEL */}

      {!collapsed && (
        <>
          <span className="flex-1 whitespace-nowrap text-[13px] font-medium">
            {item.label}
          </span>

          {item.badge && (
            <span
              className={`
                flex
                h-[21px]
                min-w-[22px]
                items-center
                justify-center
                rounded-md
                px-1.5
                text-[9px]
                font-bold

                ${
                  item.badgeType ===
                  "danger"
                    ? `
                      border
                      border-[#EF4444]/10
                      bg-[#EF4444]/10
                      text-[#F87171]
                    `
                    : `
                      border
                      border-[#28D7FF]/10
                      bg-[#28D7FF]/10
                      text-[#28D7FF]
                    `
                }
              `}
            >
              {item.badge}
            </span>
          )}
        </>
      )}

      {/* COLLAPSED BADGE */}

      {collapsed && item.badge && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-4
            min-w-[16px]
            items-center
            justify-center
            rounded-full
            border
            border-[#07101B]
            bg-[#EF4444]
            px-1
            text-[8px]
            font-bold
            text-white
          "
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function Sidebar({
  mobileOpen = false,
  setMobileOpen,
}) {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] =
    useState(false);

  /* -------------------------------------------------------
     CLOSE MOBILE SIDEBAR
     ------------------------------------------------------- */

  const closeMobile = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  /* -------------------------------------------------------
     LOGOUT
     ------------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem(
      "autoelite_auth"
    );

    localStorage.removeItem(
      "autoelite_user"
    );

    navigate("/login", {
      replace: true,
    });
  };

  /* -------------------------------------------------------
     INSIGHTS
     ------------------------------------------------------- */

  const openInsights = () => {
    navigate("/insights");
    closeMobile();
  };

  return (
    <>
      {/* ===================================================
          MOBILE OVERLAY
          =================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={closeMobile}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* ===================================================
          SIDEBAR
          =================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col
          border-r
          border-white/[0.055]
          bg-[#070D17]/95
          backdrop-blur-2xl
          transition-all
          duration-300
          ease-out

          ${
            collapsed
              ? "w-[76px]"
              : "w-[248px]"
          }

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* =================================================
            BRAND HEADER
            ================================================= */}

        <div
          className="
            flex
            h-[76px]
            shrink-0
            items-center
            border-b
            border-white/[0.045]
            px-4
          "
        >
          <Logo
            collapsed={collapsed}
          />

          <button
            type="button"
            onClick={closeMobile}
            className="
              ml-auto
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:text-white
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION SCROLL AREA
            ================================================= */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-3
            py-5
          "
        >
          {/* WORKSPACE */}

          {!collapsed && (
            <SectionLabel>
              Workspace
            </SectionLabel>
          )}

          <nav className="space-y-1">
            {workspaceItems.map(
              (item) => (
                <NavigationItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={
                    closeMobile
                  }
                />
              )
            )}
          </nav>

          {/* INTELLIGENCE */}

          <div className="my-6">
            <div className="h-px bg-white/[0.045]" />
          </div>

          {!collapsed && (
            <SectionLabel>
              Intelligence
            </SectionLabel>
          )}

          <nav className="space-y-1">
            {intelligenceItems.map(
              (item) => (
                <NavigationItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={
                    closeMobile
                  }
                />
              )
            )}
          </nav>

          {/* MANAGEMENT */}

          <div className="my-6">
            <div className="h-px bg-white/[0.045]" />
          </div>

          {!collapsed && (
            <SectionLabel>
              Management
            </SectionLabel>
          )}

          <nav className="space-y-1">
            {managementItems.map(
              (item) => (
                <NavigationItem
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={
                    closeMobile
                  }
                />
              )
            )}
          </nav>

          {/* AI CARD */}

          {!collapsed && (
            <div
              className="
                relative
                mt-7
                overflow-hidden
                rounded-2xl
                border
                border-[#8B5CF6]/15
                bg-gradient-to-br
                from-[#8B5CF6]/10
                via-[#18E0C4]/5
                to-transparent
                p-4
              "
            >
              <div
                className="
                  mb-3
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-[#8B5CF6]/15
                  bg-[#8B5CF6]/10
                "
              >
                <Sparkles
                  size={15}
                  className="text-[#A78BFA]"
                />
              </div>

              <p className="text-[11px] font-semibold text-white">
                AI Dealership Copilot
              </p>

              <p
                className="
                  mt-1.5
                  text-[9px]
                  leading-4
                  text-slate-500
                "
              >
                Discover hidden sales and
                inventory opportunities.
              </p>

              <button
                type="button"
                onClick={openInsights}
                className="
                  mt-3
                  text-[10px]
                  font-semibold
                  text-[#A78BFA]
                  transition
                  hover:text-[#C4B5FD]
                "
              >
                Explore insights →
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            BOTTOM
            ================================================= */}

        <div className="shrink-0 px-3 pb-3">
          {/* SYSTEM STATUS */}

          {!collapsed && (
            <div
              className="
                mb-3
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-[#22C55E]/10
                bg-[#22C55E]/[0.045]
                px-3
                py-2.5
              "
            >
              <ShieldCheck
                size={15}
                className="text-[#22C55E]"
              />

              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-[#86EFAC]">
                  System Protected
                </p>

                <p className="mt-0.5 text-[8px] text-slate-600">
                  All services operational
                </p>
              </div>

              <span
                className="
                  ml-auto
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#22C55E]
                  shadow-[0_0_8px_rgba(34,197,94,0.8)]
                "
              />
            </div>
          )}

          {/* USER */}

          <div
            className={`
              flex
              items-center
              rounded-xl
              border
              border-white/[0.045]
              bg-white/[0.025]
              p-2.5

              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >
            <div
              className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-gradient-to-br
                from-[#334155]
                to-[#172033]
              "
            >
              <span className="text-[11px] font-bold text-slate-200">
                JD
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-2
                  w-2
                  rounded-full
                  border
                  border-[#07101A]
                  bg-[#22C55E]
                "
              />
            </div>

            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold text-white">
                    John Doe
                  </p>

                  <p className="mt-0.5 text-[8px] text-slate-500">
                    Administrator
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-600
                    transition
                    hover:bg-[#EF4444]/10
                    hover:text-[#F87171]
                  "
                >
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* =================================================
            COLLAPSE BUTTON
            ================================================= */}

        <button
          type="button"
          onClick={() =>
            setCollapsed(
              (value) => !value
            )
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="
            absolute
            right-[-11px]
            top-[72px]
            hidden
            h-[22px]
            w-[22px]
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#101A29]
            text-slate-500
            shadow-lg
            transition
            hover:border-[#18E0C4]/30
            hover:text-[#18E0C4]
            lg:flex
          "
        >
          {collapsed ? (
            <ChevronRight size={12} />
          ) : (
            <ChevronLeft size={12} />
          )}
        </button>
      </aside>

      {/* ===================================================
          MOBILE MENU BUTTON
          =================================================== */}

      {!mobileOpen && (
        <button
          type="button"
          onClick={() =>
            setMobileOpen?.(true)
          }
          aria-label="Open navigation"
          className="
            fixed
            left-4
            top-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-[#0B1421]/90
            text-slate-300
            shadow-xl
            backdrop-blur-xl
            lg:hidden
          "
        >
          <Menu size={19} />
        </button>
      )}
    </>
  );
}

export default Sidebar;
