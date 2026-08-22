import { useEffect, useMemo, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  ChevronDown,
  Command,
  Menu,
  Search,
  Sparkles,
  User,
  Settings,
  LogOut,
  X,
  CarFront,
  CalendarDays,
  UserRoundSearch,
  ShoppingCart,
  FileBarChart,
  ArrowRight,
  Check,
  CircleAlert,
} from "lucide-react";


/* =========================================================
   PAGE INFORMATION
   ========================================================= */

const pageInfo = {
  "/dashboard": {
    section: "Workspace",
    title: "Dashboard",
    description:
      "Your dealership at a glance",
  },

  "/inventory": {
    section: "Workspace",
    title: "Inventory",
    description:
      "Manage vehicles and stock movement",
  },

  "/vehicles": {
    section: "Workspace",
    title: "Vehicles",
    description:
      "Explore your complete vehicle catalog",
  },

  "/leads": {
    section: "Workspace",
    title: "Leads",
    description:
      "Track prospects and conversion opportunities",
  },

  "/customers": {
    section: "Workspace",
    title: "Customers",
    description:
      "Manage relationships and customer history",
  },

  "/appointments": {
    section: "Workspace",
    title: "Appointments",
    description:
      "Coordinate dealership appointments",
  },

  "/test-drives": {
    section: "Workspace",
    title: "Test Drives",
    description:
      "Manage upcoming and completed test drives",
  },

  "/sales": {
    section: "Workspace",
    title: "Sales",
    description:
      "Track deals, deliveries and revenue",
  },

  "/purchases": {
    section: "Workspace",
    title: "Purchases",
    description:
      "Manage procurement and supplier activity",
  },

  "/analytics": {
    section: "Intelligence",
    title: "Analytics",
    description:
      "Understand dealership performance",
  },

  "/insights": {
    section: "Intelligence",
    title: "AI Insights",
    description:
      "Discover opportunities hidden in your data",
  },

  "/reports": {
    section: "Intelligence",
    title: "Reports",
    description:
      "Generate decision-ready dealership reports",
  },

  "/settings": {
    section: "Management",
    title: "Settings",
    description:
      "Configure your dealership workspace",
  },
};


/* =========================================================
   SEARCH DATA
   ========================================================= */

const searchItems = [
  {
    label: "Dashboard",
    description: "Dealership overview",
    path: "/dashboard",
    icon: Command,
  },

  {
    label: "Inventory",
    description: "Vehicle inventory",
    path: "/inventory",
    icon: CarFront,
  },

  {
    label: "Vehicles",
    description: "Vehicle catalog",
    path: "/vehicles",
    icon: CarFront,
  },

  {
    label: "Leads",
    description: "Prospects and opportunities",
    path: "/leads",
    icon: UserRoundSearch,
  },

  {
    label: "Customers",
    description: "Customer relationships",
    path: "/customers",
    icon: User,
  },

  {
    label: "Appointments",
    description: "Scheduled appointments",
    path: "/appointments",
    icon: CalendarDays,
  },

  {
    label: "Test Drives",
    description: "Drive appointments",
    path: "/test-drives",
    icon: CarFront,
  },

  {
    label: "Sales",
    description: "Deals and deliveries",
    path: "/sales",
    icon: ShoppingCart,
  },

  {
    label: "Analytics",
    description: "Performance analytics",
    path: "/analytics",
    icon: Command,
  },

  {
    label: "AI Insights",
    description: "AI-powered intelligence",
    path: "/insights",
    icon: Sparkles,
  },

  {
    label: "Reports",
    description: "Business reports",
    path: "/reports",
    icon: FileBarChart,
  },

  {
    label: "Settings",
    description: "Workspace settings",
    path: "/settings",
    icon: Settings,
  },
];


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

const initialNotifications = [
  {
    id: 1,
    type: "success",
    title: "Vehicle sold",
    message:
      "Toyota Fortuner has been marked as sold.",
    time: "8 min ago",
    unread: true,
  },

  {
    id: 2,
    type: "warning",
    title: "Inventory ageing",
    message:
      "3 vehicles have crossed the 45-day ageing threshold.",
    time: "24 min ago",
    unread: true,
  },

  {
    id: 3,
    type: "info",
    title: "Test drive scheduled",
    message:
      "A test drive was booked for today at 4:30 PM.",
    time: "1 hr ago",
    unread: true,
  },

  {
    id: 4,
    type: "ai",
    title: "AI insight available",
    message:
      "EV demand has increased 18% this week.",
    time: "2 hrs ago",
    unread: false,
  },
];


/* =========================================================
   TOPBAR
   ========================================================= */

function Topbar({
  onMenuClick,
}) {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState(
      initialNotifications
    );

  const [commandOpen, setCommandOpen] =
    useState(false);


  /* =======================================================
     USER
     ======================================================= */

  const user = useMemo(() => {
    try {
      const stored =
        localStorage.getItem(
          "autoelite_user"
        );

      return stored
        ? JSON.parse(stored)
        : {
            name: "John Doe",
            email:
              "admin@autoelite.com",
            role: "Administrator",
          };
    } catch {
      return {
        name: "John Doe",
        email:
          "admin@autoelite.com",
        role: "Administrator",
      };
    }
  }, []);


  /* =======================================================
     PAGE INFO
     ======================================================= */

  const currentPage =
    pageInfo[
      location.pathname
    ] || {
      section: "Workspace",
      title: "AutoElite",
      description:
        "Dealership intelligence platform",
    };


  /* =======================================================
     UNREAD COUNT
     ======================================================= */

  const unreadCount =
    notifications.filter(
      (notification) =>
        notification.unread
    ).length;


  /* =======================================================
     SEARCH RESULTS
     ======================================================= */

  const filteredSearch =
    searchItems.filter(
      (item) => {
        const query =
          searchValue
            .trim()
            .toLowerCase();

        if (!query) {
          return true;
        }

        return (
          item.label
            .toLowerCase()
            .includes(query) ||
          item.description
            .toLowerCase()
            .includes(query)
        );
      }
    );


  /* =======================================================
     KEYBOARD SHORTCUT
     ======================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          (event.ctrlKey ||
            event.metaKey) &&
          event.key.toLowerCase() ===
            "k"
        ) {
          event.preventDefault();

          setCommandOpen(
            true
          );

          setSearchOpen(
            true
          );
        }

        if (
          event.key ===
            "Escape"
        ) {
          setSearchOpen(
            false
          );

          setCommandOpen(
            false
          );

          setNotificationsOpen(
            false
          );

          setProfileOpen(
            false
          );
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);


  /* =======================================================
     NAVIGATE FROM SEARCH
     ======================================================= */

  const handleSearchNavigation =
    (path) => {
      navigate(path);

      setSearchOpen(false);
      setCommandOpen(false);
      setSearchValue("");
    };


  /* =======================================================
     MARK NOTIFICATIONS READ
     ======================================================= */

  const markAllRead =
    () => {
      setNotifications(
        (items) =>
          items.map(
            (item) => ({
              ...item,
              unread: false,
            })
          )
      );
    };


  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout =
    () => {
      localStorage.removeItem(
        "autoelite_auth"
      );

      localStorage.removeItem(
        "autoelite_user"
      );

      navigate(
        "/login",
        {
          replace: true,
        }
      );
    };


  /* =======================================================
     AVATAR INITIALS
     ======================================================= */

  const initials =
    user.name
      ?.split(" ")
      .map(
        (part) =>
          part[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "JD";


  return (
    <>
      {/* ===================================================
          TOPBAR
          =================================================== */}

      <header
        className="
          sticky
          top-0
          z-30

          h-[76px]

          flex
          items-center

          px-4
          sm:px-6
          lg:px-7

          bg-[#050912]/90

          backdrop-blur-2xl

          border-b
          border-white/[0.045]
        "
      >

        {/* =================================================
            LEFT
            ================================================= */}

        <div
          className="
            flex
            items-center

            min-w-0

            flex-1

            gap-3
          "
        >

          {/* Mobile menu */}

          <button
            type="button"
            onClick={
              onMenuClick
            }
            className="
              flex
              lg:hidden

              items-center
              justify-center

              w-9
              h-9

              shrink-0

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.05]

              text-slate-500

              hover:text-white

              transition
            "
            aria-label="Open menu"
          >
            <Menu size={17} />
          </button>


          {/* Page context */}

          <div
            className="
              hidden
              sm:block

              min-w-0
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  text-[7px]

                  uppercase

                  tracking-[0.16em]

                  font-semibold

                  text-[#18E0C4]
                "
              >
                {currentPage.section}
              </span>

              <span
                className="
                  text-slate-800
                "
              >
                /
              </span>

              <span
                className="
                  text-[7px]

                  text-slate-700
                "
              >
                AutoElite
              </span>

            </div>


            <div
              className="
                flex

                items-center
                gap-2

                mt-1
              "
            >

              <h1
                className="
                  text-[12px]

                  font-semibold

                  text-white
                "
              >
                {currentPage.title}
              </h1>

              <span
                className="
                  hidden
                  md:block

                  text-[7px]

                  text-slate-700
                "
              >
                {currentPage.description}
              </span>

            </div>

          </div>


          {/* Mobile page title */}

          <div
            className="
              sm:hidden

              min-w-0
            "
          >
            <p
              className="
                truncate

                text-[11px]

                font-semibold

                text-white
              "
            >
              {currentPage.title}
            </p>

            <p
              className="
                mt-0.5

                text-[6px]

                text-slate-700
              "
            >
              AutoElite
            </p>
          </div>

        </div>


        {/* =================================================
            CENTER SEARCH
            ================================================= */}

        <div
          className="
            hidden
            xl:flex

            relative

            w-[280px]
            2xl:w-[340px]

            mx-5
          "
        >

          <button
            type="button"
            onClick={() =>
              setSearchOpen(
                true
              )
            }
            className="
              group

              flex
              items-center

              w-full
              h-9

              px-3

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.05]

              hover:border-white/[0.09]

              transition
            "
          >

            <Search
              size={13}
              className="
                text-slate-700

                group-hover:text-slate-400
              "
            />

            <span
              className="
                ml-2.5

                text-[7px]

                text-slate-700
              "
            >
              Search anything...
            </span>

            <span
              className="
                ml-auto

                flex
                items-center
                gap-1

                px-1.5
                py-1

                rounded-md

                bg-white/[0.035]

                border
                border-white/[0.04]

                text-[6px]

                text-slate-700
              "
            >
              <Command
                size={7}
              />

              K
            </span>

          </button>

        </div>


        {/* =================================================
            RIGHT ACTIONS
            ================================================= */}

        <div
          className="
            flex
            items-center

            gap-1.5
            sm:gap-2
          "
        >

          {/* Mobile search */}

          <button
            type="button"
            onClick={() =>
              setSearchOpen(
                true
              )
            }
            className="
              flex
              xl:hidden

              items-center
              justify-center

              w-9
              h-9

              rounded-xl

              text-slate-600

              hover:text-slate-300

              hover:bg-white/[0.03]

              transition
            "
            aria-label="Search"
          >
            <Search
              size={16}
            />
          </button>


          {/* AI quick action */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/insights"
              )
            }
            className="
              hidden
              md:flex

              items-center
              justify-center

              w-9
              h-9

              rounded-xl

              bg-[#8B5CF6]/[0.05]

              border
              border-[#8B5CF6]/10

              text-[#A78BFA]

              hover:bg-[#8B5CF6]/[0.09]

              transition
            "
            title="AI Insights"
          >
            <Sparkles
              size={14}
            />
          </button>


          {/* Notifications */}

          <div
            className="
              relative
            "
          >

            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(
                  (value) =>
                    !value
                );

                setProfileOpen(
                  false
                );
              }}
              className="
                relative

                flex
                items-center
                justify-center

                w-9
                h-9

                rounded-xl

                text-slate-600

                hover:text-slate-300

                hover:bg-white/[0.03]

                transition
              "
              aria-label="Notifications"
            >
              <Bell
                size={15}
              />

              {unreadCount >
                0 && (
                <span
                  className="
                    absolute

                    top-1
                    right-1

                    flex
                    items-center
                    justify-center

                    min-w-[14px]
                    h-[14px]

                    px-1

                    rounded-full

                    bg-[#18E0C4]

                    text-[6px]

                    font-bold

                    text-[#031014]

                    border
                    border-[#050912]
                  "
                >
                  {unreadCount}
                </span>
              )}
            </button>


            {/* Notification panel */}

            {notificationsOpen && (
              <NotificationPanel
                notifications={
                  notifications
                }
                unreadCount={
                  unreadCount
                }
                onMarkAllRead={
                  markAllRead
                }
                onClose={() =>
                  setNotificationsOpen(
                    false
                  )
                }
              />
            )}

          </div>


          {/* Divider */}

          <div
            className="
              hidden
              sm:block

              w-px
              h-7

              mx-1

              bg-white/[0.05]
            "
          />


          {/* Profile */}

          <div
            className="
              relative
            "
          >

            <button
              type="button"
              onClick={() => {
                setProfileOpen(
                  (value) =>
                    !value
                );

                setNotificationsOpen(
                  false
                );
              }}
              className="
                flex
                items-center

                gap-2.5

                px-1.5
                py-1

                rounded-xl

                hover:bg-white/[0.03]

                transition
              "
            >

              <div
                className="
                  relative

                  flex
                  items-center
                  justify-center

                  w-8
                  h-8

                  rounded-full

                  bg-gradient-to-br
                  from-[#334155]
                  to-[#172033]

                  border
                  border-white/10
                "
              >
                <span
                  className="
                    text-[9px]

                    font-bold

                    text-slate-200
                  "
                >
                  {initials}
                </span>

                <span
                  className="
                    absolute

                    right-0
                    bottom-0

                    w-2
                    h-2

                    rounded-full

                    bg-[#22C55E]

                    border
                    border-[#050912]
                  "
                />
              </div>


              <div
                className="
                  hidden
                  sm:block

                  text-left
                "
              >
                <p
                  className="
                    max-w-[90px]

                    truncate

                    text-[8px]

                    font-semibold

                    text-slate-300
                  "
                >
                  {user.name}
                </p>

                <p
                  className="
                    mt-0.5

                    text-[6px]

                    text-slate-700
                  "
                >
                  {user.role}
                </p>
              </div>


              <ChevronDown
                size={10}
                className="
                  hidden
                  sm:block

                  text-slate-700
                "
              />

            </button>


            {/* Profile dropdown */}

            {profileOpen && (
              <ProfileMenu
                user={user}
                onSettings={() => {
                  setProfileOpen(
                    false
                  );

                  navigate(
                    "/settings"
                  );
                }}
                onLogout={
                  handleLogout
                }
              />
            )}

          </div>

        </div>

      </header>


      {/* ===================================================
          SEARCH MODAL
          =================================================== */}

      {searchOpen && (
        <SearchOverlay
          value={
            searchValue
          }
          setValue={
            setSearchValue
          }
          results={
            filteredSearch
          }
          onNavigate={
            handleSearchNavigation
          }
          onClose={() => {
            setSearchOpen(
              false
            );

            setCommandOpen(
              false
            );

            setSearchValue("");
          }}
          commandOpen={
            commandOpen
          }
        />
      )}

    </>
  );
}


/* =========================================================
   SEARCH OVERLAY
   ========================================================= */

function SearchOverlay({
  value,
  setValue,
  results,
  onNavigate,
  onClose,
}) {
  return (
    <div
      className="
        fixed

        inset-0

        z-[100]

        flex
        items-start
        justify-center

        pt-[90px]

        px-4

        bg-black/65

        backdrop-blur-sm
      "
      onMouseDown={
        onClose
      }
    >

      <div
        className="
          w-full

          max-w-[620px]

          overflow-hidden

          rounded-2xl

          bg-[#0D1725]

          border
          border-white/[0.08]

          shadow-[0_30px_100px_rgba(0,0,0,0.65)]
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* Search input */}

        <div
          className="
            flex
            items-center

            px-4

            h-14

            border-b
            border-white/[0.05]
          "
        >

          <Search
            size={16}
            className="
              text-[#18E0C4]
            "
          />

          <input
            autoFocus
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value
              )
            }
            placeholder="Search pages, customers, vehicles..."
            className="
              flex-1

              h-full

              px-3

              bg-transparent

              outline-none

              text-[10px]

              text-white

              placeholder:text-slate-700
            "
          />

          <button
            type="button"
            onClick={
              onClose
            }
            className="
              flex

              items-center
              justify-center

              w-7
              h-7

              rounded-lg

              text-slate-700

              hover:text-slate-300

              hover:bg-white/[0.04]
            "
          >
            <X size={13} />
          </button>

        </div>


        {/* Results */}

        <div
          className="
            max-h-[430px]

            overflow-y-auto

            p-2
          "
        >

          {results.length >
          0 ? (
            <>
              <p
                className="
                  px-3
                  py-2

                  text-[6px]

                  uppercase

                  tracking-[0.14em]

                  text-slate-800
                "
              >
                Quick navigation
              </p>

              {results.map(
                (
                  item
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <button
                      key={
                        item.path
                      }
                      type="button"
                      onClick={() =>
                        onNavigate(
                          item.path
                        )
                      }
                      className="
                        group

                        flex
                        items-center

                        w-full

                        gap-3

                        p-3

                        rounded-xl

                        text-left

                        hover:bg-white/[0.035]

                        transition
                      "
                    >

                      <div
                        className="
                          flex

                          items-center
                          justify-center

                          w-8
                          h-8

                          rounded-lg

                          bg-white/[0.025]

                          border
                          border-white/[0.04]

                          text-slate-600

                          group-hover:text-[#18E0C4]

                          group-hover:border-[#18E0C4]/10
                        "
                      >
                        <Icon
                          size={13}
                        />
                      </div>


                      <div
                        className="
                          flex-1

                          min-w-0
                        "
                      >

                        <p
                          className="
                            text-[8px]

                            font-semibold

                            text-slate-400

                            group-hover:text-white
                          "
                        >
                          {item.label}
                        </p>

                        <p
                          className="
                            mt-0.5

                            text-[6px]

                            text-slate-800
                          "
                        >
                          {
                            item.description
                          }
                        </p>

                      </div>


                      <ArrowRight
                        size={10}
                        className="
                          text-slate-800

                          group-hover:text-[#18E0C4]

                          transition
                        "
                      />

                    </button>
                  );
                }
              )}
            </>
          ) : (
            <div
              className="
                py-14

                text-center
              "
            >
              <Search
                size={20}
                className="
                  mx-auto

                  text-slate-800
                "
              />

              <p
                className="
                  mt-3

                  text-[9px]

                  font-semibold

                  text-slate-500
                "
              >
                No results found
              </p>

              <p
                className="
                  mt-1

                  text-[7px]

                  text-slate-800
                "
              >
                Try another search term.
              </p>
            </div>
          )}

        </div>


        {/* Footer */}

        <div
          className="
            flex
            items-center
            justify-between

            px-4
            py-3

            border-t
            border-white/[0.05]
          "
        >

          <span
            className="
              text-[6px]

              text-slate-800
            "
          >
            Search across your workspace
          </span>

          <span
            className="
              text-[6px]

              text-slate-700
            "
          >
            ESC to close
          </span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   NOTIFICATION PANEL
   ========================================================= */

function NotificationPanel({
  notifications,
  unreadCount,
  onMarkAllRead,
  onClose,
}) {
  return (
    <div
      className="
        absolute

        right-0

        top-[48px]

        w-[350px]

        max-w-[calc(100vw-24px)]

        rounded-2xl

        overflow-hidden

        bg-[#0D1725]

        border
        border-white/[0.08]

        shadow-[0_30px_80px_rgba(0,0,0,0.55)]
      "
    >

      {/* Header */}

      <div
        className="
          flex

          items-center
          justify-between

          px-4
          py-3.5

          border-b
          border-white/[0.05]
        "
      >

        <div>
          <h3
            className="
              text-[9px]

              font-semibold

              text-white
            "
          >
            Notifications
          </h3>

          <p
            className="
              mt-0.5

              text-[6px]

              text-slate-700
            "
          >
            {unreadCount} unread updates
          </p>
        </div>


        <button
          type="button"
          onClick={
            onMarkAllRead
          }
          className="
            flex

            items-center
            gap-1.5

            text-[6px]

            font-semibold

            text-[#18E0C4]
          "
        >
          <Check size={9} />

          Mark all read
        </button>

      </div>


      {/* Notifications */}

      <div
        className="
          max-h-[350px]

          overflow-y-auto
        "
      >

        {notifications.map(
          (
            notification
          ) => (
            <NotificationItem
              key={
                notification.id
              }
              notification={
                notification
              }
            />
          )
        )}

      </div>


      {/* Footer */}

      <button
        type="button"
        onClick={
          onClose
        }
        className="
          w-full

          py-3

          border-t
          border-white/[0.05]

          text-[7px]

          font-semibold

          text-slate-600

          hover:text-slate-300

          transition
        "
      >
        Close notifications
      </button>

    </div>
  );
}


/* =========================================================
   NOTIFICATION ITEM
   ========================================================= */

function NotificationItem({
  notification,
}) {
  const iconMap = {
    success: {
      icon: Check,
      bg: "bg-[#22C55E]/[0.06]",
      border:
        "border-[#22C55E]/10",
      text: "text-[#4ADE80]",
    },

    warning: {
      icon: CircleAlert,
      bg: "bg-[#F59E0B]/[0.06]",
      border:
        "border-[#F59E0B]/10",
      text: "text-[#FBBF24]",
    },

    info: {
      icon: Bell,
      bg: "bg-[#28D7FF]/[0.06]",
      border:
        "border-[#28D7FF]/10",
      text: "text-[#38BDF8]",
    },

    ai: {
      icon: Sparkles,
      bg: "bg-[#A855F7]/[0.06]",
      border:
        "border-[#A855F7]/10",
      text: "text-[#A78BFA]",
    },
  };

  const config =
    iconMap[
      notification.type
    ] ||
    iconMap.info;

  const Icon =
    config.icon;

  return (
    <div
      className={`
        flex

        gap-3

        p-3.5

        border-b
        border-white/[0.025]

        ${
          notification.unread
            ? "bg-white/[0.012]"
            : ""
        }
      `}
    >

      <div
        className={`
          flex

          items-center
          justify-center

          w-8
          h-8

          shrink-0

          rounded-lg

          border

          ${config.bg}

          ${config.border}

          ${config.text}
        `}
      >
        <Icon
          size={12}
        />
      </div>


      <div
        className="
          min-w-0

          flex-1
        "
      >

        <div
          className="
            flex

            items-center
            justify-between

            gap-2
          "
        >

          <p
            className="
              text-[7px]

              font-semibold

              text-slate-400
            "
          >
            {
              notification.title
            }
          </p>

          {notification.unread && (
            <span
              className="
                w-1.5
                h-1.5

                shrink-0

                rounded-full

                bg-[#18E0C4]
              "
            />
          )}

        </div>


        <p
          className="
            mt-1

            text-[6px]

            leading-4

            text-slate-700
          "
        >
          {
            notification.message
          }
        </p>

        <p
          className="
            mt-1.5

            text-[5px]

            text-slate-800
          "
        >
          {
            notification.time
          }
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   PROFILE MENU
   ========================================================= */

function ProfileMenu({
  user,
  onSettings,
  onLogout,
}) {
  return (
    <div
      className="
        absolute

        right-0

        top-[48px]

        w-[245px]

        rounded-2xl

        overflow-hidden

        bg-[#0D1725]

        border
        border-white/[0.08]

        shadow-[0_30px_80px_rgba(0,0,0,0.55)]
      "
    >

      {/* User info */}

      <div
        className="
          p-4

          border-b
          border-white/[0.05]
        "
      >

        <div
          className="
            flex

            items-center
            gap-3
          "
        >

          <div
            className="
              flex

              items-center
              justify-center

              w-9
              h-9

              rounded-full

              bg-gradient-to-br
              from-[#334155]
              to-[#172033]

              border
              border-white/10
            "
          >
            <User
              size={14}
              className="
                text-slate-400
              "
            />
          </div>


          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                truncate

                text-[8px]

                font-semibold

                text-white
              "
            >
              {user.name}
            </p>

            <p
              className="
                mt-0.5

                truncate

                text-[6px]

                text-slate-700
              "
            >
              {user.email}
            </p>

          </div>

        </div>


        <div
          className="
            mt-3

            inline-flex

            px-2
            py-1

            rounded-md

            bg-[#18E0C4]/[0.05]

            border
            border-[#18E0C4]/10

            text-[6px]

            font-semibold

            text-[#18E0C4]
          "
        >
          {user.role}
        </div>

      </div>


      {/* Actions */}

      <div
        className="
          p-2
        "
      >

        <button
          type="button"
          onClick={
            onSettings
          }
          className="
            flex

            items-center
            gap-3

            w-full

            px-3
            py-2.5

            rounded-xl

            text-left

            text-[7px]

            text-slate-500

            hover:bg-white/[0.035]

            hover:text-slate-300

            transition
          "
        >

          <Settings
            size={12}
          />

          Account settings

        </button>


        <button
          type="button"
          onClick={
            onLogout
          }
          className="
            flex

            items-center
            gap-3

            w-full

            px-3
            py-2.5

            rounded-xl

            text-left

            text-[7px]

            text-slate-500

            hover:bg-[#EF4444]/[0.05]

            hover:text-[#F87171]

            transition
          "
        >

          <LogOut
            size={12}
          />

          Sign out

        </button>

      </div>

    </div>
  );
}


export default Topbar;
