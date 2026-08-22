import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  FileBarChart,
  FileText,
  Gauge,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";

/* ===========================================================
   REPORT DATA
   =========================================================== */

const monthlySales = [
  { month: "Mar", revenue: 82, units: 34 },
  { month: "Apr", revenue: 96, units: 41 },
  { month: "May", revenue: 108, units: 47 },
  { month: "Jun", revenue: 121, units: 52 },
  { month: "Jul", revenue: 138, units: 59 },
  { month: "Aug", revenue: 154, units: 66 },
];

const vehiclePerformance = [
  {
    name: "Toyota Fortuner",
    units: 18,
    revenue: 5.76,
    growth: 18.4,
    share: 26,
  },
  {
    name: "Kia EV6",
    units: 12,
    revenue: 6.12,
    growth: 31.2,
    share: 19,
  },
  {
    name: "BMW X5",
    units: 7,
    revenue: 6.23,
    growth: 12.8,
    share: 17,
  },
  {
    name: "Mercedes-Benz GLC",
    units: 6,
    revenue: 4.68,
    growth: 8.5,
    share: 15,
  },
  {
    name: "Hyundai Creta",
    units: 11,
    revenue: 2.75,
    growth: 6.9,
    share: 13,
  },
  {
    name: "Toyota Camry",
    units: 5,
    revenue: 2.25,
    growth: -3.2,
    share: 10,
  },
];

const advisorPerformance = [
  {
    name: "Rahul Kumar",
    initials: "RK",
    leads: 42,
    qualified: 29,
    sold: 14,
    revenue: 4.82,
    conversion: 33.3,
  },
  {
    name: "Ananya Rao",
    initials: "AR",
    leads: 38,
    qualified: 26,
    sold: 12,
    revenue: 4.31,
    conversion: 31.6,
  },
  {
    name: "Karthik Reddy",
    initials: "KR",
    leads: 35,
    qualified: 22,
    sold: 10,
    revenue: 3.72,
    conversion: 28.6,
  },
  {
    name: "Meghana S",
    initials: "MS",
    leads: 31,
    qualified: 21,
    sold: 9,
    revenue: 3.24,
    conversion: 29.0,
  },
];

const funnelData = [
  { label: "New leads", value: 146, percentage: 100 },
  { label: "Contacted", value: 119, percentage: 81 },
  { label: "Qualified", value: 78, percentage: 53 },
  { label: "Test drives", value: 54, percentage: 37 },
  { label: "Negotiation", value: 31, percentage: 21 },
  { label: "Converted", value: 19, percentage: 13 },
];

const reportTypes = [
  {
    id: "sales",
    title: "Sales performance",
    description:
      "Revenue, units, conversion and sales velocity.",
    icon: TrendingUp,
  },
  {
    id: "inventory",
    title: "Inventory movement",
    description:
      "Stock ageing, turnover and vehicle movement.",
    icon: BarChart3,
  },
  {
    id: "leads",
    title: "Lead intelligence",
    description:
      "Sources, funnel progression and conversion.",
    icon: Target,
  },
  {
    id: "finance",
    title: "Finance report",
    description:
      "Financing mix, collections and outstanding value.",
    icon: Wallet,
  },
];

/* ===========================================================
   MAIN
   =========================================================== */

export default function Reports() {
  const [period, setPeriod] =
    useState("This month");

  const [reportType, setReportType] =
    useState("Executive overview");

  const [showReportModal, setShowReportModal] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const [activeMetric, setActiveMetric] =
    useState("Revenue");

  /* ===========================================================
     TOAST
     =========================================================== */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      window.__autoEliteReportsToast
    );

    window.__autoEliteReportsToast =
      window.setTimeout(() => {
        setToast("");
      }, 2200);
  };

  /* ===========================================================
     PERIOD
     =========================================================== */

  const periodMultiplier = useMemo(() => {
    if (period === "Last month") {
      return 0.91;
    }

    if (period === "Last quarter") {
      return 2.72;
    }

    if (period === "This year") {
      return 8.42;
    }

    return 1;
  }, [period]);

  const revenue =
    21.84 * periodMultiplier;

  const units = Math.round(
    59 * periodMultiplier
  );

  const conversion = 13.0;

  const avgDeal = 36.9;

  /* ===========================================================
     RETURN
     =========================================================== */

  return (
    <div
      className="
        w-full
        max-w-[1700px]
        mx-auto
        pb-10
      "
    >

      {/* =====================================================
          HEADER
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
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
          mb-6
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
            <FileBarChart
              size={15}
              className="text-[#18E0C4]"
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.16em]
                text-[#18E0C4]
              "
            >
              Business intelligence
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
            Reports & Analytics
          </h1>

          <p
            className="
              mt-2
              max-w-[720px]
              text-sm
              leading-6
              text-slate-500
            "
          >
            Understand sales performance, inventory
            movement, lead conversion and dealership
            profitability.
          </p>

        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

          <ReportSelect
            value={period}
            onChange={setPeriod}
            options={[
              "This month",
              "Last month",
              "Last quarter",
              "This year",
            ]}
          />

          <button
            type="button"
            onClick={() =>
              showToast(
                "Analytics refreshed."
              )
            }
            className="
              flex
              items-center
              gap-2
              h-10
              px-4
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.05]
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.05]
              transition
            "
          >
            <RefreshCw size={14} />

            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              setShowReportModal(true)
            }
            className="
              flex
              items-center
              gap-2
              h-10
              px-4
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm
              font-bold
              text-[#031014]
              hover:brightness-105
              transition
            "
          >
            <Download size={14} />

            Generate Report
          </button>

        </div>

      </motion.div>

      {/* =====================================================
          KPI ROW
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

        <ReportKPI
          icon={Wallet}
          label="Revenue"
          value={`₹${revenue.toFixed(2)}Cr`}
          change="+12.8%"
          detail="vs previous period"
          accent="cyan"
          active={
            activeMetric === "Revenue"
          }
          onClick={() =>
            setActiveMetric("Revenue")
          }
        />

        <ReportKPI
          icon={Gauge}
          label="Units sold"
          value={units}
          change="+9.4%"
          detail="vehicles delivered"
          accent="green"
          active={
            activeMetric === "Units"
          }
          onClick={() =>
            setActiveMetric("Units")
          }
        />

        <ReportKPI
          icon={Target}
          label="Conversion"
          value={`${conversion}%`}
          change="+2.1%"
          detail="lead → sale"
          accent="purple"
          active={
            activeMetric === "Conversion"
          }
          onClick={() =>
            setActiveMetric("Conversion")
          }
        />

        <ReportKPI
          icon={TrendingUp}
          label="Avg. deal value"
          value={`₹${avgDeal}L`}
          change="+6.3%"
          detail="per closed deal"
          accent="yellow"
          active={
            activeMetric === "Average"
          }
          onClick={() =>
            setActiveMetric("Average")
          }
        />

      </div>

      {/* =====================================================
          EXECUTIVE INSIGHT
          ===================================================== */}

      <section
        className="
          p-5
          mb-5
          rounded-2xl
          bg-gradient-to-r
          from-[#10222A]
          via-[#141B2A]
          to-[#111426]
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
                bg-[#18E0C4]/[0.06]
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

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#7DD3C7]
                "
              >
                Executive Insight
              </p>

              <p
                className="
                  mt-1.5
                  max-w-[900px]
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Revenue is trending above the previous
                period. EV demand is the strongest growth
                driver, while Toyota Fortuner continues to
                lead total unit volume. Lead-to-sale
                conversion has improved by 2.1 percentage
                points.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              showToast(
                "Insight briefing copied."
              )
            }
            className="
              flex
              items-center
              justify-center
              gap-2
              h-10
              px-4
              shrink-0
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.05]
              text-sm
              font-semibold
              text-slate-400
              hover:text-white
              transition
            "
          >
            Executive Brief

            <ArrowRight size={14} />
          </button>

        </div>

      </section>

      {/* =====================================================
          MAIN ANALYTICS GRID
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.7fr_1fr]
          gap-5
          mb-5
        "
      >

        {/* REVENUE */}

        <section
          className="
            p-5
            rounded-2xl
            bg-[#0D1725]
            border
            border-white/[0.055]
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
              mb-6
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
                Revenue Performance
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                Monthly revenue trend
              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <span
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                "
              >
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-[#18E0C4]
                  "
                />

                Revenue
              </span>

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "More chart options coming soon."
                  )
                }
                className="
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-lg
                  bg-white/[0.025]
                  text-slate-600
                  hover:text-white
                  transition
                "
              >
                <MoreHorizontal size={15} />
              </button>

            </div>

          </div>

          <RevenueChart />

        </section>

        {/* FUNNEL */}

        <section
          className="
            p-5
            rounded-2xl
            bg-[#0D1725]
            border
            border-white/[0.055]
          "
        >

          <div
            className="
              flex
              items-start
              justify-between
              mb-6
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
                Sales Funnel
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                Lead progression
              </p>

            </div>

            <Target
              size={17}
              className="text-[#A78BFA]"
            />

          </div>

          <div className="space-y-4">

            {funnelData.map(
              (item, index) => (
                <div
                  key={item.label}
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
                        text-sm
                        text-slate-500
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-slate-300
                      "
                    >
                      {item.value}
                    </span>

                  </div>

                  <div
                    className="
                      h-2
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
                        width: `${item.percentage}%`,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.05,
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[#A78BFA]
                        to-[#18E0C4]
                      "
                    />
                  </div>

                </div>
              )
            )}

          </div>

          <div
            className="
              flex
              items-center
              justify-between
              mt-6
              pt-5
              border-t
              border-white/[0.04]
            "
          >

            <div>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-slate-700
                "
              >
                Overall conversion
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-bold
                  text-white
                "
              >
                13.0%
              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-1
                text-sm
                font-semibold
                text-[#4ADE80]
              "
            >
              <ArrowUp size={13} />

              2.1%
            </div>

          </div>

        </section>

      </div>

      {/* =====================================================
          VEHICLE PERFORMANCE
          ===================================================== */}

      <section
        className="
          mb-5
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.055]
          overflow-hidden
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            p-5
            border-b
            border-white/[0.04]
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
              Vehicle Performance
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-600
              "
            >
              Sales volume and revenue contribution
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              showToast(
                "Vehicle report exported."
              )
            }
            className="
              flex
              items-center
              gap-2
              h-9
              px-4
              rounded-lg
              bg-white/[0.025]
              border
              border-white/[0.04]
              text-sm
              font-semibold
              text-slate-500
              hover:text-white
              transition
            "
          >
            <Download size={13} />

            Export
          </button>

        </div>

        <div
          className="
            hidden
            md:grid
            grid-cols-[2fr_1fr_1.2fr_1fr_1fr]
            gap-4
            px-5
            py-3
            border-b
            border-white/[0.03]
            text-xs
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          <span>Vehicle</span>
          <span>Units</span>
          <span>Revenue</span>
          <span>Growth</span>
          <span>Share</span>
        </div>

        <div>
          {vehiclePerformance.map(
            (vehicle, index) => (
              <VehicleRow
                key={vehicle.name}
                vehicle={vehicle}
                index={index}
              />
            )
          )}
        </div>

      </section>

      {/* =====================================================
          ADVISOR + REPORT CENTER
          ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.35fr_1fr]
          gap-5
        "
      >

        {/* ADVISORS */}

        <section
          className="
            rounded-2xl
            bg-[#0D1725]
            border
            border-white/[0.055]
            overflow-hidden
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              p-5
              border-b
              border-white/[0.04]
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
                Advisor Performance
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                Sales team productivity
              </p>

            </div>

            <Users
              size={17}
              className="text-[#18E0C4]"
            />

          </div>

          <div
            className="
              p-5
              space-y-5
            "
          >

            {advisorPerformance.map(
              (advisor, index) => (
                <AdvisorRow
                  key={advisor.name}
                  advisor={advisor}
                  index={index}
                />
              )
            )}

          </div>

        </section>

        {/* REPORT CENTER */}

        <section
          className="
            rounded-2xl
            bg-[#0D1725]
            border
            border-white/[0.055]
            overflow-hidden
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              p-5
              border-b
              border-white/[0.04]
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
                Report Center
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-600
                "
              >
                Generate decision-ready reports
              </p>

            </div>

            <FileText
              size={17}
              className="text-[#A78BFA]"
            />

          </div>

          <div
            className="
              p-5
              space-y-3
            "
          >

            {reportTypes.map(
              (report) => {
                const Icon = report.icon;

                return (
                  <button
                    key={report.id}
                    type="button"
                    onClick={() => {
                      setReportType(
                        report.title
                      );

                      setShowReportModal(
                        true
                      );
                    }}
                    className="
                      flex
                      items-center
                      gap-4
                      w-full
                      p-4
                      rounded-xl
                      bg-white/[0.018]
                      border
                      border-white/[0.035]
                      text-left
                      hover:bg-white/[0.035]
                      hover:border-white/[0.07]
                      transition
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        shrink-0
                        rounded-xl
                        bg-[#A78BFA]/[0.05]
                        border
                        border-[#A78BFA]/10
                      "
                    >
                      <Icon
                        size={16}
                        className="text-[#A78BFA]"
                      />
                    </div>

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-300
                        "
                      >
                        {report.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-600
                        "
                      >
                        {report.description}
                      </p>

                    </div>

                    <ArrowRight
                      size={15}
                      className="text-slate-700"
                    />

                  </button>
                );
              }
            )}

          </div>

        </section>

      </div>

      {/* =====================================================
          REPORT MODAL
          ===================================================== */}

      <AnimatePresence>
        {showReportModal && (
          <ReportModal
            reportType={reportType}
            onClose={() =>
              setShowReportModal(false)
            }
            onGenerate={() => {
              setShowReportModal(false);

              showToast(
                `${reportType} generated successfully.`
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

            <div
              className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-lg
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
                text-slate-300
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
   REVENUE CHART
   =========================================================== */

function RevenueChart() {
  const max = Math.max(
    ...monthlySales.map(
      (item) => item.revenue
    )
  );

  return (
    <div
      className="
        relative
        h-[280px]
      "
    >

      {/* GRID */}

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          justify-between
        "
      >
        {[0, 1, 2, 3, 4].map(
          (item) => (
            <div
              key={item}
              className="
                w-full
                border-t
                border-white/[0.035]
              "
            />
          )
        )}
      </div>

      {/* BARS */}

      <div
        className="
          absolute
          inset-0
          flex
          items-end
          justify-between
          gap-3
          px-3
          pb-8
        "
      >

        {monthlySales.map(
          (item, index) => {
            const height =
              (item.revenue / max) *
              205;

            return (
              <div
                key={item.month}
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  justify-end
                  flex-1
                  h-full
                "
              >

                <motion.div
                  initial={{
                    height: 0,
                  }}
                  animate={{
                    height,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.06,
                  }}
                  className="
                    w-full
                    max-w-[70px]
                    rounded-t-xl
                    bg-gradient-to-t
                    from-[#18E0C4]/20
                    to-[#18E0C4]/80
                    border
                    border-[#18E0C4]/20
                    relative
                  "
                >

                  <span
                    className="
                      absolute
                      left-1/2
                      -translate-x-1/2
                      -top-7
                      text-xs
                      font-semibold
                      text-slate-400
                      whitespace-nowrap
                    "
                  >
                    ₹{item.revenue}L
                  </span>

                </motion.div>

                <span
                  className="
                    absolute
                    bottom-0
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

    </div>
  );
}

/* ===========================================================
   VEHICLE ROW
   =========================================================== */

function VehicleRow({
  vehicle,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -5,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className="
        grid
        grid-cols-1
        md:grid-cols-[2fr_1fr_1.2fr_1fr_1fr]
        gap-4
        p-5
        border-b
        border-white/[0.03]
        hover:bg-white/[0.015]
        transition
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
            rounded-lg
            bg-white/[0.025]
            border
            border-white/[0.04]
            text-xs
            font-semibold
            text-slate-600
          "
        >
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </div>

        <div>

          <p
            className="
              text-sm
              font-semibold
              text-slate-300
            "
          >
            {vehicle.name}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-700
            "
          >
            {vehicle.share}% of revenue mix
          </p>

        </div>

      </div>

      <MetricText
        label="Units"
        value={vehicle.units}
      />

      <MetricText
        label="Revenue"
        value={`₹${vehicle.revenue.toFixed(2)}Cr`}
      />

      <div>

        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          Growth
        </p>

        <div
          className={`
            flex
            items-center
            gap-1
            mt-1.5
            text-sm
            font-semibold
            ${
              vehicle.growth >= 0
                ? "text-[#4ADE80]"
                : "text-[#F87171]"
            }
          `}
        >

          {vehicle.growth >= 0 ? (
            <ArrowUp size={13} />
          ) : (
            <ArrowDown size={13} />
          )}

          {Math.abs(vehicle.growth)}%

        </div>

      </div>

      <div>

        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-slate-700
          "
        >
          Share
        </p>

        <div
          className="
            flex
            items-center
            gap-2
            mt-2
          "
        >

          <div
            className="
              flex-1
              h-1.5
              rounded-full
              bg-white/[0.04]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#18E0C4]
              "
              style={{
                width: `${vehicle.share * 3}%`,
              }}
            />
          </div>

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {vehicle.share}%
          </span>

        </div>

      </div>

    </motion.div>
  );
}

/* ===========================================================
   ADVISOR ROW
   =========================================================== */

function AdvisorRow({
  advisor,
  index,
}) {
  return (
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
          w-11
          h-11
          shrink-0
          rounded-xl
          bg-white/[0.025]
          border
          border-white/[0.04]
          text-xs
          font-bold
          text-slate-500
        "
      >
        {advisor.initials}
      </div>

      <div
        className="
          flex-1
          min-w-0
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
              truncate
              text-sm
              font-semibold
              text-slate-300
            "
          >
            {advisor.name}
          </p>

          <span
            className="
              text-sm
              font-semibold
              text-[#18E0C4]
            "
          >
            {advisor.conversion}%
          </span>

        </div>

        <div
          className="
            flex
            items-center
            gap-4
            mt-1.5
          "
        >

          <span
            className="
              text-xs
              text-slate-700
            "
          >
            {advisor.leads} leads
          </span>

          <span
            className="
              text-xs
              text-slate-700
            "
          >
            {advisor.sold} sold
          </span>

          <span
            className="
              text-xs
              text-slate-700
            "
          >
            ₹{advisor.revenue}Cr
          </span>

        </div>

        <div
          className="
            h-1
            mt-2
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
              width: `${advisor.conversion * 2.3}%`,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#A78BFA]
            "
          />

        </div>

      </div>

    </div>
  );
}

/* ===========================================================
   REPORT KPI
   =========================================================== */

function ReportKPI({
  icon: Icon,
  label,
  value,
  change,
  detail,
  accent,
  active,
  onClick,
}) {
  const accents = {
    cyan:
      "bg-[#18E0C4]/[0.05] text-[#18E0C4]",

    green:
      "bg-[#22C55E]/[0.05] text-[#4ADE80]",

    purple:
      "bg-[#8B5CF6]/[0.05] text-[#A78BFA]",

    yellow:
      "bg-[#F59E0B]/[0.05] text-[#FBBF24]",
  };

  return (
    <motion.button
      type="button"
      whileHover={{
        y: -2,
      }}
      onClick={onClick}
      className={`
        p-5
        text-left
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        transition
        ${
          active
            ? "border-[#18E0C4]/15 shadow-[0_0_30px_rgba(24,224,196,0.04)]"
            : "border-white/[0.055]"
        }
      `}
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
            w-10
            h-10
            rounded-xl
            ${accents[accent]}
          `}
        >
          <Icon size={17} />
        </div>

        <ArrowUpRight
          size={14}
          className="text-slate-700"
        />

      </div>

      <p
        className="
          mt-5
          text-2xl
          font-bold
          tracking-tight
          text-white
        "
      >
        {value}
      </p>

      <div
        className="
          flex
          items-center
          gap-2
          mt-1
        "
      >

        <span
          className="
            flex
            items-center
            gap-1
            text-xs
            font-semibold
            text-[#4ADE80]
          "
        >
          <ArrowUp size={10} />

          {change}
        </span>

        <span
          className="
            text-xs
            text-slate-700
          "
        >
          {detail}
        </span>

      </div>

      <p
        className="
          mt-3
          text-xs
          font-medium
          text-slate-600
        "
      >
        {label}
      </p>

    </motion.button>
  );
}

/* ===========================================================
   REPORT MODAL
   =========================================================== */

function ReportModal({
  reportType,
  onClose,
  onGenerate,
}) {
  const [format, setFormat] =
    useState("PDF");

  const [includeCharts, setIncludeCharts] =
    useState(true);

  const [includeRaw, setIncludeRaw] =
    useState(false);

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
      onMouseDown={onClose}
    >

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          w-full
          max-w-[560px]
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.07]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
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
            justify-between
            p-6
            border-b
            border-white/[0.05]
          "
        >

          <div>

            <span
              className="
                text-xs
                uppercase
                tracking-[0.15em]
                text-[#18E0C4]
              "
            >
              Report Generator
            </span>

            <h2
              className="
                mt-2
                text-xl
                font-semibold
                text-white
              "
            >
              {reportType}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-600
              "
            >
              Configure your decision-ready report.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              items-center
              justify-center
              w-9
              h-9
              rounded-lg
              bg-white/[0.025]
              text-slate-600
              hover:text-white
              transition
            "
          >
            <X size={16} />
          </button>

        </div>

        {/* CONTENT */}

        <div
          className="
            p-6
            space-y-6
          "
        >

          {/* FORMAT */}

          <div>

            <p
              className="
                mb-3
                text-xs
                uppercase
                tracking-wider
                text-slate-700
              "
            >
              File Format
            </p>

            <div
              className="
                grid
                grid-cols-3
                gap-2
              "
            >

              {[
                "PDF",
                "Excel",
                "CSV",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFormat(item)
                  }
                  className={`
                    h-10
                    rounded-lg
                    border
                    text-sm
                    font-semibold
                    transition
                    ${
                      format === item
                        ? "bg-[#18E0C4]/[0.05] border-[#18E0C4]/10 text-[#18E0C4]"
                        : "bg-white/[0.025] border-white/[0.04] text-slate-600 hover:text-slate-300"
                    }
                  `}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* INCLUDED CONTENT */}

          <div>

            <p
              className="
                mb-3
                text-xs
                uppercase
                tracking-wider
                text-slate-700
              "
            >
              Included Content
            </p>

            <div className="space-y-2">

              <ToggleRow
                label="Charts & visualizations"
                checked={includeCharts}
                onChange={() =>
                  setIncludeCharts(
                    !includeCharts
                  )
                }
              />

              <ToggleRow
                label="Raw data tables"
                checked={includeRaw}
                onChange={() =>
                  setIncludeRaw(
                    !includeRaw
                  )
                }
              />

            </div>

          </div>

          {/* SMART SUMMARY */}

          <div
            className="
              p-5
              rounded-xl
              bg-[#18E0C4]/[0.035]
              border
              border-[#18E0C4]/10
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
                size={14}
                className="text-[#18E0C4]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#7DD3C7]
                "
              >
                Smart Summary Included
              </span>

            </div>

            <p
              className="
                mt-2
                text-sm
                leading-5
                text-slate-600
              "
            >
              The generated report will include a
              concise executive summary highlighting
              the most important changes, risks and
              opportunities.
            </p>

          </div>

        </div>

        {/* FOOTER */}

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
              h-10
              px-5
              rounded-lg
              bg-white/[0.025]
              border
              border-white/[0.05]
              text-sm
              font-semibold
              text-slate-500
              hover:text-white
              transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onGenerate}
            className="
              flex
              items-center
              gap-2
              h-10
              px-5
              rounded-lg
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-sm
              font-bold
              text-[#031014]
              hover:brightness-105
              transition
            "
          >
            <Download size={14} />

            Generate {format}
          </button>

        </div>

      </motion.div>

    </div>
  );
}

/* ===========================================================
   TOGGLE
   =========================================================== */

function ToggleRow({
  label,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="
        flex
        items-center
        justify-between
        w-full
        p-4
        rounded-xl
        bg-white/[0.018]
        border
        border-white/[0.035]
        hover:bg-white/[0.03]
        transition
      "
    >

      <span
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className={`
          relative
          w-9
          h-5
          rounded-full
          transition
          ${
            checked
              ? "bg-[#18E0C4]"
              : "bg-white/[0.08]"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-3
            h-3
            rounded-full
            bg-white
            transition
            ${
              checked
                ? "left-[21px]"
                : "left-1"
            }
          `}
        />

      </span>

    </button>
  );
}

/* ===========================================================
   METRIC
   =========================================================== */

function MetricText({
  label,
  value,
}) {
  return (
    <div>

      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-slate-700
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1.5
          text-sm
          font-semibold
          text-slate-400
        "
      >
        {value}
      </p>

    </div>
  );
}

/* ===========================================================
   SELECT
   =========================================================== */

function ReportSelect({
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
          h-10
          min-w-[135px]
          px-4
          pr-9
          rounded-xl
          appearance-none
          bg-white/[0.025]
          border
          border-white/[0.05]
          text-sm
          text-slate-500
          outline-none
          cursor-pointer
          focus:border-[#18E0C4]/20
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
        size={14}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-700
          pointer-events-none
        "
      />

    </div>
  );
}
