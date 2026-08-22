import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Activity,
  ArrowUpRight,
  BellRing,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Fuel,
  Gauge,
  Heart,
  MoreHorizontal,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  aiInsights,
  dashboardStats,
  recentActivity,
  salesData,
  vehicles,
} from "../data/mockData";

import KpiCard from "../components/KpiCard";
import VehicleCard from "../components/VehicleCard";


function Dashboard() {
  const [period, setPeriod] = useState("8M");

  const [favorites, setFavorites] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [showAllActivity, setShowAllActivity] =
    useState(false);

  const [activeInsight, setActiveInsight] =
    useState(null);

  /* =========================================================
     VEHICLE / MODAL STATE
     ========================================================= */

  const [dashboardVehicles, setDashboardVehicles] =
    useState(vehicles);

  const [showAddVehicle, setShowAddVehicle] =
    useState(false);

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [purchaseSuccess, setPurchaseSuccess] =
    useState(false);

  /* =========================================================
     REFRESH
     ========================================================= */

  const handleRefresh = async () => {
    setRefreshing(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setRefreshing(false);
  };

  /* =========================================================
     FAVORITES
     ========================================================= */

  const toggleFavorite = (vehicle) => {
    setFavorites((current) => {
      if (current.includes(vehicle.id)) {
        return current.filter(
          (id) => id !== vehicle.id
        );
      }

      return [...current, vehicle.id];
    });
  };

  /* =========================================================
     ACTIVITY
     ========================================================= */

  const displayedActivity = showAllActivity
    ? recentActivity
    : recentActivity.slice(0, 3);

  /* =========================================================
     FEATURED VEHICLES
     ========================================================= */

  const featuredVehicles = useMemo(() => {
    return [...dashboardVehicles]
      .sort(
        (a, b) =>
          (b.soldUnits || 0) -
          (a.soldUnits || 0)
      )
      .slice(0, 3);
  }, [dashboardVehicles]);

  /* =========================================================
     ADD VEHICLE
     ========================================================= */

  const handleAddVehicle = (vehicle) => {
    const newVehicle = {
      ...vehicle,
      id: `vehicle-${Date.now()}`,
      soldUnits: 0,
      isNew: true,
    };

    setDashboardVehicles((current) => [
      newVehicle,
      ...current,
    ]);

    setShowAddVehicle(false);
  };

  /* =========================================================
     PURCHASE VEHICLE
     ========================================================= */

  const handlePurchaseVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setPurchaseSuccess(false);
  };

  const confirmPurchase = () => {
    setPurchaseSuccess(true);
  };

  const closePurchaseModal = () => {
    setSelectedVehicle(null);
    setPurchaseSuccess(false);
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="w-full pb-10">

      {/* =====================================================
          DASHBOARD HEADER
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
        transition={{
          duration: 0.45,
        }}
        className="
          flex
          flex-col
          xl:flex-row

          xl:items-end
          xl:justify-between

          gap-6

          mb-8
        "
      >

        <div>

          {/* Label */}

          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <span
              className="
                w-2
                h-2

                rounded-full

                bg-[#18E0C4]

                shadow-[0_0_12px_rgba(24,224,196,0.9)]
              "
            />

            <span
              className="
                text-[11px]

                uppercase
                tracking-[0.18em]

                font-bold

                text-[#18E0C4]
              "
            >
              Dealership Command Center
            </span>
          </div>


          {/* Main heading */}

          <h1
            className="
              mt-3

              text-[34px]
              sm:text-[40px]
              lg:text-[44px]

              leading-[1.05]

              font-bold

              tracking-[-0.045em]

              text-white
            "
          >
            Good morning, John.
          </h1>


          {/* Subtitle */}

          <p
            className="
              mt-3

              max-w-[650px]

              text-[13px]
              sm:text-[14px]

              leading-6

              text-slate-500
            "
          >
            Here's what's happening across your
            dealership today.
          </p>

        </div>


        {/* ===================================================
            HEADER ACTIONS
            =================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center

            gap-3
          "
        >

          {/* Live */}

          <div
            className="
              flex

              items-center
              gap-2.5

              h-11

              px-4

              rounded-xl

              bg-[#22C55E]/[0.05]

              border
              border-[#22C55E]/10
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
                text-[11px]

                font-semibold

                text-[#86EFAC]
              "
            >
              Live data
            </span>
          </div>


          {/* Refresh */}

          <button
            type="button"
            onClick={handleRefresh}
            className="
              flex
              items-center
              justify-center
              gap-2.5

              h-11

              px-4

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.07]

              text-slate-400

              hover:text-white
              hover:bg-white/[0.05]

              transition
            "
          >
            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            <span
              className="
                text-[11px]

                font-semibold
              "
            >
              Refresh
            </span>
          </button>


          {/* Add Vehicle */}

          <button
            type="button"
            onClick={() =>
              setShowAddVehicle(true)
            }
            className="
              flex
              items-center
              justify-center
              gap-2.5

              h-11

              px-5

              rounded-xl

              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]

              text-[#031014]

              text-[12px]

              font-bold

              shadow-[0_10px_30px_rgba(24,224,196,0.12)]

              hover:brightness-105

              active:scale-[0.98]

              transition
            "
          >
            <Plus size={16} />

            Add Vehicle
          </button>

        </div>
      </motion.div>


      {/* =====================================================
          KPI GRID
          ===================================================== */}

      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-5

          gap-4
        "
      >

        <KpiCard
          title="Total Vehicles"
          value={dashboardStats.vehicles.toLocaleString()}
          subtitle="Across all dealership locations"
          icon={CarFront}
          trend={`+${dashboardStats.vehicleGrowth}%`}
          trendDirection="up"
          delay={0}
        />

        <KpiCard
          title="Total Revenue"
          value="₹84.5Cr"
          subtitle="Gross sales generated"
          icon={CircleDollarSign}
          trend={`+${dashboardStats.salesGrowth}%`}
          trendDirection="up"
          iconClass="text-[#28D7FF]"
          iconBg="bg-[#28D7FF]/10"
          accent="cyan"
          delay={0.05}
        />

        <KpiCard
          title="Customers"
          value={dashboardStats.customers.toLocaleString()}
          subtitle="Active customer relationships"
          icon={Users}
          trend={`+${dashboardStats.customerGrowth}%`}
          trendDirection="up"
          delay={0.1}
        />

        <KpiCard
          title="Test Drives"
          value={dashboardStats.testDrives}
          subtitle="Scheduled this month"
          icon={Gauge}
          trend={`+${dashboardStats.testDriveGrowth}%`}
          trendDirection="up"
          iconClass="text-[#A78BFA]"
          iconBg="bg-[#8B5CF6]/10"
          accent="violet"
          delay={0.15}
        />

        <KpiCard
          title="Low Stock"
          value={dashboardStats.lowStock}
          subtitle="Vehicles need attention"
          icon={BellRing}
          trend="Action"
          trendDirection="down"
          iconClass="text-[#FBBF24]"
          iconBg="bg-[#F59E0B]/10"
          accent="cyan"
          delay={0.2}
        />

      </div>


      {/* =====================================================
          MAIN ANALYTICS
          ===================================================== */}

      <div
        className="
          grid

          grid-cols-1

          xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,0.8fr)]

          gap-5

          mt-5
        "
      >

        {/* ===================================================
            REVENUE
            =================================================== */}

        <section
          className="
            relative
            overflow-hidden

            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

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

                    rounded-xl

                    bg-[#18E0C4]/10

                    border
                    border-[#18E0C4]/10
                  "
                >
                  <TrendingUp
                    size={17}
                    className="text-[#18E0C4]"
                  />
                </div>

                <div>

                  <h2
                    className="
                      text-[14px]

                      font-bold

                      text-white
                    "
                  >
                    Revenue performance
                  </h2>

                  <p
                    className="
                      mt-1

                      text-[10px]

                      text-slate-600
                    "
                  >
                    Sales vs profit trend
                  </p>

                </div>

              </div>

            </div>


            {/* Period */}

            <div
              className="
                flex
                items-center

                p-1

                rounded-lg

                bg-white/[0.025]

                border
                border-white/[0.045]
              "
            >

              {["1M", "3M", "6M", "8M"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setPeriod(item)
                    }
                    className={`
                      px-3
                      py-2

                      rounded-md

                      text-[10px]

                      font-semibold

                      transition

                      ${
                        period === item
                          ? `
                            bg-white/[0.08]
                            text-[#18E0C4]
                          `
                          : `
                            text-slate-600
                            hover:text-slate-300
                          `
                      }
                    `}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>


          {/* Revenue number */}

          <div
            className="
              flex
              items-end
              gap-3

              mt-6
            "
          >

            <p
              className="
                text-[34px]

                leading-none

                font-bold

                tracking-[-0.045em]

                text-white
              "
            >
              ₹8.6Cr
            </p>

            <div
              className="
                flex
                items-center
                gap-1

                mb-1

                text-[#4ADE80]
              "
            >
              <ArrowUpRight size={13} />

              <span
                className="
                  text-[11px]

                  font-bold
                "
              >
                18.2%
              </span>
            </div>

          </div>


          {/* Chart */}

          <div
            className="
              mt-6

              h-[250px]
              sm:h-[280px]

              w-full
            "
          >
            <RevenueChart
              data={salesData}
              period={period}
            />
          </div>


          {/* Legend */}

          <div
            className="
              flex
              items-center
              gap-6

              mt-3
            "
          >

            <Legend
              color="#18E0C4"
              label="Revenue"
            />

            <Legend
              color="#8B5CF6"
              label="Profit"
            />

          </div>

        </section>


        {/* ===================================================
            INVENTORY HEALTH
            =================================================== */}

        <section
          className="
            relative
            overflow-hidden

            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

            p-5
            sm:p-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2
                className="
                  text-[14px]

                  font-bold

                  text-white
                "
              >
                Inventory health
              </h2>

              <p
                className="
                  mt-1

                  text-[10px]

                  text-slate-600
                "
              >
                Current stock distribution
              </p>

            </div>

            <button
              type="button"
              className="
                flex
                items-center
                justify-center

                w-9
                h-9

                rounded-xl

                bg-white/[0.025]

                border
                border-white/[0.05]

                text-slate-600

                hover:text-white

                transition
              "
            >
              <MoreHorizontal size={17} />
            </button>

          </div>


          <InventoryDonut />


          <div
            className="
              grid
              grid-cols-2

              gap-x-5
              gap-y-4

              mt-4
            "
          >

            <InventoryLegend
              label="In Stock"
              value="71%"
              count="912"
              dot="#18E0C4"
            />

            <InventoryLegend
              label="Reserved"
              value="14%"
              count="180"
              dot="#28D7FF"
            />

            <InventoryLegend
              label="Low Stock"
              value="9%"
              count="116"
              dot="#F59E0B"
            />

            <InventoryLegend
              label="Sold"
              value="6%"
              count="76"
              dot="#8B5CF6"
            />

          </div>


          <button
            type="button"
            onClick={() =>
              window.location.href =
                "/inventory"
            }
            className="
              flex
              items-center
              justify-center
              gap-2

              w-full
              h-11

              mt-6

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.055]

              text-[10px]

              font-semibold

              text-slate-400

              hover:text-white
              hover:bg-white/[0.05]

              transition
            "
          >
            View inventory

            <ArrowUpRight size={13} />
          </button>

        </section>

      </div>


      {/* =====================================================
          AI + TOP VEHICLES
          ===================================================== */}

      <div
        className="
          grid

          grid-cols-1

          xl:grid-cols-[1.15fr_1.85fr]

          gap-5

          mt-5
        "
      >

        {/* ===================================================
            AI INSIGHTS
            =================================================== */}

        <section
          className="
            relative
            overflow-hidden

            rounded-2xl

            bg-gradient-to-br
            from-[#10152A]
            via-[#0D1725]
            to-[#09111D]

            border
            border-[#8B5CF6]/10

            p-5
            sm:p-6
          "
        >

          <div
            className="
              absolute

              -top-24
              -right-24

              w-52
              h-52

              rounded-full

              bg-[#8B5CF6]/10

              blur-3xl

              pointer-events-none
            "
          />

          <div
            className="
              relative

              flex
              items-start
              justify-between
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

                  w-10
                  h-10

                  rounded-xl

                  bg-gradient-to-br
                  from-[#8B5CF6]/15
                  to-[#18E0C4]/10

                  border
                  border-[#8B5CF6]/15
                "
              >
                <Sparkles
                  size={18}
                  className="text-[#A78BFA]"
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

                  <h2
                    className="
                      text-[14px]

                      font-bold

                      text-white
                    "
                  >
                    AI Intelligence
                  </h2>

                  <span
                    className="
                      px-2
                      py-1

                      rounded-md

                      bg-[#8B5CF6]/10

                      border
                      border-[#8B5CF6]/10

                      text-[8px]

                      uppercase
                      tracking-wider

                      font-bold

                      text-[#A78BFA]
                    "
                  >
                    Live
                  </span>

                </div>

                <p
                  className="
                    mt-1

                    text-[10px]

                    text-slate-600
                  "
                >
                  Your dealership copilot
                </p>

              </div>

            </div>

            <Zap
              size={16}
              className="text-[#8B5CF6]"
            />

          </div>


          <div
            className="
              relative

              mt-6

              space-y-3
            "
          >

            {aiInsights.map(
              (insight, index) => (
                <AIInsight
                  key={insight.id}
                  insight={insight}
                  index={index}
                  active={
                    activeInsight ===
                    insight.id
                  }
                  onClick={() =>
                    setActiveInsight(
                      insight.id
                    )
                  }
                />
              )
            )}

          </div>


          <button
            type="button"
            onClick={() =>
              window.location.href =
                "/ai-insights"
            }
            className="
              relative

              flex
              items-center
              justify-center
              gap-2

              w-full
              h-11

              mt-5

              rounded-xl

              bg-[#8B5CF6]/[0.06]

              border
              border-[#8B5CF6]/10

              text-[10px]

              font-semibold

              text-[#A78BFA]

              hover:bg-[#8B5CF6]/[0.10]

              transition
            "
          >
            Open AI command center

            <ChevronRight size={13} />
          </button>

        </section>


        {/* ===================================================
            TOP VEHICLES
            =================================================== */}

        <section
          className="
            overflow-hidden

            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

            p-5
            sm:p-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

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

                    rounded-xl

                    bg-[#28D7FF]/10

                    border
                    border-[#28D7FF]/10
                  "
                >
                  <CarFront
                    size={17}
                    className="text-[#28D7FF]"
                  />
                </div>

                <div>

                  <h2
                    className="
                      text-[14px]

                      font-bold

                      text-white
                    "
                  >
                    Top performing vehicles
                  </h2>

                  <p
                    className="
                      mt-1

                      text-[10px]

                      text-slate-600
                    "
                  >
                    Highest sales velocity
                  </p>

                </div>

              </div>

            </div>


            <button
              type="button"
              onClick={() =>
                window.location.href =
                  "/inventory"
              }
              className="
                flex
                items-center
                gap-2

                text-[10px]

                font-bold

                text-[#18E0C4]

                hover:text-[#5EEAD4]
              "
            >
              View all

              <ArrowUpRight size={13} />
            </button>

          </div>


          <div
            className="
              grid

              grid-cols-1
              md:grid-cols-3

              gap-4

              mt-5
            "
          >

            {featuredVehicles.map(
              (vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  isFavorite={favorites.includes(
                    vehicle.id
                  )}
                  onFavorite={
                    toggleFavorite
                  }
                  onPurchase={
                    handlePurchaseVehicle
                  }
                />
              )
            )}

          </div>

        </section>

      </div>


      {/* =====================================================
          ACTIVITY + ALERTS
          ===================================================== */}

      <div
        className="
          grid

          grid-cols-1

          lg:grid-cols-[1.35fr_0.65fr]

          gap-5

          mt-5
        "
      >

        {/* Recent Activity */}

        <section
          className="
            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

            p-5
            sm:p-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Activity
                  size={17}
                  className="text-[#18E0C4]"
                />

                <h2
                  className="
                    text-[14px]

                    font-bold

                    text-white
                  "
                >
                  Recent activity
                </h2>

              </div>

              <p
                className="
                  mt-1.5

                  text-[10px]

                  text-slate-600
                "
              >
                Latest dealership events
              </p>

            </div>


            <button
              type="button"
              onClick={() =>
                setShowAllActivity(
                  (value) => !value
                )
              }
              className="
                text-[10px]

                font-bold

                text-[#18E0C4]
              "
            >
              {showAllActivity
                ? "Show less"
                : "View all"}
            </button>

          </div>


          <div
            className="
              mt-5

              divide-y
              divide-white/[0.045]
            "
          >

            {displayedActivity.map(
              (activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="
                    flex
                    items-center

                    gap-4

                    py-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-center

                      w-10
                      h-10

                      rounded-xl

                      bg-white/[0.035]

                      border
                      border-white/[0.05]

                      shrink-0
                    "
                  >

                    {activity.action
                      .toLowerCase()
                      .includes("booked") ? (
                      <Clock3
                        size={16}
                        className="text-[#A78BFA]"
                      />
                    ) : (
                      <CarFront
                        size={16}
                        className="text-[#18E0C4]"
                      />
                    )}

                  </div>


                  <div className="flex-1 min-w-0">

                    <p
                      className="
                        truncate

                        text-[11px]

                        font-semibold

                        text-slate-300
                      "
                    >
                      {activity.action}
                    </p>

                    <p
                      className="
                        mt-1

                        text-[10px]

                        text-slate-600
                      "
                    >
                      {activity.user}
                    </p>

                  </div>


                  <span
                    className="
                      shrink-0

                      text-[10px]

                      text-slate-700
                    "
                  >
                    {activity.time}
                  </span>

                </motion.div>
              )
            )}

          </div>

        </section>


        {/* Attention */}

        <section
          className="
            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

            p-5
            sm:p-6
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

                rounded-xl

                bg-[#F59E0B]/10

                border
                border-[#F59E0B]/10
              "
            >
              <BellRing
                size={17}
                className="text-[#FBBF24]"
              />
            </div>

            <div>

              <h2
                className="
                  text-[14px]

                  font-bold

                  text-white
                "
              >
                Attention center
              </h2>

              <p
                className="
                  mt-1

                  text-[10px]

                  text-slate-600
                "
              >
                Items that need action
              </p>

            </div>

          </div>


          <div
            className="
              space-y-3

              mt-6
            "
          >

            <AttentionItem
              color="amber"
              title="12 vehicles low on stock"
              description="Review restock recommendations"
              action="Review"
            />

            <AttentionItem
              color="violet"
              title="4 test drives today"
              description="Next appointment at 11:00 AM"
              action="Calendar"
            />

            <AttentionItem
              color="cyan"
              title="7 pending approvals"
              description="Finance applications awaiting review"
              action="Open"
            />

          </div>

        </section>

      </div>


      {/* =====================================================
          ADD VEHICLE MODAL
          ===================================================== */}

      {showAddVehicle && (
        <AddVehicleModal
          onClose={() =>
            setShowAddVehicle(false)
          }
          onAdd={handleAddVehicle}
        />
      )}


      {/* =====================================================
          PURCHASE MODAL
          ===================================================== */}

      {selectedVehicle && (
        <PurchaseVehicleModal
          vehicle={selectedVehicle}
          success={purchaseSuccess}
          onClose={closePurchaseModal}
          onConfirm={confirmPurchase}
        />
      )}

    </div>
  );
}


/* ===========================================================
   REVENUE CHART
   =========================================================== */

function RevenueChart({
  data,
  period,
}) {
  /*
   * =========================================================
   * FILTER DATA BASED ON SELECTED PERIOD
   * =========================================================
   */

  const visibleData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    switch (period) {
      case "1M":
        return data.slice(-1);

      case "3M":
        return data.slice(-3);

      case "6M":
        return data.slice(-6);

      case "8M":
      default:
        return data.slice(-8);
    }
  }, [data, period]);


  /*
   * =========================================================
   * CHART DIMENSIONS
   * =========================================================
   */

  const width = 900;
  const height = 280;

  const paddingLeft = 55;
  const paddingRight = 15;
  const paddingTop = 18;
  const paddingBottom = 35;

  const chartWidth =
    width -
    paddingLeft -
    paddingRight;

  const chartHeight =
    height -
    paddingTop -
    paddingBottom;


  /*
   * =========================================================
   * HANDLE EMPTY DATA
   * =========================================================
   */

  if (!visibleData.length) {
    return (
      <div
        className="
          flex
          items-center
          justify-center

          w-full
          h-full

          text-[12px]

          text-slate-600
        "
      >
        No revenue data available.
      </div>
    );
  }


  /*
   * =========================================================
   * MAX VALUE
   * =========================================================
   */

  const maxValue =
    Math.max(
      ...visibleData.map(
        (item) => item.sales
      )
    ) * 1.12;


  /*
   * =========================================================
   * X POSITION
   * =========================================================
   */

  const getX = (index) => {
    if (visibleData.length === 1) {
      return (
        paddingLeft +
        chartWidth / 2
      );
    }

    return (
      paddingLeft +
      (index /
        (visibleData.length - 1)) *
        chartWidth
    );
  };


  /*
   * =========================================================
   * Y POSITION
   * =========================================================
   */

  const getY = (value) => {
    return (
      paddingTop +
      chartHeight -
      (value / maxValue) *
        chartHeight
    );
  };


  /*
   * =========================================================
   * SALES LINE
   * =========================================================
   */

  const salesPoints =
    visibleData
      .map(
        (item, index) =>
          `${getX(index)},${getY(
            item.sales
          )}`
      )
      .join(" ");


  /*
   * =========================================================
   * PROFIT LINE
   * =========================================================
   */

  const profitPoints =
    visibleData
      .map(
        (item, index) =>
          `${getX(index)},${getY(
            item.profit * 3.5
          )}`
      )
      .join(" ");


  /*
   * =========================================================
   * AREA UNDER SALES LINE
   * =========================================================
   */

  const salesArea = `
    ${paddingLeft},${paddingTop + chartHeight}

    ${salesPoints}

    ${getX(
      visibleData.length - 1
    )},${paddingTop + chartHeight}
  `;


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <motion.div
      key={period}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative
        w-full
        h-full
      "
    >

      {/* ===================================================
          Y AXIS
          =================================================== */}

      <div
        className="
          absolute

          left-0
          top-0
          bottom-[35px]

          w-12

          flex
          flex-col
          justify-between
        "
      >

        {[
          "10Cr",
          "7.5Cr",
          "5Cr",
          "2.5Cr",
          "0",
        ].map((label) => (
          <span
            key={label}
            className="
              text-[9px]

              text-slate-700
            "
          >
            {label}
          </span>
        ))}

      </div>


      {/* ===================================================
          SVG
          =================================================== */}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="
          absolute
          left-0
          top-0

          w-full
          h-full

          overflow-visible
        "
        aria-label={`Revenue chart for ${period}`}
        role="img"
      >

        {/* =================================================
            GRID
            ================================================= */}

        {[0, 1, 2, 3, 4].map(
          (line) => {
            const y =
              paddingTop +
              (line / 4) *
                chartHeight;

            return (
              <line
                key={line}
                x1={paddingLeft}
                x2={
                  width -
                  paddingRight
                }
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.045)"
                strokeWidth="1"
              />
            );
          }
        )}


        {/* =================================================
            SALES AREA
            ================================================= */}

        <polygon
          points={salesArea}
          fill={`url(#salesGradient-${period})`}
        />


        {/* =================================================
            REVENUE LINE
            ================================================= */}

        <motion.polyline
          points={salesPoints}
          fill="none"
          stroke="#18E0C4"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            duration: 0.35,
          }}
        />


        {/* =================================================
            PROFIT LINE
            ================================================= */}

        <motion.polyline
          points={profitPoints}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
          opacity="0.9"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 0.9,
          }}

          transition={{
            duration: 0.35,
          }}
        />


        {/* =================================================
            DATA POINTS
            ================================================= */}

        {visibleData.map(
          (item, index) => (
            <motion.circle
              key={`${period}-${item.month}`}
              cx={getX(index)}
              cy={getY(
                item.sales
              )}
              r="4"
              fill="#09111D"
              stroke="#18E0C4"
              strokeWidth="2"

              initial={{
                opacity: 0,
                r: 0,
              }}

              animate={{
                opacity: 1,
                r: 4,
              }}

              transition={{
                duration: 0.25,
                delay:
                  index * 0.04,
              }}
            />
          )
        )}


        {/* =================================================
            GRADIENT
            ================================================= */}

        <defs>

          <linearGradient
            id={`salesGradient-${period}`}
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopColor="#18E0C4"
              stopOpacity="0.18"
            />

            <stop
              offset="100%"
              stopColor="#18E0C4"
              stopOpacity="0"
            />

          </linearGradient>

        </defs>


        {/* =================================================
            X AXIS LABELS
            ================================================= */}

        {visibleData.map(
          (item, index) => (
            <text
              key={`${period}-label-${item.month}`}
              x={getX(index)}
              y={height - 8}
              textAnchor="middle"
              fill="#536174"
              fontSize="10"
            >
              {item.month}
            </text>
          )
        )}

      </svg>

    </motion.div>
  );
}


/* ===========================================================
   INVENTORY DONUT
   =========================================================== */

function InventoryDonut() {
  const segments = [
    {
      value: 71,
      color: "#18E0C4",
    },
    {
      value: 14,
      color: "#28D7FF",
    },
    {
      value: 9,
      color: "#F59E0B",
    },
    {
      value: 6,
      color: "#8B5CF6",
    },
  ];

  let currentOffset = 0;

  const radius = 68;

  const circumference =
    2 * Math.PI * radius;

  return (
    <div
      className="
        relative

        flex
        items-center
        justify-center

        h-[220px]
      "
    >

      <svg
        viewBox="0 0 190 190"
        className="
          w-[185px]
          h-[185px]
        "
      >

        <circle
          cx="95"
          cy="95"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.035)"
          strokeWidth="17"
        />


        {segments.map(
          (segment, index) => {
            const length =
              (segment.value / 100) *
              circumference;

            const offset =
              -currentOffset;

            currentOffset += length;

            return (
              <circle
                key={index}
                cx="95"
                cy="95"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="17"
                strokeLinecap="round"
                strokeDasharray={`${length} ${
                  circumference -
                  length
                }`}
                strokeDashoffset={
                  offset
                }
                transform="rotate(-90 95 95)"
                opacity="0.92"
              />
            );
          }
        )}

      </svg>


      <div
        className="
          absolute

          flex
          flex-col
          items-center
        "
      >

        <span
          className="
            text-[30px]

            font-bold

            tracking-[-0.04em]

            text-white
          "
        >
          1,284
        </span>

        <span
          className="
            mt-1

            text-[9px]

            uppercase
            tracking-[0.15em]

            text-slate-600
          "
        >
          Total vehicles
        </span>

      </div>

    </div>
  );
}


/* ===========================================================
   AI INSIGHT
   =========================================================== */

function AIInsight({
  insight,
  index,
  active,
  onClick,
}) {
  const colors = [
    {
      bg: "bg-[#18E0C4]/[0.05]",
      border: "border-[#18E0C4]/10",
      icon: "text-[#18E0C4]",
      value: "text-[#5EEAD4]",
    },
    {
      bg: "bg-[#F59E0B]/[0.05]",
      border: "border-[#F59E0B]/10",
      icon: "text-[#FBBF24]",
      value: "text-[#FBBF24]",
    },
    {
      bg: "bg-[#8B5CF6]/[0.06]",
      border: "border-[#8B5CF6]/10",
      icon: "text-[#A78BFA]",
      value: "text-[#A78BFA]",
    },
  ];

  const theme =
    colors[index % colors.length];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full

        text-left

        p-4

        rounded-xl

        border

        transition-all
        duration-200

        ${theme.bg}
        ${theme.border}

        ${
          active
            ? "translate-x-1"
            : "hover:translate-x-0.5"
        }
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

          <p
            className={`
              text-[9px]

              uppercase
              tracking-[0.12em]

              font-bold

              ${theme.icon}
            `}
          >
            {insight.type}
          </p>

          <p
            className="
              mt-1.5

              text-[11px]

              font-semibold

              text-slate-200
            "
          >
            {insight.title}
          </p>

          <p
            className="
              mt-1.5

              text-[9px]

              leading-5

              text-slate-600
            "
          >
            {insight.description}
          </p>

        </div>


        <div className="text-right shrink-0">

          <p
            className={`
              text-[16px]

              font-bold

              ${theme.value}
            `}
          >
            {insight.value}
          </p>

          <ChevronRight
            size={13}
            className={`
              ml-auto
              mt-2

              ${theme.icon}
            `}
          />

        </div>

      </div>

    </button>
  );
}


/* ===========================================================
   LEGEND
   =========================================================== */

function Legend({
  color,
  label,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >

      <span
        className="
          w-2
          h-2

          rounded-full
        "
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />

      <span
        className="
          text-[10px]

          text-slate-600
        "
      >
        {label}
      </span>

    </div>
  );
}


/* ===========================================================
   INVENTORY LEGEND
   =========================================================== */

function InventoryLegend({
  label,
  value,
  count,
  dot,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >

      <span
        className="
          w-2
          h-2

          rounded-full

          shrink-0
        "
        style={{
          backgroundColor: dot,
        }}
      />

      <div className="min-w-0 flex-1">

        <p
          className="
            truncate

            text-[10px]

            text-slate-500
          "
        >
          {label}
        </p>

      </div>

      <span
        className="
          text-[10px]

          font-semibold

          text-slate-300
        "
      >
        {value}
      </span>

      <span
        className="
          text-[9px]

          text-slate-700
        "
      >
        {count}
      </span>

    </div>
  );
}


/* ===========================================================
   ATTENTION ITEM
   =========================================================== */

function AttentionItem({
  color,
  title,
  description,
  action,
}) {
  const themes = {
    amber: {
      bg: "bg-[#F59E0B]/[0.05]",
      border: "border-[#F59E0B]/10",
      dot: "bg-[#F59E0B]",
      text: "text-[#FBBF24]",
    },

    violet: {
      bg: "bg-[#8B5CF6]/[0.05]",
      border: "border-[#8B5CF6]/10",
      dot: "bg-[#8B5CF6]",
      text: "text-[#A78BFA]",
    },

    cyan: {
      bg: "bg-[#28D7FF]/[0.05]",
      border: "border-[#28D7FF]/10",
      dot: "bg-[#28D7FF]",
      text: "text-[#38BDF8]",
    },
  };

  const theme =
    themes[color] || themes.cyan;

  return (
    <div
      className={`
        flex
        items-center
        gap-3

        p-4

        rounded-xl

        ${theme.bg}

        border

        ${theme.border}
      `}
    >

      <span
        className={`
          w-2
          h-2

          rounded-full

          shrink-0

          ${theme.dot}
        `}
      />

      <div className="flex-1 min-w-0">

        <p
          className="
            truncate

            text-[10px]

            font-semibold

            text-slate-300
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1

            truncate

            text-[9px]

            text-slate-600
          "
        >
          {description}
        </p>

      </div>

      <button
        type="button"
        className={`
          shrink-0

          text-[9px]

          font-bold

          ${theme.text}

          hover:brightness-125
        `}
      >
        {action}
      </button>

    </div>
  );
}


/* ===========================================================
   MODAL INPUT
   =========================================================== */

function ModalInput({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}) {
  return (
    <div>

      <label
        className="
          block

          mb-2

          text-[10px]

          uppercase
          tracking-[0.12em]

          font-semibold

          text-slate-500
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          w-full
          h-11

          px-3.5

          rounded-xl

          bg-[#101C2A]

          border
          border-white/[0.07]

          outline-none

          text-[12px]

          text-white

          placeholder:text-slate-700

          focus:border-[#18E0C4]/30

          transition
        "
      />

    </div>
  );
}


/* ===========================================================
   ADD VEHICLE MODAL
   =========================================================== */

function AddVehicleModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    year: "2026",
    type: "SUV",
    variant: "",
    price: "",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "",
    available: "1",
  });

  const updateField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    onAdd({
      ...form,

      available:
        Number(form.available) || 1,

      image:
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85",
    });
  };

  return (
    <div
      className="
        fixed
        inset-0

        z-[100]

        flex
        items-center
        justify-center

        p-5

        bg-black/75

        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
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
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-[650px]

          max-h-[90vh]

          overflow-y-auto

          rounded-2xl

          bg-[#0B1420]

          border
          border-white/[0.08]

          shadow-[0_30px_100px_rgba(0,0,0,0.6)]

          p-6
          sm:p-7
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-5
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-2

                text-[#18E0C4]
              "
            >
              <Plus size={15} />

              <span
                className="
                  text-[10px]

                  uppercase
                  tracking-[0.15em]

                  font-bold
                "
              >
                Inventory
              </span>
            </div>

            <h2
              className="
                mt-2

                text-[25px]

                font-bold

                tracking-[-0.03em]

                text-white
              "
            >
              Add new vehicle
            </h2>

            <p
              className="
                mt-2

                text-[12px]

                text-slate-500
              "
            >
              Add a vehicle to your dealership inventory.
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

              rounded-xl

              bg-white/[0.04]

              border
              border-white/[0.07]

              text-slate-500

              hover:text-white
            "
          >
            <X size={17} />
          </button>

        </div>


        {/* Form */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2

            gap-4

            mt-7
          "
        >

          <ModalInput
            label="Vehicle name"
            value={form.name}
            placeholder="Toyota Fortuner"
            onChange={(value) =>
              updateField(
                "name",
                value
              )
            }
          />

          <ModalInput
            label="Variant"
            value={form.variant}
            placeholder="4x4 Diesel AT"
            onChange={(value) =>
              updateField(
                "variant",
                value
              )
            }
          />

          <ModalInput
            label="Year"
            value={form.year}
            placeholder="2026"
            onChange={(value) =>
              updateField(
                "year",
                value
              )
            }
          />

          <ModalInput
            label="Vehicle type"
            value={form.type}
            placeholder="SUV"
            onChange={(value) =>
              updateField(
                "type",
                value
              )
            }
          />

          <ModalInput
            label="Starting price"
            value={form.price}
            placeholder="₹25.00L"
            onChange={(value) =>
              updateField(
                "price",
                value
              )
            }
          />

          <ModalInput
            label="Mileage"
            value={form.mileage}
            placeholder="10,000 km"
            onChange={(value) =>
              updateField(
                "mileage",
                value
              )
            }
          />


          {/* Fuel */}

          <div>

            <label
              className="
                block

                mb-2

                text-[10px]

                uppercase
                tracking-[0.12em]

                font-semibold

                text-slate-500
              "
            >
              Fuel
            </label>

            <select
              value={form.fuel}
              onChange={(event) =>
                updateField(
                  "fuel",
                  event.target.value
                )
              }
              className="
                w-full
                h-11

                px-3.5

                rounded-xl

                bg-[#101C2A]

                border
                border-white/[0.07]

                outline-none

                text-[12px]

                text-white
              "
            >
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>

          </div>


          {/* Transmission */}

          <div>

            <label
              className="
                block

                mb-2

                text-[10px]

                uppercase
                tracking-[0.12em]

                font-semibold

                text-slate-500
              "
            >
              Transmission
            </label>

            <select
              value={form.transmission}
              onChange={(event) =>
                updateField(
                  "transmission",
                  event.target.value
                )
              }
              className="
                w-full
                h-11

                px-3.5

                rounded-xl

                bg-[#101C2A]

                border
                border-white/[0.07]

                outline-none

                text-[12px]

                text-white
              "
            >
              <option>Automatic</option>
              <option>Manual</option>
              <option>AMT</option>
              <option>CVT</option>
            </select>

          </div>


          <ModalInput
            label="Available units"
            type="number"
            value={form.available}
            placeholder="10"
            onChange={(value) =>
              updateField(
                "available",
                value
              )
            }
          />

        </div>


        {/* Footer */}

        <div
          className="
            flex
            justify-end

            gap-3

            mt-7
            pt-5

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

              bg-white/[0.03]

              border
              border-white/[0.07]

              text-[11px]

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

              text-[11px]

              font-bold

              text-[#031014]

              hover:brightness-105

              active:scale-[0.98]

              transition
            "
          >
            <Plus size={15} />

            Add Vehicle
          </button>

        </div>

      </motion.form>

    </div>
  );
}


/* ===========================================================
   PURCHASE VEHICLE MODAL
   =========================================================== */

function PurchaseVehicleModal({
  vehicle,
  success,
  onClose,
  onConfirm,
}) {
  const name =
    vehicle.name ||
    vehicle.model ||
    "Vehicle";

  const price =
    vehicle.price ||
    vehicle.startingPrice ||
    "₹45.00L";

  const available =
    vehicle.available ??
    vehicle.availableUnits ??
    vehicle.stock ??
    0;

  return (
    <div
      className="
        fixed
        inset-0

        z-[100]

        flex
        items-center
        justify-center

        p-5

        bg-black/75

        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
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
        className="
          w-full
          max-w-[480px]

          rounded-2xl

          bg-[#0B1420]

          border
          border-white/[0.08]

          shadow-[0_30px_100px_rgba(0,0,0,0.6)]

          p-6
        "
      >

        {!success ? (
          <>

            {/* Icon */}

            <div
              className="
                flex
                items-center
                justify-center

                w-14
                h-14

                rounded-2xl

                bg-[#18E0C4]/10

                border
                border-[#18E0C4]/15

                text-[#18E0C4]
              "
            >
              <ShoppingCart size={25} />
            </div>


            <h2
              className="
                mt-5

                text-[25px]

                font-bold

                tracking-[-0.03em]

                text-white
              "
            >
              Purchase vehicle?
            </h2>


            <p
              className="
                mt-2

                text-[13px]

                leading-6

                text-slate-500
              "
            >
              You are about to purchase{" "}
              <span className="font-semibold text-white">
                {name}
              </span>{" "}
              for your dealership.
            </p>


            {/* Summary */}

            <div
              className="
                mt-5

                p-4

                rounded-xl

                bg-white/[0.025]

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

                <span
                  className="
                    text-[11px]

                    text-slate-500
                  "
                >
                  Vehicle
                </span>

                <span
                  className="
                    text-[12px]

                    font-semibold

                    text-white

                    text-right
                  "
                >
                  {name}
                </span>

              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between

                  mt-4
                "
              >

                <span
                  className="
                    text-[11px]

                    text-slate-500
                  "
                >
                  Price
                </span>

                <span
                  className="
                    text-[17px]

                    font-bold

                    text-[#18E0C4]
                  "
                >
                  {price}
                </span>

              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between

                  mt-4
                "
              >

                <span
                  className="
                    text-[11px]

                    text-slate-500
                  "
                >
                  Available
                </span>

                <span
                  className="
                    text-[12px]

                    font-semibold

                    text-slate-300
                  "
                >
                  {available} units
                </span>

              </div>

            </div>


            {/* Actions */}

            <div
              className="
                flex

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

                  bg-white/[0.03]

                  border
                  border-white/[0.07]

                  text-[11px]

                  font-semibold

                  text-slate-400

                  hover:text-white

                  transition
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={onConfirm}
                className="
                  flex-1

                  flex
                  items-center
                  justify-center
                  gap-2

                  h-11

                  rounded-xl

                  bg-gradient-to-r
                  from-[#18E0C4]
                  to-[#28D7FF]

                  text-[11px]

                  font-bold

                  text-[#031014]

                  hover:brightness-105

                  active:scale-[0.98]

                  transition
                "
              >
                <ShoppingCart size={15} />

                Confirm Purchase
              </button>

            </div>

          </>
        ) : (

          /* =================================================
             SUCCESS
             ================================================= */

          <div className="text-center">

            <div
              className="
                mx-auto

                flex
                items-center
                justify-center

                w-16
                h-16

                rounded-full

                bg-[#22C55E]/10

                border
                border-[#22C55E]/20
              "
            >
              <CheckCircle2
                size={32}
                className="text-[#4ADE80]"
              />
            </div>


            <h2
              className="
                mt-5

                text-[25px]

                font-bold

                text-white
              "
            >
              Purchase successful
            </h2>


            <p
              className="
                mt-2

                text-[13px]

                leading-6

                text-slate-500
              "
            >
              {name} has been successfully
              added to your dealership
              purchase records.
            </p>


            <button
              type="button"
              onClick={onClose}
              className="
                w-full

                h-11

                mt-6

                rounded-xl

                bg-gradient-to-r
                from-[#18E0C4]
                to-[#28D7FF]

                text-[11px]

                font-bold

                text-[#031014]
              "
            >
              Done
            </button>

          </div>

        )}

      </motion.div>

    </div>
  );
}


export default Dashboard;
