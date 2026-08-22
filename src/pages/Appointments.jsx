import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   INITIAL DATA
========================================================= */

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-9021",
    title: "Fortuner Test Drive",
    customer: "Ananya Reddy",
    phone: "+91 98765 43210",
    vehicle: "Toyota Fortuner",
    type: "Test Drive",
    status: "Confirmed",
    date: "2026-08-21",
    time: "10:30 AM",
    duration: "45 min",
    advisor: "Rahul Kumar",
    location: "Hyderabad Showroom",
    priority: "High",
    notes: "Customer requested automatic transmission.",
  },
  {
    id: "APT-9022",
    title: "BMW X5 Quotation Discussion",
    customer: "Vikram Singh",
    phone: "+91 99887 66554",
    vehicle: "BMW X5",
    type: "Sales Meeting",
    status: "Confirmed",
    date: "2026-08-21",
    time: "11:45 AM",
    duration: "30 min",
    advisor: "Ananya Rao",
    location: "Sales Lounge",
    priority: "High",
    notes: "Review finance and final quotation.",
  },
  {
    id: "APT-9023",
    title: "Kia EV6 Test Drive",
    customer: "Kavya Nair",
    phone: "+91 91234 56789",
    vehicle: "Kia EV6",
    type: "Test Drive",
    status: "Pending",
    date: "2026-08-21",
    time: "01:30 PM",
    duration: "60 min",
    advisor: "Meghana S",
    location: "Hyderabad Showroom",
    priority: "High",
    notes: "EV charging and range discussion required.",
  },
  {
    id: "APT-9024",
    title: "GLC Follow-up",
    customer: "Megha Joshi",
    phone: "+91 93456 78901",
    vehicle: "Mercedes-Benz GLC",
    type: "Follow-up",
    status: "Confirmed",
    date: "2026-08-21",
    time: "03:00 PM",
    duration: "20 min",
    advisor: "Rahul Kumar",
    location: "Phone",
    priority: "Medium",
    notes: "Discuss AMG package.",
  },
  {
    id: "APT-9025",
    title: "Creta Delivery",
    customer: "Rohan Reddy",
    phone: "+91 90123 45678",
    vehicle: "Hyundai Creta",
    type: "Delivery",
    status: "Confirmed",
    date: "2026-08-21",
    time: "04:30 PM",
    duration: "60 min",
    advisor: "Karthik Reddy",
    location: "Delivery Bay",
    priority: "High",
    notes: "Vehicle PDI completed. Documents ready.",
  },
  {
    id: "APT-9026",
    title: "Camry Ownership Consultation",
    customer: "Sanjay Rao",
    phone: "+91 97654 32109",
    vehicle: "Toyota Camry",
    type: "Consultation",
    status: "Pending",
    date: "2026-08-22",
    time: "10:00 AM",
    duration: "30 min",
    advisor: "Ananya Rao",
    location: "Sales Lounge",
    priority: "Medium",
    notes: "Hybrid ownership cost discussion.",
  },
  {
    id: "APT-9027",
    title: "Kodiaq Test Drive",
    customer: "Pooja Menon",
    phone: "+91 98761 23450",
    vehicle: "Skoda Kodiaq",
    type: "Test Drive",
    status: "Confirmed",
    date: "2026-08-22",
    time: "12:15 PM",
    duration: "45 min",
    advisor: "Karthik Reddy",
    location: "Hyderabad Showroom",
    priority: "Medium",
    notes: "Family SUV test drive.",
  },
  {
    id: "APT-9028",
    title: "Fortuner Finance Meeting",
    customer: "Arjun Mehta",
    phone: "+91 98765 00011",
    vehicle: "Toyota Fortuner",
    type: "Finance",
    status: "Confirmed",
    date: "2026-08-22",
    time: "02:30 PM",
    duration: "30 min",
    advisor: "Rahul Kumar",
    location: "Finance Desk",
    priority: "High",
    notes: "Compare three financing options.",
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Appointments() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);

  const [selectedDate, setSelectedDate] = useState("2026-08-21");
  const [view, setView] = useState("day");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__autoEliteToast);

    window.__autoEliteToast = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments.filter((item) => {
      const matchesDate =
        view === "day" ? item.date === selectedDate : true;

      const matchesSearch =
        !query ||
        item.customer.toLowerCase().includes(query) ||
        item.vehicle.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.advisor.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return (
        matchesDate &&
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    appointments,
    selectedDate,
    view,
    search,
    typeFilter,
    statusFilter,
  ]);

  /* =========================================================
     KPI
  ========================================================= */

  const selectedDayAppointments = appointments.filter(
    (item) => item.date === selectedDate
  );

  const confirmedCount = selectedDayAppointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pendingCount = selectedDayAppointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const testDriveCount = selectedDayAppointments.filter(
    (item) => item.type === "Test Drive"
  ).length;

  /* =========================================================
     DATE NAVIGATION
  ========================================================= */

  const changeDay = (amount) => {
    const date = new Date(`${selectedDate}T00:00:00`);

    date.setDate(date.getDate() + amount);

    setSelectedDate(formatInputDate(date));
  };

  const goToday = () => {
    setSelectedDate("2026-08-21");
  };

  /* =========================================================
     UPDATE APPOINTMENT
  ========================================================= */

  const updateAppointment = (id, changes) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );

    setSelectedAppointment((current) =>
      current
        ? { ...current, ...changes }
        : null
    );

    if (changes.status) {
      showToast(
        `Appointment marked ${changes.status.toLowerCase()}.`
      );
    }
  };

  /* =========================================================
     ADD APPOINTMENT
  ========================================================= */

  const addAppointment = (appointment) => {
    setAppointments((current) => [
      appointment,
      ...current,
    ]);

    setShowAddModal(false);
    showToast("Appointment created successfully.");
  };

  return (
    <div className="w-full min-h-full text-white">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-end
          xl:justify-between
          gap-6
          mb-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays
              size={18}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#18E0C4]
              "
            >
              Scheduling Center
            </span>
          </div>

          <h1
            className="
              mt-3
              text-3xl
              sm:text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Appointments
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              sm:text-base
              leading-6
              text-slate-400
            "
          >
            Coordinate test drives, customer meetings,
            follow-ups, finance and vehicle deliveries.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              showToast("Calendar synchronized.")
            }
            className="
              inline-flex
              items-center
              gap-2
              h-11
              px-4
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.08]
              text-sm
              font-semibold
              text-slate-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            <RefreshCw size={16} />
            Sync Calendar
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="
              inline-flex
              items-center
              gap-2
              h-11
              px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm
              font-bold
              text-[#031014]
              shadow-lg
              shadow-[#18E0C4]/10
              hover:brightness-110
              transition
            "
          >
            <Plus size={17} />
            New Appointment
          </button>
        </div>
      </motion.div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

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
        <AppointmentKPI
          icon={CalendarDays}
          label="Appointments"
          value={selectedDayAppointments.length}
          detail="Selected day"
          accent="cyan"
        />

        <AppointmentKPI
          icon={Check}
          label="Confirmed"
          value={confirmedCount}
          detail="Ready to execute"
          accent="green"
        />

        <AppointmentKPI
          icon={Clock3}
          label="Pending"
          value={pendingCount}
          detail="Awaiting confirmation"
          accent="yellow"
        />

        <AppointmentKPI
          icon={CarIcon}
          label="Test Drives"
          value={testDriveCount}
          detail="Vehicle experiences"
          accent="purple"
        />
      </div>

      {/* =====================================================
          DATE / VIEW CONTROL
      ===================================================== */}

      <section
        className="
          p-5
          mb-5
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.07]
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => changeDay(-1)}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                text-slate-300
                hover:text-white
                hover:bg-white/[0.06]
                transition
              "
            >
              <ChevronLeft size={18} />
            </button>

            <div className="min-w-[220px] text-center">
              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Schedule
              </p>

              <p
                className="
                  mt-1
                  text-base
                  sm:text-lg
                  font-semibold
                  text-white
                "
              >
                {formatDate(selectedDate)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => changeDay(1)}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                text-slate-300
                hover:text-white
                hover:bg-white/[0.06]
                transition
              "
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={goToday}
              className="
                h-10
                px-4
                rounded-xl
                bg-[#18E0C4]/[0.08]
                border
                border-[#18E0C4]/20
                text-sm
                font-semibold
                text-[#18E0C4]
                hover:bg-[#18E0C4]/[0.14]
                transition
              "
            >
              Today
            </button>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              p-1
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.06]
              w-fit
            "
          >
            <ViewButton
              active={view === "day"}
              onClick={() => setView("day")}
            >
              Day
            </ViewButton>

            <ViewButton
              active={view === "agenda"}
              onClick={() => setView("agenda")}
            >
              Agenda
            </ViewButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-[1fr_auto_auto]
          gap-3
          mb-6
        "
      >
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search customer, vehicle, appointment..."
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-xl
              bg-[#0D1725]
              border
              border-white/[0.07]
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
              focus:border-[#18E0C4]/40
              transition
            "
          />
        </div>

        <AppointmentSelect
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            "All",
            "Test Drive",
            "Sales Meeting",
            "Follow-up",
            "Delivery",
            "Consultation",
            "Finance",
          ]}
        />

        <AppointmentSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            "All",
            "Confirmed",
            "Pending",
            "Completed",
            "Cancelled",
          ]}
        />
      </section>

      {/* =====================================================
          SMART SCHEDULING
      ===================================================== */}

      <section
        className="
          p-5
          mb-6
          rounded-2xl
          bg-gradient-to-r
          from-[#17152A]
          via-[#11182A]
          to-[#0D1725]
          border
          border-[#A78BFA]/15
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                items-center
                justify-center
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-[#A78BFA]/10
                border
                border-[#A78BFA]/20
              "
            >
              <Sparkles
                size={20}
                className="text-[#A78BFA]"
              />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-[#C4B5FD]
                "
              >
                Smart Scheduling Insight
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                You have{" "}
                <span className="font-semibold text-white">
                  {testDriveCount}
                </span>{" "}
                test drives today. Prioritize high-intent
                customers and keep adequate buffer time between
                appointments.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              showToast(
                "Schedule optimization completed."
              )
            }
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-11
              px-4
              rounded-xl
              bg-[#A78BFA]/10
              border
              border-[#A78BFA]/20
              text-sm
              font-semibold
              text-[#C4B5FD]
              hover:bg-[#A78BFA]/15
              transition
            "
          >
            Optimize Schedule
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {view === "day" ? (
        <DaySchedule
          appointments={filteredAppointments}
          onOpen={setSelectedAppointment}
        />
      ) : (
        <AgendaView
          appointments={filteredAppointments}
          onOpen={setSelectedAppointment}
        />
      )}

      {/* =====================================================
          DETAILS DRAWER
      ===================================================== */}

      <AnimatePresence>
        {selectedAppointment && (
          <AppointmentDrawer
            appointment={selectedAppointment}
            onClose={() =>
              setSelectedAppointment(null)
            }
            onUpdate={updateAppointment}
            onToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          ADD MODAL
      ===================================================== */}

      <AnimatePresence>
        {showAddModal && (
          <AddAppointmentModal
            onClose={() => setShowAddModal(false)}
            onAdd={addAppointment}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          TOAST
      ===================================================== */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 15,
            }}
            className="
              fixed
              right-5
              bottom-5
              z-[500]
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-xl
              bg-[#101B2A]
              border
              border-[#18E0C4]/20
              shadow-2xl
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                w-7
                h-7
                rounded-full
                bg-[#18E0C4]/10
              "
            >
              <Check
                size={15}
                className="text-[#18E0C4]"
              />
            </div>

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

/* =========================================================
   DAY SCHEDULE
========================================================= */

function DaySchedule({
  appointments,
  onOpen,
}) {
  const hours = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        bg-[#0D1725]
        border
        border-white/[0.07]
      "
    >
      <div
        className="
          px-5
          py-5
          border-b
          border-white/[0.06]
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          Today's Schedule
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Click an appointment to view details and manage it.
        </p>
      </div>

      <div className="divide-y divide-white/[0.05]">
        {hours.map((hour) => {
          const hourNumber = parseHour(hour);

          const items = appointments.filter(
            (appointment) =>
              parseHour(appointment.time) ===
              hourNumber
          );

          return (
            <div
              key={hour}
              className="
                grid
                grid-cols-[90px_1fr]
                min-h-[105px]
                sm:grid-cols-[110px_1fr]
              "
            >
              <div
                className="
                  flex
                  items-start
                  px-5
                  py-5
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                {hour}
              </div>

              <div
                className="
                  p-3
                  sm:p-4
                  border-l
                  border-white/[0.05]
                "
              >
                {items.length > 0 ? (
                  <div className="space-y-3">
                    {items.map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onOpen={() =>
                          onOpen(appointment)
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      items-center
                      h-full
                      text-sm
                      text-slate-700
                    "
                  >
                    Available
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   APPOINTMENT CARD
========================================================= */

function AppointmentCard({
  appointment,
  onOpen,
}) {
  const typeStyles = {
    "Test Drive":
      "border-[#A78BFA]/20 bg-[#A78BFA]/[0.045]",
    "Sales Meeting":
      "border-[#18E0C4]/20 bg-[#18E0C4]/[0.045]",
    "Follow-up":
      "border-[#60A5FA]/20 bg-[#60A5FA]/[0.045]",
    Delivery:
      "border-[#4ADE80]/20 bg-[#4ADE80]/[0.045]",
    Consultation:
      "border-[#FBBF24]/20 bg-[#FBBF24]/[0.045]",
    Finance:
      "border-[#FB923C]/20 bg-[#FB923C]/[0.045]",
  };

  return (
    <motion.button
      type="button"
      whileHover={{ x: 3 }}
      onClick={onOpen}
      className={`
        w-full
        p-4
        rounded-xl
        border
        text-left
        transition
        hover:bg-white/[0.055]
        ${typeStyles[appointment.type] || typeStyles["Test Drive"]}
      `}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                text-base
                font-semibold
                text-white
              "
            >
              {appointment.title}
            </span>

            <StatusPill
              status={appointment.status}
            />
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-x-5
              gap-y-2
              mt-3
            "
          >
            <Meta
              icon={UserRound}
              value={appointment.customer}
            />

            <Meta
              icon={Clock3}
              value={`${appointment.time} • ${appointment.duration}`}
            />

            <Meta
              icon={MapPin}
              value={appointment.location}
            />
          </div>
        </div>

        <ArrowRight
          size={18}
          className="shrink-0 mt-1 text-slate-600"
        />
      </div>
    </motion.button>
  );
}

/* =========================================================
   AGENDA
========================================================= */

function AgendaView({
  appointments,
  onOpen,
}) {
  const sorted = [...appointments].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }

    return parseHour(a.time) - parseHour(b.time);
  });

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        bg-[#0D1725]
        border
        border-white/[0.07]
      "
    >
      <div
        className="
          px-5
          py-5
          border-b
          border-white/[0.06]
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          Appointment Agenda
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Upcoming appointments across the schedule.
        </p>
      </div>

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {sorted.map((appointment) => (
            <button
              key={appointment.id}
              type="button"
              onClick={() =>
                onOpen(appointment)
              }
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                gap-4
                w-full
                p-5
                text-left
                hover:bg-white/[0.025]
                transition
              "
            >
              <div className="lg:w-32">
                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#18E0C4]
                  "
                >
                  {formatShortDate(
                    appointment.date
                  )}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {appointment.time}
                </p>
              </div>

              <div className="flex-1">
                <p
                  className="
                    text-base
                    font-semibold
                    text-white
                  "
                >
                  {appointment.title}
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-x-5
                    gap-y-2
                    mt-2
                  "
                >
                  <Meta
                    icon={UserRound}
                    value={appointment.customer}
                  />

                  <Meta
                    icon={CarIcon}
                    value={appointment.vehicle}
                  />

                  <Meta
                    icon={MapPin}
                    value={appointment.location}
                  />
                </div>
              </div>

              <StatusPill
                status={appointment.status}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   APPOINTMENT DRAWER
========================================================= */

function AppointmentDrawer({
  appointment,
  onClose,
  onUpdate,
  onToast,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[300]
        bg-black/70
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          absolute
          right-0
          top-0
          bottom-0
          w-full
          sm:max-w-[580px]
          overflow-y-auto
          bg-[#09111D]
          border-l
          border-white/[0.08]
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-20
            px-6
            py-5
            bg-[#09111D]/95
            backdrop-blur-xl
            border-b
            border-white/[0.06]
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div>
              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#18E0C4]
                "
              >
                Appointment
              </span>

              <h2
                className="
                  mt-2
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-white
                "
              >
                {appointment.title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {appointment.id}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                shrink-0
                rounded-xl
                bg-white/[0.035]
                border
                border-white/[0.06]
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
          {/* DATE / TIME */}

          <div
            className="
              p-5
              rounded-2xl
              bg-gradient-to-br
              from-[#10222A]
              to-[#0D1725]
              border
              border-[#18E0C4]/15
            "
          >
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >
              <Info
                icon={CalendarDays}
                label="Date"
                value={formatDate(
                  appointment.date
                )}
              />

              <Info
                icon={Clock3}
                label="Time"
                value={`${appointment.time} • ${appointment.duration}`}
              />

              <Info
                icon={UserRound}
                label="Customer"
                value={appointment.customer}
              />

              <Info
                icon={MapPin}
                label="Location"
                value={appointment.location}
              />
            </div>
          </div>

          {/* STATUS */}

          <DrawerSection
            icon={Check}
            title="Appointment Status"
          >
            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              {[
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled",
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    onUpdate(
                      appointment.id,
                      { status }
                    )
                  }
                  className={`
                    h-11
                    rounded-xl
                    border
                    text-sm
                    font-semibold
                    transition
                    ${
                      appointment.status ===
                      status
                        ? "bg-[#18E0C4]/10 border-[#18E0C4]/25 text-[#18E0C4]"
                        : "bg-white/[0.025] border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </DrawerSection>

          {/* CUSTOMER */}

          <DrawerSection
            icon={Users}
            title="Customer"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.02]
                border
                border-white/[0.06]
              "
            >
              <p
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {appointment.customer}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {appointment.phone}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    onToast(
                      "Calling customer..."
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    h-10
                    px-4
                    rounded-xl
                    bg-white/[0.035]
                    border
                    border-white/[0.07]
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
                    inline-flex
                    items-center
                    gap-2
                    h-10
                    px-4
                    rounded-xl
                    bg-white/[0.035]
                    border
                    border-white/[0.07]
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
            icon={CarIcon}
            title="Vehicle"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.02]
                border
                border-white/[0.06]
              "
            >
              <p
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {appointment.vehicle}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {appointment.type}
              </p>

              <p
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {appointment.notes}
              </p>
            </div>
          </DrawerSection>

          {/* ADVISOR */}

          <DrawerSection
            icon={UserRound}
            title="Assigned Advisor"
          >
            <div
              className="
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                bg-white/[0.02]
                border
                border-white/[0.06]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-11
                  h-11
                  rounded-xl
                  bg-[#18E0C4]/10
                  border
                  border-[#18E0C4]/15
                  text-sm
                  font-bold
                  text-[#18E0C4]
                "
              >
                {getInitials(
                  appointment.advisor
                )}
              </div>

              <div>
                <p
                  className="
                    text-base
                    font-semibold
                    text-white
                  "
                >
                  {appointment.advisor}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Sales Advisor
                </p>
              </div>
            </div>
          </DrawerSection>

          {/* ACTIONS */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              mt-8
              pt-6
              border-t
              border-white/[0.06]
            "
          >
            <button
              type="button"
              onClick={() =>
                onToast(
                  "Reminder sent to customer."
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-[#18E0C4]/10
                border
                border-[#18E0C4]/20
                text-sm
                font-semibold
                text-[#18E0C4]
                hover:bg-[#18E0C4]/15
                transition
              "
            >
              <MessageSquare size={16} />
              Send Reminder
            </button>

            <button
              type="button"
              onClick={() =>
                onToast(
                  "Reschedule options opened."
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-white/[0.035]
                border
                border-white/[0.07]
                text-sm
                font-semibold
                text-slate-300
                hover:text-white
                transition
              "
            >
              <Edit3 size={16} />
              Reschedule
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdate(
                  appointment.id,
                  { status: "Completed" }
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-green-500/10
                border
                border-green-500/20
                text-sm
                font-semibold
                text-green-400
                hover:bg-green-500/15
                transition
              "
            >
              <Check size={16} />
              Mark Completed
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdate(
                  appointment.id,
                  { status: "Cancelled" }
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-red-500/10
                border
                border-red-500/20
                text-sm
                font-semibold
                text-red-400
                hover:bg-red-500/15
                transition
              "
            >
              <X size={16} />
              Cancel Appointment
            </button>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

/* =========================================================
   ADD APPOINTMENT MODAL
========================================================= */

function AddAppointmentModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    customer: "",
    phone: "",
    vehicle: "",
    type: "Test Drive",
    date: "2026-08-21",
    time: "10:00 AM",
    advisor: "Rahul Kumar",
    location: "Hyderabad Showroom",
    priority: "Medium",
    notes: "",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  const submit = (event) => {
    event.preventDefault();

    if (!form.customer.trim()) {
      setError("Please enter the customer name.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Please enter the phone number.");
      return;
    }

    if (!form.vehicle.trim()) {
      setError("Please enter the vehicle.");
      return;
    }

    if (!form.date) {
      setError("Please select a date.");
      return;
    }

    const id = `APT-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const appointment = {
      id,
      title: `${form.vehicle} ${form.type}`,
      customer: form.customer.trim(),
      phone: form.phone.trim(),
      vehicle: form.vehicle.trim(),
      type: form.type,
      status: "Pending",
      date: form.date,
      time: form.time,
      duration:
        form.type === "Test Drive"
          ? "45 min"
          : form.type === "Delivery"
          ? "60 min"
          : "30 min",
      advisor: form.advisor,
      location: form.location,
      priority: form.priority,
      notes:
        form.notes.trim() ||
        "New appointment created manually.",
    };

    onAdd(appointment);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[400]
        flex
        items-center
        justify-center
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
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.08]
          shadow-2xl
        "
      >
        {/* Modal Header */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            px-6
            py-5
            bg-[#0D1725]/95
            backdrop-blur-xl
            border-b
            border-white/[0.06]
          "
        >
          <div>
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[#18E0C4]
              "
            >
              Scheduling
            </span>

            <h2
              className="
                mt-2
                text-xl
                font-bold
                text-white
              "
            >
              New Appointment
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Add a customer appointment to your schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.06]
              text-slate-400
              hover:text-white
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div
              className="
                mb-5
                p-4
                rounded-xl
                bg-red-500/10
                border
                border-red-500/20
                text-sm
                font-medium
                text-red-400
              "
            >
              {error}
            </div>
          )}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >
            <FormField
              label="Customer Name"
              value={form.customer}
              onChange={(value) =>
                update("customer", value)
              }
              placeholder="Enter customer name"
            />

            <FormField
              label="Phone Number"
              value={form.phone}
              onChange={(value) =>
                update("phone", value)
              }
              placeholder="+91 98765 43210"
            />

            <FormField
              label="Vehicle"
              value={form.vehicle}
              onChange={(value) =>
                update("vehicle", value)
              }
              placeholder="Toyota Fortuner"
            />

            <FormSelect
              label="Appointment Type"
              value={form.type}
              onChange={(value) =>
                update("type", value)
              }
              options={[
                "Test Drive",
                "Sales Meeting",
                "Follow-up",
                "Delivery",
                "Consultation",
                "Finance",
              ]}
            />

            <FormField
              label="Date"
              value={form.date}
              onChange={(value) =>
                update("date", value)
              }
              type="date"
            />

            <FormSelect
              label="Time"
              value={form.time}
              onChange={(value) =>
                update("time", value)
              }
              options={[
                "09:00 AM",
                "10:00 AM",
                "10:30 AM",
                "11:00 AM",
                "11:45 AM",
                "12:15 PM",
                "01:30 PM",
                "02:30 PM",
                "03:00 PM",
                "04:30 PM",
                "05:00 PM",
              ]}
            />

            <FormSelect
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
              ]}
            />

            <FormSelect
              label="Location"
              value={form.location}
              onChange={(value) =>
                update("location", value)
              }
              options={[
                "Hyderabad Showroom",
                "Sales Lounge",
                "Finance Desk",
                "Delivery Bay",
                "Phone",
              ]}
            />

            <FormSelect
              label="Priority"
              value={form.priority}
              onChange={(value) =>
                update("priority", value)
              }
              options={[
                "Low",
                "Medium",
                "High",
              ]}
            />

            <div className="md:col-span-2">
              <label className="block">
                <span
                  className="
                    block
                    mb-2
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >
                  Notes
                </span>

                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    update(
                      "notes",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Add appointment notes..."
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    bg-white/[0.025]
                    border
                    border-white/[0.07]
                    text-sm
                    leading-6
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    resize-none
                    focus:border-[#18E0C4]/40
                    transition
                  "
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}

        <div
          className="
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
            px-6
            py-5
            border-t
            border-white/[0.06]
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-11
              px-5
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.07]
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
            Create Appointment
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* =========================================================
   KPI
========================================================= */

function AppointmentKPI({
  icon: Icon,
  label,
  value,
  detail,
  accent = "cyan",
}) {
  const colors = {
    cyan:
      "bg-[#18E0C4]/10 text-[#18E0C4]",
    green:
      "bg-green-500/10 text-green-400",
    yellow:
      "bg-amber-500/10 text-amber-400",
    purple:
      "bg-violet-500/10 text-violet-400",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="
        p-5
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        border-white/[0.07]
      "
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            flex
            items-center
            justify-center
            w-11
            h-11
            rounded-xl
            ${colors[accent]}
          `}
        >
          <Icon size={19} />
        </div>

        <ArrowRight
          size={16}
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
          mt-2
          text-xs
          text-slate-600
        "
      >
        {detail}
      </p>
    </motion.div>
  );
}

/* =========================================================
   VIEW BUTTON
========================================================= */

function ViewButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        h-10
        px-5
        rounded-lg
        text-sm
        font-semibold
        transition
        ${
          active
            ? "bg-[#18E0C4]/10 text-[#18E0C4]"
            : "text-slate-500 hover:text-white"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =========================================================
   SELECT
========================================================= */

function AppointmentSelect({
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
          w-full
          lg:w-auto
          min-w-[180px]
          h-12
          px-4
          pr-10
          rounded-xl
          appearance-none
          bg-[#0D1725]
          border
          border-white/[0.07]
          text-sm
          font-medium
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
        size={16}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-500
          pointer-events-none
        "
      />
    </div>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusPill({ status }) {
  const styles = {
    Confirmed:
      "bg-green-500/10 text-green-400 border-green-500/20",
    Pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Completed:
      "bg-[#18E0C4]/10 text-[#18E0C4] border-[#18E0C4]/20",
    Cancelled:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-full
        border
        text-xs
        font-semibold
        whitespace-nowrap
        ${styles[status] || styles.Pending}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   META
========================================================= */

function Meta({
  icon: Icon,
  value,
}) {
  return (
    <span
      className="
        flex
        items-center
        gap-2
        text-sm
        text-slate-500
      "
    >
      <Icon
        size={15}
        className="shrink-0 text-slate-600"
      />

      <span>{value}</span>
    </span>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        p-4
        rounded-xl
        bg-white/[0.025]
        border
        border-white/[0.05]
      "
    >
      <div className="flex items-center gap-2">
        <Icon
          size={16}
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

      <p
        className="
          mt-2
          text-sm
          font-semibold
          leading-5
          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   DRAWER SECTION
========================================================= */

function DrawerSection({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="mt-7">
      <div
        className="
          flex
          items-center
          gap-2
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

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <label className="block">
      <span
        className="
          block
          mb-2
          text-sm
          font-semibold
          text-slate-300
        "
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          w-full
          h-12
          px-4
          rounded-xl
          bg-white/[0.025]
          border
          border-white/[0.07]
          text-sm
          text-white
          placeholder:text-slate-600
          outline-none
          focus:border-[#18E0C4]/40
          transition
        "
      />
    </label>
  );
}

/* =========================================================
   FORM SELECT
========================================================= */

function FormSelect({
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
          text-sm
          font-semibold
          text-slate-300
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
            h-12
            px-4
            pr-10
            rounded-xl
            appearance-none
            bg-white/[0.025]
            border
            border-white/[0.07]
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
          size={16}
          className="
            absolute
            right-4
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

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[300px]
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          w-14
          h-14
          rounded-2xl
          bg-white/[0.035]
          border
          border-white/[0.06]
        "
      >
        <CalendarDays
          size={24}
          className="text-slate-600"
        />
      </div>

      <h3
        className="
          mt-5
          text-lg
          font-semibold
          text-white
        "
      >
        No appointments found
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-6
          text-slate-500
        "
      >
        Try changing your search or filters, or create
        a new appointment.
      </p>
    </div>
  );
}

/* =========================================================
   CAR ICON
========================================================= */

function CarIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17h14" />
      <path d="M6 17l-1-5 2-5h10l2 5-1 5" />
      <path d="M7 12h10" />

      <circle
        cx="7"
        cy="17"
        r="1.5"
      />

      <circle
        cx="17"
        cy="17"
        r="1.5"
      />
    </svg>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function parseHour(time) {
  const [clock, modifier] = time.split(" ");

  let hour = Number(
    clock.split(":")[0]
  );

  if (
    modifier === "PM" &&
    hour !== 12
  ) {
    hour += 12;
  }

  if (
    modifier === "AM" &&
    hour === 12
  ) {
    hour = 0;
  }

  return hour;
}

function formatDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

function formatShortDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatInputDate(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
