import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Eye,
  Filter,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   CUSTOMER DATA
   ========================================================= */

const initialCustomers = [
  {
    id: "CUS-20481",
    name: "Arjun Mehta",
    initials: "AM",
    phone: "+91 98765 21480",
    email: "arjun.mehta@email.com",
    location: "Hyderabad",
    source: "Website",
    stage: "Hot",
    score: 94,
    interestedVehicle: "Toyota Fortuner",
    variant: "Legender 4x4 AT",
    budget: "₹45L – ₹52L",
    lastActivity: "2 hours ago",
    nextFollowUp: "Today, 6:00 PM",
    assignedTo: "Rahul Kumar",
    created: "12 Aug 2026",
    testDrives: 2,
    enquiries: 4,
    status: "Active",
    tags: ["SUV", "High Intent", "Finance"],
    notes:
      "Strong buying intent. Requested final pricing and finance options.",
    timeline: [
      {
        type: "Test Drive",
        title: "Completed Fortuner test drive",
        date: "Today, 10:30 AM",
        detail: "Rated experience 5/5.",
      },
      {
        type: "Message",
        title: "Pricing discussion",
        date: "Today, 12:15 PM",
        detail: "Customer requested final on-road price.",
      },
      {
        type: "Lead",
        title: "Lead qualified",
        date: "12 Aug 2026",
        detail: "AI score increased to 94.",
      },
    ],
  },
  {
    id: "CUS-20482",
    name: "Priya Sharma",
    initials: "PS",
    phone: "+91 91234 77890",
    email: "priya.sharma@email.com",
    location: "Banjara Hills",
    source: "Instagram",
    stage: "Warm",
    score: 78,
    interestedVehicle: "BMW X5",
    variant: "xDrive40i M Sport",
    budget: "₹75L – ₹90L",
    lastActivity: "35 min ago",
    nextFollowUp: "Today, 7:30 PM",
    assignedTo: "Ananya Rao",
    created: "15 Aug 2026",
    testDrives: 1,
    enquiries: 3,
    status: "Active",
    tags: ["Luxury", "SUV"],
    notes: "Comparing BMW X5 with Mercedes-Benz GLC.",
    timeline: [
      {
        type: "Enquiry",
        title: "Requested X5 quotation",
        date: "Today, 11:20 AM",
        detail: "Quotation shared through WhatsApp.",
      },
      {
        type: "Test Drive",
        title: "Test drive scheduled",
        date: "Today, 11:15 AM",
        detail: "Appointment confirmed.",
      },
      {
        type: "Lead",
        title: "Instagram lead created",
        date: "15 Aug 2026",
        detail: "Premium SUV enquiry.",
      },
    ],
  },
  {
    id: "CUS-20483",
    name: "Rohan Reddy",
    initials: "RR",
    phone: "+91 99887 44551",
    email: "rohan.reddy@email.com",
    location: "Secunderabad",
    source: "Walk-in",
    stage: "Hot",
    score: 88,
    interestedVehicle: "Hyundai Creta",
    variant: "SX(O) IVT",
    budget: "₹18L – ₹24L",
    lastActivity: "1 hour ago",
    nextFollowUp: "Tomorrow, 10:00 AM",
    assignedTo: "Karthik Reddy",
    created: "17 Aug 2026",
    testDrives: 1,
    enquiries: 2,
    status: "Active",
    tags: ["Family", "SUV"],
    notes: "Wants to finalize vehicle within this week.",
    timeline: [
      {
        type: "Test Drive",
        title: "Test drive confirmed",
        date: "Today, 12:30 PM",
        detail: "Appointment confirmed.",
      },
      {
        type: "Call",
        title: "Customer called dealership",
        date: "Today, 9:40 AM",
        detail: "Asked about exchange options.",
      },
    ],
  },
  {
    id: "CUS-20484",
    name: "Sneha Kapoor",
    initials: "SK",
    phone: "+91 90012 67231",
    email: "sneha.k@email.com",
    location: "Hyderabad",
    source: "Referral",
    stage: "Warm",
    score: 72,
    interestedVehicle: "Mercedes-Benz GLC",
    variant: "300 4MATIC AMG Line",
    budget: "₹60L – ₹75L",
    lastActivity: "Yesterday",
    nextFollowUp: "Today, 8:00 PM",
    assignedTo: "Meghana S",
    created: "10 Aug 2026",
    testDrives: 1,
    enquiries: 5,
    status: "Active",
    tags: ["Luxury", "ADAS"],
    notes: "Interested in ADAS and premium interior features.",
    timeline: [
      {
        type: "Enquiry",
        title: "Requested GLC features",
        date: "Yesterday",
        detail: "Interested in AMG package.",
      },
      {
        type: "Test Drive",
        title: "Test drive scheduled",
        date: "Today, 2:00 PM",
        detail: "Appointment pending.",
      },
    ],
  },
  {
    id: "CUS-20485",
    name: "Vikram Singh",
    initials: "VS",
    phone: "+91 98876 32109",
    email: "vikram.s@email.com",
    location: "Gachibowli",
    source: "Google",
    stage: "Cold",
    score: 39,
    interestedVehicle: "Audi Q5",
    variant: "Technology Pack",
    budget: "₹42L – ₹50L",
    lastActivity: "3 days ago",
    nextFollowUp: "Tomorrow",
    assignedTo: "Vivek Sharma",
    created: "4 Aug 2026",
    testDrives: 1,
    enquiries: 2,
    status: "Follow-up",
    tags: ["Premium"],
    notes: "Missed test drive. Needs re-engagement.",
    timeline: [
      {
        type: "No Show",
        title: "Missed Q5 test drive",
        date: "Today, 3:30 PM",
        detail: "No response after appointment.",
      },
      {
        type: "Lead",
        title: "Lead created",
        date: "4 Aug 2026",
        detail: "Google enquiry.",
      },
    ],
  },
  {
    id: "CUS-20486",
    name: "Neha Iyer",
    initials: "NI",
    phone: "+91 97654 11820",
    email: "neha.iyer@email.com",
    location: "Banjara Hills",
    source: "Website",
    stage: "Hot",
    score: 91,
    interestedVehicle: "Kia EV6",
    variant: "GT Line AWD",
    budget: "₹50L – ₹62L",
    lastActivity: "Yesterday",
    nextFollowUp: "Tomorrow, 9:00 AM",
    assignedTo: "Ananya Rao",
    created: "18 Aug 2026",
    testDrives: 1,
    enquiries: 3,
    status: "Active",
    tags: ["EV", "Premium", "High Intent"],
    notes: "Strong EV buyer. Asked for charging infrastructure details.",
    timeline: [
      {
        type: "Enquiry",
        title: "EV6 charging enquiry",
        date: "Yesterday",
        detail: "Asked about home charger installation.",
      },
      {
        type: "Test Drive",
        title: "EV6 test drive confirmed",
        date: "22 Aug 2026",
        detail: "60 minute appointment.",
      },
    ],
  },
  {
    id: "CUS-20487",
    name: "Aditya Rao",
    initials: "AR",
    phone: "+91 90123 55487",
    email: "aditya.rao@email.com",
    location: "Secunderabad",
    source: "Facebook",
    stage: "Warm",
    score: 69,
    interestedVehicle: "Toyota Camry",
    variant: "Hybrid",
    budget: "₹40L – ₹50L",
    lastActivity: "2 days ago",
    nextFollowUp: "Tomorrow, 11:00 AM",
    assignedTo: "Karthik Reddy",
    created: "14 Aug 2026",
    testDrives: 1,
    enquiries: 2,
    status: "Active",
    tags: ["Hybrid", "Sedan"],
    notes: "Interested in long-term fuel economy.",
    timeline: [
      {
        type: "Test Drive",
        title: "Camry test drive scheduled",
        date: "22 Aug 2026",
        detail: "Appointment confirmed.",
      },
      {
        type: "Message",
        title: "Ownership cost discussion",
        date: "20 Aug 2026",
        detail: "Shared hybrid maintenance information.",
      },
    ],
  },
  {
    id: "CUS-20488",
    name: "Meera Nair",
    initials: "MN",
    phone: "+91 93456 88021",
    email: "meera.nair@email.com",
    location: "Hyderabad",
    source: "Website",
    stage: "Warm",
    score: 81,
    interestedVehicle: "Skoda Kodiaq",
    variant: "L&K 2.0 TSI",
    budget: "₹35L – ₹43L",
    lastActivity: "Today",
    nextFollowUp: "Tomorrow, 5:30 PM",
    assignedTo: "Rahul Kumar",
    created: "9 Aug 2026",
    testDrives: 2,
    enquiries: 4,
    status: "Active",
    tags: ["Family", "7 Seater"],
    notes: "Comparing Kodiaq and Fortuner for family use.",
    timeline: [
      {
        type: "Test Drive",
        title: "Kodiaq test drive completed",
        date: "22 Aug 2026",
        detail: "Rated experience 4/5.",
      },
      {
        type: "Message",
        title: "Comparison requested",
        date: "Today",
        detail: "Requested Kodiaq vs Fortuner comparison.",
      },
    ],
  },
];

/* =========================================================
   MAIN CUSTOMERS PAGE
   ========================================================= */

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [source, setSource] = useState("All");
  const [assignedTo, setAssignedTo] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__customerToastTimer);

    window.__customerToastTimer = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.interestedVehicle.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query);

      const matchesStage =
        stage === "All" || customer.stage === stage;

      const matchesSource =
        source === "All" || customer.source === source;

      const matchesAssigned =
        assignedTo === "All" ||
        customer.assignedTo === assignedTo;

      return (
        matchesSearch &&
        matchesStage &&
        matchesSource &&
        matchesAssigned
      );
    });
  }, [customers, search, stage, source, assignedTo]);

  const totalCustomers = customers.length;

  const hotLeads = customers.filter(
    (customer) => customer.stage === "Hot"
  ).length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const averageScore = customers.length
    ? Math.round(
        customers.reduce(
          (sum, customer) => sum + customer.score,
          0
        ) / customers.length
      )
    : 0;

  const updateCustomer = (id, changes) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? { ...customer, ...changes }
          : customer
      )
    );

    setSelectedCustomer((current) =>
      current
        ? { ...current, ...changes }
        : null
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStage("All");
    setSource("All");
    setAssignedTo("All");
  };

  return (
    <div className="w-full min-h-full pb-10">

      {/* =====================================================
          HEADER
          ===================================================== */}

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
          <div className="flex items-center gap-2">
            <Users
              size={17}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.16em]
                font-semibold
                text-[#18E0C4]
              "
            >
              Customer Relationship Management
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
            Customers
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              max-w-2xl
            "
          >
            Build relationships, manage leads and turn
            customer intent into dealership revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            type="button"
            onClick={() =>
              showToast("Customer database refreshed.")
            }
            className="
              flex items-center gap-2
              h-10 px-4
              rounded-xl
              bg-white/[0.03]
              border border-white/[0.07]
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
            onClick={() =>
              showToast("Customer import workflow opened.")
            }
            className="
              flex items-center gap-2
              h-10 px-4
              rounded-xl
              bg-white/[0.03]
              border border-white/[0.07]
              text-sm font-semibold
              text-slate-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            <Send size={15} />
            Import
          </button>

          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="
              flex items-center gap-2
              h-10 px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm font-bold
              text-[#031014]
              shadow-[0_8px_30px_rgba(24,224,196,0.16)]
              hover:brightness-110
              transition
            "
          >
            <Plus size={16} />
            Add Customer
          </button>

        </div>
      </motion.div>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2
          xl:grid-cols-4
          gap-4 mb-5
        "
      >
        <CustomerKPI
          icon={Users}
          label="Total Customers"
          value={totalCustomers}
          detail="CRM records"
        />

        <CustomerKPI
          icon={Sparkles}
          label="Hot Leads"
          value={hotLeads}
          detail="High purchase intent"
          accent="purple"
        />

        <CustomerKPI
          icon={ArrowUpRight}
          label="Active Customers"
          value={activeCustomers}
          detail="Currently engaged"
          accent="green"
        />

        <CustomerKPI
          icon={GaugeIcon}
          label="Average Lead Score"
          value={averageScore}
          detail="AI qualification score"
          accent="blue"
        />
      </div>

      {/* =====================================================
          AI INSIGHT
          ===================================================== */}

      <section
        className="
          relative overflow-hidden
          p-5 mb-5
          rounded-2xl
          bg-gradient-to-r
          from-[#121D2D]
          via-[#16152A]
          to-[#0D1725]
          border border-[#A78BFA]/15
        "
      >
        <div
          className="
            flex flex-col lg:flex-row
            lg:items-center lg:justify-between
            gap-5
          "
        >
          <div className="flex items-start gap-4">

            <div
              className="
                flex items-center justify-center
                w-11 h-11 shrink-0
                rounded-xl
                bg-[#A78BFA]/10
                border border-[#A78BFA]/15
              "
            >
              <Sparkles
                size={19}
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
                AI CRM Insight
              </p>

              <p
                className="
                  mt-1
                  max-w-3xl
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {hotLeads} customers currently have high
                purchase intent. Prioritize personalized
                follow-ups today to maximize conversion
                probability.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              showToast("Priority follow-up queue created.")
            }
            className="
              flex items-center justify-center gap-2
              h-10 px-4
              rounded-xl
              bg-[#A78BFA]/10
              border border-[#A78BFA]/15
              text-sm font-semibold
              text-[#C4B5FD]
              hover:bg-[#A78BFA]/15
              transition
            "
          >
            View Priority Leads
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* =====================================================
          SEARCH + FILTER TOOLBAR
          ===================================================== */}

      <section
        className="
          flex flex-col xl:flex-row
          gap-3 mb-5
        "
      >
        <div className="relative flex-1">

          <Search
            size={17}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-600
            "
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="
              Search name, phone, email, vehicle or customer ID...
            "
            className="
              w-full h-11
              pl-11 pr-4
              rounded-xl
              bg-[#0D1725]
              border border-white/[0.07]
              outline-none
              text-sm
              text-white
              placeholder:text-slate-600
              focus:border-[#18E0C4]/30
              focus:ring-2
              focus:ring-[#18E0C4]/5
              transition
            "
          />

        </div>

        <div className="flex flex-wrap gap-2">

          <CustomerSelect
            value={stage}
            onChange={setStage}
            options={[
              "All",
              "Hot",
              "Warm",
              "Cold",
            ]}
          />

          <CustomerSelect
            value={source}
            onChange={setSource}
            options={[
              "All",
              "Website",
              "Instagram",
              "Facebook",
              "Google",
              "Walk-in",
              "Referral",
            ]}
          />

          <CustomerSelect
            value={assignedTo}
            onChange={setAssignedTo}
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
              setShowFilters((value) => !value)
            }
            className={`
              flex items-center justify-center
              w-11 h-11
              rounded-xl
              border
              transition
              ${
                showFilters
                  ? "bg-[#18E0C4]/10 border-[#18E0C4]/20 text-[#18E0C4]"
                  : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-white"
              }
            `}
          >
            <SlidersHorizontal size={16} />
          </button>

        </div>
      </section>

      {/* =====================================================
          ADVANCED FILTERS
          ===================================================== */}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-5"
          >
            <div
              className="
                grid grid-cols-1
                md:grid-cols-3
                gap-4
                p-5
                rounded-2xl
                bg-[#0D1725]
                border border-white/[0.07]
              "
            >
              <FilterItem
                icon={Tag}
                label="Customer Segment"
                value="All segments"
              />

              <FilterItem
                icon={CarFront}
                label="Vehicle Interest"
                value="All vehicles"
              />

              <FilterItem
                icon={CalendarDays}
                label="Last Activity"
                value="Any time"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          CUSTOMER PIPELINE HEADER
          ===================================================== */}

      <div
        className="
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2 mb-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-bold
              text-white
            "
          >
            Customer Pipeline
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredCustomers.length} customer records
          </p>
        </div>

        <span
          className="
            text-xs
            font-medium
            text-slate-600
          "
        >
          Sorted by latest activity
        </span>
      </div>

      {/* =====================================================
          CUSTOMER CARDS
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-4
        "
      >
        {filteredCustomers.map(
          (customer, index) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              index={index}
              onOpen={() =>
                setSelectedCustomer(customer)
              }
            />
          )
        )}
      </div>

      {filteredCustomers.length === 0 && (
        <EmptyCustomers
          onClear={clearFilters}
        />
      )}

      {/* =====================================================
          CUSTOMER DRAWER
          ===================================================== */}

      <AnimatePresence>
        {selectedCustomer && (
          <CustomerDrawer
            customer={selectedCustomer}
            onClose={() =>
              setSelectedCustomer(null)
            }
            onUpdate={updateCustomer}
            onToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          ADD CUSTOMER MODAL
          ===================================================== */}

      <AnimatePresence>
        {showAdd && (
          <AddCustomerModal
            onClose={() =>
              setShowAdd(false)
            }
            onAdd={(customer) => {
              setCustomers((current) => [
                customer,
                ...current,
              ]);

              setShowAdd(false);

              showToast(
                "Customer added successfully."
              );
            }}
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          TOAST
          ===================================================== */}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="
              fixed
              right-5 bottom-5
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

/* =========================================================
   KPI CARD
   ========================================================= */

function CustomerKPI({
  icon: Icon,
  label,
  value,
  detail,
  accent = "cyan",
}) {
  const colors = {
    cyan: {
      bg: "bg-[#18E0C4]/10",
      text: "text-[#18E0C4]",
    },
    purple: {
      bg: "bg-[#8B5CF6]/10",
      text: "text-[#A78BFA]",
    },
    green: {
      bg: "bg-[#22C55E]/10",
      text: "text-[#4ADE80]",
    },
    blue: {
      bg: "bg-[#3B82F6]/10",
      text: "text-[#60A5FA]",
    },
  };

  const current = colors[accent];

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
        transition
      "
    >
      <div className="flex items-center justify-between">

        <div
          className={`
            flex items-center justify-center
            w-11 h-11
            rounded-xl
            ${current.bg}
          `}
        >
          <Icon
            size={18}
            className={current.text}
          />
        </div>

        <ArrowUpRight
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
   CUSTOMER CARD
   ========================================================= */

function CustomerCard({
  customer,
  index,
  onOpen,
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      whileHover={{
        y: -3,
      }}
      className="
        group
        p-5
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border border-white/[0.07]
        hover:border-white/[0.11]
        transition
      "
    >

      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex items-center
            gap-3
            min-w-0
          "
        >

          <div
            className="
              flex items-center justify-center
              w-12 h-12
              shrink-0
              rounded-xl
              bg-gradient-to-br
              from-[#18E0C4]/10
              to-[#28D7FF]/5
              border border-[#18E0C4]/15
              text-sm
              font-bold
              text-[#18E0C4]
            "
          >
            {customer.initials}
          </div>

          <div className="min-w-0">

            <div
              className="
                flex flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  text-base
                  font-bold
                  text-white
                  group-hover:text-[#18E0C4]
                  transition
                "
              >
                {customer.name}
              </h3>

              <LeadStage
                stage={customer.stage}
              />
            </div>

            <p
              className="
                mt-1
                text-xs
                font-medium
                text-slate-600
              "
            >
              {customer.id}
            </p>

          </div>
        </div>

        <div
          className="
            flex items-center
            gap-3
            shrink-0
          "
        >
          <div className="text-right">
            <p
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {customer.score}
            </p>

            <p
              className="
                text-[10px]
                uppercase
                tracking-wider
                text-slate-600
              "
            >
              AI Score
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="
              flex items-center justify-center
              w-9 h-9
              rounded-xl
              bg-white/[0.03]
              text-slate-500
              hover:bg-[#18E0C4]/10
              hover:text-[#18E0C4]
              transition
            "
            aria-label={`Open ${customer.name}`}
          >
            <ArrowRight size={15} />
          </button>
        </div>

      </div>

      {/* CONTACT */}

      <div
        className="
          grid
          grid-cols-1 sm:grid-cols-2
          gap-3
          mt-5
        "
      >
        <ContactItem
          icon={Phone}
          label="Phone"
          value={customer.phone}
        />

        <ContactItem
          icon={Mail}
          label="Email"
          value={customer.email}
        />
      </div>

      {/* VEHICLE */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mt-4
          p-4
          rounded-xl
          bg-white/[0.02]
          border border-white/[0.05]
        "
      >

        <div
          className="
            flex items-center
            gap-3
            min-w-0
          "
        >

          <div
            className="
              flex items-center justify-center
              w-10 h-10
              shrink-0
              rounded-xl
              bg-[#18E0C4]/10
            "
          >
            <CarFront
              size={17}
              className="text-[#18E0C4]"
            />
          </div>

          <div className="min-w-0">

            <p
              className="
                text-sm
                font-bold
                text-slate-200
                truncate
              "
            >
              {customer.interestedVehicle}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
                truncate
              "
            >
              {customer.variant}
            </p>

          </div>

        </div>

        <div className="text-right shrink-0">

          <p
            className="
              text-[10px]
              uppercase
              tracking-wider
              text-slate-600
            "
          >
            Budget
          </p>

          <p
            className="
              mt-1
              text-sm
              font-semibold
              text-slate-300
            "
          >
            {customer.budget}
          </p>

        </div>

      </div>

      {/* BOTTOM */}

      <div
        className="
          flex flex-wrap
          items-center
          justify-between
          gap-3
          mt-5
          pt-4
          border-t
          border-white/[0.05]
        "
      >

        <div className="flex flex-wrap gap-2">

          {customer.tags.slice(0, 3).map(
            (tag) => (
              <span
                key={tag}
                className="
                  px-2.5 py-1
                  rounded-lg
                  bg-white/[0.03]
                  border border-white/[0.05]
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                {tag}
              </span>
            )
          )}

        </div>

        <div
          className="
            flex items-center
            gap-2
            text-xs
            text-slate-600
          "
        >
          <Clock3 size={13} />
          {customer.lastActivity}
        </div>

      </div>

    </motion.article>
  );
}

/* =========================================================
   CONTACT ITEM
   ========================================================= */

function ContactItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        gap-3
        min-w-0
        p-3
        rounded-xl
        bg-white/[0.018]
        border border-white/[0.04]
      "
    >
      <div
        className="
          flex items-center justify-center
          w-8 h-8
          shrink-0
          rounded-lg
          bg-white/[0.03]
        "
      >
        <Icon
          size={14}
          className="text-slate-500"
        />
      </div>

      <div className="min-w-0">

        <p
          className="
            text-[10px]
            uppercase
            tracking-wider
            text-slate-600
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            text-xs
            font-medium
            text-slate-400
            truncate
          "
        >
          {value}
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   LEAD STAGE
   ========================================================= */

function LeadStage({ stage }) {
  const styles = {
    Hot: "bg-red-500/10 text-red-400 border-red-500/20",
    Warm: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Cold: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5 py-1
        rounded-full
        border
        text-[11px]
        font-bold
        ${styles[stage] || styles.Cold}
      `}
    >
      {stage}
    </span>
  );
}

/* =========================================================
   CUSTOMER DRAWER
   ========================================================= */

function CustomerDrawer({
  customer,
  onClose,
  onUpdate,
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
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
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
          w-full sm:max-w-[620px]
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
            p-5
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

            <div
              className="
                flex items-center
                gap-4
              "
            >

              <div
                className="
                  flex items-center justify-center
                  w-14 h-14
                  rounded-xl
                  bg-gradient-to-br
                  from-[#18E0C4]/10
                  to-[#28D7FF]/5
                  border border-[#18E0C4]/15
                  text-base
                  font-bold
                  text-[#18E0C4]
                "
              >
                {customer.initials}
              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {customer.name}
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-600
                  "
                >
                  {customer.id} • {customer.location}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex items-center justify-center
                w-9 h-9
                rounded-xl
                bg-white/[0.03]
                text-slate-500
                hover:text-white
                transition
              "
            >
              <X size={17} />
            </button>

          </div>
        </div>

        <div className="p-5">

          {/* LEAD SCORE */}

          <section
            className="
              p-5
              rounded-2xl
              bg-gradient-to-br
              from-[#10222A]
              to-[#0D1725]
              border border-[#18E0C4]/10
            "
          >

            <div
              className="
                flex items-center
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-600
                  "
                >
                  AI Lead Score
                </p>

                <p
                  className="
                    mt-1
                    text-4xl
                    font-bold
                    text-white
                  "
                >
                  {customer.score}
                  <span
                    className="
                      ml-1
                      text-sm
                      text-slate-600
                    "
                  >
                    /100
                  </span>
                </p>

              </div>

              <LeadStage
                stage={customer.stage}
              />

            </div>

            <div
              className="
                h-2
                mt-5
                rounded-full
                bg-white/[0.05]
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-[#18E0C4]
                  to-[#28D7FF]
                  transition-all
                "
                style={{
                  width: `${customer.score}%`,
                }}
              />
            </div>

            <p
              className="
                mt-4
                text-sm
                leading-6
                text-slate-500
              "
            >
              {customer.score >= 85
                ? "Very high purchase intent. Immediate personalized follow-up recommended."
                : customer.score >= 65
                ? "Good purchase potential. Consistent follow-up recommended."
                : "Customer needs re-engagement before the next sales step."}
            </p>

          </section>

          {/* CONTACT INFORMATION */}

          <DrawerSection
            icon={UserRound}
            title="Contact Information"
          >

            <div
              className="
                grid grid-cols-1 sm:grid-cols-2
                gap-3
              "
            >

              <InfoCell
                label="Phone"
                value={customer.phone}
              />

              <InfoCell
                label="Email"
                value={customer.email}
              />

              <InfoCell
                label="Location"
                value={customer.location}
              />

              <InfoCell
                label="Lead Source"
                value={customer.source}
              />

              <InfoCell
                label="Created"
                value={customer.created}
              />

              <InfoCell
                label="Assigned To"
                value={customer.assignedTo}
              />

            </div>

            <div
              className="
                grid grid-cols-3
                gap-2
                mt-4
              "
            >

              <ActionButton
                icon={Phone}
                label="Call"
                onClick={() =>
                  onToast("Calling customer...")
                }
              />

              <ActionButton
                icon={MessageSquare}
                label="WhatsApp"
                onClick={() =>
                  onToast(
                    "WhatsApp composer opened."
                  )
                }
              />

              <ActionButton
                icon={Mail}
                label="Email"
                onClick={() =>
                  onToast(
                    "Email composer opened."
                  )
                }
              />

            </div>

          </DrawerSection>

          {/* VEHICLE INTEREST */}

          <DrawerSection
            icon={CarFront}
            title="Vehicle Interest"
          >

            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.05]
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

                  <p
                    className="
                      text-base
                      font-bold
                      text-white
                    "
                  >
                    {customer.interestedVehicle}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {customer.variant}
                  </p>

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#18E0C4]"
                />

              </div>

              <div
                className="
                  grid grid-cols-2
                  gap-3
                  mt-5
                "
              >

                <InfoCell
                  label="Budget"
                  value={customer.budget}
                />

                <InfoCell
                  label="Test Drives"
                  value={customer.testDrives}
                />

                <InfoCell
                  label="Enquiries"
                  value={customer.enquiries}
                />

                <InfoCell
                  label="Status"
                  value={customer.status}
                />

              </div>

            </div>

          </DrawerSection>

          {/* RECOMMENDED ACTION */}

          <DrawerSection
            icon={Sparkles}
            title="Recommended Next Action"
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
                  size={15}
                  className="text-[#A78BFA]"
                />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#C4B5FD]
                  "
                >
                  AI Recommendation
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
                {customer.stage === "Hot"
                  ? "Contact this customer today with personalized pricing, finance options and a clear purchase timeline."
                  : customer.stage === "Warm"
                  ? "Share useful vehicle information and schedule a personalized follow-up within 24 hours."
                  : "Re-engage with a personalized message focused on the customer's original vehicle requirement."}
              </p>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    "Follow-up task created."
                  )
                }
                className="
                  flex items-center gap-2
                  mt-4
                  h-10 px-4
                  rounded-xl
                  bg-[#A78BFA]/10
                  border border-[#A78BFA]/15
                  text-sm
                  font-semibold
                  text-[#C4B5FD]
                  hover:bg-[#A78BFA]/15
                  transition
                "
              >
                <Check size={15} />
                Create Follow-up
              </button>

            </div>

          </DrawerSection>

          {/* CUSTOMER JOURNEY */}

          <DrawerSection
            icon={Clock3}
            title="Customer Journey"
          >

            <div className="relative ml-1">

              <div
                className="
                  absolute
                  left-[5px]
                  top-2 bottom-2
                  w-px
                  bg-white/[0.07]
                "
              />

              <div className="space-y-7">

                {customer.timeline.map(
                  (event, index) => (
                    <div
                      key={`${event.title}-${index}`}
                      className="
                        relative
                        pl-7
                      "
                    >

                      <span
                        className="
                          absolute
                          left-0 top-1.5
                          w-3 h-3
                          rounded-full
                          bg-[#18E0C4]
                          ring-4
                          ring-[#09111D]
                        "
                      />

                      <div
                        className="
                          flex items-start
                          justify-between
                          gap-4
                        "
                      >

                        <div>

                          <p
                            className="
                              text-sm
                              font-semibold
                              text-slate-300
                            "
                          >
                            {event.title}
                          </p>

                          <p
                            className="
                              mt-1
                              text-xs
                              leading-5
                              text-slate-600
                            "
                          >
                            {event.detail}
                          </p>

                        </div>

                        <span
                          className="
                            shrink-0
                            text-xs
                            text-slate-700
                          "
                        >
                          {event.date}
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </DrawerSection>

          {/* NOTES */}

          <DrawerSection
            icon={MessageSquare}
            title="Sales Notes"
          >

            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.02]
                border border-white/[0.05]
              "
            >

              <p
                className="
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {customer.notes}
              </p>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    "Notes editor opened."
                  )
                }
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-[#18E0C4]
                  hover:text-[#28D7FF]
                "
              >
                Edit Notes
              </button>

            </div>

          </DrawerSection>

          {/* ACTIONS */}

          <div
            className="
              grid grid-cols-1 sm:grid-cols-2
              gap-3
              mt-7 pt-5
              border-t border-white/[0.05]
            "
          >

            <button
              type="button"
              onClick={() => {
                const nextStage =
                  customer.stage === "Hot"
                    ? "Warm"
                    : customer.stage === "Warm"
                    ? "Cold"
                    : "Hot";

                onUpdate(
                  customer.id,
                  { stage: nextStage }
                );

                onToast(
                  `Lead stage changed to ${nextStage}.`
                );
              }}
              className="
                flex items-center
                justify-center gap-2
                h-11
                rounded-xl
                bg-[#18E0C4]/10
                border border-[#18E0C4]/15
                text-sm
                font-semibold
                text-[#18E0C4]
                hover:bg-[#18E0C4]/15
                transition
              "
            >
              <Sparkles size={15} />
              Change Lead Stage
            </button>

            <button
              type="button"
              onClick={() =>
                onToast(
                  "Appointment workflow opened."
                )
              }
              className="
                flex items-center
                justify-center gap-2
                h-11
                rounded-xl
                bg-white/[0.03]
                border border-white/[0.07]
                text-sm
                font-semibold
                text-slate-400
                hover:text-white
                transition
              "
            >
              <CalendarDays size={15} />
              Schedule Drive
            </button>

          </div>

        </div>

      </motion.aside>
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
          flex items-center
          gap-2
          mb-3
        "
      >

        <Icon
          size={15}
          className="text-[#18E0C4]"
        />

        <h3
          className="
            text-sm
            font-bold
            text-white
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
   INFO CELL
   ========================================================= */

function InfoCell({
  label,
  value,
}) {
  return (
    <div
      className="
        p-3.5
        rounded-xl
        bg-white/[0.02]
        border border-white/[0.04]
      "
    >

      <p
        className="
          text-[10px]
          uppercase
          tracking-wider
          font-semibold
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-sm
          font-medium
          text-slate-300
          break-words
        "
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   ACTION BUTTON
   ========================================================= */

function ActionButton({
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex flex-col
        items-center
        justify-center
        gap-1.5
        min-h-[68px]
        rounded-xl
        bg-white/[0.025]
        border border-white/[0.06]
        text-slate-400
        hover:bg-[#18E0C4]/10
        hover:border-[#18E0C4]/15
        hover:text-[#18E0C4]
        transition
      "
    >
      <Icon size={16} />

      <span
        className="
          text-xs
          font-semibold
        "
      >
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   ADD CUSTOMER MODAL
   ========================================================= */

function AddCustomerModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    variant: "",
    budget: "",
    location: "",
    source: "Website",
    assignedTo: "Rahul Kumar",
  });

  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.vehicle.trim()
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    const initials = form.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const newCustomer = {
      id: `CUS-${20489 + Math.floor(Math.random() * 1000)}`,
      name: form.name.trim(),
      initials,
      phone: form.phone.trim(),
      email: form.email.trim(),
      location:
        form.location.trim() || "Hyderabad",
      source: form.source,
      stage: "Warm",
      score: 65,
      interestedVehicle:
        form.vehicle.trim(),
      variant:
        form.variant.trim() || "Standard",
      budget:
        form.budget.trim() || "Not specified",
      lastActivity: "Just now",
      nextFollowUp: "Not scheduled",
      assignedTo: form.assignedTo,
      created: "21 Aug 2026",
      testDrives: 0,
      enquiries: 1,
      status: "Active",
      tags: ["New Lead"],
      notes:
        "New customer added through CRM.",
      timeline: [
        {
          type: "Lead",
          title: "Customer added",
          date: "Just now",
          detail:
            "Customer record created successfully.",
        },
      ],
    };

    onAdd(newCustomer);
  };

  return (
    <div
      className="
        fixed inset-0
        z-[250]
        flex items-center
        justify-center
        p-4
        bg-black/75
        backdrop-blur-sm
      "
      onClick={onClose}
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-[#0D1725]
          border border-white/[0.08]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        "
      >

        {/* MODAL HEADER */}

        <div
          className="
            sticky top-0 z-10
            flex items-center
            justify-between
            p-5
            bg-[#0D1725]/95
            backdrop-blur-xl
            border-b border-white/[0.06]
          "
        >

          <div>
            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              Add Customer
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Create a new customer CRM record.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center
              justify-center
              w-9 h-9
              rounded-xl
              bg-white/[0.03]
              text-slate-500
              hover:text-white
            "
          >
            <X size={17} />
          </button>

        </div>

        <form
          onSubmit={submit}
          className="p-5"
        >

          {error && (
            <div
              className="
                flex items-center
                gap-2
                p-3.5 mb-5
                rounded-xl
                bg-red-500/10
                border border-red-500/15
                text-sm
                text-red-400
              "
            >
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >

            <FormField
              label="Customer Name *"
              value={form.name}
              onChange={(value) =>
                update("name", value)
              }
              placeholder="Enter customer name"
            />

            <FormField
              label="Phone Number *"
              value={form.phone}
              onChange={(value) =>
                update("phone", value)
              }
              placeholder="+91 XXXXX XXXXX"
            />

            <FormField
              label="Email Address *"
              value={form.email}
              onChange={(value) =>
                update("email", value)
              }
              placeholder="customer@email.com"
            />

            <FormField
              label="Vehicle Interest *"
              value={form.vehicle}
              onChange={(value) =>
                update("vehicle", value)
              }
              placeholder="e.g. Toyota Fortuner"
            />

            <FormField
              label="Variant"
              value={form.variant}
              onChange={(value) =>
                update("variant", value)
              }
              placeholder="e.g. Legender 4x4 AT"
            />

            <FormField
              label="Budget"
              value={form.budget}
              onChange={(value) =>
                update("budget", value)
              }
              placeholder="e.g. ₹40L – ₹50L"
            />

            <FormField
              label="Location"
              value={form.location}
              onChange={(value) =>
                update("location", value)
              }
              placeholder="e.g. Hyderabad"
            />

            <SelectField
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

            <SelectField
              label="Assigned To"
              value={form.assignedTo}
              onChange={(value) =>
                update("assignedTo", value)
              }
              options={[
                "Rahul Kumar",
                "Ananya Rao",
                "Karthik Reddy",
                "Meghana S",
                "Vivek Sharma",
              ]}
            />

          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              mt-7 pt-5
              border-t border-white/[0.06]
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
                text-slate-400
                hover:text-white
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex items-center
                gap-2
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
              "
            >
              <Plus size={16} />
              Add Customer
            </button>

          </div>

        </form>

      </motion.div>
    </div>
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

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          w-full
          h-11
          px-3.5
          rounded-xl
          bg-[#09111D]
          border border-white/[0.07]
          outline-none
          text-sm
          text-white
          placeholder:text-slate-700
          focus:border-[#18E0C4]/30
          focus:ring-2
          focus:ring-[#18E0C4]/5
        "
      />

    </label>
  );
}

/* =========================================================
   SELECT FIELD
   ========================================================= */

function SelectField({
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
            appearance-none
            w-full
            h-11
            px-3.5 pr-10
            rounded-xl
            bg-[#09111D]
            border border-white/[0.07]
            outline-none
            text-sm
            text-white
            focus:border-[#18E0C4]/30
            focus:ring-2
            focus:ring-[#18E0C4]/5
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#09111D]"
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
            pointer-events-none
            text-slate-600
          "
        />

      </div>

    </label>
  );
}

/* =========================================================
   CUSTOMER SELECT
   ========================================================= */

function CustomerSelect({
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
          appearance-none
          h-11
          min-w-[145px]
          px-4 pr-9
          rounded-xl
          bg-[#0D1725]
          border border-white/[0.07]
          outline-none
          text-sm
          font-medium
          text-slate-300
          cursor-pointer
          focus:border-[#18E0C4]/25
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
        size={14}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          pointer-events-none
          text-slate-600
        "
      />

    </div>
  );
}

/* =========================================================
   FILTER ITEM
   ========================================================= */

function FilterItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        gap-3
        p-4
        rounded-xl
        bg-white/[0.02]
        border border-white/[0.05]
      "
    >

      <div
        className="
          flex items-center
          justify-center
          w-10 h-10
          rounded-xl
          bg-white/[0.03]
        "
      >
        <Icon
          size={16}
          className="text-slate-500"
        />
      </div>

      <div>

        <p
          className="
            text-xs
            font-semibold
            text-slate-600
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-semibold
            text-slate-300
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   EMPTY STATE
   ========================================================= */

function EmptyCustomers({
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

      <div
        className="
          flex items-center
          justify-center
          w-14 h-14
          rounded-2xl
          bg-white/[0.03]
        "
      >
        <Users
          size={26}
          className="text-slate-700"
        />
      </div>

      <p
        className="
          mt-5
          text-lg
          font-bold
          text-slate-300
        "
      >
        No Customers Found
      </p>

      <p
        className="
          mt-2
          text-sm
          text-slate-600
        "
      >
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          h-10
          px-4
          rounded-xl
          bg-[#18E0C4]/10
          border border-[#18E0C4]/15
          text-sm
          font-semibold
          text-[#18E0C4]
          hover:bg-[#18E0C4]/15
        "
      >
        Clear Filters
      </button>

    </div>
  );
}

/* =========================================================
   GAUGE ICON
   ========================================================= */

function GaugeIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 14l4-4" />
      <path d="M20.4 15a8.5 8.5 0 1 0-16.8 0" />
      <path d="M5 18h14" />
    </svg>
  );
}
