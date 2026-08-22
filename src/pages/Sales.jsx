import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

/* ============================================================
   DEAL DATA
   ============================================================ */

const initialDeals = [
  {
    id: "DEAL-24081",
    customer: "Arjun Mehta",
    customerId: "CUS-20481",
    initials: "AM",
    vehicle: "Toyota Fortuner",
    variant: "Legender 4x4 AT",
    stockNo: "INV-FTN-001",
    amount: 5220000,
    stage: "Negotiation",
    probability: 80,
    source: "Website",
    advisor: "Rahul Kumar",
    created: "12 Aug 2026",
    lastActivity: "2 hours ago",
    nextAction: "Send final quotation",
    payment: 0,
    finance: true,
    exchange: true,
    notes:
      "Customer requested final on-road pricing and finance options.",
    timeline: [
      {
        title: "Test drive completed",
        date: "Today, 10:30 AM",
      },
      {
        title: "Quotation requested",
        date: "Today, 12:15 PM",
      },
      {
        title: "Negotiation started",
        date: "Today, 1:10 PM",
      },
    ],
  },

  {
    id: "DEAL-24082",
    customer: "Priya Sharma",
    customerId: "CUS-20482",
    initials: "PS",
    vehicle: "BMW X5",
    variant: "xDrive40i M Sport",
    stockNo: "INV-BMW-002",
    amount: 8980000,
    stage: "Quotation",
    probability: 65,
    source: "Instagram",
    advisor: "Ananya Rao",
    created: "15 Aug 2026",
    lastActivity: "35 min ago",
    nextAction: "Follow up on quotation",
    payment: 0,
    finance: true,
    exchange: false,
    notes:
      "Customer comparing BMW X5 with Mercedes-Benz GLC.",
    timeline: [
      {
        title: "Lead qualified",
        date: "15 Aug 2026",
      },
      {
        title: "Test drive completed",
        date: "Today, 11:15 AM",
      },
      {
        title: "Quotation sent",
        date: "Today, 11:20 AM",
      },
    ],
  },

  {
    id: "DEAL-24083",
    customer: "Rohan Reddy",
    customerId: "CUS-20483",
    initials: "RR",
    vehicle: "Hyundai Creta",
    variant: "SX(O) IVT",
    stockNo: "INV-HYN-003",
    amount: 2310000,
    stage: "Closed Won",
    probability: 100,
    source: "Walk-in",
    advisor: "Karthik Reddy",
    created: "17 Aug 2026",
    lastActivity: "Yesterday",
    nextAction: "Prepare delivery",
    payment: 25,
    finance: true,
    exchange: true,
    notes:
      "Customer finalized vehicle and paid booking amount.",
    timeline: [
      {
        title: "Vehicle selected",
        date: "17 Aug 2026",
      },
      {
        title: "Booking payment received",
        date: "20 Aug 2026",
      },
      {
        title: "Deal closed",
        date: "20 Aug 2026",
      },
    ],
  },

  {
    id: "DEAL-24084",
    customer: "Sneha Kapoor",
    customerId: "CUS-20484",
    initials: "SK",
    vehicle: "Mercedes-Benz GLC",
    variant: "300 4MATIC AMG Line",
    stockNo: "INV-MBZ-004",
    amount: 7480000,
    stage: "Test Drive",
    probability: 45,
    source: "Referral",
    advisor: "Meghana S",
    created: "10 Aug 2026",
    lastActivity: "Yesterday",
    nextAction: "Complete test drive",
    payment: 0,
    finance: false,
    exchange: false,
    notes:
      "Interested in AMG package and advanced driver assistance.",
    timeline: [
      {
        title: "Lead qualified",
        date: "10 Aug 2026",
      },
      {
        title: "Test drive scheduled",
        date: "Today, 2:00 PM",
      },
    ],
  },

  {
    id: "DEAL-24085",
    customer: "Neha Iyer",
    customerId: "CUS-20486",
    initials: "NI",
    vehicle: "Kia EV6",
    variant: "GT Line AWD",
    stockNo: "INV-KIA-007",
    amount: 6100000,
    stage: "Qualified",
    probability: 55,
    source: "Website",
    advisor: "Ananya Rao",
    created: "18 Aug 2026",
    lastActivity: "Yesterday",
    nextAction: "Schedule EV6 test drive",
    payment: 0,
    finance: true,
    exchange: false,
    notes:
      "Strong EV buyer interested in home charging.",
    timeline: [
      {
        title: "Lead qualified",
        date: "18 Aug 2026",
      },
      {
        title: "Charging information shared",
        date: "Yesterday",
      },
    ],
  },

  {
    id: "DEAL-24086",
    customer: "Aditya Rao",
    customerId: "CUS-20487",
    initials: "AR",
    vehicle: "Toyota Camry",
    variant: "Hybrid",
    stockNo: "INV-TCM-008",
    amount: 4820000,
    stage: "Quotation",
    probability: 68,
    source: "Facebook",
    advisor: "Karthik Reddy",
    created: "14 Aug 2026",
    lastActivity: "2 days ago",
    nextAction: "Discuss ownership cost",
    payment: 0,
    finance: false,
    exchange: true,
    notes:
      "Interested in hybrid fuel economy and ownership cost.",
    timeline: [
      {
        title: "Lead qualified",
        date: "14 Aug 2026",
      },
      {
        title: "Ownership cost shared",
        date: "20 Aug 2026",
      },
      {
        title: "Quotation sent",
        date: "20 Aug 2026",
      },
    ],
  },

  {
    id: "DEAL-24087",
    customer: "Meera Nair",
    customerId: "CUS-20488",
    initials: "MN",
    vehicle: "Skoda Kodiaq",
    variant: "L&K 2.0 TSI",
    stockNo: "INV-SKD-006",
    amount: 4120000,
    stage: "Negotiation",
    probability: 82,
    source: "Website",
    advisor: "Rahul Kumar",
    created: "9 Aug 2026",
    lastActivity: "Today",
    nextAction: "Share Kodiaq vs Fortuner comparison",
    payment: 0,
    finance: true,
    exchange: true,
    notes:
      "Comparing Kodiaq and Fortuner for family usage.",
    timeline: [
      {
        title: "Test drive completed",
        date: "22 Aug 2026",
      },
      {
        title: "Comparison requested",
        date: "Today",
      },
    ],
  },
];

/* ============================================================
   CONSTANTS
   ============================================================ */

const stages = [
  "Qualified",
  "Test Drive",
  "Quotation",
  "Negotiation",
  "Closed Won",
];

const advisors = [
  "Rahul Kumar",
  "Ananya Rao",
  "Karthik Reddy",
  "Meghana S",
];

/* ============================================================
   MAIN SALES PAGE
   ============================================================ */

export default function Sales() {
  const [deals, setDeals] = useState(initialDeals);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [advisorFilter, setAdvisorFilter] = useState("All");

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [toast, setToast] = useState("");

  /* ----------------------------------------------------------
     TOAST
     ---------------------------------------------------------- */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2400);
  };

  /* ----------------------------------------------------------
     FILTER
     ---------------------------------------------------------- */

  const filteredDeals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesSearch =
        !query ||
        deal.customer.toLowerCase().includes(query) ||
        deal.vehicle.toLowerCase().includes(query) ||
        deal.id.toLowerCase().includes(query) ||
        deal.customerId.toLowerCase().includes(query);

      const matchesStage =
        stageFilter === "All" ||
        deal.stage === stageFilter;

      const matchesAdvisor =
        advisorFilter === "All" ||
        deal.advisor === advisorFilter;

      return (
        matchesSearch &&
        matchesStage &&
        matchesAdvisor
      );
    });
  }, [
    deals,
    search,
    stageFilter,
    advisorFilter,
  ]);

  /* ----------------------------------------------------------
     KPI
     ---------------------------------------------------------- */

  const pipelineValue = deals.reduce(
    (sum, deal) => sum + deal.amount,
    0
  );

  const weightedPipeline = deals.reduce(
    (sum, deal) =>
      sum +
      deal.amount *
        (deal.probability / 100),
    0
  );

  const wonDeals = deals.filter(
    (deal) => deal.stage === "Closed Won"
  );

  const wonRevenue = wonDeals.reduce(
    (sum, deal) => sum + deal.amount,
    0
  );

  const activeDeals = deals.filter(
    (deal) => deal.stage !== "Closed Won"
  ).length;

  const highIntentDeals = deals.filter(
    (deal) => deal.probability >= 80
  ).length;

  /* ----------------------------------------------------------
     UPDATE DEAL
     ---------------------------------------------------------- */

  const updateDeal = (id, changes) => {
    setDeals((current) =>
      current.map((deal) =>
        deal.id === id
          ? {
              ...deal,
              ...changes,
            }
          : deal
      )
    );

    setSelectedDeal((current) =>
      current
        ? {
            ...current,
            ...changes,
          }
        : null
    );
  };

  /* ----------------------------------------------------------
     ADD DEAL
     ---------------------------------------------------------- */

  const handleAddDeal = (deal) => {
    setDeals((current) => [
      deal,
      ...current,
    ]);

    setShowAddDeal(false);

    showToast(
      "New deal created successfully."
    );
  };

  return (
    <div className="w-full pb-10">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <motion.header
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
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

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#18E0C4]
                shadow-[0_0_12px_rgba(24,224,196,0.8)]
              "
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-[#18E0C4]
              "
            >
              Revenue Operations
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
            Sales & Deals
          </h1>

          <p
            className="
              mt-2
              max-w-3xl
              text-base
              leading-7
              text-slate-400
            "
          >
            Manage quotations, negotiations,
            payments and vehicle sales from one
            intelligent workspace.
          </p>

        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <button
            type="button"
            onClick={() =>
              showToast(
                "Sales pipeline refreshed."
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
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
            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              showToast(
                "Sales report generated."
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
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
            <Download size={16} />
            Export
          </button>

          <button
            type="button"
            onClick={() =>
              setShowAddDeal(true)
            }
            className="
              flex
              items-center
              justify-center
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
              shadow-[0_10px_30px_rgba(24,224,196,0.12)]
              hover:brightness-110
              transition
            "
          >
            <Plus size={17} />
            New Deal
          </button>
        </div>
      </motion.header>

      {/* ======================================================
          KPI CARDS
          ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          mb-5
        "
      >
        <SalesKPI
          icon={CircleDollarSign}
          label="Pipeline Value"
          value={formatPrice(
            pipelineValue
          )}
          detail="All active opportunities"
          accent="cyan"
        />

        <SalesKPI
          icon={Sparkles}
          label="Weighted Pipeline"
          value={formatPrice(
            weightedPipeline
          )}
          detail="Probability adjusted"
          accent="purple"
        />

        <SalesKPI
          icon={BadgeIndianRupee}
          label="Won Revenue"
          value={formatPrice(
            wonRevenue
          )}
          detail={`${wonDeals.length} closed deals`}
          accent="green"
        />

        <SalesKPI
          icon={TrendingUp}
          label="Active Deals"
          value={activeDeals}
          detail="Currently in pipeline"
          accent="blue"
        />
      </div>

      {/* ======================================================
          AI INSIGHT
          ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          p-6
          mb-5
          rounded-2xl
          bg-gradient-to-r
          from-[#121D2D]
          via-[#16152A]
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
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                w-12
                h-12
                shrink-0
                rounded-xl
                bg-[#A78BFA]/10
                border
                border-[#A78BFA]/15
              "
            >
              <Sparkles
                size={21}
                className="text-[#A78BFA]"
              />
            </div>

            <div>
              <p
                className="
                  text-base
                  font-semibold
                  text-[#C4B5FD]
                "
              >
                AI Sales Intelligence
              </p>

              <p
                className="
                  mt-2
                  max-w-3xl
                  text-sm
                  leading-6
                  text-slate-400
                "
              >
                {highIntentDeals} high-probability
                deals are currently in negotiation
                or ready for conversion. Focus
                advisor attention on these
                opportunities first.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setStageFilter("Negotiation")
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
              shrink-0
              rounded-xl
              bg-[#A78BFA]/10
              border
              border-[#A78BFA]/15
              text-sm
              font-semibold
              text-[#C4B5FD]
              hover:bg-[#A78BFA]/15
              transition
            "
          >
            View High Intent Deals
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ======================================================
          SEARCH + FILTERS
          ====================================================== */}

      <section
        className="
          flex
          flex-col
          xl:flex-row
          gap-3
          mb-5
        "
      >
        <div
          className="
            relative
            flex-1
          "
        >
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
              setSearch(
                event.target.value
              )
            }
            placeholder="Search customer, vehicle, deal ID..."
            className="
              w-full
              h-12
              pl-12
              pr-4
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.08]
              text-base
              text-white
              placeholder:text-slate-600
              outline-none
              focus:border-[#18E0C4]/30
              focus:ring-2
              focus:ring-[#18E0C4]/5
              transition
            "
          />
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          <SalesSelect
            value={stageFilter}
            onChange={setStageFilter}
            options={[
              "All",
              ...stages,
            ]}
          />

          <SalesSelect
            value={advisorFilter}
            onChange={setAdvisorFilter}
            options={[
              "All",
              ...advisors,
            ]}
          />
        </div>
      </section>

      {/* ======================================================
          SALES FUNNEL
          ====================================================== */}

      <section
        className="
          p-6
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
            items-center
            justify-between
            gap-4
            mb-5
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
              Sales Funnel
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Opportunity progression
            </p>
          </div>

          <span
            className="
              text-sm
              text-slate-500
            "
          >
            {deals.length} total opportunities
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
            gap-3
          "
        >
          {stages.map(
            (stage, index) => {
              const stageDeals =
                deals.filter(
                  (deal) =>
                    deal.stage === stage
                );

              const value =
                stageDeals.reduce(
                  (sum, deal) =>
                    sum + deal.amount,
                  0
                );

              return (
                <FunnelStage
                  key={stage}
                  stage={stage}
                  count={
                    stageDeals.length
                  }
                  value={value}
                  index={index}
                />
              );
            }
          )}

          <div
            className="
              flex
              flex-col
              justify-center
              p-5
              rounded-xl
              bg-[#18E0C4]/[0.04]
              border
              border-[#18E0C4]/15
            "
          >
            <span
              className="
                text-xs
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Total
            </span>

            <span
              className="
                mt-2
                text-3xl
                font-bold
                text-white
              "
            >
              {deals.length}
            </span>

            <span
              className="
                mt-1
                text-sm
                text-[#18E0C4]
              "
            >
              opportunities
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          DEAL PIPELINE HEADER
          ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          mb-4
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Deal Pipeline
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {filteredDeals.length} opportunities
          </p>
        </div>

        <span
          className="
            hidden
            sm:block
            text-sm
            text-slate-500
          "
        >
          Ranked by conversion probability
        </span>
      </div>

      {/* ======================================================
          DEAL LIST
          ====================================================== */}

      <div
        className="
          space-y-4
        "
      >
        {filteredDeals.map(
          (deal, index) => (
            <DealCard
              key={deal.id}
              deal={deal}
              index={index}
              onOpen={() =>
                setSelectedDeal(deal)
              }
            />
          )
        )}
      </div>

      {filteredDeals.length === 0 && (
        <EmptyDeals
          onClear={() => {
            setSearch("");
            setStageFilter("All");
            setAdvisorFilter("All");
          }}
        />
      )}

      {/* ======================================================
          DRAWER
          ====================================================== */}

      <AnimatePresence>
        {selectedDeal && (
          <DealDrawer
            deal={selectedDeal}
            onClose={() =>
              setSelectedDeal(null)
            }
            onUpdate={updateDeal}
            onToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
          ADD DEAL MODAL
          ====================================================== */}

      <AnimatePresence>
        {showAddDeal && (
          <AddDealModal
            onClose={() =>
              setShowAddDeal(false)
            }
            onAdd={handleAddDeal}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
          TOAST
          ====================================================== */}

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
              right-6
              bottom-6
              z-[300]
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-xl
              bg-[#0D1725]
              border
              border-[#18E0C4]/20
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
          >
            <Check
              size={18}
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

function SalesKPI({
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

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        p-6
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        border-white/[0.07]
        transition
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div
          className={`
            flex
            items-center
            justify-center
            w-11
            h-11
            rounded-xl
            ${colors[accent].bg}
          `}
        >
          <Icon
            size={21}
            className={
              colors[accent].text
            }
          />
        </div>

        <ArrowUpRight
          size={17}
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
          mt-2
          text-base
          font-medium
          text-slate-300
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        {detail}
      </p>
    </motion.div>
  );
}

/* ============================================================
   FUNNEL STAGE
   ============================================================ */

function FunnelStage({
  stage,
  count,
  value,
  index,
}) {
  const colors = {
    Qualified: {
      text: "text-[#60A5FA]",
      bar: "bg-[#60A5FA]",
    },

    "Test Drive": {
      text: "text-[#A78BFA]",
      bar: "bg-[#A78BFA]",
    },

    Quotation: {
      text: "text-[#FBBF24]",
      bar: "bg-[#FBBF24]",
    },

    Negotiation: {
      text: "text-[#FB923C]",
      bar: "bg-[#FB923C]",
    },

    "Closed Won": {
      text: "text-[#4ADE80]",
      bar: "bg-[#4ADE80]",
    },
  };

  const theme = colors[stage];

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        p-5
        rounded-xl
        bg-white/[0.02]
        border
        border-white/[0.06]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className={`
            text-sm
            font-semibold
            ${theme.text}
          `}
        >
          {stage}
        </span>

        <span
          className="
            text-xl
            font-bold
            text-white
          "
        >
          {count}
        </span>
      </div>

      <p
        className="
          mt-4
          text-base
          font-semibold
          text-slate-400
        "
      >
        {formatPrice(value)}
      </p>

      <div
        className="
          h-2
          mt-4
          rounded-full
          bg-white/[0.05]
          overflow-hidden
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${Math.min(
              Math.max(
                count * 22,
                8
              ),
              100
            )}%`,
          }}
          transition={{
            delay: index * 0.08,
            duration: 0.5,
          }}
          className={`
            h-full
            rounded-full
            ${theme.bar}
          `}
        />
      </div>
    </motion.div>
  );
}

/* ============================================================
   DEAL CARD
   ============================================================ */

function DealCard({
  deal,
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
        delay: index * 0.04,
      }}
      whileHover={{
        y: -2,
      }}
      className="
        group
        p-6
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        border-white/[0.07]
      "
    >
      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          gap-5
        "
      >

        {/* CUSTOMER */}

        <div
          className="
            flex
            items-center
            gap-4
            xl:w-[270px]
            shrink-0
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              w-12
              h-12
              shrink-0
              rounded-xl
              bg-[#18E0C4]/10
              border
              border-[#18E0C4]/15
              text-base
              font-bold
              text-[#18E0C4]
            "
          >
            {deal.initials}
          </div>

          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className="
                  truncate
                  text-base
                  font-semibold
                  text-white
                "
              >
                {deal.customer}
              </h3>

              <DealStage
                stage={deal.stage}
              />
            </div>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {deal.id}
            </p>
          </div>
        </div>

        {/* VEHICLE */}

        <div
          className="
            flex
            items-center
            gap-4
            flex-1
            min-w-0
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              w-11
              h-11
              shrink-0
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.06]
            "
          >
            <CarFront
              size={19}
              className="text-slate-500"
            />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-base
                font-semibold
                text-slate-200
              "
            >
              {deal.vehicle}
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                text-slate-500
              "
            >
              {deal.variant}
            </p>
          </div>
        </div>

        {/* PROBABILITY */}

        <div
          className="
            w-full
            xl:w-[170px]
            shrink-0
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              mb-2
            "
          >
            <span
              className="
                text-xs
                uppercase
                tracking-wide
                text-slate-500
              "
            >
              Win Probability
            </span>

            <span
              className="
                text-sm
                font-bold
                text-[#18E0C4]
              "
            >
              {deal.probability}%
            </span>
          </div>

          <div
            className="
              h-2
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
              "
              style={{
                width: `${deal.probability}%`,
              }}
            />
          </div>
        </div>

        {/* AMOUNT */}

        <div
          className="
            xl:w-[150px]
            xl:text-right
            shrink-0
          "
        >
          <p
            className="
              text-xl
              font-bold
              text-white
            "
          >
            {formatPrice(
              deal.amount
            )}
          </p>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {deal.advisor}
          </p>
        </div>

        {/* OPEN */}

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${deal.id}`}
          className="
            flex
            items-center
            justify-center
            w-11
            h-11
            shrink-0
            rounded-xl
            bg-white/[0.035]
            border
            border-white/[0.06]
            text-slate-500
            hover:text-[#18E0C4]
            hover:bg-[#18E0C4]/[0.05]
            transition
          "
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* BOTTOM DETAILS */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          mt-5
          pt-4
          border-t
          border-white/[0.05]
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-4
          "
        >
          <SmallDealMeta
            icon={Clock3}
            value={deal.lastActivity}
          />

          <SmallDealMeta
            icon={CalendarDays}
            value={deal.nextAction}
          />

          {deal.finance && (
            <SmallDealTag>
              Finance
            </SmallDealTag>
          )}

          {deal.exchange && (
            <SmallDealTag>
              Exchange
            </SmallDealTag>
          )}
        </div>

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          {deal.source}
        </span>
      </div>
    </motion.article>
  );
}

/* ============================================================
   DEAL DRAWER
   ============================================================ */

function DealDrawer({
  deal,
  onClose,
  onUpdate,
  onToast,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[150]
        bg-black/65
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
          right-0
          top-0
          bottom-0
          w-full
          sm:max-w-[620px]
          overflow-y-auto
          bg-[#09111D]
          border-l
          border-white/[0.08]
          shadow-[-30px_0_100px_rgba(0,0,0,0.5)]
        "
      >

        {/* DRAWER HEADER */}

        <div
          className="
            sticky
            top-0
            z-20
            p-6
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
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <FileText
                  size={17}
                  className="text-[#18E0C4]"
                />

                <span
                  className="
                    text-sm
                    uppercase
                    tracking-wider
                    font-semibold
                    text-[#18E0C4]
                  "
                >
                  Deal
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
                {deal.id}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                Created {deal.created}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                bg-white/[0.03]
                border
                border-white/[0.06]
                text-slate-400
                hover:text-white
                transition
              "
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="p-6">

          {/* CUSTOMER */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-5
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
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-14
                  h-14
                  rounded-xl
                  bg-[#18E0C4]/10
                  border
                  border-[#18E0C4]/15
                  text-lg
                  font-bold
                  text-[#18E0C4]
                "
              >
                {deal.initials}
              </div>

              <div>
                <p
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  {deal.customer}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  {deal.customerId}
                </p>
              </div>
            </div>

            <div
              className="
                sm:text-right
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Deal Value
              </p>

              <p
                className="
                  mt-1
                  text-3xl
                  font-bold
                  text-white
                "
              >
                {formatPrice(
                  deal.amount
                )}
              </p>
            </div>
          </div>

          {/* DEAL PROGRESS */}

          <DrawerSection
            icon={TrendingUp}
            title="Deal Progress"
          >
            <div className="space-y-3">
              {stages.map(
                (stage, index) => {
                  const currentIndex =
                    stages.indexOf(
                      deal.stage
                    );

                  const complete =
                    index <=
                    currentIndex;

                  return (
                    <button
                      key={stage}
                      type="button"
                      onClick={() =>
                        onUpdate(
                          deal.id,
                          {
                            stage,
                            probability:
                              stage ===
                              "Closed Won"
                                ? 100
                                : Math.min(
                                    45 +
                                      index *
                                        12,
                                    95
                                  ),
                          }
                        )
                      }
                      className="
                        flex
                        items-center
                        gap-4
                        w-full
                        text-left
                        p-2
                        rounded-xl
                        hover:bg-white/[0.025]
                        transition
                      "
                    >
                      <span
                        className={`
                          flex
                          items-center
                          justify-center
                          w-9
                          h-9
                          rounded-full
                          border
                          text-sm
                          font-semibold
                          ${
                            complete
                              ? "bg-[#18E0C4]/10 border-[#18E0C4]/20 text-[#18E0C4]"
                              : "bg-white/[0.02] border-white/[0.06] text-slate-600"
                          }
                        `}
                      >
                        {complete ? (
                          <Check size={15} />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <span
                        className={`
                          text-base
                          font-medium
                          ${
                            stage ===
                            deal.stage
                              ? "text-white"
                              : complete
                              ? "text-slate-400"
                              : "text-slate-600"
                          }
                        `}
                      >
                        {stage}
                      </span>

                      {stage ===
                        deal.stage && (
                        <span
                          className="
                            ml-auto
                            px-3
                            py-1
                            rounded-lg
                            bg-[#18E0C4]/10
                            text-xs
                            font-semibold
                            text-[#18E0C4]
                          "
                        >
                          Current
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </DrawerSection>

          {/* VEHICLE */}

          <DrawerSection
            icon={CarFront}
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
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    {deal.vehicle}
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    {deal.variant}
                  </p>
                </div>

                <span
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {deal.stockNo}
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-5
                "
              >
                <InfoCell
                  label="Price"
                  value={formatPrice(
                    deal.amount
                  )}
                />

                <InfoCell
                  label="Payment"
                  value={`${deal.payment}%`}
                />

                <InfoCell
                  label="Finance"
                  value={
                    deal.finance
                      ? "Required"
                      : "No"
                  }
                />

                <InfoCell
                  label="Exchange"
                  value={
                    deal.exchange
                      ? "Yes"
                      : "No"
                  }
                />
              </div>
            </div>
          </DrawerSection>

          {/* PAYMENT */}

          <DrawerSection
            icon={CircleDollarSign}
            title="Payment Progress"
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
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-sm
                    text-slate-400
                  "
                >
                  Booking/payment received
                </span>

                <span
                  className="
                    text-base
                    font-bold
                    text-[#18E0C4]
                  "
                >
                  {deal.payment}%
                </span>
              </div>

              <div
                className="
                  h-3
                  mt-4
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
                  "
                  style={{
                    width: `${deal.payment}%`,
                  }}
                />
              </div>

              <div
                className="
                  grid
                  grid-cols-5
                  gap-2
                  mt-4
                "
              >
                {[0, 10, 25, 50, 100].map(
                  (value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        onUpdate(
                          deal.id,
                          {
                            payment: value,
                          }
                        )
                      }
                      className="
                        h-9
                        rounded-lg
                        bg-white/[0.025]
                        border
                        border-white/[0.06]
                        text-sm
                        font-semibold
                        text-slate-400
                        hover:text-white
                        hover:border-[#18E0C4]/20
                        transition
                      "
                    >
                      {value}%
                    </button>
                  )
                )}
              </div>
            </div>
          </DrawerSection>

          {/* AI ACTION */}

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
                border
                border-[#A78BFA]/15
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Sparkles
                  size={17}
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
                {deal.nextAction}.
                Personalized follow-up is
                recommended based on the
                current deal stage.
              </p>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    "Follow-up task created."
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  mt-4
                  h-10
                  px-4
                  rounded-xl
                  bg-[#A78BFA]/10
                  border
                  border-[#A78BFA]/15
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

          {/* TIMELINE */}

          <DrawerSection
            icon={Clock3}
            title="Deal Timeline"
          >
            <div
              className="
                relative
                ml-2
              "
            >
              <div
                className="
                  absolute
                  left-[5px]
                  top-3
                  bottom-3
                  w-px
                  bg-white/[0.06]
                "
              />

              <div className="space-y-6">
                {deal.timeline.map(
                  (event, index) => (
                    <div
                      key={`${event.title}-${index}`}
                      className="
                        relative
                        pl-8
                      "
                    >
                      <span
                        className="
                          absolute
                          left-0
                          top-1
                          w-3
                          h-3
                          rounded-full
                          bg-[#18E0C4]
                          ring-4
                          ring-[#09111D]
                        "
                      />

                      <p
                        className="
                          text-base
                          font-semibold
                          text-slate-300
                        "
                      >
                        {event.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-slate-500
                        "
                      >
                        {event.date}
                      </p>
                    </div>
                  )
                )}
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
              pt-5
              border-t
              border-white/[0.06]
            "
          >
            <ActionButton
              icon={FileText}
              label="Generate Quotation"
              onClick={() =>
                onToast(
                  "Quotation generated successfully."
                )
              }
              primary
            />

            <ActionButton
              icon={Send}
              label="Send Quotation"
              onClick={() =>
                onToast(
                  "Quotation sent to customer."
                )
              }
            />

            <ActionButton
              icon={MessageSquare}
              label="Message Customer"
              onClick={() =>
                onToast(
                  "Customer communication opened."
                )
              }
            />

            <ActionButton
              icon={Check}
              label="Close Deal"
              success
              onClick={() =>
                onUpdate(
                  deal.id,
                  {
                    stage: "Closed Won",
                    probability: 100,
                    payment: Math.max(
                      deal.payment,
                      25
                    ),
                  }
                )
              }
            />
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

/* ============================================================
   ADD DEAL MODAL
   ============================================================ */

function AddDealModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    customer: "",
    vehicle: "",
    amount: "",
    advisor: "Rahul Kumar",
    stage: "Qualified",
    finance: true,
    exchange: false,
  });

  const [error, setError] =
    useState("");

  const update = (
    key,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));

    setError("");
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.customer.trim() ||
      !form.vehicle.trim() ||
      !form.amount
    ) {
      setError(
        "Please complete Customer, Vehicle and Deal Value."
      );
      return;
    }

    const id = `DEAL-${Math.floor(
      Math.random() * 90000
    ) + 10000}`;

    const initials =
      form.customer
        .trim()
        .split(/\s+/)
        .map((item) => item[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    onAdd({
      id,
      customer:
        form.customer.trim(),
      customerId: "CUS-NEW",
      initials,
      vehicle:
        form.vehicle.trim(),
      variant: "To be confirmed",
      stockNo: "Inventory pending",
      amount: Number(
        form.amount
      ),
      stage: form.stage,
      probability:
        form.stage === "Qualified"
          ? 45
          : 60,
      source: "Manual",
      advisor: form.advisor,
      created: "Today",
      lastActivity: "Just now",
      nextAction:
        "Qualify customer",
      payment: 0,
      finance: form.finance,
      exchange: form.exchange,
      notes:
        "New sales opportunity created manually.",
      timeline: [
        {
          title: "Deal created",
          date: "Just now",
        },
      ],
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <motion.form
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        onSubmit={submit}
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
          border
          border-white/[0.08]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-white/[0.06]
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <TrendingUp
                size={18}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-sm
                  uppercase
                  tracking-wider
                  font-semibold
                  text-[#18E0C4]
                "
              >
                Sales
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
              Create New Deal
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              items-center
              justify-center
              w-11
              h-11
              rounded-xl
              bg-white/[0.03]
              border
              border-white/[0.06]
              text-slate-400
              hover:text-white
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
            p-6
          "
        >
          <FormField
            label="Customer"
            value={form.customer}
            onChange={(value) =>
              update(
                "customer",
                value
              )
            }
            placeholder="Arjun Mehta"
          />

          <FormField
            label="Vehicle"
            value={form.vehicle}
            onChange={(value) =>
              update(
                "vehicle",
                value
              )
            }
            placeholder="Toyota Fortuner"
          />

          <FormField
            label="Deal Value"
            value={form.amount}
            onChange={(value) =>
              update(
                "amount",
                value
              )
            }
            placeholder="5200000"
            type="number"
          />

          <FormSelect
            label="Sales Advisor"
            value={form.advisor}
            onChange={(value) =>
              update(
                "advisor",
                value
              )
            }
            options={advisors}
          />

          <FormSelect
            label="Initial Stage"
            value={form.stage}
            onChange={(value) =>
              update(
                "stage",
                value
              )
            }
            options={[
              "Qualified",
              "Test Drive",
              "Quotation",
              "Negotiation",
            ]}
          />

          <div
            className="
              flex
              items-end
              gap-3
            "
          >
            <Toggle
              label="Finance"
              active={form.finance}
              onClick={() =>
                update(
                  "finance",
                  !form.finance
                )
              }
            />

            <Toggle
              label="Exchange"
              active={form.exchange}
              onClick={() =>
                update(
                  "exchange",
                  !form.exchange
                )
              }
            />
          </div>
        </div>

        {error && (
          <div
            className="
              mx-6
              mb-5
              p-4
              rounded-xl
              bg-red-500/10
              border
              border-red-500/20
              text-sm
              text-red-300
            "
          >
            {error}
          </div>
        )}

        <div
          className="
            flex
            justify-end
            gap-3
            p-6
            pt-0
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
              border
              border-white/[0.07]
              text-sm
              font-semibold
              text-slate-400
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
            Create Deal
          </button>
        </div>
      </motion.form>
    </div>
  );
}

/* ============================================================
   DEAL STAGE
   ============================================================ */

function DealStage({
  stage,
}) {
  const styles = {
    Qualified:
      "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/15",

    "Test Drive":
      "bg-[#8B5CF6]/10 text-[#A78BFA] border-[#8B5CF6]/15",

    Quotation:
      "bg-[#F59E0B]/10 text-[#FBBF24] border-[#F59E0B]/15",

    Negotiation:
      "bg-[#F97316]/10 text-[#FB923C] border-[#F97316]/15",

    "Closed Won":
      "bg-[#22C55E]/10 text-[#4ADE80] border-[#22C55E]/15",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-lg
        border
        text-xs
        font-semibold
        whitespace-nowrap
        ${styles[stage]}
      `}
    >
      {stage}
    </span>
  );
}

/* ============================================================
   SMALL META
   ============================================================ */

function SmallDealMeta({
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
      <Icon size={15} />
      <span>{value}</span>
    </span>
  );
}

/* ============================================================
   SMALL TAG
   ============================================================ */

function SmallDealTag({
  children,
}) {
  return (
    <span
      className="
        px-3
        py-1.5
        rounded-lg
        bg-white/[0.025]
        border
        border-white/[0.06]
        text-xs
        font-medium
        text-slate-400
      "
    >
      {children}
    </span>
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
    <section className="mt-8">
      <div
        className="
          flex
          items-center
          gap-2
          mb-4
        "
      >
        <Icon
          size={18}
          className="text-[#18E0C4]"
        />

        <h3
          className="
            text-lg
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
        bg-white/[0.018]
        border
        border-white/[0.05]
      "
    >
      <p
        className="
          text-xs
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
          text-base
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
   ACTION BUTTON
   ============================================================ */

function ActionButton({
  icon: Icon,
  label,
  onClick,
  primary = false,
  success = false,
}) {
  let classes = `
    flex
    items-center
    justify-center
    gap-2
    h-12
    rounded-xl
    border
    text-sm
    font-semibold
    transition
  `;

  if (primary) {
    classes += `
      bg-[#18E0C4]/10
      border-[#18E0C4]/15
      text-[#18E0C4]
      hover:bg-[#18E0C4]/15
    `;
  } else if (success) {
    classes += `
      bg-[#22C55E]/10
      border-[#22C55E]/15
      text-[#4ADE80]
      hover:bg-[#22C55E]/15
    `;
  } else {
    classes += `
      bg-white/[0.025]
      border-white/[0.06]
      text-slate-400
      hover:text-white
      hover:bg-white/[0.05]
    `;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

/* ============================================================
   SALES SELECT
   ============================================================ */

function SalesSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="
          h-12
          min-w-[170px]
          px-4
          pr-10
          rounded-xl
          appearance-none
          bg-white/[0.035]
          border
          border-white/[0.08]
          text-base
          font-medium
          text-slate-300
          outline-none
          focus:border-[#18E0C4]/30
          transition
        "
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
              className="bg-[#0D1725]"
            >
              {option}
            </option>
          )
        )}
      </select>

      <ChevronDown
        size={17}
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

/* ============================================================
   FORM FIELD
   ============================================================ */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <label>
      <span
        className="
          block
          mb-2
          text-sm
          font-semibold
          text-slate-400
        "
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
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
          text-base
          text-white
          placeholder:text-slate-700
          outline-none
          focus:border-[#18E0C4]/30
          transition
        "
      />
    </label>
  );
}

/* ============================================================
   FORM SELECT
   ============================================================ */

function FormSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>
      <span
        className="
          block
          mb-2
          text-sm
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
            onChange(
              event.target.value
            )
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
            text-base
            text-slate-300
            outline-none
            focus:border-[#18E0C4]/30
            transition
          "
        >
          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
                className="bg-[#0D1725]"
              >
                {option}
              </option>
            )
          )}
        </select>

        <ChevronDown
          size={17}
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

/* ============================================================
   TOGGLE
   ============================================================ */

function Toggle({
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex-1
        flex
        items-center
        justify-center
        gap-2
        h-12
        rounded-xl
        border
        text-sm
        font-semibold
        transition
        ${
          active
            ? "bg-[#18E0C4]/10 border-[#18E0C4]/15 text-[#18E0C4]"
            : "bg-white/[0.025] border-white/[0.07] text-slate-500"
        }
      `}
    >
      {active && (
        <Check size={16} />
      )}

      {label}
    </button>
  );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyDeals({
  onClear,
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
        rounded-2xl
        bg-[#0D1725]
        border
        border-white/[0.07]
        text-center
      "
    >
      <TrendingUp
        size={42}
        className="text-slate-700"
      />

      <p
        className="
          mt-5
          text-xl
          font-semibold
          text-slate-300
        "
      >
        No Deals Found
      </p>

      <p
        className="
          mt-2
          text-base
          text-slate-500
        "
      >
        Try changing your search
        or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          text-base
          font-semibold
          text-[#18E0C4]
          hover:text-[#5EEAD4]
          transition
        "
      >
        Clear Filters
      </button>
    </div>
  );
}

/* ============================================================
   PRICE FORMATTER
   ============================================================ */

function formatPrice(value) {
  if (!value) {
    return "₹0";
  }

  if (value >= 10000000) {
    return `₹${(
      value / 10000000
    ).toFixed(2)}Cr`;
  }

  return `₹${(
    value / 100000
  ).toFixed(2)}L`;
}
