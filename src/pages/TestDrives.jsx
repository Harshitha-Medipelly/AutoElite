import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Edit3,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";

/* ============================================================
   DATA
   ============================================================ */

const TODAY = "2026-08-21";
const TOMORROW = "2026-08-22";

const initialTestDrives = [
  {
    id: "TD-10482",
    customer: "Arjun Mehta",
    phone: "+91 98765 21480",
    email: "arjun.mehta@email.com",
    vehicle: "Toyota Fortuner",
    variant: "Legender 4x4 AT",
    vehicleId: "VH-1001",
    date: TODAY,
    time: "10:30 AM",
    duration: "45 min",
    location: "Hyderabad",
    advisor: "Rahul Kumar",
    status: "Completed",
    outcome: "Highly Interested",
    rating: 5,
    notes:
      "Customer liked the driving dynamics and requested final pricing.",
    source: "Website",
    reminder: true,
  },
  {
    id: "TD-10483",
    customer: "Priya Sharma",
    phone: "+91 91234 77890",
    email: "priya.sharma@email.com",
    vehicle: "BMW X5",
    variant: "xDrive40i M Sport",
    vehicleId: "VH-1002",
    date: TODAY,
    time: "11:15 AM",
    duration: "45 min",
    location: "Banjara Hills",
    advisor: "Ananya Rao",
    status: "Scheduled",
    outcome: "",
    rating: 0,
    notes: "Interested in premium SUV comparison.",
    source: "Instagram",
    reminder: true,
  },
  {
    id: "TD-10484",
    customer: "Rohan Reddy",
    phone: "+91 99887 44551",
    email: "rohan.reddy@email.com",
    vehicle: "Hyundai Creta",
    variant: "SX(O) IVT",
    vehicleId: "VH-1003",
    date: TODAY,
    time: "12:30 PM",
    duration: "30 min",
    location: "Secunderabad",
    advisor: "Karthik Reddy",
    status: "Confirmed",
    outcome: "",
    rating: 0,
    notes: "Customer requested an afternoon appointment.",
    source: "Walk-in",
    reminder: true,
  },
  {
    id: "TD-10485",
    customer: "Sneha Kapoor",
    phone: "+91 90012 67231",
    email: "sneha.k@email.com",
    vehicle: "Mercedes-Benz GLC",
    variant: "300 4MATIC AMG Line",
    vehicleId: "VH-1004",
    date: TODAY,
    time: "02:00 PM",
    duration: "45 min",
    location: "Hyderabad",
    advisor: "Meghana S",
    status: "Scheduled",
    outcome: "",
    rating: 0,
    notes:
      "Requested demonstration of ADAS and parking features.",
    source: "Referral",
    reminder: true,
  },
  {
    id: "TD-10486",
    customer: "Vikram Singh",
    phone: "+91 98876 32109",
    email: "vikram.s@email.com",
    vehicle: "Audi Q5",
    variant: "Technology Pack",
    vehicleId: "VH-1005",
    date: TODAY,
    time: "03:30 PM",
    duration: "45 min",
    location: "Gachibowli",
    advisor: "Vivek Sharma",
    status: "No Show",
    outcome: "No Show",
    rating: 0,
    notes: "Customer did not arrive. Follow-up required.",
    source: "Google",
    reminder: true,
  },
  {
    id: "TD-10487",
    customer: "Neha Iyer",
    phone: "+91 97654 11820",
    email: "neha.iyer@email.com",
    vehicle: "Kia EV6",
    variant: "GT Line AWD",
    vehicleId: "VH-1007",
    date: TOMORROW,
    time: "09:30 AM",
    duration: "60 min",
    location: "Banjara Hills",
    advisor: "Ananya Rao",
    status: "Confirmed",
    outcome: "",
    rating: 0,
    notes: "EV customer. Requested charging demonstration.",
    source: "Website",
    reminder: true,
  },
  {
    id: "TD-10488",
    customer: "Aditya Rao",
    phone: "+91 90123 55487",
    email: "aditya.rao@email.com",
    vehicle: "Toyota Camry",
    variant: "Hybrid",
    vehicleId: "VH-1008",
    date: TOMORROW,
    time: "11:00 AM",
    duration: "45 min",
    location: "Secunderabad",
    advisor: "Karthik Reddy",
    status: "Scheduled",
    outcome: "",
    rating: 0,
    notes: "Interested in hybrid ownership costs.",
    source: "Facebook",
    reminder: true,
  },
  {
    id: "TD-10489",
    customer: "Meera Nair",
    phone: "+91 93456 88021",
    email: "meera.nair@email.com",
    vehicle: "Skoda Kodiaq",
    variant: "L&K 2.0 TSI",
    vehicleId: "VH-1006",
    date: TOMORROW,
    time: "04:00 PM",
    duration: "45 min",
    location: "Hyderabad",
    advisor: "Rahul Kumar",
    status: "Completed",
    outcome: "Interested",
    rating: 4,
    notes: "Family test drive. Comparing with Fortuner.",
    source: "Website",
    reminder: false,
  },
];

/* ============================================================
   MAIN
   ============================================================ */

function TestDrives() {
  const [testDrives, setTestDrives] =
    useState(initialTestDrives);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [advisor, setAdvisor] = useState("All");

  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [toast, setToast] = useState("");

  /* ============================================================
     TOAST
     ============================================================ */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__testDriveToastTimer);

    window.__testDriveToastTimer = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ============================================================
     FILTERING
     ============================================================ */

  const filteredDrives = useMemo(() => {
    const query = search.trim().toLowerCase();

    return testDrives.filter((drive) => {
      const matchesSearch =
        !query ||
        drive.customer.toLowerCase().includes(query) ||
        drive.vehicle.toLowerCase().includes(query) ||
        drive.id.toLowerCase().includes(query) ||
        drive.phone.toLowerCase().includes(query) ||
        drive.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || drive.status === status;

      const matchesAdvisor =
        advisor === "All" || drive.advisor === advisor;

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && drive.date === TODAY) ||
        (dateFilter === "Tomorrow" &&
          drive.date === TOMORROW);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesAdvisor &&
        matchesDate
      );
    });
  }, [
    testDrives,
    search,
    status,
    dateFilter,
    advisor,
  ]);

  /* ============================================================
     KPI
     ============================================================ */

  const todayDrives = testDrives.filter(
    (drive) => drive.date === TODAY
  ).length;

  const scheduled = testDrives.filter(
    (drive) =>
      drive.status === "Scheduled" ||
      drive.status === "Confirmed"
  ).length;

  const completed = testDrives.filter(
    (drive) => drive.status === "Completed"
  ).length;

  const highIntent = testDrives.filter(
    (drive) => drive.outcome === "Highly Interested"
  ).length;

  const confirmedToday = testDrives.filter(
    (drive) =>
      drive.date === TODAY &&
      drive.status === "Confirmed"
  ).length;

  const pendingToday = testDrives.filter(
    (drive) =>
      drive.date === TODAY &&
      drive.status === "Scheduled"
  ).length;

  const completedToday = testDrives.filter(
    (drive) =>
      drive.date === TODAY &&
      drive.status === "Completed"
  ).length;

  /* ============================================================
     STATUS UPDATE
     ============================================================ */

  const updateStatus = (id, newStatus) => {
    setTestDrives((current) =>
      current.map((drive) =>
        drive.id === id
          ? {
              ...drive,
              status: newStatus,
              outcome:
                newStatus === "No Show"
                  ? "No Show"
                  : drive.outcome,
            }
          : drive
      )
    );

    setSelectedDrive((current) =>
      current
        ? {
            ...current,
            status: newStatus,
            outcome:
              newStatus === "No Show"
                ? "No Show"
                : current.outcome,
          }
        : null
    );

    showToast(
      `Test drive marked as ${newStatus}.`
    );
  };

  /* ============================================================
     CANCEL
     ============================================================ */

  const cancelDrive = (drive) => {
    setTestDrives((current) =>
      current.map((item) =>
        item.id === drive.id
          ? {
              ...item,
              status: "Cancelled",
            }
          : item
      )
    );

    setSelectedDrive(null);
    showToast("Test drive cancelled.");
  };

  /* ============================================================
     CLEAR FILTERS
     ============================================================ */

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setDateFilter("All");
    setAdvisor("All");
  };

  /* ============================================================
     REFRESH
     ============================================================ */

  const refresh = () => {
    setTestDrives((current) => [...current]);
    showToast("Test-drive calendar refreshed.");
  };

  return (
    <div className="w-full min-h-full text-slate-200">

      {/* ========================================================
          HEADER
          ======================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex flex-col xl:flex-row
          xl:items-end xl:justify-between
          gap-5 mb-7
        "
      >
        <div>
          <div className="flex items-center gap-2.5">
            <CalendarDays
              size={17}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#18E0C4]
              "
            >
              Customer Experience
            </span>
          </div>

          <h1
            className="
              mt-2
              text-3xl sm:text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Test Drives
          </h1>

          <p
            className="
              mt-2
              max-w-[700px]
              text-sm
              leading-6
              text-slate-400
            "
          >
            Schedule, manage and track every customer
            test-drive journey from enquiry to conversion.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={refresh}
            className="
              inline-flex items-center justify-center
              gap-2
              h-11 px-4
              rounded-xl
              bg-white/[0.03]
              border border-white/[0.08]
              text-sm font-semibold
              text-slate-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            <RefreshCw size={15} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => setShowBooking(true)}
            className="
              inline-flex items-center justify-center
              gap-2
              h-11 px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm font-bold
              text-[#031014]
              shadow-lg
              shadow-[#18E0C4]/10
              hover:brightness-110
              transition
            "
          >
            <CalendarPlus size={16} />
            Schedule Test Drive
          </button>
        </div>
      </motion.div>

      {/* ========================================================
          KPI CARDS
          ======================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          mb-6
        "
      >
        <TestDriveKPI
          icon={CalendarDays}
          label="Today's Drives"
          value={todayDrives}
          detail="Appointments scheduled today"
        />

        <TestDriveKPI
          icon={Clock3}
          label="Upcoming"
          value={scheduled}
          detail="Confirmed + scheduled"
          accent="blue"
        />

        <TestDriveKPI
          icon={CheckCircle2}
          label="Completed"
          value={completed}
          detail="Recorded customer experiences"
          accent="green"
        />

        <TestDriveKPI
          icon={Sparkles}
          label="High Intent"
          value={highIntent}
          detail="Customers ready for follow-up"
          accent="purple"
        />
      </div>

      {/* ========================================================
          LIVE BOARD
          ======================================================== */}

      <section
        className="
          relative overflow-hidden
          p-5 sm:p-6
          mb-6
          rounded-2xl
          bg-gradient-to-br
          from-[#10222A]
          via-[#0D1725]
          to-[#09111D]
          border border-[#18E0C4]/15
        "
      >
        <div
          className="
            absolute
            -right-20
            -top-24
            w-64 h-64
            rounded-full
            bg-[#18E0C4]/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex flex-col lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className="
                  w-2 h-2
                  rounded-full
                  bg-[#22C55E]
                  animate-pulse
                "
              />

              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#7DD3C7]
                "
              >
                Live Schedule
              </span>
            </div>

            <h2
              className="
                mt-2
                text-lg
                font-semibold
                text-white
              "
            >
              Today's Customer Drive Board
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Keep advisors, vehicles and customers synchronized.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <LiveMetric
              label="Confirmed"
              value={confirmedToday}
            />

            <LiveMetric
              label="Pending"
              value={pendingToday}
            />

            <LiveMetric
              label="Completed"
              value={completedToday}
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          TOOLBAR
          ======================================================== */}

      <section
        className="
          flex flex-col xl:flex-row
          gap-3
          mb-5
        "
      >
        <div className="relative flex-1">

          <Search
            size={17}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="
              Search customer, vehicle, phone or booking ID...
            "
            className="
              w-full
              h-11
              pl-11 pr-4
              rounded-xl
              bg-[#0D1725]
              border border-white/[0.08]
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
              focus:border-[#18E0C4]/40
              focus:ring-2
              focus:ring-[#18E0C4]/10
              transition
            "
          />
        </div>

        <div className="flex flex-wrap gap-3">

          <TestDriveSelect
            value={dateFilter}
            onChange={setDateFilter}
            options={[
              "All",
              "Today",
              "Tomorrow",
            ]}
          />

          <TestDriveSelect
            value={status}
            onChange={setStatus}
            options={[
              "All",
              "Scheduled",
              "Confirmed",
              "Completed",
              "No Show",
              "Cancelled",
            ]}
          />

          <TestDriveSelect
            value={advisor}
            onChange={setAdvisor}
            options={[
              "All",
              "Rahul Kumar",
              "Ananya Rao",
              "Karthik Reddy",
              "Meghana S",
              "Vivek Sharma",
            ]}
          />

          <button
            type="button"
            onClick={() =>
              setShowFilters((current) => !current)
            }
            className={`
              flex items-center justify-center
              w-11 h-11
              rounded-xl
              border
              transition
              ${
                showFilters
                  ? `
                    bg-[#18E0C4]/[0.08]
                    border-[#18E0C4]/20
                    text-[#18E0C4]
                  `
                  : `
                    bg-white/[0.03]
                    border-white/[0.08]
                    text-slate-400
                  `
              }
            `}
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
      </section>

      {/* ========================================================
          ADVANCED FILTERS
          ======================================================== */}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="overflow-hidden mb-5"
          >
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
                p-5
                rounded-2xl
                bg-[#0D1725]
                border border-white/[0.08]
              "
            >
              <FilterItem
                icon={MapPin}
                label="Location"
                value="All locations"
              />

              <FilterItem
                icon={CarFront}
                label="Vehicle Category"
                value="All categories"
              />

              <FilterItem
                icon={Users}
                label="Customer Type"
                value="All customers"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          SECTION HEADER
          ======================================================== */}

      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
          mb-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Test-drive Appointments
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {filteredDrives.length} appointments
            matching your filters.
          </p>
        </div>

        <div
          className="
            flex items-center gap-2
            text-xs
            font-medium
            text-slate-500
          "
        >
          <Sparkles
            size={14}
            className="text-[#18E0C4]"
          />
          AI lead scoring active
        </div>
      </div>

      {/* ========================================================
          APPOINTMENTS
          ======================================================== */}

      <div className="space-y-3">

        {filteredDrives.map((drive, index) => (
          <TestDriveRow
            key={drive.id}
            drive={drive}
            index={index}
            onOpen={() =>
              setSelectedDrive(drive)
            }
          />
        ))}

      </div>

      {/* EMPTY STATE */}

      {filteredDrives.length === 0 && (
        <EmptyTestDrives
          onClear={clearFilters}
        />
      )}

      {/* ========================================================
          DETAIL DRAWER
          ======================================================== */}

      <AnimatePresence>
        {selectedDrive && (
          <TestDriveDrawer
            drive={selectedDrive}
            onClose={() =>
              setSelectedDrive(null)
            }
            onStatusChange={updateStatus}
            onCancel={cancelDrive}
            onToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* ========================================================
          BOOKING MODAL
          ======================================================== */}

      <AnimatePresence>
        {showBooking && (
          <BookingModal
            onClose={() =>
              setShowBooking(false)
            }
            onCreate={(drive) => {
              setTestDrives((current) => [
                drive,
                ...current,
              ]);

              setShowBooking(false);

              showToast(
                "Test drive scheduled successfully."
              );
            }}
          />
        )}
      </AnimatePresence>

      {/* ========================================================
          TOAST
          ======================================================== */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="
              fixed
              right-5
              bottom-5
              z-[300]
              flex items-center gap-3
              px-5 py-3.5
              rounded-xl
              bg-[#0D1725]
              border border-[#18E0C4]/20
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
          >
            <Check
              size={17}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-sm
                font-medium
                text-slate-200
              "
            >
              {toast}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   KPI CARD
   ============================================================ */

function TestDriveKPI({
  icon: Icon,
  label,
  value,
  detail,
  accent = "cyan",
}) {
  const colors = {
    cyan: {
      bg: "bg-[#18E0C4]/[0.06]",
      text: "text-[#18E0C4]",
    },
    blue: {
      bg: "bg-[#3B82F6]/[0.07]",
      text: "text-[#60A5FA]",
    },
    green: {
      bg: "bg-[#22C55E]/[0.07]",
      text: "text-[#4ADE80]",
    },
    purple: {
      bg: "bg-[#8B5CF6]/[0.07]",
      text: "text-[#A78BFA]",
    },
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        p-5
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border border-white/[0.07]
        hover:border-white/[0.12]
        transition
      "
    >
      <div className="flex items-center justify-between">

        <div
          className={`
            flex items-center justify-center
            w-10 h-10
            rounded-xl
            ${colors[accent].bg}
          `}
        >
          <Icon
            size={18}
            className={colors[accent].text}
          />
        </div>

        <ArrowRight
          size={14}
          className="text-slate-700"
        />
      </div>

      <p
        className="
          mt-5
          text-3xl
          font-bold
          tracking-tight
          text-white
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-slate-300
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-xs
          text-slate-500
        "
      >
        {detail}
      </p>
    </motion.div>
  );
}

/* ============================================================
   LIVE METRIC
   ============================================================ */

function LiveMetric({ label, value }) {
  return (
    <div
      className="
        min-w-[105px]
        px-4 py-3
        rounded-xl
        bg-black/10
        border border-white/[0.06]
      "
    >
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-2xl
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   TEST DRIVE ROW
   ============================================================ */

function TestDriveRow({
  drive,
  index,
  onOpen,
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.035,
      }}
      whileHover={{
        x: 2,
      }}
      onClick={onOpen}
      className="
        group
        cursor-pointer
        p-5
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border border-white/[0.07]
        hover:border-[#18E0C4]/20
        hover:bg-[#0E1927]
        transition
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto]
          gap-5
          items-center
        "
      >

        {/* CUSTOMER */}

        <div className="flex items-center gap-4">

          <div
            className="
              flex items-center justify-center
              w-12 h-12
              shrink-0
              rounded-xl
              bg-gradient-to-br
              from-[#18E0C4]/10
              to-[#28D7FF]/[0.04]
              border border-[#18E0C4]/15
              text-sm
              font-bold
              text-[#18E0C4]
            "
          >
            {getInitials(drive.customer)}
          </div>

          <div className="min-w-0">

            <div
              className="
                flex flex-wrap
                items-center
                gap-2.5
              "
            >
              <h3
                className="
                  text-base
                  font-semibold
                  text-slate-200
                  group-hover:text-white
                "
              >
                {drive.customer}
              </h3>

              <StatusBadge
                status={drive.status}
              />
            </div>

            <div
              className="
                flex items-center
                gap-2
                mt-1.5
              "
            >
              <Phone
                size={13}
                className="text-slate-600"
              />

              <span
                className="
                  text-sm
                  text-slate-500
                "
              >
                {drive.phone}
              </span>
            </div>
          </div>
        </div>

        {/* VEHICLE */}

        <div className="flex items-center gap-3">

          <div
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              bg-white/[0.025]
              border border-white/[0.05]
            "
          >
            <CarFront
              size={17}
              className="text-slate-500"
            />
          </div>

          <div className="min-w-0">

            <p
              className="
                text-sm
                font-semibold
                text-slate-300
              "
            >
              {drive.vehicle}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {drive.variant}
            </p>
          </div>
        </div>

        {/* TIME */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <div>

            <div
              className="
                flex items-center gap-2
              "
            >
              <CalendarDays
                size={14}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-slate-300
                "
              >
                {formatDate(drive.date)}
              </span>
            </div>

            <div
              className="
                flex items-center gap-2
                mt-1.5
              "
            >
              <Clock3
                size={14}
                className="text-slate-600"
              />

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                {drive.time} • {drive.duration}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="
              flex items-center justify-center
              w-10 h-10
              shrink-0
              rounded-xl
              bg-white/[0.025]
              border border-white/[0.06]
              text-slate-500
              hover:text-[#18E0C4]
              hover:border-[#18E0C4]/20
              transition
            "
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* BOTTOM INFO */}

      <div
        className="
          flex flex-wrap
          items-center
          justify-between
          gap-4
          mt-5 pt-4
          border-t border-white/[0.05]
        "
      >
        <div
          className="
            flex flex-wrap
            gap-5
          "
        >
          <MiniInfo
            icon={UserRound}
            value={drive.advisor}
          />

          <MiniInfo
            icon={MapPin}
            value={drive.location}
          />

          <MiniInfo
            icon={Sparkles}
            value={drive.source}
          />
        </div>

        {drive.outcome && (
          <div
            className="
              flex items-center gap-2
              text-sm
              font-semibold
              text-[#A78BFA]
            "
          >
            <Sparkles size={14} />
            {drive.outcome}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ============================================================
   DETAIL DRAWER
   ============================================================ */

function TestDriveDrawer({
  drive,
  onClose,
  onStatusChange,
  onCancel,
  onToast,
}) {
  return (
    <div
      className="
        fixed inset-0
        z-[150]
        bg-black/70
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <motion.aside
        initial={{
          x: "100%",
        }}
        animate={{
          x: 0,
        }}
        exit={{
          x: "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          absolute
          right-0 top-0 bottom-0
          w-full sm:max-w-[560px]
          overflow-y-auto
          bg-[#09111D]
          border-l border-white/[0.08]
          shadow-[-30px_0_100px_rgba(0,0,0,0.5)]
        "
      >

        {/* DRAWER HEADER */}

        <div
          className="
            sticky top-0 z-20
            p-6
            bg-[#09111D]/95
            backdrop-blur-xl
            border-b border-white/[0.06]
          "
        >
          <div
            className="
              flex items-start
              justify-between
              gap-4
            "
          >
            <div>

              <div className="flex items-center gap-2">
                <span
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Booking
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#18E0C4]
                  "
                >
                  {drive.id}
                </span>
              </div>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {drive.customer}
              </h2>

              <p
                className="
                  mt-1.5
                  text-sm
                  text-slate-400
                "
              >
                {drive.vehicle} • {drive.variant}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex items-center justify-center
                w-10 h-10
                rounded-xl
                bg-white/[0.03]
                border border-white/[0.06]
                text-slate-400
                hover:text-white
                transition
              "
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6">

          {/* STATUS */}

          <div
            className="
              flex items-center
              justify-between
              gap-4
              p-5
              rounded-2xl
              bg-white/[0.02]
              border border-white/[0.06]
            "
          >
            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Appointment Status
              </p>

              <div className="mt-2">
                <StatusBadge
                  status={drive.status}
                  large
                />
              </div>
            </div>

            <div className="text-right">

              <p
                className="
                  text-sm
                  text-slate-400
                "
              >
                {formatDate(drive.date)}
              </p>

              <p
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-white
                "
              >
                {drive.time}
              </p>
            </div>
          </div>

          {/* APPOINTMENT */}

          <DrawerSection
            icon={CalendarDays}
            title="Appointment"
          >
            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              <InfoCell
                label="Date"
                value={formatDate(drive.date)}
              />

              <InfoCell
                label="Time"
                value={drive.time}
              />

              <InfoCell
                label="Duration"
                value={drive.duration}
              />

              <InfoCell
                label="Location"
                value={drive.location}
              />
            </div>
          </DrawerSection>

          {/* CUSTOMER */}

          <DrawerSection
            icon={UserRound}
            title="Customer"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.06]
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className="
                    flex items-center justify-center
                    w-12 h-12
                    rounded-full
                    bg-[#18E0C4]/[0.07]
                    border border-[#18E0C4]/15
                    text-sm
                    font-bold
                    text-[#18E0C4]
                  "
                >
                  {getInitials(drive.customer)}
                </div>

                <div>
                  <p
                    className="
                      text-base
                      font-semibold
                      text-slate-200
                    "
                  >
                    {drive.customer}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {drive.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-5">

                <button
                  type="button"
                  onClick={() =>
                    onToast(
                      `Calling ${drive.customer}...`
                    )
                  }
                  className="
                    flex-1
                    flex items-center
                    justify-center
                    gap-2
                    h-10
                    rounded-xl
                    bg-white/[0.03]
                    border border-white/[0.06]
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:text-white
                    transition
                  "
                >
                  <Phone size={15} />
                  Call
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onToast(
                      "Message composer opened."
                    )
                  }
                  className="
                    flex-1
                    flex items-center
                    justify-center
                    gap-2
                    h-10
                    rounded-xl
                    bg-white/[0.03]
                    border border-white/[0.06]
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:text-white
                    transition
                  "
                >
                  <MessageSquare size={15} />
                  Message
                </button>
              </div>
            </div>
          </DrawerSection>

          {/* VEHICLE */}

          <DrawerSection
            icon={CarFront}
            title="Vehicle"
          >
            <div
              className="
                flex items-center
                gap-4
                p-4
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.06]
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12
                  rounded-xl
                  bg-[#18E0C4]/[0.06]
                "
              >
                <CarFront
                  size={19}
                  className="text-[#18E0C4]"
                />
              </div>

              <div>
                <p
                  className="
                    text-base
                    font-semibold
                    text-slate-300
                  "
                >
                  {drive.vehicle}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {drive.variant}
                </p>
              </div>
            </div>
          </DrawerSection>

          {/* ADVISOR */}

          <DrawerSection
            icon={UserRound}
            title="Assigned Advisor"
          >
            <div
              className="
                flex items-center
                justify-between
                gap-4
                p-4
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.06]
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-white/[0.04]
                    text-sm
                    font-bold
                    text-slate-400
                  "
                >
                  {getInitials(drive.advisor)}
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >
                    {drive.advisor}
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                    "
                  >
                    Sales Consultant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    "Advisor reassignment opened."
                  )
                }
                className="
                  text-sm
                  font-semibold
                  text-[#18E0C4]
                  hover:text-[#28D7FF]
                "
              >
                Reassign
              </button>
            </div>
          </DrawerSection>

          {/* NOTES */}

          <DrawerSection
            icon={MessageSquare}
            title="Customer Notes"
          >
            <div
              className="
                p-4
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.06]
              "
            >
              <p
                className="
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {drive.notes}
              </p>
            </div>
          </DrawerSection>

          {/* AI */}

          <DrawerSection
            icon={Sparkles}
            title="AI Follow-up Signal"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-gradient-to-br
                from-[#16142A]
                to-[#0D1725]
                border border-[#A78BFA]/15
              "
            >
              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-[#A78BFA]"
                />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#C4B5FD]
                  "
                >
                  Suggested Next Action
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {drive.outcome ===
                "Highly Interested"
                  ? "Customer shows strong purchase intent. Send final pricing and finance options within 2 hours."
                  : drive.status === "No Show"
                  ? "Customer missed the appointment. Send a personalized rescheduling message."
                  : "Send a reminder 2 hours before the appointment and prepare the requested vehicle."}
              </p>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    "AI follow-up task created."
                  )
                }
                className="
                  mt-4
                  h-10
                  px-4
                  rounded-xl
                  bg-[#A78BFA]/[0.08]
                  border border-[#A78BFA]/15
                  text-sm
                  font-semibold
                  text-[#C4B5FD]
                  hover:bg-[#A78BFA]/[0.14]
                  transition
                "
              >
                Create Follow-up
              </button>
            </div>
          </DrawerSection>

          {/* ACTIONS */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              mt-7
              pt-5
              border-t border-white/[0.06]
            "
          >

            {drive.status !== "Completed" && (
              <button
                type="button"
                onClick={() =>
                  onStatusChange(
                    drive.id,
                    "Completed"
                  )
                }
                className="
                  flex items-center
                  justify-center
                  gap-2
                  h-11
                  rounded-xl
                  bg-[#22C55E]/[0.07]
                  border border-[#22C55E]/15
                  text-sm
                  font-semibold
                  text-[#4ADE80]
                  hover:bg-[#22C55E]/[0.12]
                  transition
                "
              >
                <CheckCircle2 size={16} />
                Mark Completed
              </button>
            )}

            {drive.status !== "Confirmed" &&
              drive.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() =>
                    onStatusChange(
                      drive.id,
                      "Confirmed"
                    )
                  }
                  className="
                    flex items-center
                    justify-center
                    gap-2
                    h-11
                    rounded-xl
                    bg-[#3B82F6]/[0.07]
                    border border-[#3B82F6]/15
                    text-sm
                    font-semibold
                    text-[#60A5FA]
                    hover:bg-[#3B82F6]/[0.12]
                    transition
                  "
                >
                  <Check size={16} />
                  Confirm
                </button>
              )}

            {drive.status !== "Cancelled" &&
              drive.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() =>
                    onCancel(drive)
                  }
                  className="
                    flex items-center
                    justify-center
                    gap-2
                    h-11
                    rounded-xl
                    bg-[#EF4444]/[0.06]
                    border border-[#EF4444]/15
                    text-sm
                    font-semibold
                    text-[#F87171]
                    hover:bg-[#EF4444]/[0.12]
                    transition
                  "
                >
                  <XCircle size={16} />
                  Cancel
                </button>
              )}

            <button
              type="button"
              onClick={() =>
                onToast(
                  "Edit appointment opened."
                )
              }
              className="
                flex items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-white/[0.03]
                border border-white/[0.07]
                text-sm
                font-semibold
                text-slate-300
                hover:text-white
                transition
              "
            >
              <Edit3 size={16} />
              Edit
            </button>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

/* ============================================================
   BOOKING MODAL
   ============================================================ */

function BookingModal({
  onClose,
  onCreate,
}) {
  const [form, setForm] = useState({
    customer: "",
    phone: "",
    email: "",
    vehicle: "",
    date: TOMORROW,
    time: "10:00 AM",
    duration: "45 min",
    location: "Hyderabad",
    advisor: "Rahul Kumar",
    source: "Website",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.customer.trim() ||
      !form.phone.trim() ||
      !form.vehicle.trim()
    ) {
      setError(
        "Please enter customer name, phone and vehicle."
      );
      return;
    }

    const newDrive = {
      id: `TD-${Math.floor(
        Math.random() * 90000
      ) + 10000}`,
      customer: form.customer.trim(),
      phone: form.phone.trim(),
      email:
        form.email.trim() ||
        "customer@email.com",
      vehicle: form.vehicle.trim(),
      variant: "Standard Variant",
      vehicleId: "NEW",
      date: form.date,
      time: form.time,
      duration: form.duration,
      location: form.location,
      advisor: form.advisor,
      status: "Scheduled",
      outcome: "",
      rating: 0,
      notes: "Newly scheduled test drive.",
      source: form.source,
      reminder: true,
    };

    onCreate(newDrive);
  };

  return (
    <div
      className="
        fixed inset-0
        z-[200]
        flex items-center justify-center
        p-4
        bg-black/75
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.form
        initial={{
          opacity: 0,
          scale: 0.97,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        onSubmit={submit}
        className="
          w-full
          max-w-[720px]
          max-h-[92vh]
          overflow-y-auto
          rounded-2xl
          bg-[#0D1725]
          border border-white/[0.09]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        "
      >

        {/* HEADER */}

        <div
          className="
            sticky top-0 z-10
            flex items-center
            justify-between
            gap-4
            p-6
            bg-[#0D1725]/95
            backdrop-blur-xl
            border-b border-white/[0.06]
          "
        >
          <div>

            <div className="flex items-center gap-2.5">

              <CalendarPlus
                size={18}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#18E0C4]
                "
              >
                New Appointment
              </span>
            </div>

            <h2
              className="
                mt-2
                text-xl
                font-bold
                text-white
              "
            >
              Schedule Test Drive
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              Create a complete customer appointment.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              bg-white/[0.03]
              border border-white/[0.06]
              text-slate-400
              hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-7">

          {/* CUSTOMER */}

          <div>
            <SectionLabel
              title="Customer Details"
            />

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
                mt-4
              "
            >
              <BookingInput
                label="Customer Name"
                value={form.customer}
                onChange={(value) =>
                  update("customer", value)
                }
                placeholder="Enter full name"
                required
              />

              <BookingInput
                label="Phone"
                value={form.phone}
                onChange={(value) =>
                  update("phone", value)
                }
                placeholder="+91 98765 43210"
                required
              />

              <BookingInput
                label="Email"
                value={form.email}
                onChange={(value) =>
                  update("email", value)
                }
                placeholder="customer@email.com"
              />

              <BookingInput
                label="Vehicle"
                value={form.vehicle}
                onChange={(value) =>
                  update("vehicle", value)
                }
                placeholder="Toyota Fortuner"
                required
              />
            </div>
          </div>

          {/* SCHEDULE */}

          <div>
            <SectionLabel
              title="Appointment Schedule"
            />

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
                mt-4
              "
            >
              <BookingInput
                label="Date"
                type="date"
                value={form.date}
                onChange={(value) =>
                  update("date", value)
                }
                required
              />

              <BookingSelect
                label="Time"
                value={form.time}
                onChange={(value) =>
                  update("time", value)
                }
                options={[
                  "09:00 AM",
                  "09:30 AM",
                  "10:00 AM",
                  "10:30 AM",
                  "11:00 AM",
                  "11:30 AM",
                  "12:00 PM",
                  "12:30 PM",
                  "02:00 PM",
                  "02:30 PM",
                  "03:00 PM",
                  "03:30 PM",
                  "04:00 PM",
                  "04:30 PM",
                  "05:00 PM",
                ]}
              />

              <BookingSelect
                label="Duration"
                value={form.duration}
                onChange={(value) =>
                  update("duration", value)
                }
                options={[
                  "30 min",
                  "45 min",
                  "60 min",
                  "90 min",
                ]}
              />
            </div>
          </div>

          {/* ASSIGNMENT */}

          <div>
            <SectionLabel
              title="Assignment"
            />

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
                mt-4
              "
            >
              <BookingSelect
                label="Location"
                value={form.location}
                onChange={(value) =>
                  update("location", value)
                }
                options={[
                  "Hyderabad",
                  "Banjara Hills",
                  "Gachibowli",
                  "Secunderabad",
                ]}
              />

              <BookingSelect
                label="Advisor"
                value={form.advisor}
                onChange={(value) =>
                  update("advisor", value)
                }
                options={[
                  "Rahul Kumar",
                  "Ananya Rao",
                  "Karthik Reddy",
                  "Meghana S",
                  "Vivek Sharma",
                ]}
              />

              <BookingSelect
                label="Lead Source"
                value={form.source}
                onChange={(value) =>
                  update("source", value)
                }
                options={[
                  "Website",
                  "Instagram",
                  "Facebook",
                  "Google",
                  "Walk-in",
                  "Referral",
                ]}
              />
            </div>
          </div>

          {/* AI PREVIEW */}

          <div
            className="
              p-5
              rounded-2xl
              bg-gradient-to-br
              from-[#16142A]
              to-[#0D1725]
              border border-[#A78BFA]/15
            "
          >
            <div className="flex items-center gap-2.5">

              <Sparkles
                size={16}
                className="text-[#A78BFA]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#C4B5FD]
                "
              >
                AI Appointment Optimization
              </span>
            </div>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-400
              "
            >
              The system will automatically prepare
              a reminder, assign the appointment to the
              selected advisor and create a follow-up
              opportunity after completion.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                flex items-center gap-3
                p-4
                rounded-xl
                bg-[#EF4444]/[0.07]
                border border-[#EF4444]/15
                text-sm
                text-[#F87171]
              "
            >
              <XCircle size={17} />
              {error}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            flex justify-end
            gap-3
            p-6 pt-0
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-11
              px-5
              rounded-xl
              bg-white/[0.03]
              border border-white/[0.07]
              text-sm
              font-semibold
              text-slate-300
              hover:text-white
              transition
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              h-11
              px-6
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm
              font-bold
              text-[#031014]
              hover:brightness-110
              transition
            "
          >
            Schedule Appointment
          </button>
        </div>
      </motion.form>
    </div>
  );
}

/* ============================================================
   STATUS BADGE
   ============================================================ */

function StatusBadge({
  status,
  large = false,
}) {
  const styles = {
    Scheduled:
      "bg-[#F59E0B]/[0.08] text-[#FBBF24] border-[#F59E0B]/15",

    Confirmed:
      "bg-[#3B82F6]/[0.08] text-[#60A5FA] border-[#3B82F6]/15",

    Completed:
      "bg-[#22C55E]/[0.08] text-[#4ADE80] border-[#22C55E]/15",

    "No Show":
      "bg-[#EF4444]/[0.08] text-[#F87171] border-[#EF4444]/15",

    Cancelled:
      "bg-slate-500/[0.08] text-slate-400 border-white/[0.07]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        ${large ? "py-1.5" : "py-1"}
        rounded-lg
        border
        ${large ? "text-xs" : "text-[11px]"}
        font-semibold
        ${styles[status] || styles.Cancelled}
      `}
    >
      <span
        className="
          w-1.5 h-1.5
          rounded-full
          bg-current
        "
      />

      {status}
    </span>
  );
}

/* ============================================================
   MINI INFO
   ============================================================ */

function MiniInfo({
  icon: Icon,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        gap-2
        text-sm
        text-slate-500
      "
    >
      <Icon
        size={14}
        className="text-slate-600"
      />

      <span>{value}</span>
    </div>
  );
}

/* ============================================================
   SELECT
   ============================================================ */

function TestDriveSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-11
          min-w-[125px]
          px-3.5 pr-9
          rounded-xl
          appearance-none
          bg-[#0D1725]
          border border-white/[0.08]
          text-sm
          font-medium
          text-slate-300
          outline-none
          cursor-pointer
          focus:border-[#18E0C4]/30
        "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#0D1725]"
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-500
          pointer-events-none
        "
      />
    </div>
  );
}

/* ============================================================
   FILTER ITEM
   ============================================================ */

function FilterItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        p-4
        rounded-xl
        bg-white/[0.02]
        border border-white/[0.06]
      "
    >
      <div
        className="
          flex items-center
          gap-2.5
        "
      >
        <Icon
          size={15}
          className="text-[#18E0C4]"
        />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          {label}
        </span>
      </div>

      <div
        className="
          flex items-center
          justify-between
          mt-3
        "
      >
        <span
          className="
            text-sm
            font-medium
            text-slate-300
          "
        >
          {value}
        </span>

        <ChevronDown
          size={14}
          className="text-slate-600"
        />
      </div>
    </div>
  );
}

/* ============================================================
   DRAWER SECTION
   ============================================================ */

function DrawerSection({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="mt-7">

      <div
        className="
          flex items-center
          gap-2.5
          mb-3
        "
      >
        <Icon
          size={16}
          className="text-[#18E0C4]"
        />

        <h3
          className="
            text-sm
            font-semibold
            text-slate-300
          "
        >
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

/* ============================================================
   INFO CELL
   ============================================================ */

function InfoCell({
  label,
  value,
}) {
  return (
    <div
      className="
        p-4
        rounded-xl
        bg-white/[0.02]
        border border-white/[0.05]
      "
    >
      <p
        className="
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-slate-300
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   SECTION LABEL
   ============================================================ */

function SectionLabel({ title }) {
  return (
    <h3
      className="
        text-sm
        font-semibold
        uppercase
        tracking-wider
        text-slate-400
      "
    >
      {title}
    </h3>
  );
}

/* ============================================================
   BOOKING INPUT
   ============================================================ */

function BookingInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <label className="block">

      <span
        className="
          block
          mb-2
          text-xs
          font-semibold
          text-slate-400
        "
      >
        {label}
        {required && (
          <span className="ml-1 text-[#18E0C4]">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          w-full
          h-11
          px-3.5
          rounded-xl
          bg-white/[0.025]
          border border-white/[0.08]
          text-sm
          text-white
          placeholder:text-slate-600
          outline-none
          focus:border-[#18E0C4]/40
          focus:ring-2
          focus:ring-[#18E0C4]/10
          transition
        "
      />
    </label>
  );
}

/* ============================================================
   BOOKING SELECT
   ============================================================ */

function BookingSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">

      <span
        className="
          block
          mb-2
          text-xs
          font-semibold
          text-slate-400
        "
      >
        {label}
      </span>

      <div className="relative">

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="
            w-full
            h-11
            px-3.5 pr-9
            rounded-xl
            appearance-none
            bg-white/[0.025]
            border border-white/[0.08]
            text-sm
            text-slate-300
            outline-none
            cursor-pointer
            focus:border-[#18E0C4]/40
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#0D1725]"
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-500
            pointer-events-none
          "
        />
      </div>
    </label>
  );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyTestDrives({
  onClear,
}) {
  return (
    <div
      className="
        flex flex-col
        items-center
        justify-center
        py-20
        rounded-2xl
        bg-[#0D1725]
        border border-white/[0.07]
        text-center
      "
    >
      <CalendarDays
        size={42}
        className="text-slate-700"
      />

      <p
        className="
          mt-5
          text-lg
          font-semibold
          text-slate-300
        "
      >
        No test drives found
      </p>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          text-sm
          font-semibold
          text-[#18E0C4]
          hover:text-[#28D7FF]
          transition
        "
      >
        Clear Filters
      </button>
    </div>
  );
}

/* ============================================================
   HELPERS
   ============================================================ */

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date) {
  const [year, month, day] =
    date.split("-");

  const value = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return value.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default TestDrives;
