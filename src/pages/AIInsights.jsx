import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  DollarSign,
  Gauge,
  Lightbulb,
  RefreshCw,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";

/* =========================================================
   AI INSIGHTS
   ========================================================= */

function AIInsights() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [refreshing, setRefreshing] =
    useState(false);

  const [selectedInsight, setSelectedInsight] =
    useState(null);

  const [toast, setToast] = useState("");

  /* =======================================================
     INSIGHTS DATA
     ======================================================= */

  const insights = [
    {
      id: 1,
      type: "opportunity",
      category: "Sales",
      title: "SUV demand is accelerating",
      description:
        "SUV enquiries increased 24% over the last 14 days. Your current SUV inventory can support approximately 9 more sales before stock becomes constrained.",
      impact: "+24%",
      impactLabel: "Demand",
      icon: TrendingUp,
      color: "cyan",
      priority: "High",
      recommendation:
        "Increase focus on SUV inventory, especially high-performing models such as Fortuner and Creta. Prioritise these vehicles for incoming leads.",
    },

    {
      id: 2,
      type: "warning",
      category: "Inventory",
      title: "3 vehicles are ageing",
      description:
        "Three vehicles have remained in inventory for more than 45 days. Consider targeted pricing or promotional campaigns to improve inventory velocity.",
      impact: "45+",
      impactLabel: "Days",
      icon: CircleAlert,
      color: "amber",
      priority: "High",
      recommendation:
        "Create targeted promotions for the three ageing vehicles and review their pricing before the inventory holding period increases further.",
    },

    {
      id: 3,
      type: "opportunity",
      category: "Customers",
      title: "Returning customers detected",
      description:
        "18 existing customers have recently interacted with your dealership. These customers have a higher estimated conversion probability.",
      impact: "18",
      impactLabel: "Customers",
      icon: Users,
      color: "violet",
      priority: "Medium",
      recommendation:
        "Contact these returning customers with personalised offers based on their previous interactions and vehicle preferences.",
    },

    {
      id: 4,
      type: "performance",
      category: "Revenue",
      title: "Average deal value improved",
      description:
        "Your average transaction value is 11.8% higher than the previous period, driven primarily by premium vehicle sales.",
      impact: "+11.8%",
      impactLabel: "Deal value",
      icon: DollarSign,
      color: "green",
      priority: "Medium",
      recommendation:
        "Continue promoting premium inventory while maintaining strong follow-up on customers showing high purchase intent.",
    },

    {
      id: 5,
      type: "opportunity",
      category: "Inventory",
      title: "EV interest is rising",
      description:
        "Electric vehicle enquiries increased significantly this week. Expanding EV inventory could capture additional demand.",
      impact: "+18%",
      impactLabel: "EV interest",
      icon: Zap,
      color: "blue",
      priority: "Medium",
      recommendation:
        "Consider increasing EV stock gradually and create dedicated campaigns for customers showing EV purchase intent.",
    },

    {
      id: 6,
      type: "warning",
      category: "Sales",
      title: "Lead response time increased",
      description:
        "Average response time increased during peak afternoon hours. Faster responses could improve lead-to-test-drive conversion.",
      impact: "+14m",
      impactLabel: "Response",
      icon: Gauge,
      color: "orange",
      priority: "Low",
      recommendation:
        "Assign additional lead coverage during afternoon peak hours to reduce response time and improve test-drive conversion.",
    },
  ];

  /* =======================================================
     FILTERS
     ======================================================= */

  const filters = [
    "All",
    "Sales",
    "Inventory",
    "Customers",
    "Revenue",
  ];

  const filteredInsights = useMemo(() => {
    if (activeFilter === "All") {
      return insights;
    }

    return insights.filter(
      (insight) =>
        insight.category === activeFilter
    );
  }, [activeFilter]);

  /* =======================================================
     TOAST
     ======================================================= */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__autoEliteInsightToast
    );

    window.__autoEliteInsightToast =
      window.setTimeout(() => {
        setToast("");
      }, 2400);
  };

  /* =======================================================
     REFRESH
     ======================================================= */

  const handleRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);

    window.setTimeout(() => {
      setRefreshing(false);

      showToast(
        "AI insights refreshed successfully."
      );
    }, 900);
  };

  /* =======================================================
     RETURN
     ======================================================= */

  return (
    <div
      className="
        relative
        min-h-full
        w-full
        max-w-[1700px]
        mx-auto
        pb-10
      "
    >

      {/* ===================================================
          HERO
          =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.065]
          bg-gradient-to-br
          from-[#0D1725]
          via-[#09131F]
          to-[#0A101B]
          p-6
          sm:p-8
          lg:p-9
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
        "
      >

        {/* Background glow */}

        <div
          className="
            absolute
            -top-32
            right-[-40px]
            w-[360px]
            h-[360px]
            rounded-full
            bg-[#8B5CF6]/[0.08]
            blur-[100px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-[35%]
            w-[280px]
            h-[280px]
            rounded-full
            bg-[#18E0C4]/[0.045]
            blur-[100px]
            pointer-events-none
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-7
          "
        >

          {/* TITLE */}

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-[#8B5CF6]/[0.07]
                border
                border-[#8B5CF6]/15
                text-xs
                uppercase
                tracking-[0.15em]
                font-semibold
                text-[#A78BFA]
              "
            >
              <Sparkles size={13} />

              AI Dealership Intelligence
            </div>

            <h1
              className="
                mt-5
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Smarter decisions,
              <span
                className="
                  ml-2
                  bg-gradient-to-r
                  from-[#18E0C4]
                  via-[#28D7FF]
                  to-[#A78BFA]
                  bg-clip-text
                  text-transparent
                "
              >
                powered by AI.
              </span>
            </h1>

            <p
              className="
                mt-3
                max-w-[700px]
                text-sm
                sm:text-base
                leading-6
                text-slate-500
              "
            >
              AutoElite continuously analyses your
              dealership data to identify sales,
              inventory and customer opportunities.
            </p>

          </div>

          {/* REFRESH */}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="
              self-start
              lg:self-center
              flex
              items-center
              gap-2
              h-11
              px-5
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.07]
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.055]
              disabled:opacity-50
              transition
            "
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Analysing..."
              : "Refresh Insights"}
          </button>

        </div>

        {/* AI STATUS */}

        <div
          className="
            relative
            z-10
            flex
            flex-wrap
            items-center
            gap-x-6
            gap-y-3
            mt-8
            pt-5
            border-t
            border-white/[0.05]
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
                w-2
                h-2
                rounded-full
                bg-[#22C55E]
                shadow-[0_0_10px_rgba(34,197,94,0.8)]
              "
            />

            <span
              className="
                text-xs
                text-slate-500
              "
            >
              AI engine operational
            </span>
          </div>

          <div
            className="
              text-xs
              text-slate-600
            "
          >
            Last analysed 4 minutes ago
          </div>

          <div
            className="
              text-xs
              text-slate-600
            "
          >
            1,842 data points analysed
          </div>

        </div>

      </section>

      {/* ===================================================
          KPI STRIP
          =================================================== */}

      <section
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          mt-5
        "
      >

        <InsightMetric
          icon={Lightbulb}
          label="Active insights"
          value="06"
          detail="3 high priority"
          positive
        />

        <InsightMetric
          icon={TrendingUp}
          label="Revenue opportunity"
          value="₹8.4L"
          detail="Estimated potential"
          positive
        />

        <InsightMetric
          icon={CarFront}
          label="Inventory actions"
          value="03"
          detail="Require attention"
        />

        <InsightMetric
          icon={CheckCircle2}
          label="AI confidence"
          value="94%"
          detail="High confidence"
          positive
        />

      </section>

      {/* ===================================================
          FILTERS
          =================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mt-8
        "
      >

        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Recommended Actions
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-600
            "
          >
            Insights ranked by business impact
          </p>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-1
            p-1
            rounded-xl
            bg-white/[0.02]
            border
            border-white/[0.045]
          "
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setActiveFilter(filter)
              }
              className={`
                px-4
                py-2
                rounded-lg
                text-xs
                font-semibold
                transition
                ${
                  activeFilter === filter
                    ? `
                      bg-white/[0.07]
                      text-white
                      shadow-sm
                    `
                    : `
                      text-slate-600
                      hover:text-slate-300
                    `
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* ===================================================
          INSIGHT GRID
          =================================================== */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-5
          mt-5
        "
      >

        {filteredInsights.map(
          (insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onOpen={() =>
                setSelectedInsight(
                  insight
                )
              }
            />
          )
        )}

      </section>

      {/* EMPTY STATE */}

      {filteredInsights.length === 0 && (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#0A111D]
            p-10
            text-center
          "
        >
          <BrainCircuit
            size={28}
            className="
              mx-auto
              text-slate-600
            "
          />

          <h3
            className="
              mt-4
              text-lg
              font-semibold
              text-white
            "
          >
            No insights found
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
            "
          >
            There are currently no AI insights
            for this category.
          </p>
        </div>
      )}

      {/* ===================================================
          AI RECOMMENDATION
          =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          mt-6
          rounded-2xl
          border
          border-[#18E0C4]/10
          bg-gradient-to-r
          from-[#18E0C4]/[0.045]
          via-[#8B5CF6]/[0.035]
          to-transparent
          p-5
          sm:p-6
        "
      >

        <div
          className="
            absolute
            -right-10
            -top-20
            w-48
            h-48
            rounded-full
            bg-[#18E0C4]/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
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
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-[#18E0C4]/[0.07]
                border
                border-[#18E0C4]/10
              "
            >
              <BrainCircuit
                size={19}
                className="text-[#18E0C4]"
              />
            </div>

            <div>

              <p
                className="
                  text-base
                  font-semibold
                  text-white
                "
              >
                AI Recommendation
              </p>

              <p
                className="
                  mt-1
                  max-w-[700px]
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Prioritise the three ageing SUV
                units this week and target returning
                customers with personalised offers.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/inventory")
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              shrink-0
              h-11
              px-5
              rounded-xl
              bg-[#18E0C4]/[0.08]
              border
              border-[#18E0C4]/15
              text-sm
              font-semibold
              text-[#18E0C4]
              hover:bg-[#18E0C4]/[0.13]
              transition
            "
          >
            Review Inventory

            <ArrowRight size={15} />
          </button>

        </div>

      </section>

      {/* ===================================================
          DETAIL MODAL
          =================================================== */}

      {selectedInsight && (
        <InsightModal
          insight={selectedInsight}
          onClose={() =>
            setSelectedInsight(null)
          }
          onAction={() => {
            setSelectedInsight(null);

            if (
              selectedInsight.category ===
              "Inventory"
            ) {
              navigate("/inventory");
              return;
            }

            showToast(
              "Recommendation added to workflow."
            );
          }}
        />
      )}

      {/* ===================================================
          TOAST
          =================================================== */}

      {toast && (
        <div
          className="
            fixed
            right-5
            bottom-5
            z-[400]
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
          <div
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              bg-[#18E0C4]/10
            "
          >
            <BrainCircuit
              size={16}
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
        </div>
      )}

    </div>
  );
}

/* =========================================================
   METRIC
   ========================================================= */

function InsightMetric({
  icon: Icon,
  label,
  value,
  detail,
  positive = false,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        p-5
        rounded-2xl
        bg-[#0A111D]
        border
        border-white/[0.05]
        hover:border-white/[0.08]
        transition
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
          bg-[#18E0C4]/[0.045]
          border
          border-[#18E0C4]/[0.08]
        "
      >
        <Icon
          size={18}
          className={
            positive
              ? "text-[#18E0C4]"
              : "text-slate-500"
          }
        />
      </div>

      <div className="min-w-0">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.1em]
            text-slate-600
          "
        >
          {label}
        </p>

        <div
          className="
            flex
            items-baseline
            gap-2
            mt-1
          "
        >

          <p
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {value}
          </p>

          <p
            className="
              truncate
              text-xs
              text-slate-600
            "
          >
            {detail}
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   INSIGHT CARD
   ========================================================= */

function InsightCard({
  insight,
  onOpen,
}) {
  const Icon = insight.icon;

  const styles = {
    cyan: {
      icon: "text-[#18E0C4]",
      bg: "bg-[#18E0C4]/[0.055]",
      border: "border-[#18E0C4]/10",
    },

    amber: {
      icon: "text-[#FBBF24]",
      bg: "bg-[#F59E0B]/[0.055]",
      border: "border-[#F59E0B]/10",
    },

    violet: {
      icon: "text-[#A78BFA]",
      bg: "bg-[#8B5CF6]/[0.055]",
      border: "border-[#8B5CF6]/10",
    },

    green: {
      icon: "text-[#4ADE80]",
      bg: "bg-[#22C55E]/[0.055]",
      border: "border-[#22C55E]/10",
    },

    blue: {
      icon: "text-[#38BDF8]",
      bg: "bg-[#28D7FF]/[0.055]",
      border: "border-[#28D7FF]/10",
    },

    orange: {
      icon: "text-[#FB923C]",
      bg: "bg-[#F97316]/[0.055]",
      border: "border-[#F97316]/10",
    },
  };

  const style =
    styles[insight.color] ||
    styles.cyan;

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-[#0A111D]
        border
        border-white/[0.05]
        hover:border-white/[0.09]
        transition-all
        duration-300
        hover:-translate-y-[2px]
      "
    >

      {/* Priority */}

      <div
        className={`
          absolute
          top-0
          left-0
          w-full
          h-[2px]
          ${
            insight.priority === "High"
              ? "bg-gradient-to-r from-[#18E0C4] to-transparent"
              : "bg-white/[0.035]"
          }
        `}
      />

      <div className="p-6">

        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-5
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
              className={`
                flex
                items-center
                justify-center
                w-11
                h-11
                shrink-0
                rounded-xl
                border
                ${style.bg}
                ${style.border}
              `}
            >
              <Icon
                size={19}
                className={style.icon}
              />
            </div>

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
                    text-xs
                    uppercase
                    tracking-[0.12em]
                    font-semibold
                    text-slate-600
                  "
                >
                  {insight.category}
                </span>

                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-slate-800
                  "
                />

                <span
                  className={`
                    text-xs
                    font-semibold
                    ${
                      insight.priority ===
                      "High"
                        ? "text-[#18E0C4]"
                        : "text-slate-600"
                    }
                  `}
                >
                  {insight.priority}
                </span>

              </div>

              <h3
                className="
                  mt-1.5
                  text-lg
                  font-semibold
                  text-white
                "
              >
                {insight.title}
              </h3>

            </div>

          </div>

          {/* IMPACT */}

          <div
            className="
              text-right
              shrink-0
            "
          >

            <p
              className="
                text-xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {insight.impact}
            </p>

            <p
              className="
                mt-1
                text-xs
                uppercase
                tracking-[0.1em]
                text-slate-600
              "
            >
              {insight.impactLabel}
            </p>

          </div>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            text-sm
            leading-6
            text-slate-500
          "
        >
          {insight.description}
        </p>

        {/* ACTION */}

        <button
          type="button"
          onClick={onOpen}
          className="
            group/button
            flex
            items-center
            gap-2
            mt-6
            text-sm
            font-semibold
            text-slate-500
            hover:text-[#18E0C4]
            transition
          "
        >
          View Recommendation

          <ChevronRight
            size={15}
            className="
              transition
              group-hover/button:translate-x-0.5
            "
          />
        </button>

      </div>

    </article>
  );
}

/* =========================================================
   INSIGHT MODAL
   ========================================================= */

function InsightModal({
  insight,
  onClose,
  onAction,
}) {
  const Icon = insight.icon;

  return (
    <div
      className="
        fixed
        inset-0
        z-[500]
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >

      <div
        className="
          w-full
          max-w-[560px]
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.08]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
          p-6
          sm:p-7
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

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
              rounded-xl
              bg-[#18E0C4]/[0.06]
              border
              border-[#18E0C4]/10
            "
          >
            <Icon
              size={21}
              className="text-[#18E0C4]"
            />
          </div>

          <div className="flex-1">

            <p
              className="
                text-xs
                uppercase
                tracking-[0.15em]
                text-[#18E0C4]
              "
            >
              {insight.category}
            </p>

            <h3
              className="
                mt-1.5
                text-xl
                font-semibold
                text-white
              "
            >
              {insight.title}
            </h3>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              bg-white/[0.035]
              text-slate-500
              hover:text-white
              hover:bg-white/[0.06]
              transition
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            text-sm
            leading-6
            text-slate-400
          "
        >
          {insight.description}
        </p>

        {/* METRICS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mt-5
          "
        >

          <div
            className="
              rounded-xl
              p-4
              bg-white/[0.025]
              border
              border-white/[0.045]
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
              Impact
            </p>

            <p
              className="
                mt-2
                text-2xl
                font-bold
                text-white
              "
            >
              {insight.impact}
            </p>
          </div>

          <div
            className="
              rounded-xl
              p-4
              bg-white/[0.025]
              border
              border-white/[0.045]
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
              Priority
            </p>

            <p
              className={`
                mt-2
                text-2xl
                font-bold
                ${
                  insight.priority ===
                  "High"
                    ? "text-[#18E0C4]"
                    : "text-white"
                }
              `}
            >
              {insight.priority}
            </p>
          </div>

        </div>

        {/* RECOMMENDATION */}

        <div
          className="
            mt-5
            p-5
            rounded-xl
            bg-white/[0.025]
            border
            border-white/[0.045]
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
              size={15}
              className="text-[#A78BFA]"
            />

            <span
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Recommended Action
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            {insight.recommendation}
          </p>

        </div>

        {/* BUTTONS */}

        <div
          className="
            flex
            flex-col-reverse
            sm:flex-row
            gap-3
            mt-6
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              h-11
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.06]
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              transition
            "
          >
            Close
          </button>

          <button
            type="button"
            onClick={onAction}
            className="
              flex-1
              h-11
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              via-[#28D7FF]
              to-[#8B5CF6]
              text-sm
              font-bold
              text-[#031014]
              hover:brightness-105
              transition
            "
          >
            Apply Recommendation
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIInsights;
