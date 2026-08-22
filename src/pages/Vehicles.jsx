import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Edit3,
  Eye,
  Fuel,
  Gauge,
  Grid2X2,
  List,
  MapPin,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  Tag,
  Trash2,
  X,
} from "lucide-react";

/* ============================================================
   VEHICLE DATA
   ============================================================ */

const initialVehicles = [
  {
    id: "VH-1001",
    stockNo: "INV-FTN-001",
    brand: "Toyota",
    model: "Fortuner",
    variant: "Legender 4x4 AT",
    year: 2026,
    price: 5220000,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: 0,
    color: "Pearl White",
    location: "Hyderabad",
    status: "Available",
    condition: "New",
    category: "SUV",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
    features: ["4x4", "ADAS", "Ventilated Seats", "360° Camera"],
    added: "18 Aug 2026",
    bookings: 4,
    views: 328,
    description:
      "Premium 7-seater SUV with advanced safety, premium interiors and 4x4 capability.",
  },
  {
    id: "VH-1002",
    stockNo: "INV-BMW-002",
    brand: "BMW",
    model: "X5",
    variant: "xDrive40i M Sport",
    year: 2026,
    price: 8980000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 12,
    color: "Carbon Black",
    location: "Banjara Hills",
    status: "Reserved",
    condition: "New",
    category: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=85",
    features: ["M Sport", "Panoramic Roof", "360° Camera", "HUD"],
    added: "15 Aug 2026",
    bookings: 7,
    views: 521,
    description:
      "Luxury performance SUV combining dynamic handling with premium comfort.",
  },
  {
    id: "VH-1003",
    stockNo: "INV-HYN-003",
    brand: "Hyundai",
    model: "Creta",
    variant: "SX(O) IVT",
    year: 2026,
    price: 2310000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 8,
    color: "Titan Grey",
    location: "Secunderabad",
    status: "Available",
    condition: "New",
    category: "SUV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
    features: ["ADAS", "Panoramic Sunroof", "360° Camera", "Connected Car"],
    added: "20 Aug 2026",
    bookings: 5,
    views: 286,
    description:
      "Feature-rich urban SUV designed for comfort, technology and everyday practicality.",
  },
  {
    id: "VH-1004",
    stockNo: "INV-MBZ-004",
    brand: "Mercedes-Benz",
    model: "GLC",
    variant: "300 4MATIC AMG Line",
    year: 2026,
    price: 7480000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 6,
    color: "Obsidian Black",
    location: "Hyderabad",
    status: "Test Drive",
    condition: "New",
    category: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85",
    features: ["AMG Line", "ADAS", "Burmester", "Panoramic Roof"],
    added: "12 Aug 2026",
    bookings: 8,
    views: 641,
    description:
      "Sophisticated luxury SUV with advanced driver assistance and refined performance.",
  },
  {
    id: "VH-1005",
    stockNo: "INV-AUD-005",
    brand: "Audi",
    model: "Q5",
    variant: "Technology Pack",
    year: 2025,
    price: 5020000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 1120,
    color: "Navarra Blue",
    location: "Gachibowli",
    status: "Available",
    condition: "Certified",
    category: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
    features: ["Virtual Cockpit", "Quattro", "Premium Audio", "ADAS"],
    added: "5 Aug 2026",
    bookings: 3,
    views: 412,
    description:
      "Certified premium SUV with low mileage and a technology-focused cabin.",
  },
  {
    id: "VH-1006",
    stockNo: "INV-SKD-006",
    brand: "Skoda",
    model: "Kodiaq",
    variant: "L&K 2.0 TSI",
    year: 2026,
    price: 4120000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    color: "Moon White",
    location: "Hyderabad",
    status: "Available",
    condition: "New",
    category: "SUV",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=85",
    features: ["7 Seats", "Panoramic Roof", "360° Camera", "Ventilated Seats"],
    added: "16 Aug 2026",
    bookings: 6,
    views: 378,
    description:
      "Premium seven-seat family SUV with spacious interiors and advanced convenience features.",
  },
  {
    id: "VH-1007",
    stockNo: "INV-KIA-007",
    brand: "Kia",
    model: "EV6",
    variant: "GT Line AWD",
    year: 2026,
    price: 6100000,
    fuel: "Electric",
    transmission: "Automatic",
    mileage: 0,
    color: "Yacht Blue",
    location: "Banjara Hills",
    status: "Available",
    condition: "New",
    category: "Electric",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=85",
    features: ["AWD", "Fast Charging", "ADAS", "Digital Cockpit"],
    added: "19 Aug 2026",
    bookings: 9,
    views: 712,
    description:
      "High-performance electric crossover with long-range capability and fast charging.",
  },
  {
    id: "VH-1008",
    stockNo: "INV-TCM-008",
    brand: "Toyota",
    model: "Camry",
    variant: "Hybrid",
    year: 2026,
    price: 4820000,
    fuel: "Hybrid",
    transmission: "Automatic",
    mileage: 0,
    color: "Metal Stream",
    location: "Secunderabad",
    status: "Available",
    condition: "New",
    category: "Sedan",
    image:
      "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1000&q=85",
    features: ["Hybrid", "ADAS", "Premium Audio", "Ventilated Seats"],
    added: "14 Aug 2026",
    bookings: 4,
    views: 301,
    description:
      "Executive hybrid sedan focused on comfort, efficiency and refinement.",
  },
  {
    id: "VH-1009",
    stockNo: "INV-VMW-009",
    brand: "Volkswagen",
    model: "Tiguan",
    variant: "Elegance 2.0 TSI",
    year: 2026,
    price: 3860000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 0,
    color: "Deep Black",
    location: "Hyderabad",
    status: "Maintenance",
    condition: "New",
    category: "SUV",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=85",
    features: ["Panoramic Roof", "ADAS", "Digital Cockpit", "360° Camera"],
    added: "8 Aug 2026",
    bookings: 2,
    views: 240,
    description:
      "Premium compact SUV currently undergoing scheduled dealership preparation.",
  },
];

const EMPTY_FORM = {
  brand: "",
  model: "",
  variant: "",
  price: "",
  fuel: "Petrol",
  transmission: "Automatic",
  category: "SUV",
  location: "Hyderabad",
  color: "",
  year: 2026,
  mileage: 0,
  condition: "New",
  image: "",
  description: "",
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function Inventory() {
  const [vehicles, setVehicles] = useState(initialVehicles);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [priceRange, setPriceRange] = useState("All prices");
  const [modelYear, setModelYear] = useState("All years");

  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [toast, setToast] = useState("");

  /* ============================================================
     TOAST
     ============================================================ */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__autoEliteToast);

    window.__autoEliteToast = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ============================================================
     FILTER OPTIONS
     ============================================================ */

  const locations = useMemo(
    () => [
      "All",
      ...new Set(vehicles.map((vehicle) => vehicle.location)),
    ],
    [vehicles]
  );

  const categories = useMemo(
    () => [
      "All",
      ...new Set(vehicles.map((vehicle) => vehicle.category)),
    ],
    [vehicles]
  );

  const fuels = useMemo(
    () => [
      "All",
      ...new Set(vehicles.map((vehicle) => vehicle.fuel)),
    ],
    [vehicles]
  );

  const years = useMemo(
    () => [
      "All years",
      ...new Set(
        vehicles.map((vehicle) => String(vehicle.year))
      ),
    ],
    [vehicles]
  );

  /* ============================================================
     FILTER LOGIC
     ============================================================ */

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !query ||
        [
          vehicle.brand,
          vehicle.model,
          vehicle.variant,
          vehicle.stockNo,
          vehicle.id,
          vehicle.location,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "All" || vehicle.status === status;

      const matchesCategory =
        category === "All" ||
        vehicle.category === category;

      const matchesLocation =
        location === "All" ||
        vehicle.location === location;

      const matchesFuel =
        fuel === "All" || vehicle.fuel === fuel;

      const matchesPrice =
        priceRange === "All prices" ||
        (priceRange === "Under ₹30L" &&
          vehicle.price < 3000000) ||
        (priceRange === "₹30L – ₹50L" &&
          vehicle.price >= 3000000 &&
          vehicle.price <= 5000000) ||
        (priceRange === "₹50L – ₹80L" &&
          vehicle.price > 5000000 &&
          vehicle.price <= 8000000) ||
        (priceRange === "Above ₹80L" &&
          vehicle.price > 8000000);

      const matchesYear =
        modelYear === "All years" ||
        String(vehicle.year) === modelYear;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesLocation &&
        matchesFuel &&
        matchesPrice &&
        matchesYear
      );
    });
  }, [
    vehicles,
    search,
    status,
    category,
    location,
    fuel,
    priceRange,
    modelYear,
  ]);

  /* ============================================================
     KPI
     ============================================================ */

  const totalStock = vehicles.length;

  const available = vehicles.filter(
    (vehicle) => vehicle.status === "Available"
  ).length;

  const reserved = vehicles.filter(
    (vehicle) => vehicle.status === "Reserved"
  ).length;

  const testDrive = vehicles.filter(
    (vehicle) => vehicle.status === "Test Drive"
  ).length;

  const maintenance = vehicles.filter(
    (vehicle) => vehicle.status === "Maintenance"
  ).length;

  const availablePercent = totalStock
    ? Math.round((available / totalStock) * 100)
    : 0;

  const bookedPercent = totalStock
    ? Math.round(
        ((reserved + testDrive) / totalStock) * 100
      )
    : 0;

  /* ============================================================
     CLEAR FILTERS
     ============================================================ */

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setCategory("All");
    setLocation("All");
    setFuel("All");
    setPriceRange("All prices");
    setModelYear("All years");

    showToast("All filters cleared.");
  };

  /* ============================================================
     UPDATE VEHICLE
     ============================================================ */

  const updateVehicle = (id, changes) => {
    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.id === id
          ? {
              ...vehicle,
              ...changes,
            }
          : vehicle
      )
    );

    setSelectedVehicle((current) =>
      current
        ? {
            ...current,
            ...changes,
          }
        : null
    );
  };

  /* ============================================================
     DELETE VEHICLE
     ============================================================ */

  const deleteVehicle = (vehicle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${vehicle.brand} ${vehicle.model}?`
    );

    if (!confirmed) return;

    setVehicles((current) =>
      current.filter(
        (item) => item.id !== vehicle.id
      )
    );

    setSelectedVehicle(null);

    showToast(
      `${vehicle.brand} ${vehicle.model} removed from inventory.`
    );
  };

  /* ============================================================
     ADD VEHICLE
     ============================================================ */

  const addVehicle = (vehicle) => {
    setVehicles((current) => [
      vehicle,
      ...current,
    ]);

    setShowAdd(false);

    showToast("Vehicle added to inventory.");
  };

  /* ============================================================
     EDIT VEHICLE
     ============================================================ */

  const saveEditedVehicle = (vehicle) => {
    setVehicles((current) =>
      current.map((item) =>
        item.id === vehicle.id
          ? vehicle
          : item
      )
    );

    setSelectedVehicle(vehicle);
    setEditingVehicle(null);

    showToast("Vehicle details updated.");
  };

  return (
    <div className="w-full pb-12">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-8"
      >

        <div>

          <div className="flex items-center gap-2.5">

            <PackageCheck
              size={17}
              className="text-[#18E0C4]"
            />

            <span className="text-[12px] uppercase tracking-[0.18em] font-semibold text-[#18E0C4]">
              Dealership Inventory
            </span>

          </div>

          <h1 className="mt-3 text-[38px] sm:text-[44px] lg:text-[48px] leading-none font-bold tracking-[-0.04em] text-white">
            Vehicles
          </h1>

          <p className="mt-3 text-[15px] leading-6 text-slate-500">
            Manage live stock, vehicle availability,
            pricing, locations and test-drive readiness.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() =>
              showToast("Inventory synchronized successfully.")
            }
            className="h-11 px-5 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[13px] font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition inline-flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Sync inventory
          </button>

          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[13px] font-bold text-[#031014] hover:brightness-105 transition inline-flex items-center gap-2"
          >
            <Plus size={17} />
            Add vehicle
          </button>

        </div>

      </motion.div>


      {/* ======================================================
          KPI CARDS
          ====================================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <VehicleKPI
          icon={CarFront}
          label="Total stock"
          value={totalStock}
          detail="Vehicles in inventory"
        />

        <VehicleKPI
          icon={BadgeCheck}
          label="Available"
          value={available}
          detail="Ready for customers"
          accent="green"
        />

        <VehicleKPI
          icon={Tag}
          label="Reserved"
          value={reserved}
          detail="Customer reserved"
          accent="purple"
        />

        <VehicleKPI
          icon={CalendarDays}
          label="Test drive"
          value={testDrive}
          detail="Currently assigned"
          accent="blue"
        />

      </div>


      {/* ======================================================
          INVENTORY HEALTH
          ====================================================== */}

      <section className="p-6 mb-6 rounded-2xl bg-gradient-to-br from-[#10222A] via-[#0D1725] to-[#09111D] border border-[#18E0C4]/10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <div className="flex items-center gap-2">

              <Sparkles
                size={15}
                className="text-[#18E0C4]"
              />

              <span className="text-[11px] font-bold tracking-[0.16em] text-[#7DD3C7]">
                INVENTORY INTELLIGENCE
              </span>

            </div>

            <h2 className="mt-3 text-[19px] font-bold text-white">
              Stock health is looking strong
            </h2>

            <p className="mt-2 text-[13px] leading-5 text-slate-500">
              {available} vehicles are ready for immediate
              customer engagement across all locations.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <HealthMetric
              label="Available"
              value={`${availablePercent}%`}
            />

            <HealthMetric
              label="Booked"
              value={`${bookedPercent}%`}
            />

            <HealthMetric
              label="Locations"
              value={locations.length - 1}
            />

            <HealthMetric
              label="Maintenance"
              value={maintenance}
            />

          </div>

        </div>

      </section>


      {/* ======================================================
          TOOLBAR
          ====================================================== */}

      <section className="flex flex-col xl:flex-row gap-3 mb-5">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search brand, model, variant, stock number..."
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[14px] text-white placeholder:text-slate-700 outline-none focus:border-[#18E0C4]/30 transition"
          />

        </div>

        <div className="flex flex-wrap gap-2">

          <VehicleSelect
            value={status}
            onChange={setStatus}
            options={[
              "All",
              "Available",
              "Reserved",
              "Test Drive",
              "Maintenance",
            ]}
          />

          <VehicleSelect
            value={category}
            onChange={setCategory}
            options={categories}
          />

          <VehicleSelect
            value={fuel}
            onChange={setFuel}
            options={fuels}
          />

          <button
            type="button"
            onClick={() =>
              setShowFilters((value) => !value)
            }
            className={`h-12 w-12 rounded-xl border flex items-center justify-center transition ${
              showFilters
                ? "bg-[#18E0C4]/10 border-[#18E0C4]/20 text-[#18E0C4]"
                : "bg-white/[0.025] border-white/[0.07] text-slate-500 hover:text-white"
            }`}
          >
            <Settings2 size={18} />
          </button>

          <div className="flex p-1 rounded-xl bg-white/[0.025] border border-white/[0.07]">

            <ViewButton
              active={view === "grid"}
              onClick={() => setView("grid")}
              icon={Grid2X2}
            />

            <ViewButton
              active={view === "list"}
              onClick={() => setView("list")}
              icon={List}
            />

          </div>

        </div>

      </section>


      {/* ======================================================
          ADVANCED FILTERS
          ====================================================== */}

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0D1725] border border-white/[0.06]">

              <FilterBox
                icon={MapPin}
                label="Location"
                value={location}
                options={locations}
                onChange={setLocation}
              />

              <FilterBox
                icon={CircleDollarSign}
                label="Price range"
                value={priceRange}
                options={[
                  "All prices",
                  "Under ₹30L",
                  "₹30L – ₹50L",
                  "₹50L – ₹80L",
                  "Above ₹80L",
                ]}
                onChange={setPriceRange}
              />

              <FilterBox
                icon={CalendarDays}
                label="Model year"
                value={modelYear}
                options={years}
                onChange={setModelYear}
              />

              <div className="md:col-span-3 flex justify-end">

                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-10 px-5 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[13px] font-semibold text-slate-400 hover:text-white transition"
                >
                  Clear all filters
                </button>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ======================================================
          RESULTS HEADER
          ====================================================== */}

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-[20px] font-bold text-white">
            Inventory
          </h2>

          <p className="mt-1 text-[13px] text-slate-600">
            Showing{" "}
            <span className="text-slate-400 font-semibold">
              {filteredVehicles.length}
            </span>{" "}
            vehicles
          </p>

        </div>

        <div className="hidden sm:flex items-center gap-2 text-[12px] text-slate-600">

          <Sparkles
            size={13}
            className="text-[#18E0C4]"
          />

          Smart inventory ranking

        </div>

      </div>


      {/* ======================================================
          VEHICLE GRID
          ====================================================== */}

      {view === "grid" ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredVehicles.map(
            (vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                onOpen={() =>
                  setSelectedVehicle(vehicle)
                }
              />
            )
          )}

        </div>

      ) : (

        <div className="space-y-3">

          {filteredVehicles.map(
            (vehicle, index) => (
              <VehicleListRow
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                onOpen={() =>
                  setSelectedVehicle(vehicle)
                }
              />
            )
          )}

        </div>

      )}


      {/* ======================================================
          EMPTY
          ====================================================== */}

      {filteredVehicles.length === 0 && (
        <EmptyVehicles
          onClear={clearFilters}
        />
      )}


      {/* ======================================================
          DRAWER
          ====================================================== */}

      <AnimatePresence>

        {selectedVehicle && (

          <VehicleDrawer
            vehicle={selectedVehicle}
            onClose={() =>
              setSelectedVehicle(null)
            }
            onUpdate={updateVehicle}
            onDelete={deleteVehicle}
            onEdit={() =>
              setEditingVehicle(selectedVehicle)
            }
            onToast={showToast}
          />

        )}

      </AnimatePresence>


      {/* ======================================================
          ADD MODAL
          ====================================================== */}

      <AnimatePresence>

        {showAdd && (

          <AddVehicleModal
            onClose={() => setShowAdd(false)}
            onAdd={addVehicle}
          />

        )}

      </AnimatePresence>


      {/* ======================================================
          EDIT MODAL
          ====================================================== */}

      <AnimatePresence>

        {editingVehicle && (

          <EditVehicleModal
            vehicle={editingVehicle}
            onClose={() =>
              setEditingVehicle(null)
            }
            onSave={saveEditedVehicle}
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
            className="fixed right-5 bottom-5 z-[300] flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0D1725] border border-[#18E0C4]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >

            <Check
              size={18}
              className="text-[#18E0C4]"
            />

            <span className="text-[14px] font-medium text-slate-300">
              {toast}
            </span>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


/* ============================================================
   KPI
   ============================================================ */

function VehicleKPI({
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
    green: {
      bg: "bg-emerald-400/10",
      text: "text-emerald-300",
    },
    purple: {
      bg: "bg-violet-400/10",
      text: "text-violet-300",
    },
    blue: {
      bg: "bg-blue-400/10",
      text: "text-blue-300",
    },
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-[#0D1725] to-[#09111D] border border-white/[0.06] hover:border-white/[0.1] transition"
    >

      <div className="flex items-center justify-between">

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[accent].bg}`}
        >
          <Icon
            size={21}
            className={colors[accent].text}
          />
        </div>

        <ArrowUpRight
          size={16}
          className="text-slate-800"
        />

      </div>

      <p className="mt-5 text-[31px] leading-none font-bold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-2 text-[14px] font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[12px] text-slate-700">
        {detail}
      </p>

    </motion.div>
  );
}


/* ============================================================
   HEALTH METRIC
   ============================================================ */

function HealthMetric({
  label,
  value,
}) {
  return (
    <div className="min-w-[105px] px-4 py-3 rounded-xl bg-black/10 border border-white/[0.05]">

      <p className="text-[11px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-[19px] font-bold text-white">
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   VEHICLE CARD
   ============================================================ */

function VehicleCard({
  vehicle,
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
        y: -4,
      }}
      className="group overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D1725] to-[#09111D] border border-white/[0.06] hover:border-white/[0.1] transition"
    >

      {/* IMAGE */}

      <div className="relative h-[225px] overflow-hidden bg-[#101820]">

        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#09111D] via-transparent to-black/20" />

        <div className="absolute top-4 left-4">
          <VehicleStatus
            status={vehicle.status}
          />
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/35 backdrop-blur-md border border-white/[0.08]">

          <Eye
            size={14}
            className="text-slate-400"
          />

          <span className="text-[12px] text-slate-400">
            {vehicle.views}
          </span>

        </div>

        <div className="absolute bottom-5 left-5 right-5">

          <p className="text-[21px] font-bold text-white">
            {vehicle.brand} {vehicle.model}
          </p>

          <p className="mt-1.5 text-[13px] text-slate-300">
            {vehicle.variant}
          </p>

        </div>

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div>

            <p className="text-[21px] font-bold text-white">
              {formatPrice(vehicle.price)}
            </p>

            <p className="mt-1.5 text-[12px] text-slate-600">
              {vehicle.condition} • {vehicle.year}
            </p>

          </div>

          <button
            type="button"
            onClick={onOpen}
            className="w-10 h-10 rounded-xl bg-white/[0.025] border border-white/[0.06] text-slate-500 group-hover:text-[#18E0C4] flex items-center justify-center transition"
          >
            <ArrowRight size={17} />
          </button>

        </div>


        {/* SPECS */}

        <div className="grid grid-cols-3 gap-2.5 mt-5">

          <Spec
            icon={Fuel}
            value={vehicle.fuel}
          />

          <Spec
            icon={Settings2}
            value={vehicle.transmission}
          />

          <Spec
            icon={Gauge}
            value={
              vehicle.mileage === 0
                ? "New"
                : `${vehicle.mileage} km`
            }
          />

        </div>


        {/* LOCATION */}

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.04]">

          <div className="flex items-center gap-2">

            <MapPin
              size={14}
              className="text-slate-600"
            />

            <span className="text-[12px] text-slate-500">
              {vehicle.location}
            </span>

          </div>

          <span className="text-[11px] text-slate-700">
            {vehicle.stockNo}
          </span>

        </div>


        {/* FEATURES */}

        <div className="flex flex-wrap gap-2 mt-4">

          {vehicle.features
            .slice(0, 3)
            .map((feature) => (

              <span
                key={feature}
                className="px-2.5 py-1.5 rounded-lg bg-white/[0.018] border border-white/[0.04] text-[11px] text-slate-500"
              >
                {feature}
              </span>

            ))}

        </div>


        {/* FOOTER */}

        <div className="flex items-center justify-between mt-5">

          <span className="flex items-center gap-2 text-[11px] text-slate-600">

            <CalendarDays size={13} />

            {vehicle.bookings} bookings

          </span>

          <span className="flex items-center gap-2 text-[11px] text-slate-700">

            <Clock3 size={13} />

            Added {vehicle.added}

          </span>

        </div>

      </div>

    </motion.article>
  );
}


/* ============================================================
   LIST ROW
   ============================================================ */

function VehicleListRow({
  vehicle,
  index,
  onOpen,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.03,
      }}
      className="flex flex-col lg:flex-row lg:items-center gap-5 p-5 rounded-2xl bg-[#0D1725] border border-white/[0.06] hover:border-white/[0.1] transition"
    >

      <img
        src={vehicle.image}
        alt={`${vehicle.brand} ${vehicle.model}`}
        className="w-full lg:w-[150px] h-[105px] object-cover rounded-xl opacity-80"
      />

      <div className="flex-1">

        <div className="flex flex-wrap items-center gap-3">

          <h3 className="text-[18px] font-bold text-white">
            {vehicle.brand} {vehicle.model}
          </h3>

          <VehicleStatus
            status={vehicle.status}
          />

        </div>

        <p className="mt-1.5 text-[13px] text-slate-500">
          {vehicle.variant}
        </p>

        <div className="flex flex-wrap gap-5 mt-4">

          <MiniSpec
            icon={Fuel}
            value={vehicle.fuel}
          />

          <MiniSpec
            icon={Gauge}
            value={
              vehicle.mileage === 0
                ? "Brand New"
                : `${vehicle.mileage} km`
            }
          />

          <MiniSpec
            icon={MapPin}
            value={vehicle.location}
          />

        </div>

      </div>

      <div className="lg:w-[150px]">

        <p className="text-[20px] font-bold text-white">
          {formatPrice(vehicle.price)}
        </p>

        <p className="mt-1 text-[11px] text-slate-700">
          {vehicle.stockNo}
        </p>

      </div>

      <button
        type="button"
        onClick={onOpen}
        className="h-11 px-5 rounded-xl bg-white/[0.025] border border-white/[0.06] text-[13px] font-semibold text-slate-400 hover:text-white transition inline-flex items-center justify-center gap-2"
      >
        View
        <ArrowRight size={15} />
      </button>

    </motion.div>
  );
}


/* ============================================================
   VEHICLE DRAWER
   ============================================================ */

function VehicleDrawer({
  vehicle,
  onClose,
  onUpdate,
  onDelete,
  onEdit,
  onToast,
}) {
  return (
    <div
      className="fixed inset-0 z-[150] bg-black/65 backdrop-blur-sm"
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
        className="absolute right-0 top-0 bottom-0 w-full sm:max-w-[620px] overflow-y-auto bg-[#09111D] border-l border-white/[0.08] shadow-[-30px_0_100px_rgba(0,0,0,0.5)]"
      >

        {/* HEADER IMAGE */}

        <div className="relative h-[300px] overflow-hidden">

          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#09111D] via-[#09111D]/20 to-black/30" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-black/35 backdrop-blur-md border border-white/[0.08] text-slate-300 flex items-center justify-center hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="absolute left-6 bottom-6 right-6">

            <VehicleStatus
              status={vehicle.status}
            />

            <h2 className="mt-4 text-[30px] font-bold text-white">
              {vehicle.brand} {vehicle.model}
            </h2>

            <p className="mt-1.5 text-[15px] text-slate-300">
              {vehicle.variant}
            </p>

          </div>

        </div>


        <div className="p-6">

          {/* PRICE */}

          <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.018] border border-white/[0.05]">

            <div>

              <p className="text-[11px] uppercase tracking-wider text-slate-600">
                Current price
              </p>

              <p className="mt-2 text-[28px] font-bold text-white">
                {formatPrice(vehicle.price)}
              </p>

            </div>

            <div className="text-right">

              <p className="text-[11px] uppercase tracking-wider text-slate-600">
                Stock ID
              </p>

              <p className="mt-2 text-[14px] font-semibold text-[#18E0C4]">
                {vehicle.stockNo}
              </p>

            </div>

          </div>


          {/* SPECIFICATIONS */}

          <DrawerSection
            icon={CarFront}
            title="Vehicle specifications"
          >

            <div className="grid grid-cols-2 gap-3">

              <InfoCell
                label="Brand"
                value={vehicle.brand}
              />

              <InfoCell
                label="Model year"
                value={vehicle.year}
              />

              <InfoCell
                label="Fuel"
                value={vehicle.fuel}
              />

              <InfoCell
                label="Transmission"
                value={vehicle.transmission}
              />

              <InfoCell
                label="Mileage"
                value={
                  vehicle.mileage === 0
                    ? "Brand New"
                    : `${vehicle.mileage} km`
                }
              />

              <InfoCell
                label="Color"
                value={vehicle.color}
              />

              <InfoCell
                label="Condition"
                value={vehicle.condition}
              />

              <InfoCell
                label="Category"
                value={vehicle.category}
              />

            </div>

          </DrawerSection>


          {/* LOCATION */}

          <DrawerSection
            icon={MapPin}
            title="Inventory location"
          >

            <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.018] border border-white/[0.05]">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-[#18E0C4]/10 flex items-center justify-center">

                  <MapPin
                    size={18}
                    className="text-[#18E0C4]"
                  />

                </div>

                <div>

                  <p className="text-[15px] font-semibold text-slate-300">
                    {vehicle.location}
                  </p>

                  <p className="mt-1 text-[12px] text-slate-600">
                    Main dealership inventory
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  onToast(
                    `Map location: ${vehicle.location}`
                  )
                }
                className="text-[12px] font-semibold text-[#18E0C4] hover:underline"
              >
                View map
              </button>

            </div>

          </DrawerSection>


          {/* FEATURES */}

          <DrawerSection
            icon={Sparkles}
            title="Features"
          >

            <div className="flex flex-wrap gap-2.5">

              {vehicle.features.map(
                (feature) => (

                  <span
                    key={feature}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.018] border border-white/[0.05] text-[12px] text-slate-400"
                  >

                    <Check
                      size={14}
                      className="text-[#18E0C4]"
                    />

                    {feature}

                  </span>

                )
              )}

            </div>

          </DrawerSection>


          {/* DESCRIPTION */}

          <DrawerSection
            icon={Tag}
            title="Description"
          >

            <div className="p-5 rounded-2xl bg-white/[0.018] border border-white/[0.05]">

              <p className="text-[14px] leading-7 text-slate-500">
                {vehicle.description}
              </p>

            </div>

          </DrawerSection>


          {/* PERFORMANCE */}

          <DrawerSection
            icon={Sparkles}
            title="Vehicle performance"
          >

            <div className="grid grid-cols-3 gap-3">

              <InfoCell
                label="Views"
                value={vehicle.views}
              />

              <InfoCell
                label="Bookings"
                value={vehicle.bookings}
              />

              <InfoCell
                label="Added"
                value={vehicle.added}
              />

            </div>

          </DrawerSection>


          {/* ACTIONS */}

          <div className="mt-8 pt-6 border-t border-white/[0.05]">

            <p className="mb-4 text-[12px] uppercase tracking-wider font-bold text-slate-600">
              Inventory actions
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {vehicle.status !== "Available" && (

                <ActionButton
                  onClick={() => {
                    onUpdate(vehicle.id, {
                      status: "Available",
                    });

                    onToast("Vehicle marked available.");
                  }}
                  icon={BadgeCheck}
                  text="Mark available"
                  green
                />

              )}

              {vehicle.status === "Available" && (

                <ActionButton
                  onClick={() => {
                    onUpdate(vehicle.id, {
                      status: "Reserved",
                    });

                    onToast("Vehicle reserved.");
                  }}
                  icon={Tag}
                  text="Reserve vehicle"
                  purple
                />

              )}

              {vehicle.status !== "Test Drive" && (

                <ActionButton
                  onClick={() => {
                    onUpdate(vehicle.id, {
                      status: "Test Drive",
                    });

                    onToast(
                      "Vehicle assigned for test drive."
                    );
                  }}
                  icon={CalendarDays}
                  text="Start test drive"
                  blue
                />

              )}

              {vehicle.status === "Test Drive" && (

                <ActionButton
                  onClick={() => {
                    onUpdate(vehicle.id, {
                      status: "Available",
                    });

                    onToast(
                      "Test drive completed. Vehicle available."
                    );
                  }}
                  icon={Check}
                  text="Complete test drive"
                  green
                />

              )}

              <ActionButton
                onClick={onEdit}
                icon={Edit3}
                text="Edit vehicle"
              />

              <ActionButton
                onClick={() =>
                  onToast(
                    `Test drive scheduled for ${vehicle.brand} ${vehicle.model}.`
                  )
                }
                icon={CalendarDays}
                text="Schedule drive"
                cyan
              />

              <button
                type="button"
                onClick={() => onDelete(vehicle)}
                className="sm:col-span-2 h-12 rounded-xl bg-red-400/[0.04] border border-red-400/10 text-[13px] font-semibold text-red-300 hover:bg-red-400/[0.08] transition inline-flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete vehicle
              </button>

            </div>

          </div>

        </div>

      </motion.aside>

    </div>
  );
}


/* ============================================================
   ACTION BUTTON
   ============================================================ */

function ActionButton({
  onClick,
  icon: Icon,
  text,
  green,
  purple,
  blue,
  cyan,
}) {
  let classes =
    "bg-white/[0.025] border-white/[0.06] text-slate-400 hover:text-white";

  if (green) {
    classes =
      "bg-emerald-400/[0.05] border-emerald-400/10 text-emerald-300";
  }

  if (purple) {
    classes =
      "bg-violet-400/[0.05] border-violet-400/10 text-violet-300";
  }

  if (blue) {
    classes =
      "bg-blue-400/[0.05] border-blue-400/10 text-blue-300";
  }

  if (cyan) {
    classes =
      "bg-[#18E0C4]/[0.05] border-[#18E0C4]/10 text-[#18E0C4]";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-xl border text-[13px] font-semibold transition inline-flex items-center justify-center gap-2 ${classes}`}
    >
      <Icon size={16} />
      {text}
    </button>
  );
}


/* ============================================================
   ADD VEHICLE MODAL
   ============================================================ */

function AddVehicleModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] =
    useState(EMPTY_FORM);

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.brand.trim() ||
      !form.model.trim() ||
      !form.variant.trim() ||
      !form.price
    ) {
      alert(
        "Please enter Brand, Model, Variant and Price."
      );

      return;
    }

    const id = `VH-${Date.now()
      .toString()
      .slice(-4)}`;

    onAdd({
      id,
      stockNo: `INV-${form.brand
        .slice(0, 3)
        .toUpperCase()}-${id.slice(-3)}`,
      brand: form.brand.trim(),
      model: form.model.trim(),
      variant: form.variant.trim(),
      year: Number(form.year) || 2026,
      price: Number(form.price),
      fuel: form.fuel,
      transmission: form.transmission,
      mileage: Number(form.mileage) || 0,
      color: form.color || "Not specified",
      location: form.location,
      status: "Available",
      condition: form.condition,
      category: form.category,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85",
      features: [
        "New Arrival",
        "Warranty",
        "Ready for Delivery",
      ],
      added: "Today",
      bookings: 0,
      views: 0,
      description:
        form.description ||
        "New vehicle added to dealership inventory.",
    });
  };

  return (
    <ModalOverlay onClose={onClose}>

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
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0D1725] border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
      >

        <ModalHeader
          title="Add vehicle"
          subtitle="Add a new vehicle to the live dealership inventory."
          onClose={onClose}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">

          <FormField
            label="Brand"
            value={form.brand}
            onChange={(value) =>
              update("brand", value)
            }
            placeholder="Toyota"
          />

          <FormField
            label="Model"
            value={form.model}
            onChange={(value) =>
              update("model", value)
            }
            placeholder="Fortuner"
          />

          <FormField
            label="Variant"
            value={form.variant}
            onChange={(value) =>
              update("variant", value)
            }
            placeholder="Legender 4x4 AT"
          />

          <FormField
            label="Price"
            value={form.price}
            onChange={(value) =>
              update("price", value)
            }
            placeholder="5200000"
            type="number"
          />

          <FormField
            label="Year"
            value={form.year}
            onChange={(value) =>
              update("year", value)
            }
            type="number"
          />

          <FormField
            label="Mileage"
            value={form.mileage}
            onChange={(value) =>
              update("mileage", value)
            }
            type="number"
          />

          <FormSelect
            label="Fuel"
            value={form.fuel}
            onChange={(value) =>
              update("fuel", value)
            }
            options={[
              "Petrol",
              "Diesel",
              "Electric",
              "Hybrid",
            ]}
          />

          <FormSelect
            label="Transmission"
            value={form.transmission}
            onChange={(value) =>
              update("transmission", value)
            }
            options={[
              "Automatic",
              "Manual",
            ]}
          />

          <FormSelect
            label="Category"
            value={form.category}
            onChange={(value) =>
              update("category", value)
            }
            options={[
              "SUV",
              "Luxury SUV",
              "Sedan",
              "Electric",
              "Hatchback",
              "MPV",
            ]}
          />

          <FormSelect
            label="Location"
            value={form.location}
            onChange={(value) =>
              update("location", value)
            }
            options={[
              "Hyderabad",
              "Banjara Hills",
              "Secunderabad",
              "Gachibowli",
            ]}
          />

          <FormSelect
            label="Condition"
            value={form.condition}
            onChange={(value) =>
              update("condition", value)
            }
            options={[
              "New",
              "Certified",
              "Used",
            ]}
          />

          <FormField
            label="Color"
            value={form.color}
            onChange={(value) =>
              update("color", value)
            }
            placeholder="Pearl White"
          />

          <div className="sm:col-span-2">

            <FormField
              label="Image URL"
              value={form.image}
              onChange={(value) =>
                update("image", value)
              }
              placeholder="https://..."
            />

          </div>

          <div className="sm:col-span-2">

            <label className="block">

              <span className="block mb-2 text-[12px] uppercase tracking-wider font-bold text-slate-500">
                Description
              </span>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  update(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Enter vehicle description..."
                className="w-full rounded-xl bg-white/[0.025] border border-white/[0.07] px-4 py-3 text-[14px] text-white placeholder:text-slate-700 outline-none focus:border-[#18E0C4]/30 resize-none"
              />

            </label>

          </div>

        </div>

        <div className="flex justify-end gap-3 px-6 pb-6">

          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[13px] font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[13px] font-bold text-[#031014]"
          >
            Add to inventory
          </button>

        </div>

      </motion.form>

    </ModalOverlay>
  );
}


/* ============================================================
   EDIT VEHICLE MODAL
   ============================================================ */

function EditVehicleModal({
  vehicle,
  onClose,
  onSave,
}) {
  const [form, setForm] =
    useState({
      ...vehicle,
    });

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();

    onSave({
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
    });
  };

  return (
    <ModalOverlay onClose={onClose}>

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
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0D1725] border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
      >

        <ModalHeader
          title="Edit vehicle"
          subtitle={`${vehicle.brand} ${vehicle.model} • ${vehicle.stockNo}`}
          onClose={onClose}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">

          <FormField
            label="Brand"
            value={form.brand}
            onChange={(value) =>
              update("brand", value)
            }
          />

          <FormField
            label="Model"
            value={form.model}
            onChange={(value) =>
              update("model", value)
            }
          />

          <FormField
            label="Variant"
            value={form.variant}
            onChange={(value) =>
              update("variant", value)
            }
          />

          <FormField
            label="Price"
            value={form.price}
            onChange={(value) =>
              update("price", value)
            }
            type="number"
          />

          <FormField
            label="Year"
            value={form.year}
            onChange={(value) =>
              update("year", value)
            }
            type="number"
          />

          <FormField
            label="Mileage"
            value={form.mileage}
            onChange={(value) =>
              update("mileage", value)
            }
            type="number"
          />

          <FormSelect
            label="Status"
            value={form.status}
            onChange={(value) =>
              update("status", value)
            }
            options={[
              "Available",
              "Reserved",
              "Test Drive",
              "Maintenance",
            ]}
          />

          <FormSelect
            label="Fuel"
            value={form.fuel}
            onChange={(value) =>
              update("fuel", value)
            }
            options={[
              "Petrol",
              "Diesel",
              "Electric",
              "Hybrid",
            ]}
          />

          <FormSelect
            label="Transmission"
            value={form.transmission}
            onChange={(value) =>
              update("transmission", value)
            }
            options={[
              "Automatic",
              "Manual",
            ]}
          />

          <FormSelect
            label="Category"
            value={form.category}
            onChange={(value) =>
              update("category", value)
            }
            options={[
              "SUV",
              "Luxury SUV",
              "Sedan",
              "Electric",
              "Hatchback",
              "MPV",
            ]}
          />

          <FormSelect
            label="Location"
            value={form.location}
            onChange={(value) =>
              update("location", value)
            }
            options={[
              "Hyderabad",
              "Banjara Hills",
              "Secunderabad",
              "Gachibowli",
            ]}
          />

          <FormField
            label="Color"
            value={form.color}
            onChange={(value) =>
              update("color", value)
            }
          />

          <div className="sm:col-span-2">

            <FormField
              label="Image URL"
              value={form.image}
              onChange={(value) =>
                update("image", value)
              }
            />

          </div>

          <div className="sm:col-span-2">

            <label className="block">

              <span className="block mb-2 text-[12px] uppercase tracking-wider font-bold text-slate-500">
                Description
              </span>

              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  update(
                    "description",
                    event.target.value
                  )
                }
                className="w-full rounded-xl bg-white/[0.025] border border-white/[0.07] px-4 py-3 text-[14px] text-white outline-none focus:border-[#18E0C4]/30 resize-none"
              />

            </label>

          </div>

        </div>

        <div className="flex justify-end gap-3 px-6 pb-6">

          <button
            type="button"
            onClick={onClose}
            className="h-11 px-6 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[13px] font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[13px] font-bold text-[#031014]"
          >
            Save changes
          </button>

        </div>

      </motion.form>

    </ModalOverlay>
  );
}


/* ============================================================
   STATUS
   ============================================================ */

function VehicleStatus({
  status,
}) {
  const styles = {
    Available:
      "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",

    Reserved:
      "bg-violet-400/10 text-violet-300 border-violet-400/20",

    "Test Drive":
      "bg-blue-400/10 text-blue-300 border-blue-400/20",

    Maintenance:
      "bg-amber-400/10 text-amber-300 border-amber-400/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-md text-[11px] font-bold ${
        styles[status] ||
        styles.Available
      }`}
    >

      <span className="w-2 h-2 rounded-full bg-current" />

      {status}

    </span>
  );
}


/* ============================================================
   SPEC
   ============================================================ */

function Spec({
  icon: Icon,
  value,
}) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.018] border border-white/[0.04]">

      <Icon
        size={15}
        className="text-slate-600"
      />

      <span className="truncate text-[11px] font-medium text-slate-500">
        {value}
      </span>

    </div>
  );
}


/* ============================================================
   MINI SPEC
   ============================================================ */

function MiniSpec({
  icon: Icon,
  value,
}) {
  return (
    <span className="flex items-center gap-2 text-[12px] text-slate-600">

      <Icon size={14} />

      {value}

    </span>
  );
}


/* ============================================================
   VIEW BUTTON
   ============================================================ */

function ViewButton({
  active,
  onClick,
  icon: Icon,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${
        active
          ? "bg-white/[0.07] text-[#18E0C4]"
          : "text-slate-700 hover:text-white"
      }`}
    >
      <Icon size={17} />
    </button>
  );
}


/* ============================================================
   SELECT
   ============================================================ */

function VehicleSelect({
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
        className="appearance-none h-12 min-w-[130px] px-4 pr-10 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[13px] text-slate-400 outline-none focus:border-[#18E0C4]/30"
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
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none"
      />

    </div>
  );
}


/* ============================================================
   FILTER BOX
   ============================================================ */

function FilterBox({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="block p-4 rounded-xl bg-white/[0.018] border border-white/[0.05]">

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="text-[#18E0C4]"
        />

        <span className="text-[12px] uppercase tracking-wider font-bold text-slate-600">
          {label}
        </span>

      </div>

      <div className="relative mt-3">

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="appearance-none w-full h-11 px-3 pr-9 rounded-xl bg-black/10 border border-white/[0.04] text-[13px] text-slate-400 outline-none focus:border-[#18E0C4]/20"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none"
        />

      </div>

    </label>
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

      <div className="flex items-center gap-2.5 mb-4">

        <Icon
          size={16}
          className="text-[#18E0C4]"
        />

        <h3 className="text-[15px] font-bold text-slate-300">
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
    <div className="p-4 rounded-xl bg-white/[0.018] border border-white/[0.04]">

      <p className="text-[11px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-2 break-words text-[14px] font-semibold text-slate-400">
        {value}
      </p>

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
    <label className="block">

      <span className="block mb-2 text-[12px] uppercase tracking-wider font-bold text-slate-500">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[14px] text-white placeholder:text-slate-700 outline-none focus:border-[#18E0C4]/30 transition"
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
    <label className="block">

      <span className="block mb-2 text-[12px] uppercase tracking-wider font-bold text-slate-500">
        {label}
      </span>

      <div className="relative">

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="appearance-none w-full h-11 px-4 pr-10 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[14px] text-white outline-none focus:border-[#18E0C4]/30"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 pointer-events-none"
        />

      </div>

    </label>
  );
}


/* ============================================================
   MODAL HEADER
   ============================================================ */

function ModalHeader({
  title,
  subtitle,
  onClose,
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-6 border-b border-white/[0.06]">

      <div>

        <h2 className="text-[22px] font-bold text-white">
          {title}
        </h2>

        <p className="mt-1.5 text-[13px] text-slate-600">
          {subtitle}
        </p>

      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-11 h-11 rounded-xl bg-white/[0.025] border border-white/[0.06] text-slate-500 hover:text-white flex items-center justify-center"
      >
        <X size={18} />
      </button>

    </div>
  );
}


/* ============================================================
   MODAL OVERLAY
   ============================================================ */

function ModalOverlay({
  children,
  onClose,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] p-4 sm:p-6 flex items-center justify-center bg-black/75 backdrop-blur-md overflow-y-auto"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {children}
    </motion.div>
  );
}


/* ============================================================
   EMPTY
   ============================================================ */

function EmptyVehicles({
  onClear,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-2xl bg-[#0D1725] border border-white/[0.06] text-center">

      <CarFront
        size={40}
        className="text-slate-800"
      />

      <p className="mt-5 text-[18px] font-bold text-slate-400">
        No vehicles found
      </p>

      <p className="mt-2 text-[13px] text-slate-700">
        Try changing your inventory filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 h-10 px-5 rounded-xl bg-white/[0.025] border border-white/[0.06] text-[13px] font-semibold text-[#18E0C4]"
      >
        Clear filters
      </button>

    </div>
  );
}


/* ============================================================
   FORMAT PRICE
   ============================================================ */

function formatPrice(value) {
  const amount = Number(value || 0);

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  }

  return `₹${(amount / 100000).toFixed(2)}L`;
}
