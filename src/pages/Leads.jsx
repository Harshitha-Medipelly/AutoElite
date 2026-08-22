import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  X,
} from "lucide-react";

/* ===========================================================
   LEAD DATA
   =========================================================== */

const initialLeads = [
  {
    id: "LEAD-8012",
    name: "Ananya Reddy",
    initials: "AR",
    phone: "+91 98765 43210",
    email: "ananya.reddy@email.com",
    source: "Website",
    interest: "Toyota Fortuner",
    budget: 5500000,
    score: 94,
    status: "Hot",
    stage: "Qualified",
    advisor: "Rahul Kumar",
    created: "Today, 09:12 AM",
    lastActivity: "18 min ago",
    nextAction: "Schedule test drive",
    location: "Hyderabad",
    finance: true,
    exchange: true,
    notes:
      "High purchase intent. Interested in premium SUV and exchange valuation.",
    activities: [
      "Website enquiry submitted",
      "Vehicle brochure viewed",
      "Finance calculator used",
      "Advisor contacted customer",
    ],
  },
  {
    id: "LEAD-8013",
    name: "Vikram Singh",
    initials: "VS",
    phone: "+91 99887 66554",
    email: "vikram.singh@email.com",
    source: "Instagram",
    interest: "BMW X5",
    budget: 9000000,
    score: 88,
    status: "Hot",
    stage: "Contacted",
    advisor: "Ananya Rao",
    created: "Today, 10:25 AM",
    lastActivity: "42 min ago",
    nextAction: "Send quotation",
    location: "Banjara Hills",
    finance: true,
    exchange: false,
    notes: "Comparing BMW X5 and Mercedes-Benz GLC.",
    activities: [
      "Instagram enquiry received",
      "Customer responded",
      "BMW X5 details shared",
    ],
  },
  {
    id: "LEAD-8014",
    name: "Kavya Nair",
    initials: "KN",
    phone: "+91 91234 56789",
    email: "kavya.nair@email.com",
    source: "Google Ads",
    interest: "Kia EV6",
    budget: 6500000,
    score: 91,
    status: "Hot",
    stage: "Qualified",
    advisor: "Meghana S",
    created: "Yesterday",
    lastActivity: "1 hour ago",
    nextAction: "Schedule EV6 test drive",
    location: "Gachibowli",
    finance: true,
    exchange: false,
    notes: "Strong EV intent. Asked about charging infrastructure.",
    activities: [
      "EV6 landing page visited",
      "Charging guide downloaded",
      "Lead qualified",
    ],
  },
  {
    id: "LEAD-8015",
    name: "Rahul Verma",
    initials: "RV",
    phone: "+91 90123 45678",
    email: "rahul.verma@email.com",
    source: "Walk-in",
    interest: "Hyundai Creta",
    budget: 2500000,
    score: 76,
    status: "Warm",
    stage: "Contacted",
    advisor: "Karthik Reddy",
    created: "Yesterday",
    lastActivity: "3 hours ago",
    nextAction: "Follow up tomorrow",
    location: "Secunderabad",
    finance: true,
    exchange: true,
    notes: "Family buyer looking for comfortable daily-use SUV.",
    activities: [
      "Walk-in enquiry",
      "Creta variants discussed",
      "Test drive requested",
    ],
  },
  {
    id: "LEAD-8016",
    name: "Megha Joshi",
    initials: "MJ",
    phone: "+91 93456 78901",
    email: "megha.joshi@email.com",
    source: "Referral",
    interest: "Mercedes-Benz GLC",
    budget: 8000000,
    score: 83,
    status: "Warm",
    stage: "Qualified",
    advisor: "Rahul Kumar",
    created: "18 Aug 2026",
    lastActivity: "Yesterday",
    nextAction: "Share AMG package details",
    location: "Hyderabad",
    finance: false,
    exchange: false,
    notes: "Premium customer referred by existing owner.",
    activities: [
      "Referral received",
      "Customer contacted",
      "GLC variant selected",
    ],
  },
  {
    id: "LEAD-8017",
    name: "Sanjay Rao",
    initials: "SR",
    phone: "+91 97654 32109",
    email: "sanjay.rao@email.com",
    source: "Facebook",
    interest: "Toyota Camry",
    budget: 5000000,
    score: 67,
    status: "Warm",
    stage: "New",
    advisor: "Ananya Rao",
    created: "18 Aug 2026",
    lastActivity: "2 days ago",
    nextAction: "First contact",
    location: "Hyderabad",
    finance: false,
    exchange: true,
    notes: "Interested in hybrid sedan and long-term ownership cost.",
    activities: [
      "Facebook lead created",
      "Camry page viewed",
    ],
  },
  {
    id: "LEAD-8018",
    name: "Pooja Menon",
    initials: "PM",
    phone: "+91 98761 23450",
    email: "pooja.menon@email.com",
    source: "Website",
    interest: "Skoda Kodiaq",
    budget: 4500000,
    score: 52,
    status: "Cold",
    stage: "New",
    advisor: "Karthik Reddy",
    created: "17 Aug 2026",
    lastActivity: "4 days ago",
    nextAction: "Re-engage",
    location: "Secunderabad",
    finance: true,
    exchange: false,
    notes: "Downloaded brochure but has not responded to outreach.",
    activities: [
      "Brochure downloaded",
      "Email sent",
    ],
  },
];

/* ===========================================================
   MAIN
   =========================================================== */

export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  const [selectedLead, setSelectedLead] = useState(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [toast, setToast] = useState("");

  /* ========================================================
     TOAST
     ======================================================== */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2400);
  };

  /* ========================================================
     FILTER
     ======================================================== */

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.interest.toLowerCase().includes(query) ||
        lead.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchesStage =
        stageFilter === "All" || lead.stage === stageFilter;

      const matchesSource =
        sourceFilter === "All" || lead.source === sourceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStage &&
        matchesSource
      );
    });
  }, [
    leads,
    search,
    statusFilter,
    stageFilter,
    sourceFilter,
  ]);

  /* ========================================================
     KPIs
     ======================================================== */

  const total = leads.length;

  const hot = leads.filter(
    (lead) => lead.status === "Hot"
  ).length;

  const qualified = leads.filter(
    (lead) => lead.stage === "Qualified"
  ).length;

  const conversionPotential = leads.reduce(
    (sum, lead) =>
      sum + lead.budget * (lead.score / 100),
    0
  );

  /* ========================================================
     UPDATE
     ======================================================== */

  const updateLead = (id, changes) => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              ...changes,
            }
          : lead
      )
    );

    setSelectedLead((current) =>
      current
        ? {
            ...current,
            ...changes,
          }
        : null
    );
  };

  /* ========================================================
     CLEAR FILTERS
     ======================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setStageFilter("All");
    setSourceFilter("All");
  };

  /* ========================================================
     ADD LEAD
     ======================================================== */

  const addLead = (lead) => {
    setLeads((current) => [lead, ...current]);
    setShowAddLead(false);
    showToast("New lead added successfully.");
  };

  return (
    <div className="w-full text-[14px]">
      {/* ==================================================
          HEADER
          ================================================== */}

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
          <div className="flex items-center gap-2.5">
            <Target
              size={17}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.18em]
                font-semibold
                text-[#18E0C4]
              "
            >
              CRM Intelligence
            </span>
          </div>

          <h1
            className="
              mt-2
              text-[32px]
              sm:text-[36px]
              font-bold
              tracking-[-0.04em]
              text-white
            "
          >
            Leads
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-[13px]
              leading-6
              text-slate-400
            "
          >
            Capture, qualify and convert every dealership
            enquiry before it becomes a missed opportunity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              showToast("Lead sources synchronized.")
            }
            className="
              flex
              items-center
              gap-2.5
              h-11
              px-4
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.08]
              text-[13px]
              font-semibold
              text-slate-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            <RefreshCw size={15} />
            Sync leads
          </button>

          <button
            type="button"
            onClick={() => setShowAddLead(true)}
            className="
              flex
              items-center
              gap-2.5
              h-11
              px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-[13px]
              font-bold
              text-[#031014]
              shadow-[0_8px_30px_rgba(24,224,196,0.15)]
              hover:brightness-110
              transition
            "
          >
            <Plus size={17} />
            Add lead
          </button>
        </div>
      </motion.div>

      {/* ==================================================
          KPI
          ================================================== */}

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
        <LeadKPI
          icon={Users}
          label="Total leads"
          value={total}
          detail="All captured enquiries"
        />

        <LeadKPI
          icon={Flame}
          label="Hot leads"
          value={hot}
          detail="High purchase intent"
          accent="red"
        />

        <LeadKPI
          icon={Target}
          label="Qualified"
          value={qualified}
          detail="Ready for sales action"
          accent="purple"
        />

        <LeadKPI
          icon={TrendingUp}
          label="Potential value"
          value={formatPrice(conversionPotential)}
          detail="Score weighted"
          accent="green"
        />
      </div>

      {/* ==================================================
          AI ALERT
          ================================================== */}

      <section
        className="
          p-5
          mb-5
          rounded-2xl
          bg-gradient-to-r
          from-[#10222A]
          via-[#141B2A]
          to-[#0D1725]
          border
          border-[#18E0C4]/10
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
                bg-[#18E0C4]/[0.07]
                border
                border-[#18E0C4]/10
              "
            >
              <Sparkles
                size={19}
                className="text-[#18E0C4]"
              />
            </div>

            <div>
              <p
                className="
                  text-[13px]
                  font-semibold
                  text-[#7DD3C7]
                "
              >
                Priority lead intelligence
              </p>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-5
                  text-slate-400
                "
              >
                {hot} hot leads require immediate
                follow-up. The strongest opportunity is{" "}
                {leads
                  .filter(
                    (lead) => lead.status === "Hot"
                  )
                  .sort(
                    (a, b) => b.score - a.score
                  )[0]?.name || "your top lead"}
                .
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatusFilter("Hot")}
            className="
              flex
              items-center
              justify-center
              gap-2
              h-10
              px-4
              rounded-xl
              bg-[#18E0C4]/[0.06]
              border
              border-[#18E0C4]/10
              text-[12px]
              font-semibold
              text-[#18E0C4]
              hover:bg-[#18E0C4]/[0.1]
              transition
            "
          >
            Show hot leads
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ==================================================
          FILTERS
          ================================================== */}

      <section
        className="
          flex
          flex-col
          xl:flex-row
          gap-3
          mb-5
        "
      >
        <div className="relative flex-1">
          <Search
            size={17}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
              pointer-events-none
            "
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search name, phone, email, vehicle or lead ID..."
            className="
              w-full
              h-11
              pl-11
              pr-4
              rounded-xl
              bg-[#0D1725]
              border
              border-white/[0.07]
              text-[13px]
              text-white
              placeholder:text-slate-600
              outline-none
              focus:border-[#18E0C4]/30
              transition
            "
          />
        </div>

        <LeadSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            "All",
            "Hot",
            "Warm",
            "Cold",
          ]}
        />

        <LeadSelect
          value={stageFilter}
          onChange={setStageFilter}
          options={[
            "All",
            "New",
            "Contacted",
            "Qualified",
            "Converted",
            "Lost",
          ]}
        />

        <LeadSelect
          value={sourceFilter}
          onChange={setSourceFilter}
          options={[
            "All",
            "Website",
            "Instagram",
            "Google Ads",
            "Walk-in",
            "Referral",
            "Facebook",
          ]}
        />

        {(search ||
          statusFilter !== "All" ||
          stageFilter !== "All" ||
          sourceFilter !== "All") && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              h-11
              px-4
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              text-[12px]
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.05]
              transition
            "
          >
            Clear
          </button>
        )}
      </section>

      {/* ==================================================
          LEAD TABLE
          ================================================== */}

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
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-white/[0.05]
          "
        >
          <div>
            <h2
              className="
                text-[17px]
                font-semibold
                text-white
              "
            >
              Lead workspace
            </h2>

            <p
              className="
                mt-1
                text-[12px]
                text-slate-500
              "
            >
              {filteredLeads.length} leads matching
              current filters
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[12px]
              text-slate-500
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#4ADE80]
              "
            />
            Live CRM
          </div>
        </div>

        {/* Desktop headers */}

        <div
          className="
            hidden
            xl:grid
            grid-cols-[2fr_1.7fr_1fr_1.1fr_1.3fr_44px]
            gap-4
            px-5
            py-3
            border-b
            border-white/[0.04]
            text-[11px]
            uppercase
            tracking-wider
            font-semibold
            text-slate-600
          "
        >
          <span>Lead</span>
          <span>Interest</span>
          <span>Intent</span>
          <span>Stage</span>
          <span>Next action</span>
          <span />
        </div>

        <div>
          {filteredLeads.map((lead, index) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              index={index}
              onOpen={() =>
                setSelectedLead(lead)
              }
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          EMPTY
          ================================================== */}

      {filteredLeads.length === 0 && (
        <EmptyLeads onClear={clearFilters} />
      )}

      {/* ==================================================
          DRAWER
          ================================================== */}

      <AnimatePresence>
        {selectedLead && (
          <LeadDrawer
            lead={selectedLead}
            onClose={() =>
              setSelectedLead(null)
            }
            onUpdate={updateLead}
            onToast={showToast}
          />
        )}
      </AnimatePresence>

      {/* ==================================================
          ADD LEAD
          ================================================== */}

      <AnimatePresence>
        {showAddLead && (
          <AddLeadModal
            onClose={() =>
              setShowAddLead(false)
            }
            onAdd={addLead}
          />
        )}
      </AnimatePresence>

      {/* ==================================================
          TOAST
          ================================================== */}

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
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-xl
              bg-[#0D1725]
              border
              border-[#18E0C4]/15
              shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
          >
            <Check
              size={17}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-[13px]
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

/* ===========================================================
   KPI
   =========================================================== */

function LeadKPI({
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
    red: {
      bg: "bg-[#EF4444]/[0.06]",
      text: "text-[#F87171]",
    },
    purple: {
      bg: "bg-[#8B5CF6]/[0.06]",
      text: "text-[#A78BFA]",
    },
    green: {
      bg: "bg-[#22C55E]/[0.06]",
      text: "text-[#4ADE80]",
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
        border
        border-white/[0.07]
        transition
      "
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-xl
            ${colors[accent].bg}
          `}
        >
          <Icon
            size={18}
            className={colors[accent].text}
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
          text-[26px]
          font-bold
          tracking-[-0.04em]
          text-white
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-[13px]
          font-semibold
          text-slate-300
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-[11px]
          text-slate-500
        "
      >
        {detail}
      </p>
    </motion.div>
  );
}

/* ===========================================================
   LEAD ROW
   =========================================================== */

function LeadRow({
  lead,
  index,
  onOpen,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.025,
      }}
      className="
        group
        grid
        grid-cols-1
        xl:grid-cols-[2fr_1.7fr_1fr_1.1fr_1.3fr_44px]
        gap-4
        px-5
        py-5
        border-b
        border-white/[0.04]
        hover:bg-white/[0.015]
        transition
      "
    >
      {/* Lead */}

      <div className="flex items-center gap-3">
        <div
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
            text-[12px]
            font-bold
            text-slate-300
          "
        >
          {lead.initials}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className="
                truncate
                text-[14px]
                font-semibold
                text-slate-200
                group-hover:text-white
              "
            >
              {lead.name}
            </p>

            <LeadStatus status={lead.status} />
          </div>

          <p
            className="
              mt-1
              truncate
              text-[11px]
              text-slate-500
            "
          >
            {lead.id} • {lead.source}
          </p>
        </div>
      </div>

      {/* Interest */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-lg
            bg-[#18E0C4]/[0.04]
            border
            border-[#18E0C4]/[0.08]
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              text-[#18E0C4]
            "
          >
            EV
          </span>
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[13px]
              font-semibold
              text-slate-300
            "
          >
            {lead.interest}
          </p>

          <p
            className="
              mt-1
              text-[11px]
              text-slate-500
            "
          >
            Budget {formatPrice(lead.budget)}
          </p>
        </div>
      </div>

      {/* Intent */}

      <div className="flex flex-col justify-center">
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
              text-[11px]
              text-slate-500
            "
          >
            Score
          </span>

          <span
            className="
              text-[12px]
              font-bold
              text-[#18E0C4]
            "
          >
            {lead.score}
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
              width: `${lead.score}%`,
            }}
          />
        </div>
      </div>

      {/* Stage */}

      <div className="flex items-center">
        <LeadStage stage={lead.stage} />
      </div>

      {/* Action */}

      <div className="flex flex-col justify-center">
        <p
          className="
            text-[12px]
            font-medium
            text-slate-300
          "
        >
          {lead.nextAction}
        </p>

        <p
          className="
            mt-1
            text-[11px]
            text-slate-500
          "
        >
          {lead.lastActivity}
        </p>
      </div>

      {/* Open */}

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${lead.name}`}
        className="
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-xl
          bg-white/[0.025]
          border
          border-white/[0.06]
          text-slate-500
          hover:text-[#18E0C4]
          hover:bg-[#18E0C4]/[0.05]
          transition
        "
      >
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

/* ===========================================================
   DRAWER
   =========================================================== */

function LeadDrawer({
  lead,
  onClose,
  onUpdate,
  onToast,
}) {
  const stages = [
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Lost",
  ];

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
        {/* Header */}

        <div
          className="
            relative
            p-6
            bg-gradient-to-br
            from-[#10222A]
            to-[#09111D]
            border-b
            border-white/[0.06]
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              top-5
              right-5
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.07]
              text-slate-400
              hover:text-white
              transition
            "
          >
            <X size={17} />
          </button>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                items-center
                justify-center
                w-14
                h-14
                rounded-2xl
                bg-[#18E0C4]/[0.08]
                border
                border-[#18E0C4]/10
                text-[14px]
                font-bold
                text-[#18E0C4]
              "
            >
              {lead.initials}
            </div>

            <div className="pr-12">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="
                    text-[21px]
                    font-bold
                    text-white
                  "
                >
                  {lead.name}
                </h2>

                <LeadStatus status={lead.status} />
              </div>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  text-slate-500
                "
              >
                {lead.id} • {lead.source}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Contact */}

          <DrawerSection
            icon={Users}
            title="Contact information"
          >
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
              "
            >
              <ContactBox
                icon={Phone}
                label="Phone"
                value={lead.phone}
              />

              <ContactBox
                icon={Mail}
                label="Email"
                value={lead.email}
              />

              <ContactBox
                icon={Target}
                label="Location"
                value={lead.location}
              />

              <ContactBox
                icon={Users}
                label="Advisor"
                value={lead.advisor}
              />
            </div>
          </DrawerSection>

          {/* Customer intent */}

          <DrawerSection
            icon={Target}
            title="Customer intent"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-white/[0.018]
                border
                border-white/[0.05]
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
                      text-[15px]
                      font-semibold
                      text-slate-200
                    "
                  >
                    {lead.interest}
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-[12px]
                      text-slate-500
                    "
                  >
                    Estimated budget{" "}
                    {formatPrice(lead.budget)}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-slate-600
                    "
                  >
                    Intent score
                  </p>

                  <p
                    className="
                      mt-1
                      text-[25px]
                      font-bold
                      text-[#18E0C4]
                    "
                  >
                    {lead.score}
                  </p>
                </div>
              </div>

              <div
                className="
                  h-2.5
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
                  "
                  style={{
                    width: `${lead.score}%`,
                  }}
                />
              </div>

              <div className="flex gap-2 mt-4">
                <IntentTag active={lead.finance}>
                  Finance
                </IntentTag>

                <IntentTag active={lead.exchange}>
                  Exchange
                </IntentTag>
              </div>
            </div>
          </DrawerSection>

          {/* Lifecycle */}

          <DrawerSection
            icon={TrendingUp}
            title="Lead lifecycle"
          >
            <div className="space-y-2">
              {stages.map((stage, index) => {
                const current =
                  stages.indexOf(lead.stage);

                const complete =
                  index <= current;

                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() =>
                      onUpdate(lead.id, {
                        stage,
                        status:
                          stage === "Lost"
                            ? "Cold"
                            : stage === "Converted"
                            ? "Hot"
                            : lead.status,
                      })
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      w-full
                      p-2
                      rounded-xl
                      text-left
                      hover:bg-white/[0.025]
                      transition
                    "
                  >
                    <span
                      className={`
                        flex
                        items-center
                        justify-center
                        w-8
                        h-8
                        rounded-full
                        border
                        text-[11px]
                        font-semibold
                        ${
                          complete
                            ? "bg-[#18E0C4]/10 border-[#18E0C4]/20 text-[#18E0C4]"
                            : "bg-white/[0.02] border-white/[0.06] text-slate-600"
                        }
                      `}
                    >
                      {complete ? (
                        <Check size={13} />
                      ) : (
                        index + 1
                      )}
                    </span>

                    <span
                      className={`
                        text-[13px]
                        ${
                          stage === lead.stage
                            ? "text-white font-semibold"
                            : complete
                            ? "text-slate-400"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {stage}
                    </span>

                    {stage === lead.stage && (
                      <span
                        className="
                          ml-auto
                          px-2.5
                          py-1
                          rounded-md
                          bg-[#18E0C4]/[0.06]
                          text-[10px]
                          font-semibold
                          text-[#18E0C4]
                        "
                      >
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </DrawerSection>

          {/* AI recommendation */}

          <DrawerSection
            icon={Sparkles}
            title="Next best action"
          >
            <div
              className="
                p-5
                rounded-2xl
                bg-gradient-to-br
                from-[#16142A]
                to-[#0D1725]
                border
                border-[#A78BFA]/10
              "
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="text-[#A78BFA]"
                />

                <span
                  className="
                    text-[13px]
                    font-semibold
                    text-[#C4B5FD]
                  "
                >
                  AI recommendation
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-[12px]
                  leading-6
                  text-slate-400
                "
              >
                {lead.nextAction}. This lead has a{" "}
                {lead.score}% intent score, so timely
                follow-up could materially improve
                conversion.
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
                  bg-[#A78BFA]/[0.07]
                  border
                  border-[#A78BFA]/10
                  text-[12px]
                  font-semibold
                  text-[#C4B5FD]
                  hover:bg-[#A78BFA]/[0.12]
                  transition
                "
              >
                <CalendarDays size={14} />
                Schedule follow-up
              </button>
            </div>
          </DrawerSection>

          {/* Activity */}

          <DrawerSection
            icon={Clock3}
            title="Activity timeline"
          >
            <div className="relative ml-2">
              <div
                className="
                  absolute
                  left-[5px]
                  top-2
                  bottom-2
                  w-px
                  bg-white/[0.06]
                "
              />

              <div className="space-y-6">
                {lead.activities.map(
                  (activity, index) => (
                    <div
                      key={`${activity}-${index}`}
                      className="
                        relative
                        pl-7
                      "
                    >
                      <span
                        className="
                          absolute
                          left-0
                          top-1
                          w-2.5
                          h-2.5
                          rounded-full
                          bg-[#18E0C4]
                          ring-4
                          ring-[#09111D]
                        "
                      />

                      <p
                        className="
                          text-[13px]
                          text-slate-400
                        "
                      >
                        {activity}
                      </p>

                      <p
                        className="
                          mt-1.5
                          text-[11px]
                          text-slate-600
                        "
                      >
                        {index === 0
                          ? lead.created
                          : lead.lastActivity}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </DrawerSection>

          {/* Actions */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              mt-8
              pt-5
              border-t
              border-white/[0.05]
            "
          >
            <button
              type="button"
              onClick={() =>
                onToast("Calling customer...")
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-[#18E0C4]/[0.05]
                border
                border-[#18E0C4]/10
                text-[13px]
                font-semibold
                text-[#18E0C4]
                hover:bg-[#18E0C4]/[0.1]
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
                  "WhatsApp conversation opened."
                )
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-white/[0.025]
                border
                border-white/[0.06]
                text-[13px]
                font-semibold
                text-slate-300
                hover:bg-white/[0.05]
                hover:text-white
                transition
              "
            >
              <MessageSquare size={15} />
              Message
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdate(lead.id, {
                  stage: "Qualified",
                  status: "Hot",
                  score: Math.max(
                    lead.score,
                    90
                  ),
                })
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-[#A78BFA]/[0.05]
                border
                border-[#A78BFA]/10
                text-[13px]
                font-semibold
                text-[#C4B5FD]
                hover:bg-[#A78BFA]/[0.1]
                transition
              "
            >
              <Target size={15} />
              Qualify
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdate(lead.id, {
                  stage: "Converted",
                  status: "Hot",
                  score: 100,
                })
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                h-11
                rounded-xl
                bg-[#22C55E]/[0.05]
                border
                border-[#22C55E]/10
                text-[13px]
                font-semibold
                text-[#4ADE80]
                hover:bg-[#22C55E]/[0.1]
                transition
              "
            >
              <Check size={15} />
              Convert lead
            </button>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

/* ===========================================================
   ADD LEAD MODAL
   =========================================================== */

function AddLeadModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    budget: "",
    source: "Website",
    advisor: "Rahul Kumar",
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
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.interest.trim()
    ) {
      setError(
        "Please enter name, phone and vehicle interest."
      );
      return;
    }

    const id = `LEAD-${Math.floor(
      Math.random() * 9000
    ) + 1000}`;

    const initials = form.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    onAdd({
      id,
      name: form.name.trim(),
      initials,
      phone: form.phone.trim(),
      email:
        form.email.trim() || "Not provided",
      source: form.source,
      interest: form.interest.trim(),
      budget: Number(form.budget) || 0,
      score: 50,
      status: "Warm",
      stage: "New",
      advisor: form.advisor,
      created: "Just now",
      lastActivity: "Just now",
      nextAction: "First contact",
      location: "Hyderabad",
      finance: false,
      exchange: false,
      notes:
        "New lead manually added.",
      activities: [
        "Lead created manually",
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
          scale: 0.96,
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
          max-w-[680px]
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.08]
          shadow-[0_30px_100px_rgba(0,0,0,0.65)]
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
            <div className="flex items-center gap-2.5">
              <UserPlus
                size={17}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.16em]
                  font-semibold
                  text-[#18E0C4]
                "
              >
                CRM
              </span>
            </div>

            <h2
              className="
                mt-2
                text-[21px]
                font-bold
                text-white
              "
            >
              Add new lead
            </h2>

            <p
              className="
                mt-1.5
                text-[12px]
                text-slate-500
              "
            >
              Capture a new customer enquiry.
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
              bg-white/[0.025]
              border
              border-white/[0.06]
              text-slate-400
              hover:text-white
              transition
            "
          >
            <X size={17} />
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
            label="Name"
            value={form.name}
            onChange={(value) =>
              update("name", value)
            }
            placeholder="Ananya Reddy"
          />

          <FormField
            label="Phone"
            value={form.phone}
            onChange={(value) =>
              update("phone", value)
            }
            placeholder="+91 98765 43210"
          />

          <FormField
            label="Email"
            value={form.email}
            onChange={(value) =>
              update("email", value)
            }
            placeholder="customer@email.com"
            type="email"
          />

          <FormField
            label="Vehicle interest"
            value={form.interest}
            onChange={(value) =>
              update("interest", value)
            }
            placeholder="Toyota Fortuner"
          />

          <FormField
            label="Budget"
            value={form.budget}
            onChange={(value) =>
              update("budget", value)
            }
            placeholder="5500000"
            type="number"
          />

          <FormSelect
            label="Lead source"
            value={form.source}
            onChange={(value) =>
              update("source", value)
            }
            options={[
              "Website",
              "Instagram",
              "Google Ads",
              "Walk-in",
              "Referral",
              "Facebook",
            ]}
          />

          <FormSelect
            label="Assign advisor"
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

          {error && (
            <div
              className="
                sm:col-span-2
                p-3.5
                rounded-xl
                bg-red-500/[0.06]
                border
                border-red-500/10
                text-[12px]
                text-red-300
              "
            >
              {error}
            </div>
          )}
        </div>

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
              bg-white/[0.025]
              border
              border-white/[0.06]
              text-[13px]
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.05]
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
              text-[13px]
              font-bold
              text-[#031014]
              hover:brightness-110
              transition
            "
          >
            Add lead
          </button>
        </div>
      </motion.form>
    </div>
  );
}

/* ===========================================================
   SMALL COMPONENTS
   =========================================================== */

function LeadStatus({ status }) {
  const styles = {
    Hot:
      "bg-red-500/[0.08] text-red-300 border-red-500/15",
    Warm:
      "bg-amber-500/[0.08] text-amber-300 border-amber-500/15",
    Cold:
      "bg-slate-500/[0.08] text-slate-400 border-slate-500/15",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        px-2.5
        py-1
        rounded-md
        border
        text-[10px]
        font-semibold
        ${styles[status] || styles.Cold}
      `}
    >
      <span
        className="
          w-1.5
          h-1.5
          rounded-full
          bg-current
        "
      />

      {status}
    </span>
  );
}

function LeadStage({ stage }) {
  const styles = {
    New:
      "bg-white/[0.04] text-slate-400 border-white/[0.07]",
    Contacted:
      "bg-blue-500/[0.07] text-blue-300 border-blue-500/10",
    Qualified:
      "bg-purple-500/[0.07] text-purple-300 border-purple-500/10",
    Converted:
      "bg-green-500/[0.07] text-green-300 border-green-500/10",
    Lost:
      "bg-red-500/[0.07] text-red-300 border-red-500/10",
  };

  return (
    <span
      className={`
        inline-flex
        px-3
        py-1.5
        rounded-lg
        border
        text-[11px]
        font-semibold
        ${styles[stage]}
      `}
    >
      {stage}
    </span>
  );
}

function ContactBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        p-4
        rounded-xl
        bg-white/[0.018]
        border
        border-white/[0.05]
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          w-9
          h-9
          shrink-0
          rounded-lg
          bg-white/[0.03]
        "
      >
        <Icon
          size={15}
          className="text-slate-500"
        />
      </div>

      <div className="min-w-0">
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
            mt-1
            truncate
            text-[13px]
            text-slate-300
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function IntentTag({
  active,
  children,
}) {
  return (
    <span
      className={`
        px-3
        py-1.5
        rounded-lg
        border
        text-[11px]
        font-medium
        ${
          active
            ? "bg-[#18E0C4]/[0.06] border-[#18E0C4]/10 text-[#18E0C4]"
            : "bg-white/[0.018] border-white/[0.05] text-slate-600"
        }
      `}
    >
      {children}
    </span>
  );
}

function LeadSelect({
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
          min-w-[130px]
          px-4
          pr-10
          rounded-xl
          appearance-none
          bg-[#0D1725]
          border
          border-white/[0.07]
          text-[12px]
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
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="
          absolute
          right-3.5
          top-1/2
          -translate-y-1/2
          text-slate-500
          pointer-events-none
        "
      />
    </div>
  );
}

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
          gap-2.5
          mb-4
        "
      >
        <Icon
          size={16}
          className="text-[#18E0C4]"
        />

        <h3
          className="
            text-[14px]
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
          text-[11px]
          uppercase
          tracking-wider
          font-semibold
          text-slate-500
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
          h-11
          px-4
          rounded-xl
          bg-white/[0.025]
          border
          border-white/[0.07]
          text-[13px]
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
          text-[11px]
          uppercase
          tracking-wider
          font-semibold
          text-slate-500
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
            px-4
            pr-10
            rounded-xl
            appearance-none
            bg-white/[0.025]
            border
            border-white/[0.07]
            text-[13px]
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
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="
            absolute
            right-3.5
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

function EmptyLeads({ onClear }) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
        mt-4
        rounded-2xl
        bg-[#0D1725]
        border
        border-white/[0.07]
        text-center
      "
    >
      <Users
        size={38}
        className="text-slate-700"
      />

      <p
        className="
          mt-5
          text-[16px]
          font-semibold
          text-slate-400
        "
      >
        No leads found
      </p>

      <p
        className="
          mt-2
          text-[13px]
          text-slate-600
        "
      >
        Try changing your filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          text-[13px]
          font-semibold
          text-[#18E0C4]
          hover:text-white
          transition
        "
      >
        Clear filters
      </button>
    </div>
  );
}

/* ===========================================================
   PRICE
   =========================================================== */

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
