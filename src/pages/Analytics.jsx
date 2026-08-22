import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CarFront,
  CircleDollarSign,
  Download,
  Gauge,
  Layers3,
  Lightbulb,
  PieChart,
  RefreshCw,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";

/* =========================================================
   ANALYTICS DATA
   ========================================================= */

const analyticsData = {
  "7D": {
    revenue: [18, 22, 19, 27, 24, 31, 36],
    units: [8, 10, 9, 13, 11, 15, 17],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },

  "30D": {
    revenue: [
      42, 48, 45, 53, 58, 55, 64,
      61, 69, 73, 68, 76, 81, 78,
      86, 82, 91, 88, 96, 102, 98,
      108, 104, 115, 111, 120, 116,
      127, 123, 134, 141,
    ],
    units: [
      19, 21, 20, 24, 26, 25, 29,
      28, 31, 33, 30, 34, 37, 35,
      39, 37, 41, 40, 44, 47, 45,
      49, 48, 52, 50, 55, 53, 58, 61,
    ],
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
  },

  "90D": {
    revenue: [
      48, 54, 51, 62, 58, 67, 73,
      69, 78, 84, 80, 92, 97, 103,
      99, 110, 117, 112, 124, 130,
      126, 138, 145, 151, 148, 162,
      169, 175, 171, 184,
    ],
    units: [
      21, 24, 23, 27, 26, 30, 32,
      31, 35, 37, 36, 41, 43, 45,
      44, 48, 51, 49, 54, 57,
      55, 60, 63, 66, 64, 70,
      73, 76, 74, 81,
    ],
    labels: [
      "W1",
      "W2",
      "W3",
      "W4",
      "W5",
      "W6",
      "W7",
      "W8",
      "W9",
      "W10",
      "W11",
      "W12",
      "W13",
      "W14",
      "W15",
      "W16",
      "W17",
      "W18",
      "W19",
      "W20",
      "W21",
      "W22",
      "W23",
      "W24",
      "W25",
      "W26",
      "W27",
      "W28",
      "W29",
      "W30",
    ],
  },
};

const salesByMonth = [
  {
    month: "Mar",
    sales: 84,
    revenue: 18.2,
  },
  {
    month: "Apr",
    sales: 96,
    revenue: 21.4,
  },
  {
    month: "May",
    sales: 109,
    revenue: 24.8,
  },
  {
    month: "Jun",
    sales: 118,
    revenue: 26.9,
  },
  {
    month: "Jul",
    sales: 132,
    revenue: 29.7,
  },
  {
    month: "Aug",
    sales: 147,
    revenue: 34.1,
  },
];

const vehicleSegments = [
  {
    name: "SUV",
    value: 42,
    units: 184,
    growth: "+14.8%",
  },
  {
    name: "Sedan",
    value: 24,
    units: 106,
    growth: "+6.4%",
  },
  {
    name: "Hatchback",
    value: 14,
    units: 61,
    growth: "-2.1%",
  },
  {
    name: "Luxury",
    value: 12,
    units: 53,
    growth: "+18.2%",
  },
  {
    name: "EV",
    value: 8,
    units: 35,
    growth: "+27.6%",
  },
];

const funnel = [
  {
    stage: "New leads",
    count: 1842,
    conversion: 100,
  },
  {
    stage: "Contacted",
    count: 1284,
    conversion: 69.7,
  },
  {
    stage: "Qualified",
    count: 846,
    conversion: 45.9,
  },
  {
    stage: "Test drive",
    count: 528,
    conversion: 28.7,
  },
  {
    stage: "Negotiation",
    count: 312,
    conversion: 16.9,
  },
  {
    stage: "Won",
    count: 147,
    conversion: 8.0,
  },
];

const inventoryHealth = [
  {
    label: "Healthy",
    value: 68,
    count: 296,
  },
  {
    label: "Slow moving",
    value: 21,
    count: 91,
  },
  {
    label: "Critical",
    value: 11,
    count: 48,
  },
];

const topModels = [
  {
    name: "Toyota Fortuner",
    units: 28,
    revenue: "₹9.8Cr",
    change: "+21.4%",
  },
  {
    name: "BMW X5",
    units: 19,
    revenue: "₹8.2Cr",
    change: "+16.8%",
  },
  {
    name: "Hyundai Creta",
    units: 34,
    revenue: "₹6.9Cr",
    change: "+11.2%",
  },
  {
    name: "Mercedes GLC",
    units: 14,
    revenue: "₹6.4Cr",
    change: "+8.7%",
  },
  {
    name: "Audi Q5",
    units: 11,
    revenue: "₹4.8Cr",
    change: "-3.2%",
  },
];

const insights = [
  {
    type: "opportunity",
    title: "SUV demand is accelerating",
    description:
      "SUV enquiries are 18.4% higher than the previous period. Increasing Fortuner and Creta stock could reduce lost sales.",
    impact: "High impact",
    icon: TrendingUp,
  },
  {
    type: "warning",
    title: "48 vehicles need attention",
    description:
      "Critical inventory has increased by 6.2%. Consider targeted pricing campaigns for slow-moving vehicles.",
    impact: "Medium impact",
    icon: TrendingDown,
  },
  {
    type: "opportunity",
    title: "EV conversion opportunity",
    description:
      "EV leads have the highest month-over-month growth at 27.6%, but current EV inventory is only 8% of stock.",
    impact: "High impact",
    icon: Zap,
  },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

function Analytics() {
  const [range, setRange] = useState("30D");
  const [metric, setMetric] = useState("revenue");
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);

  const currentData = analyticsData[range];

  const chartData =
    metric === "revenue"
      ? currentData.revenue
      : currentData.units;

  const maxValue = Math.max(...chartData);

  const averageValue = Math.round(
    chartData.reduce((sum, value) => sum + value, 0) /
      chartData.length
  );

  const latestValue = chartData[chartData.length - 1];

  const growth =
    chartData.length > 1
      ? ((latestValue - chartData[0]) /
          chartData[0]) *
        100
      : 0;

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__autoEliteAnalyticsToast);

    window.__autoEliteAnalyticsToast = window.setTimeout(() => {
      setToast("");
    }, 2400);
  };

  const handleRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);

    window.setTimeout(() => {
      setRefreshing(false);
      showToast("Analytics refreshed successfully.");
    }, 900);
  };

  const handleExport = () => {
    const report = [
      "AutoElite Analytics Report",
      `Period: ${range}`,
      `Metric: ${metric === "revenue" ? "Revenue" : "Units Sold"}`,
      `Current: ${latestValue}`,
      `Average: ${averageValue}`,
      `Growth: ${growth.toFixed(1)}%`,
      "",
      "Top Models:",
      ...topModels.map(
        (model) =>
          `${model.name} - ${model.units} units - ${model.revenue}`
      ),
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `autoelite-analytics-${range.toLowerCase()}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showToast("Analytics report exported.");
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto pb-10">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-end
          xl:justify-between
          gap-5
          mb-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#18E0C4]
                shadow-[0_0_12px_rgba(24,224,196,0.7)]
              "
            />

            <span
              className="
                text-[11px]
                sm:text-xs
                uppercase
                tracking-[0.18em]
                font-semibold
                text-[#18E0C4]
              "
            >
              Intelligence Center
            </span>
          </div>

          <h1
            className="
              mt-2
              text-3xl
              sm:text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Analytics
          </h1>

          <p
            className="
              mt-2
              text-sm
              sm:text-base
              text-slate-500
              max-w-2xl
            "
          >
            Understand performance, discover opportunities
            and make faster dealership decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <RangeSelector
            value={range}
            onChange={setRange}
          />

          <button
            type="button"
            onClick={handleRefresh}
            className="
              h-11
              px-4
              rounded-xl
              flex
              items-center
              gap-2
              bg-white/[0.025]
              border
              border-white/[0.07]
              text-sm
              font-medium
              text-slate-300
              hover:text-white
              hover:bg-white/[0.05]
              transition-all
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

            Refresh
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="
              h-11
              px-5
              rounded-xl
              flex
              items-center
              gap-2
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm
              font-bold
              text-[#031014]
              shadow-[0_8px_25px_rgba(24,224,196,0.12)]
              hover:brightness-110
              transition-all
            "
          >
            <Download size={16} />
            Export Report
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
          mb-5
        "
      >
        <AnalyticsKPI
          icon={CircleDollarSign}
          label="Revenue"
          value="₹34.1Cr"
          change="+18.7%"
          positive
          detail="vs previous period"
        />

        <AnalyticsKPI
          icon={CarFront}
          label="Vehicles Sold"
          value="147"
          change="+11.4%"
          positive
          detail="units this period"
        />

        <AnalyticsKPI
          icon={Users}
          label="New Customers"
          value="386"
          change="+22.1%"
          positive
          detail="qualified profiles"
        />

        <AnalyticsKPI
          icon={Target}
          label="Conversion"
          value="8.0%"
          change="+1.2pp"
          positive
          detail="lead → sale"
        />
      </div>

      {/* =====================================================
          MAIN CHART + AI
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)]
          gap-5
          mb-5
        "
      >

        {/* ===================================================
            REVENUE CHART
            =================================================== */}

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-start
              sm:justify-between
              gap-5
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    bg-[#18E0C4]/[0.07]
                    border
                    border-[#18E0C4]/10
                  "
                >
                  <BarChart3
                    size={19}
                    className="text-[#18E0C4]"
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    Revenue Performance
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Sales and revenue progression
                  </p>
                </div>
              </div>

              <div className="flex items-end gap-4 mt-6">
                <span
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                    text-white
                  "
                >
                  {metric === "revenue"
                    ? `₹${latestValue}L`
                    : latestValue}
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    mb-1
                    text-sm
                    font-semibold
                    text-[#4ADE80]
                  "
                >
                  <ArrowUpRight size={15} />
                  {growth.toFixed(1)}%
                </span>
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  text-slate-500
                "
              >
                Current {metric === "revenue"
                  ? "revenue run-rate"
                  : "units sold run-rate"}
              </p>
            </div>

            {/* METRIC SWITCH */}

            <div
              className="
                flex
                p-1
                rounded-xl
                bg-white/[0.025]
                border
                border-white/[0.06]
              "
            >
              {[
                ["revenue", "Revenue"],
                ["sales", "Units"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMetric(value)}
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      metric === value
                        ? `
                          bg-[#18E0C4]/[0.09]
                          text-[#18E0C4]
                        `
                        : `
                          text-slate-500
                          hover:text-white
                        `
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <RevenueChart
            data={chartData}
            labels={currentData.labels}
            max={maxValue}
          />

          <div
            className="
              grid
              grid-cols-3
              gap-3
              mt-5
              pt-5
              border-t
              border-white/[0.05]
            "
          >
            <MiniMetric
              label="Average"
              value={
                metric === "revenue"
                  ? `₹${averageValue}L`
                  : averageValue
              }
            />

            <MiniMetric
              label="Peak"
              value={
                metric === "revenue"
                  ? `₹${maxValue}L`
                  : maxValue
              }
            />

            <MiniMetric
              label="Growth"
              value={`+${growth.toFixed(1)}%`}
              positive
            />
          </div>
        </section>

        {/* ===================================================
            AI BUSINESS PULSE
            =================================================== */}

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-[#18E0C4]/10
            p-5
            sm:p-6
          "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-[#18E0C4]/[0.07]
                  border
                  border-[#18E0C4]/10
                "
              >
                <Sparkles
                  size={18}
                  className="text-[#18E0C4]"
                />
              </div>

              <div>
                <h2
                  className="
                    text-base
                    font-semibold
                    text-white
                  "
                >
                  AI Business Pulse
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Updated 4 minutes ago
                </p>
              </div>
            </div>

            <span
              className="
                px-3
                py-1.5
                rounded-lg
                bg-[#22C55E]/[0.08]
                text-xs
                font-semibold
                text-[#86EFAC]
              "
            >
              Healthy
            </span>
          </div>

          <div
            className="
              mt-6
              p-5
              rounded-xl
              bg-[#18E0C4]/[0.035]
              border
              border-[#18E0C4]/[0.08]
            "
          >
            <div className="flex items-center gap-2">
              <Gauge
                size={17}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#7DD3C7]
                "
              >
                Business Momentum
              </span>
            </div>

            <p
              className="
                mt-3
                text-4xl
                font-bold
                text-white
              "
            >
              86
              <span
                className="
                  ml-1
                  text-sm
                  font-medium
                  text-slate-500
                "
              >
                /100
              </span>
            </p>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              Revenue, customer acquisition and
              inventory velocity are all trending
              positively.
            </p>
          </div>

          <div className="space-y-3 mt-4">
            {insights.slice(0, 2).map((insight) => (
              <InsightMini
                key={insight.title}
                insight={insight}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              showToast(
                "AI recommendations opened."
              )
            }
            className="
              w-full
              h-11
              mt-4
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.06]
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.05]
              transition-all
            "
          >
            View All Recommendations
          </button>
        </section>
      </div>

      {/* =====================================================
          SALES + VEHICLE MIX
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-5
          mb-5
        "
      >

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-6
          "
        >
          <AnalyticsSectionHeader
            icon={TrendingUp}
            title="Sales Trend"
            description="Units sold and revenue progression."
          />

          <SalesBars />

          <div
            className="
              grid
              grid-cols-3
              gap-3
              mt-5
            "
          >
            <MiniMetric
              label="Best Month"
              value="Aug"
            />

            <MiniMetric
              label="Units"
              value="147"
            />

            <MiniMetric
              label="Revenue"
              value="₹34.1Cr"
            />
          </div>
        </section>

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-6
          "
        >
          <AnalyticsSectionHeader
            icon={PieChart}
            title="Vehicle Mix"
            description="Sales distribution by vehicle category."
          />

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-8
              mt-7
            "
          >
            <DonutChart />

            <div className="flex-1 space-y-4">
              {vehicleSegments.map((segment) => (
                <VehicleSegment
                  key={segment.name}
                  segment={segment}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          FUNNEL + INVENTORY
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.25fr_0.75fr]
          gap-5
          mb-5
        "
      >

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-6
          "
        >
          <AnalyticsSectionHeader
            icon={Target}
            title="Sales Funnel"
            description="Lead progression across the dealership pipeline."
          />

          <div className="space-y-5 mt-7">
            {funnel.map((stage, index) => (
              <FunnelRow
                key={stage.stage}
                stage={stage}
                index={index}
              />
            ))}
          </div>
        </section>

        <section
          className="
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-6
          "
        >
          <AnalyticsSectionHeader
            icon={Layers3}
            title="Inventory Health"
            description="Current stock quality and velocity."
          />

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              gap-7
              mt-7
            "
          >
            <InventoryRing />

            <div className="flex-1 space-y-5">
              {inventoryHealth.map((item) => (
                <div key={item.label}>
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          w-2
                          h-2
                          rounded-full
                          ${
                            item.label === "Healthy"
                              ? "bg-[#22C55E]"
                              : item.label === "Slow moving"
                              ? "bg-[#FBBF24]"
                              : "bg-[#EF4444]"
                          }
                        `}
                      />

                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-300
                        "
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {item.count}
                    </span>
                  </div>

                  <div
                    className="
                      h-2
                      mt-2
                      rounded-full
                      bg-white/[0.04]
                      overflow-hidden
                    "
                  >
                    <div
                      className={`
                        h-full
                        rounded-full
                        ${
                          item.label === "Healthy"
                            ? "bg-[#22C55E]/70"
                            : item.label === "Slow moving"
                            ? "bg-[#FBBF24]/70"
                            : "bg-[#EF4444]/70"
                        }
                      `}
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="
              mt-6
              p-4
              rounded-xl
              bg-[#FBBF24]/[0.035]
              border
              border-[#FBBF24]/[0.08]
            "
          >
            <div className="flex items-center gap-2">
              <Lightbulb
                size={16}
                className="text-[#FBBF24]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#FCD34D]
                "
              >
                Attention Needed
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              48 vehicles have been classified as
              critical inventory. Consider targeted
              promotions.
            </p>
          </div>
        </section>
      </div>

      {/* =====================================================
          TOP MODELS
          ===================================================== */}

      <section
        className="
          rounded-2xl
          bg-gradient-to-br
          from-[#0D1725]
          to-[#09111D]
          border
          border-white/[0.06]
          p-5
          sm:p-6
        "
      >
        <AnalyticsSectionHeader
          icon={CarFront}
          title="Top Performing Models"
          description="Models contributing the most to dealership revenue."
        />

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr
                className="
                  border-b
                  border-white/[0.06]
                "
              >
                <AnalyticsHead>
                  Model
                </AnalyticsHead>

                <AnalyticsHead>
                  Units Sold
                </AnalyticsHead>

                <AnalyticsHead>
                  Revenue
                </AnalyticsHead>

                <AnalyticsHead>
                  Growth
                </AnalyticsHead>

                <AnalyticsHead>
                  Action
                </AnalyticsHead>
              </tr>
            </thead>

            <tbody>
              {topModels.map((model, index) => (
                <tr
                  key={model.name}
                  className="
                    border-b
                    border-white/[0.04]
                    last:border-0
                    hover:bg-white/[0.015]
                    transition-colors
                  "
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-9
                          h-9
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          bg-[#18E0C4]/[0.06]
                          border
                          border-[#18E0C4]/10
                          text-xs
                          font-bold
                          text-[#18E0C4]
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {model.name}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className="
                        text-sm
                        text-slate-400
                      "
                    >
                      {model.units}
                    </span>
                  </td>

                  <td>
                    <span
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {model.revenue}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          model.change.startsWith("+")
                            ? "text-[#4ADE80]"
                            : "text-[#FCA5A5]"
                        }
                      `}
                    >
                      {model.change}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedModel(model)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-[#18E0C4]
                        hover:text-white
                        transition-colors
                      "
                    >
                      Details
                      <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          MODEL DETAILS MODAL
          ===================================================== */}

      {selectedModel && (
        <div
          className="
            fixed
            inset-0
            z-[300]
            flex
            items-center
            justify-center
            p-4
            bg-black/70
            backdrop-blur-sm
          "
          onClick={() => setSelectedModel(null)}
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
              max-w-md
              rounded-2xl
              bg-[#0D1725]
              border
              border-white/[0.08]
              shadow-2xl
              p-6
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-[#18E0C4]
                  "
                >
                  Model Analytics
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {selectedModel.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedModel(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  bg-white/[0.04]
                  text-slate-400
                  hover:text-white
                "
              >
                <X size={17} />
              </button>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                mt-6
              "
            >
              <DetailBox
                label="Units Sold"
                value={selectedModel.units}
              />

              <DetailBox
                label="Revenue"
                value={selectedModel.revenue}
              />

              <DetailBox
                label="Growth"
                value={selectedModel.change}
              />

              <DetailBox
                label="Rank"
                value={`#${topModels.indexOf(selectedModel) + 1}`}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedModel(null);
                showToast(
                  `${selectedModel.name} analytics selected.`
                );
              }}
              className="
                w-full
                h-11
                mt-5
                rounded-xl
                bg-gradient-to-r
                from-[#18E0C4]
                to-[#28D7FF]
                text-sm
                font-bold
                text-[#031014]
              "
            >
              Done
            </button>
          </motion.div>
        </div>
      )}

      {/* =====================================================
          TOAST
          ===================================================== */}

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
            <Activity
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
        </motion.div>
      )}
    </div>
  );
}

/* =========================================================
   KPI
   ========================================================= */

function AnalyticsKPI({
  icon: Icon,
  label,
  value,
  change,
  positive,
  detail,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        border-white/[0.06]
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            bg-[#18E0C4]/[0.06]
            border
            border-[#18E0C4]/10
          "
        >
          <Icon
            size={19}
            className="text-[#18E0C4]"
          />
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            text-xs
            font-semibold
            ${
              positive
                ? "text-[#4ADE80]"
                : "text-[#FCA5A5]"
            }
          `}
        >
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}
        </span>
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
          text-sm
          font-medium
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
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
   RANGE SELECTOR
   ========================================================= */

function RangeSelector({
  value,
  onChange,
}) {
  return (
    <div
      className="
        flex
        h-11
        p-1
        rounded-xl
        bg-white/[0.025]
        border
        border-white/[0.06]
      "
    >
      {["7D", "30D", "90D"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`
            px-4
            rounded-lg
            text-xs
            font-semibold
            transition-all
            ${
              value === item
                ? `
                  bg-[#18E0C4]/[0.08]
                  text-[#18E0C4]
                `
                : `
                  text-slate-500
                  hover:text-white
                `
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

/* =========================================================
   REVENUE CHART
   ========================================================= */

function RevenueChart({
  data,
  labels,
  max,
}) {
  const width = 900;
  const height = 300;
  const paddingX = 28;
  const paddingY = 28;

  const points = data.map(
    (value, index) => {
      const x =
        paddingX +
        (index /
          Math.max(data.length - 1, 1)) *
          (width - paddingX * 2);

      const y =
        height -
        paddingY -
        (value / Math.max(max, 1)) *
          (height - paddingY * 2);

      return {
        x,
        y,
        value,
      };
    }
  );

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${width - paddingX} ${height - paddingY}
    L ${paddingX} ${height - paddingY}
    Z
  `;

  const labelIndexes =
    data.length <= 7
      ? data.map((_, index) => index)
      : [
          0,
          Math.floor(data.length / 4),
          Math.floor(data.length / 2),
          Math.floor((data.length * 3) / 4),
          data.length - 1,
        ];

  return (
    <div className="mt-7 w-full">
      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-[280px] sm:h-[320px]"
        >
          {/* GRID */}

          {[0, 1, 2, 3, 4].map((line) => {
            const y =
              paddingY +
              (line / 4) *
                (height - paddingY * 2);

            return (
              <line
                key={line}
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-white/[0.045]"
                strokeWidth="1"
              />
            );
          })}

          {/* AREA */}

          <path
            d={areaPath}
            fill="currentColor"
            className="text-[#18E0C4]/[0.05]"
          />

          {/* LINE */}

          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            className="text-[#18E0C4]"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* POINTS */}

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={
                index === points.length - 1
                  ? 5
                  : data.length <= 7
                  ? 4
                  : 2.5
              }
              fill="#09111D"
              stroke="currentColor"
              className="text-[#18E0C4]"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* X AXIS LABELS */}

        <div
          className="
            flex
            justify-between
            px-4
            -mt-2
          "
        >
          {labelIndexes.map((index) => (
            <span
              key={index}
              className="
                text-xs
                text-slate-600
              "
            >
              {labels[index]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MINI METRIC
   ========================================================= */

function MiniMetric({
  label,
  value,
  positive,
}) {
  return (
    <div
      className="
        p-3
        sm:p-4
        rounded-xl
        bg-white/[0.018]
        border
        border-white/[0.035]
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
        className={`
          mt-2
          text-base
          sm:text-lg
          font-semibold
          ${
            positive
              ? "text-[#4ADE80]"
              : "text-white"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
   ========================================================= */

function AnalyticsSectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          bg-[#18E0C4]/[0.06]
          border
          border-[#18E0C4]/10
        "
      >
        <Icon
          size={18}
          className="text-[#18E0C4]"
        />
      </div>

      <div>
        <h2
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SALES BARS
   ========================================================= */

function SalesBars() {
  const max = Math.max(
    ...salesByMonth.map(
      (item) => item.sales
    )
  );

  return (
    <div
      className="
        flex
        items-end
        gap-3
        h-[230px]
        mt-7
        px-2
      "
    >
      {salesByMonth.map(
        (item, index) => {
          const height =
            (item.sales / max) * 160;

          return (
            <div
              key={item.month}
              className="
                flex-1
                h-full
                flex
                flex-col
                justify-end
                items-center
                gap-2
              "
            >
              <span
                className="
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                {item.sales}
              </span>

              <motion.div
                initial={{
                  height: 0,
                }}
                animate={{
                  height,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="
                  w-full
                  max-w-[52px]
                  rounded-t-xl
                  bg-gradient-to-t
                  from-[#18E0C4]/20
                  to-[#18E0C4]/70
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  text-slate-600
                "
              >
                {item.month}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}

/* =========================================================
   DONUT
   ========================================================= */

function DonutChart() {
  const values = vehicleSegments.map(
    (item) => item.value
  );

  let current = 0;

  const gradient = values
    .map((value, index) => {
      const start = current;

      current += value;

      const end = current;

      const opacity = [
        0.95,
        0.72,
        0.55,
        0.42,
        0.32,
      ][index];

      return `rgba(24,224,196,${opacity}) ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <div
      className="
        relative
        w-[170px]
        h-[170px]
        shrink-0
        rounded-full
        flex
        items-center
        justify-center
        mx-auto
        sm:mx-0
      "
      style={{
        background:
          `conic-gradient(${gradient})`,
      }}
    >
      <div
        className="
          absolute
          w-[120px]
          h-[120px]
          rounded-full
          bg-[#0D1725]
          border
          border-white/[0.05]
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <span
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          42%
        </span>

        <span
          className="
            mt-1
            text-xs
            uppercase
            tracking-wider
            text-slate-600
          "
        >
          SUV Share
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE SEGMENT
   ========================================================= */

function VehicleSegment({
  segment,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            w-2.5
            h-2.5
            rounded-full
            bg-[#18E0C4]
          "
        />

        <span
          className="
            text-sm
            font-medium
            text-slate-300
          "
        >
          {segment.name}
        </span>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span
          className="
            text-xs
            text-slate-500
          "
        >
          {segment.units}
        </span>

        <span
          className="
            w-10
            text-right
            text-sm
            font-semibold
            text-slate-300
          "
        >
          {segment.value}%
        </span>

        <span
          className={`
            text-xs
            font-semibold
            ${
              segment.growth.startsWith("+")
                ? "text-[#4ADE80]"
                : "text-[#FCA5A5]"
            }
          `}
        >
          {segment.growth}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   FUNNEL ROW
   ========================================================= */

function FunnelRow({
  stage,
  index,
}) {
  const max = funnel[0].count;

  const width =
    (stage.count / max) * 100;

  return (
    <div>
      <div
        className="
          flex
          items-center
          justify-between
          mb-2
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              w-7
              h-7
              rounded-lg
              flex
              items-center
              justify-center
              bg-white/[0.025]
              border
              border-white/[0.04]
              text-xs
              font-bold
              text-slate-500
            "
          >
            {index + 1}
          </span>

          <span
            className="
              text-sm
              font-medium
              text-slate-300
            "
          >
            {stage.stage}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <span
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            {stage.count.toLocaleString()}
          </span>

          <span
            className="
              w-12
              text-right
              text-xs
              text-slate-500
            "
          >
            {stage.conversion}%
          </span>
        </div>
      </div>

      <div
        className="
          h-2.5
          rounded-full
          bg-white/[0.035]
          overflow-hidden
        "
      >
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${width}%`,
          }}
          transition={{
            duration: 0.7,
            delay: index * 0.06,
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-[#18E0C4]/80
            to-[#28D7FF]/50
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   INVENTORY RING
   ========================================================= */

function InventoryRing() {
  return (
    <div
      className="
        relative
        w-[150px]
        h-[150px]
        shrink-0
        rounded-full
        flex
        items-center
        justify-center
      "
      style={{
        background:
          "conic-gradient(#22C55E 0deg 245deg, #FBBF24 245deg 320deg, #EF4444 320deg 360deg)",
      }}
    >
      <div
        className="
          w-[106px]
          h-[106px]
          rounded-full
          bg-[#0D1725]
          flex
          flex-col
          items-center
          justify-center
          border
          border-white/[0.04]
        "
      >
        <span
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          68%
        </span>

        <span
          className="
            mt-1
            text-xs
            uppercase
            tracking-wider
            text-slate-600
          "
        >
          Healthy
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   INSIGHT
   ========================================================= */

function InsightMini({
  insight,
}) {
  const Icon = insight.icon;

  return (
    <div
      className="
        flex
        gap-3
        p-4
        rounded-xl
        bg-white/[0.018]
        border
        border-white/[0.04]
      "
    >
      <div
        className="
          w-9
          h-9
          shrink-0
          rounded-lg
          flex
          items-center
          justify-center
          bg-[#18E0C4]/[0.06]
        "
      >
        <Icon
          size={16}
          className="text-[#18E0C4]"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p
            className="
              text-sm
              font-semibold
              text-slate-300
            "
          >
            {insight.title}
          </p>

          <span
            className="
              shrink-0
              text-xs
              font-medium
              text-[#4ADE80]
            "
          >
            {insight.impact}
          </span>
        </div>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-slate-500
          "
        >
          {insight.description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
   ========================================================= */

function AnalyticsHead({
  children,
}) {
  return (
    <th
      className="
        pb-4
        text-left
        text-xs
        uppercase
        tracking-[0.08em]
        font-medium
        text-slate-600
      "
    >
      {children}
    </th>
  );
}

/* =========================================================
   DETAIL BOX
   ========================================================= */

function DetailBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl
        p-4
        bg-white/[0.025]
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
          text-xl
          font-bold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EXPORT
   ========================================================= */

export default Analytics;
