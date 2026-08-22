import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CarFront,
  CheckCircle2,
  ChevronDown,
  Eye,
  Fuel,
  Gauge,
  Plus,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
  X,
  Zap,
} from "lucide-react";

/* ============================================================
   AUTOELITE INVENTORY
   Professional dealership inventory management
   ============================================================ */

const INITIAL_VEHICLES = [
  {
    id: "VEH001",
    brand: "Toyota",
    model: "Fortuner",
    variant: "4x4 Diesel AT",
    category: "SUV",
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 4500000,
    stock: 12,
    status: "In Stock",
    km: 12000,
    color: "White Pearl",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    description:
      "Premium 7-seater SUV with powerful diesel performance, advanced safety and excellent road presence.",
    features: [
      "4x4 Drive",
      "7 Seater",
      "ABS",
      "Airbags",
      "Cruise Control",
      "360° Camera",
    ],
  },

  {
    id: "VEH002",
    brand: "Hyundai",
    model: "Creta",
    variant: "SX(O) 1.5 Petrol",
    category: "SUV",
    year: 2024,
    fuel: "Petrol",
    transmission: "Manual",
    price: 1850000,
    stock: 9,
    status: "In Stock",
    km: 8500,
    color: "Titan Grey",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=85",
    description:
      "Stylish premium SUV offering excellent comfort, technology and efficient everyday performance.",
    features: [
      "Panoramic Sunroof",
      "6 Airbags",
      "ABS",
      "Cruise Control",
      "Rear Camera",
      "Touchscreen",
    ],
  },

  {
    id: "VEH003",
    brand: "Kia",
    model: "Seltos",
    variant: "HTX 1.5 Diesel",
    category: "SUV",
    year: 2024,
    fuel: "Diesel",
    transmission: "Manual",
    price: 1690000,
    stock: 4,
    status: "Low Stock",
    km: 14600,
    color: "Glacier White",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85",
    description:
      "Feature-rich diesel SUV with a premium cabin, strong efficiency and modern technology.",
    features: [
      "ADAS",
      "Ventilated Seats",
      "6 Airbags",
      "Sunroof",
      "Rear Camera",
      "LED Lamps",
    ],
  },

  {
    id: "VEH004",
    brand: "Maruti",
    model: "Brezza",
    variant: "Zxi 1.5 Petrol",
    category: "SUV",
    year: 2024,
    fuel: "Petrol",
    transmission: "Manual",
    price: 845000,
    stock: 18,
    status: "In Stock",
    km: 6700,
    color: "Magma Grey",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=85",
    description:
      "Practical compact SUV designed for comfortable city driving and efficient everyday usage.",
    features: [
      "6 Airbags",
      "ESP",
      "Rear Camera",
      "Cruise Control",
      "SmartPlay",
      "LED Lamps",
    ],
  },

  {
    id: "VEH005",
    brand: "Honda",
    model: "City",
    variant: "V CVT Petrol",
    category: "Sedan",
    year: 2024,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 1420000,
    stock: 0,
    status: "Sold",
    km: 9200,
    color: "Radiant Red",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Premium sedan offering refined performance, spacious interiors and comfortable long-distance driving.",
    features: [
      "Honda Sensing",
      "6 Airbags",
      "Sunroof",
      "Rear Camera",
      "Cruise Control",
      "LED Lamps",
    ],
  },

  {
    id: "VEH006",
    brand: "Toyota",
    model: "Innova Hycross",
    variant: "ZX Hybrid",
    category: "MPV",
    year: 2024,
    fuel: "Hybrid",
    transmission: "Automatic",
    price: 3650000,
    stock: 7,
    status: "In Stock",
    km: 4300,
    color: "Silver Metallic",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Premium family MPV combining hybrid efficiency, spacious seating and long-distance comfort.",
    features: [
      "Hybrid",
      "7 Seater",
      "ADAS",
      "Panoramic Roof",
      "360° Camera",
      "Power Seats",
    ],
  },

  {
    id: "VEH007",
    brand: "Mahindra",
    model: "XUV700",
    variant: "AX7 Diesel",
    category: "SUV",
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    price: 2450000,
    stock: 9,
    status: "In Stock",
    km: 7600,
    color: "Midnight Black",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Powerful premium SUV equipped with advanced driver assistance and a spacious cabin.",
    features: [
      "ADAS",
      "Panoramic Roof",
      "7 Seater",
      "6 Airbags",
      "360° Camera",
      "Drive Modes",
    ],
  },

  {
    id: "VEH008",
    brand: "Tata",
    model: "Nexon",
    variant: "Fearless Petrol",
    category: "SUV",
    year: 2024,
    fuel: "Petrol",
    transmission: "Automatic",
    price: 1250000,
    stock: 15,
    status: "In Stock",
    km: 3900,
    color: "Daytona Grey",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    description:
      "Modern compact SUV combining strong safety, stylish design and connected technology.",
    features: [
      "6 Airbags",
      "ESP",
      "360° Camera",
      "Sunroof",
      "Connected Car",
      "Cruise Control",
    ],
  },
];

const EMPTY_FORM = {
  brand: "",
  model: "",
  variant: "",
  category: "SUV",
  year: new Date().getFullYear(),
  fuel: "Petrol",
  transmission: "Manual",
  price: "",
  stock: "",
  status: "In Stock",
  km: "",
  color: "",
  image: "",
  description: "",
};

const ITEMS_PER_PAGE = 5;

const formatPrice = (price) =>
  `₹${Number(price || 0).toLocaleString("en-IN")}`;

const STATUS_STYLES = {
  "In Stock":
    "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",

  "Low Stock":
    "bg-amber-400/10 text-amber-300 border-amber-400/20",

  Reserved:
    "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",

  Sold:
    "bg-violet-400/10 text-violet-300 border-violet-400/20",
};

export default function Inventory() {
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [modelFilter, setModelFilter] = useState("All Models");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] =
    useState(false);

  const [selectedVehicle, setSelectedVehicle] =
    useState(null);

  const [purchaseComplete, setPurchaseComplete] =
    useState(false);

  const [form, setForm] = useState(EMPTY_FORM);

  /* ============================================================
     FILTER OPTIONS
     ============================================================ */

  const brands = useMemo(() => {
    return [
      "All Brands",
      ...new Set(vehicles.map((vehicle) => vehicle.brand)),
    ];
  }, [vehicles]);

  const models = useMemo(() => {
    return [
      "All Models",
      ...new Set(
        vehicles
          .filter(
            (vehicle) =>
              brandFilter === "All Brands" ||
              vehicle.brand === brandFilter
          )
          .map((vehicle) => vehicle.model)
      ),
    ];
  }, [vehicles, brandFilter]);

  /* ============================================================
     FILTERED VEHICLES
     ============================================================ */

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !query ||
        `${vehicle.brand} ${vehicle.model} ${vehicle.variant} ${vehicle.id}`
          .toLowerCase()
          .includes(query);

      const matchesBrand =
        brandFilter === "All Brands" ||
        vehicle.brand === brandFilter;

      const matchesModel =
        modelFilter === "All Models" ||
        vehicle.model === modelFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        vehicle.status === statusFilter;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesModel &&
        matchesStatus
      );
    });
  }, [
    vehicles,
    search,
    brandFilter,
    modelFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleVehicles = filteredVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ============================================================
     SUMMARY
     ============================================================ */

  const summary = useMemo(() => {
    const availableUnits = vehicles.reduce(
      (total, vehicle) => total + Number(vehicle.stock || 0),
      0
    );

    const lowStock = vehicles.filter(
      (vehicle) => vehicle.status === "Low Stock"
    ).length;

    const sold = vehicles.filter(
      (vehicle) => vehicle.status === "Sold"
    ).length;

    return {
      models: vehicles.length,
      availableUnits,
      lowStock,
      sold,
    };
  }, [vehicles]);

  /* ============================================================
     HELPERS
     ============================================================ */

  const resetPage = () => setPage(1);

  const clearFilters = () => {
    setSearch("");
    setBrandFilter("All Brands");
    setModelFilter("All Models");
    setStatusFilter("All Status");
    resetPage();
  };

  const updateForm = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  /* ============================================================
     ADD VEHICLE
     ============================================================ */

  const handleAddVehicle = (event) => {
    event.preventDefault();

    if (
      !form.brand.trim() ||
      !form.model.trim() ||
      !form.variant.trim() ||
      !form.price ||
      !form.stock
    ) {
      alert(
        "Please fill Brand, Model, Variant, Price and Stock."
      );
      return;
    }

    const stock = Number(form.stock);

    const newVehicle = {
      ...form,

      id: `VEH${String(vehicles.length + 1).padStart(3, "0")}`,

      year: Number(form.year),
      price: Number(form.price),
      stock,
      km: Number(form.km || 0),

      status:
        stock === 0
          ? "Sold"
          : stock <= 5
          ? "Low Stock"
          : form.status,

      image:
        form.image ||
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=85",

      description:
        form.description ||
        "New vehicle added to AutoElite dealership inventory.",

      features: [
        "ABS",
        "Airbags",
        "Rear Camera",
        "Cruise Control",
      ],
    };

    setVehicles((current) => [
      newVehicle,
      ...current,
    ]);

    setForm(EMPTY_FORM);
    setShowAddModal(false);
    resetPage();
  };

  /* ============================================================
     PURCHASE
     ============================================================ */

  const openPurchase = (vehicle) => {
    setSelectedVehicle(vehicle);
    setPurchaseComplete(false);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedVehicle || selectedVehicle.stock <= 0) {
      return;
    }

    setVehicles((current) =>
      current.map((vehicle) => {
        if (vehicle.id !== selectedVehicle.id) {
          return vehicle;
        }

        const newStock = Math.max(
          0,
          vehicle.stock - 1
        );

        return {
          ...vehicle,
          stock: newStock,

          status:
            newStock === 0
              ? "Sold"
              : newStock <= 5
              ? "Low Stock"
              : "In Stock",
        };
      })
    );

    setPurchaseComplete(true);
  };

  /* ============================================================
     DELETE
     ============================================================ */

  const deleteVehicle = (vehicle) => {
    const confirmed = window.confirm(
      `Delete ${vehicle.brand} ${vehicle.model} from inventory?`
    );

    if (!confirmed) return;

    setVehicles((current) =>
      current.filter(
        (item) => item.id !== vehicle.id
      )
    );

    setShowDetailsModal(false);
    setSelectedVehicle(null);
  };

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div className="w-full min-h-screen pb-12">

      {/* ========================================================
          HEADER
          ======================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <div>

            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#18E0C4] shadow-[0_0_14px_rgba(24,224,196,0.8)]" />

              <span className="text-[12px] uppercase tracking-[0.18em] font-bold text-[#18E0C4]">
                Dealership Command Center
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[46px] lg:text-[50px] leading-none font-bold tracking-[-0.045em] text-white">
              Inventory
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-slate-500">
              Manage vehicles, availability and stock movement
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[#031014] font-bold text-[13px] inline-flex items-center justify-center gap-2 shadow-[0_12px_35px_rgba(24,224,196,0.12)] hover:brightness-105 active:scale-[0.98] transition"
          >
            <Plus size={18} />
            Add Vehicle
          </button>

        </div>
      </motion.div>


      {/* ========================================================
          SUMMARY CARDS
          ======================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        <SummaryCard
          icon={CarFront}
          title="Vehicle Models"
          value={summary.models}
          subtitle="Across dealership"
        />

        <SummaryCard
          icon={ShoppingCart}
          title="Available Units"
          value={summary.availableUnits}
          subtitle="Currently available"
          accent="cyan"
        />

        <SummaryCard
          icon={Zap}
          title="Low Stock"
          value={summary.lowStock}
          subtitle="Need attention"
          accent="amber"
        />

        <SummaryCard
          icon={CheckCircle2}
          title="Sold Models"
          value={summary.sold}
          subtitle="Completed inventory"
          accent="violet"
        />

      </div>


      {/* ========================================================
          FILTER AREA
          ======================================================== */}

      <section className="rounded-2xl bg-gradient-to-br from-[#0D1725] to-[#09111D] border border-white/[0.06] p-5 sm:p-6 mb-6">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-9 h-9 rounded-xl bg-[#18E0C4]/10 border border-[#18E0C4]/10 flex items-center justify-center">
            <SlidersHorizontal
              size={17}
              className="text-[#18E0C4]"
            />
          </div>

          <div>
            <h2 className="text-[15px] font-bold text-white">
              Inventory Filters
            </h2>

            <p className="text-[12px] text-slate-600 mt-1">
              Find and manage vehicles quickly
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1fr_auto] gap-3">

          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
            />

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                resetPage();
              }}
              placeholder="Search by vehicle, model or ID..."
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.025] border border-white/[0.07] outline-none text-[13px] text-white placeholder:text-slate-600 focus:border-[#18E0C4]/30 transition"
            />

          </div>


          <FilterSelect
            value={brandFilter}
            onChange={(event) => {
              setBrandFilter(event.target.value);
              setModelFilter("All Models");
              resetPage();
            }}
            options={brands}
          />


          <FilterSelect
            value={modelFilter}
            onChange={(event) => {
              setModelFilter(event.target.value);
              resetPage();
            }}
            options={models}
          />


          <FilterSelect
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              resetPage();
            }}
            options={[
              "All Status",
              "In Stock",
              "Low Stock",
              "Reserved",
              "Sold",
            ]}
          />


          <button
            type="button"
            onClick={clearFilters}
            className="h-12 px-5 rounded-xl bg-white/[0.025] border border-white/[0.07] text-slate-400 hover:text-white hover:bg-white/[0.05] transition text-[12px] font-semibold"
          >
            Clear
          </button>

        </div>

      </section>


      {/* ========================================================
          INVENTORY
          ======================================================== */}

      <section className="rounded-2xl bg-gradient-to-br from-[#0D1725] to-[#09111D] border border-white/[0.06] overflow-hidden">

        {/* SECTION HEADER */}

        <div className="px-5 sm:px-6 py-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-[18px] font-bold text-white">
              Vehicle Inventory
            </h2>

            <p className="text-[12px] text-slate-600 mt-1">
              {filteredVehicles.length} vehicles matching your current filters
            </p>
          </div>

          <div className="text-[12px] text-slate-500">
            Page{" "}
            <span className="text-white font-semibold">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {totalPages}
            </span>
          </div>

        </div>


        {/* VEHICLES */}

        {visibleVehicles.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : (
          <div className="divide-y divide-white/[0.045]">

            {visibleVehicles.map((vehicle, index) => (

              <VehicleRow
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                onView={() => {
                  setSelectedVehicle(vehicle);
                  setShowDetailsModal(true);
                }}
                onPurchase={() =>
                  openPurchase(vehicle)
                }
              />

            ))}

          </div>
        )}


        {/* PAGINATION */}

        <div className="px-5 sm:px-6 py-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-[12px] text-slate-600">
            Showing{" "}
            <span className="text-slate-400">
              {filteredVehicles.length === 0
                ? 0
                : (currentPage - 1) *
                    ITEMS_PER_PAGE +
                  1}
            </span>{" "}
            -{" "}
            <span className="text-slate-400">
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredVehicles.length
              )}
            </span>{" "}
            of{" "}
            <span className="text-slate-400">
              {filteredVehicles.length}
            </span>
          </p>

          <div className="flex items-center gap-2">

            <PaginationButton
              disabled={currentPage === 1}
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
            >
              <ArrowLeft size={15} />
            </PaginationButton>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((number) => (

                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`h-9 min-w-9 px-3 rounded-lg text-[12px] font-bold transition ${
                    currentPage === number
                      ? "bg-[#18E0C4] text-[#031014]"
                      : "bg-white/[0.025] border border-white/[0.06] text-slate-500 hover:text-white"
                  }`}
                >
                  {number}
                </button>

              ))}

            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
            >
              <ArrowRight size={15} />
            </PaginationButton>

          </div>

        </div>

      </section>


      {/* ========================================================
          ADD VEHICLE MODAL
          ======================================================== */}

      <AnimatePresence>

        {showAddModal && (

          <ModalOverlay
            onClose={() => setShowAddModal(false)}
          >

            <div className="w-full max-w-4xl rounded-2xl bg-[#0B1420] border border-white/[0.08] shadow-2xl overflow-hidden">

              <ModalHeader
                title="Add New Vehicle"
                subtitle="Add a vehicle to AutoElite inventory"
                onClose={() =>
                  setShowAddModal(false)
                }
              />

              <form
                onSubmit={handleAddVehicle}
                className="p-6 sm:p-7"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <FormInput
                    label="Brand"
                    value={form.brand}
                    onChange={updateForm("brand")}
                    placeholder="Toyota"
                    required
                  />

                  <FormInput
                    label="Model"
                    value={form.model}
                    onChange={updateForm("model")}
                    placeholder="Fortuner"
                    required
                  />

                  <FormInput
                    label="Variant"
                    value={form.variant}
                    onChange={updateForm("variant")}
                    placeholder="4x4 Diesel AT"
                    required
                  />

                  <FormInput
                    label="Year"
                    type="number"
                    value={form.year}
                    onChange={updateForm("year")}
                  />

                  <FormSelect
                    label="Category"
                    value={form.category}
                    onChange={updateForm("category")}
                    options={[
                      "SUV",
                      "Sedan",
                      "Hatchback",
                      "MPV",
                      "EV",
                    ]}
                  />

                  <FormSelect
                    label="Fuel Type"
                    value={form.fuel}
                    onChange={updateForm("fuel")}
                    options={[
                      "Petrol",
                      "Diesel",
                      "Hybrid",
                      "Electric",
                    ]}
                  />

                  <FormSelect
                    label="Transmission"
                    value={form.transmission}
                    onChange={updateForm("transmission")}
                    options={[
                      "Manual",
                      "Automatic",
                    ]}
                  />

                  <FormSelect
                    label="Status"
                    value={form.status}
                    onChange={updateForm("status")}
                    options={[
                      "In Stock",
                      "Low Stock",
                      "Reserved",
                      "Sold",
                    ]}
                  />

                  <FormInput
                    label="Price"
                    type="number"
                    value={form.price}
                    onChange={updateForm("price")}
                    placeholder="4500000"
                    required
                  />

                  <FormInput
                    label="Stock Units"
                    type="number"
                    value={form.stock}
                    onChange={updateForm("stock")}
                    placeholder="12"
                    required
                  />

                  <FormInput
                    label="Kilometers"
                    type="number"
                    value={form.km}
                    onChange={updateForm("km")}
                    placeholder="0"
                  />

                  <FormInput
                    label="Color"
                    value={form.color}
                    onChange={updateForm("color")}
                    placeholder="White Pearl"
                  />

                  <div className="md:col-span-2">

                    <FormInput
                      label="Image URL"
                      value={form.image}
                      onChange={updateForm("image")}
                      placeholder="https://..."
                    />

                  </div>

                  <div className="md:col-span-2">

                    <label className="block">

                      <span className="block text-[12px] uppercase tracking-wider font-bold text-slate-500 mb-2">
                        Description
                      </span>

                      <textarea
                        rows={4}
                        value={form.description}
                        onChange={updateForm(
                          "description"
                        )}
                        placeholder="Describe this vehicle..."
                        className="w-full rounded-xl bg-white/[0.025] border border-white/[0.07] outline-none px-4 py-3 text-[13px] text-white placeholder:text-slate-700 focus:border-[#18E0C4]/30 transition resize-none"
                      />

                    </label>

                  </div>

                </div>


                <div className="flex justify-end gap-3 mt-7 pt-6 border-t border-white/[0.06]">

                  <button
                    type="button"
                    onClick={() =>
                      setShowAddModal(false)
                    }
                    className="h-11 px-6 rounded-xl bg-white/[0.025] border border-white/[0.07] text-[12px] font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="h-11 px-7 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[#031014] text-[12px] font-bold"
                  >
                    Add Vehicle
                  </button>

                </div>

              </form>

            </div>

          </ModalOverlay>

        )}

      </AnimatePresence>


      {/* ========================================================
          DETAILS MODAL
          ======================================================== */}

      <AnimatePresence>

        {showDetailsModal &&
          selectedVehicle && (

            <ModalOverlay
              onClose={() =>
                setShowDetailsModal(false)
              }
            >

              <div className="w-full max-w-5xl rounded-2xl bg-[#0B1420] border border-white/[0.08] shadow-2xl overflow-hidden">

                <ModalHeader
                  title="Vehicle Details"
                  subtitle={`${selectedVehicle.id} • ${selectedVehicle.variant}`}
                  onClose={() =>
                    setShowDetailsModal(false)
                  }
                />

                <div className="grid grid-cols-1 lg:grid-cols-2">

                  <div className="h-[300px] lg:h-[500px] bg-[#07101A]">

                    <img
                      src={selectedVehicle.image}
                      alt={`${selectedVehicle.brand} ${selectedVehicle.model}`}
                      className="w-full h-full object-cover"
                    />

                  </div>


                  <div className="p-7">

                    <div className="flex items-center gap-2 mb-4">

                      <StatusBadge
                        status={
                          selectedVehicle.status
                        }
                      />

                      <span className="px-3 py-1.5 rounded-full bg-white/[0.025] border border-white/[0.06] text-[11px] text-slate-400">
                        {selectedVehicle.category}
                      </span>

                    </div>


                    <h2 className="text-[30px] font-bold tracking-tight text-white">
                      {selectedVehicle.brand}{" "}
                      {selectedVehicle.model}
                    </h2>

                    <p className="text-[14px] text-slate-500 mt-2">
                      {selectedVehicle.variant}
                    </p>


                    <div className="mt-6">

                      <p className="text-[32px] font-bold text-[#18E0C4]">
                        {formatPrice(
                          selectedVehicle.price
                        )}
                      </p>

                      <p className="text-[12px] text-slate-600 mt-1">
                        Ex-showroom price
                      </p>

                    </div>


                    <div className="grid grid-cols-2 gap-3 mt-7">

                      <Spec
                        label="Year"
                        value={
                          selectedVehicle.year
                        }
                      />

                      <Spec
                        label="Fuel"
                        value={
                          selectedVehicle.fuel
                        }
                      />

                      <Spec
                        label="Transmission"
                        value={
                          selectedVehicle.transmission
                        }
                      />

                      <Spec
                        label="Mileage"
                        value={`${selectedVehicle.km.toLocaleString(
                          "en-IN"
                        )} km`}
                      />

                    </div>


                    <p className="mt-7 text-[13px] leading-7 text-slate-500">
                      {selectedVehicle.description}
                    </p>


                    <div className="mt-7">

                      <p className="text-[12px] uppercase tracking-wider font-bold text-slate-500 mb-3">
                        Features
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {selectedVehicle.features.map(
                          (feature) => (

                            <span
                              key={feature}
                              className="px-3 py-2 rounded-lg bg-white/[0.025] border border-white/[0.06] text-[11px] text-slate-400"
                            >
                              {feature}
                            </span>

                          )
                        )}

                      </div>

                    </div>


                    <div className="flex gap-3 mt-8">

                      <button
                        type="button"
                        disabled={
                          selectedVehicle.stock <= 0
                        }
                        onClick={() => {
                          setShowDetailsModal(
                            false
                          );
                          openPurchase(
                            selectedVehicle
                          );
                        }}
                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[#031014] text-[12px] font-bold disabled:opacity-30 inline-flex items-center justify-center gap-2"
                      >
                        <ShoppingCart
                          size={17}
                        />
                        Purchase Vehicle
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteVehicle(
                            selectedVehicle
                          )
                        }
                        className="h-12 px-5 rounded-xl bg-red-400/[0.04] border border-red-400/10 text-red-300 text-[12px] font-semibold hover:bg-red-400/[0.08] inline-flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </ModalOverlay>

          )}

      </AnimatePresence>


      {/* ========================================================
          PURCHASE MODAL
          ======================================================== */}

      <AnimatePresence>

        {showPurchaseModal &&
          selectedVehicle && (

            <ModalOverlay
              onClose={() =>
                setShowPurchaseModal(false)
              }
            >

              <div className="w-full max-w-lg rounded-2xl bg-[#0B1420] border border-white/[0.08] shadow-2xl overflow-hidden">

                <ModalHeader
                  title="Purchase Vehicle"
                  subtitle="Confirm vehicle purchase"
                  onClose={() =>
                    setShowPurchaseModal(false)
                  }
                />

                <div className="p-7">

                  {purchaseComplete ? (

                    <div className="text-center py-8">

                      <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">

                        <CheckCircle2
                          size={40}
                          className="text-emerald-300"
                        />

                      </div>

                      <h3 className="mt-6 text-[24px] font-bold text-white">
                        Purchase Confirmed
                      </h3>

                      <p className="mt-3 text-[13px] leading-6 text-slate-500">
                        {selectedVehicle.brand}{" "}
                        {selectedVehicle.model} has
                        been successfully purchased.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setShowPurchaseModal(
                            false
                          )
                        }
                        className="mt-7 h-11 px-7 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[#031014] text-[12px] font-bold"
                      >
                        Done
                      </button>

                    </div>

                  ) : (

                    <>

                      <div className="flex gap-4 p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]">

                        <img
                          src={selectedVehicle.image}
                          alt=""
                          className="w-28 h-24 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="text-[16px] font-bold text-white">
                            {
                              selectedVehicle.brand
                            }{" "}
                            {
                              selectedVehicle.model
                            }
                          </h3>

                          <p className="mt-1 text-[12px] text-slate-500">
                            {
                              selectedVehicle.variant
                            }
                          </p>

                          <p className="mt-3 text-[18px] font-bold text-[#18E0C4]">
                            {formatPrice(
                              selectedVehicle.price
                            )}
                          </p>

                        </div>

                      </div>


                      <div className="mt-7 space-y-4">

                        <PriceRow
                          label="Ex-showroom Price"
                          value={formatPrice(
                            selectedVehicle.price
                          )}
                        />

                        <PriceRow
                          label="RTO Charges"
                          value={formatPrice(
                            Math.round(
                              selectedVehicle.price *
                                0.06
                            )
                          )}
                        />

                        <PriceRow
                          label="Insurance"
                          value={formatPrice(
                            Math.round(
                              selectedVehicle.price *
                                0.03
                            )
                          )}
                        />

                        <PriceRow
                          label="Other Charges"
                          value="₹25,000"
                        />

                        <div className="border-t border-white/[0.06] pt-4">

                          <PriceRow
                            label="Estimated Total"
                            value={formatPrice(
                              Math.round(
                                selectedVehicle.price *
                                  1.09 +
                                  25000
                              )
                            )}
                            strong
                          />

                        </div>

                      </div>


                      <div className="mt-6 p-4 rounded-xl bg-[#18E0C4]/[0.04] border border-[#18E0C4]/10">

                        <p className="text-[11px] text-slate-600">
                          Available stock
                        </p>

                        <p className="mt-1 text-[18px] font-bold text-[#18E0C4]">
                          {
                            selectedVehicle.stock
                          }{" "}
                          units
                        </p>

                      </div>


                      <button
                        type="button"
                        onClick={
                          confirmPurchase
                        }
                        className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-[#18E0C4] to-[#28D7FF] text-[#031014] text-[12px] font-bold"
                      >
                        Confirm Purchase
                      </button>

                    </>

                  )}

                </div>

              </div>

            </ModalOverlay>

          )}

      </AnimatePresence>

    </div>
  );
}


/* ============================================================
   SUMMARY CARD
   ============================================================ */

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  accent = "teal",
}) {
  const styles = {
    teal: "text-[#18E0C4] bg-[#18E0C4]/10 border-[#18E0C4]/10",
    cyan: "text-[#28D7FF] bg-[#28D7FF]/10 border-[#28D7FF]/10",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/10",
    violet:
      "text-violet-300 bg-violet-400/10 border-violet-400/10",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0D1725] to-[#09111D] border border-white/[0.06] p-5 hover:border-white/[0.09] transition">

      <div
        className={`w-11 h-11 rounded-xl border flex items-center justify-center ${styles[accent]}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-5 text-[12px] font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-[27px] font-bold text-white tracking-tight">
        {Number(value).toLocaleString("en-IN")}
      </p>

      <p className="mt-1 text-[11px] text-slate-700">
        {subtitle}
      </p>

    </div>
  );
}


/* ============================================================
   FILTER SELECT
   ============================================================ */

function FilterSelect({
  value,
  onChange,
  options,
}) {
  return (
    <div className="relative">

      <select
        value={value}
        onChange={onChange}
        className="appearance-none w-full h-12 px-4 pr-10 rounded-xl bg-white/[0.025] border border-white/[0.07] outline-none text-[13px] text-slate-400 focus:border-[#18E0C4]/30 cursor-pointer"
      >

        {options.map((option) => (

          <option
            key={option}
            value={option}
            className="bg-[#0B1420]"
          >
            {option}
          </option>

        ))}

      </select>

      <ChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
      />

    </div>
  );
}


/* ============================================================
   VEHICLE ROW
   ============================================================ */

function VehicleRow({
  vehicle,
  index,
  onView,
  onPurchase,
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
        delay: index * 0.04,
      }}
      className="p-5 sm:p-6 hover:bg-white/[0.015] transition"
    >

      <div className="grid grid-cols-1 lg:grid-cols-[110px_minmax(220px,1.5fr)_130px_150px_110px_160px] gap-5 items-center">

        {/* IMAGE */}

        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full lg:w-[110px] h-[82px] object-cover rounded-xl border border-white/[0.07] bg-[#07101A]"
        />


        {/* VEHICLE */}

        <div>

          <div className="flex items-center flex-wrap gap-2">

            <h3 className="text-[16px] font-bold text-white">
              {vehicle.brand} {vehicle.model}
            </h3>

            <StatusBadge
              status={vehicle.status}
            />

          </div>

          <p className="mt-2 text-[13px] text-slate-400">
            {vehicle.variant}
          </p>

          <p className="mt-2 text-[11px] text-slate-700">
            Inventory ID: {vehicle.id}
          </p>

        </div>


        {/* FUEL */}

        <InfoCell
          icon={Fuel}
          label="Fuel Type"
          value={vehicle.fuel}
        />


        {/* TRANSMISSION */}

        <InfoCell
          icon={Gauge}
          label="Transmission"
          value={vehicle.transmission}
        />


        {/* STOCK */}

        <div>

          <p className="text-[11px] uppercase tracking-wider text-slate-700">
            Stock
          </p>

          <p className="mt-2 text-[15px] font-bold text-white">
            {vehicle.stock} units
          </p>

        </div>


        {/* PRICE + ACTIONS */}

        <div className="flex flex-col items-start lg:items-end gap-3">

          <div className="text-left lg:text-right">

            <p className="text-[11px] uppercase tracking-wider text-slate-700">
              Starting Price
            </p>

            <p className="mt-1 text-[16px] font-bold text-[#18E0C4]">
              {formatPrice(
                vehicle.price
              )}
            </p>

          </div>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={onView}
              className="h-9 px-3 rounded-lg bg-white/[0.025] border border-white/[0.06] text-slate-400 hover:text-white transition text-[11px] font-semibold inline-flex items-center gap-2"
            >
              <Eye size={14} />
              View
            </button>

            <button
              type="button"
              onClick={onPurchase}
              disabled={vehicle.stock <= 0}
              className="h-9 px-3 rounded-lg bg-[#18E0C4]/10 border border-[#18E0C4]/15 text-[#18E0C4] hover:bg-[#18E0C4]/15 disabled:opacity-30 disabled:cursor-not-allowed transition text-[11px] font-semibold inline-flex items-center gap-2"
            >
              <ShoppingCart
                size={14}
              />
              Purchase
            </button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}


/* ============================================================
   INFO CELL
   ============================================================ */

function InfoCell({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div>

      <div className="flex items-center gap-2 text-slate-700">

        <Icon size={14} />

        <span className="text-[11px] uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="mt-2 text-[13px] font-medium text-slate-400">
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   STATUS BADGE
   ============================================================ */

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1.5 rounded-full border text-[10px] font-bold ${
        STATUS_STYLES[status] ||
        STATUS_STYLES["In Stock"]
      }`}
    >
      {status}
    </span>
  );
}


/* ============================================================
   SPEC
   ============================================================ */

function Spec({
  label,
  value,
}) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]">

      <p className="text-[10px] uppercase tracking-wider text-slate-700">
        {label}
      </p>

      <p className="mt-2 text-[13px] font-semibold text-slate-300">
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   PRICE ROW
   ============================================================ */

function PriceRow({
  label,
  value,
  strong = false,
}) {
  return (
    <div className="flex items-center justify-between gap-5">

      <span
        className={`text-[12px] ${
          strong
            ? "text-white font-bold"
            : "text-slate-500"
        }`}
      >
        {label}
      </span>

      <span
        className={`text-[13px] ${
          strong
            ? "text-[#18E0C4] font-bold"
            : "text-slate-400"
        }`}
      >
        {value}
      </span>

    </div>
  );
}


/* ============================================================
   PAGINATION BUTTON
   ============================================================ */

function PaginationButton({
  children,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="h-9 w-9 rounded-lg bg-white/[0.025] border border-white/[0.06] text-slate-500 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition"
    >
      {children}
    </button>
  );
}


/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyState({ onClear }) {
  return (
    <div className="py-24 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.025] border border-white/[0.06] flex items-center justify-center">

        <Search
          size={24}
          className="text-slate-600"
        />

      </div>

      <h3 className="mt-5 text-[18px] font-bold text-white">
        No vehicles found
      </h3>

      <p className="mt-2 text-[13px] text-slate-600">
        Try changing your search or filter options.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 h-10 px-5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] font-semibold text-slate-400 hover:text-white"
      >
        Clear Filters
      </button>

    </div>
  );
}


/* ============================================================
   FORM INPUT
   ============================================================ */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <label className="block">

      <span className="block text-[12px] uppercase tracking-wider font-bold text-slate-500 mb-2">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full h-11 rounded-xl bg-white/[0.025] border border-white/[0.07] outline-none px-4 text-[13px] text-white placeholder:text-slate-700 focus:border-[#18E0C4]/30 transition"
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

      <span className="block text-[12px] uppercase tracking-wider font-bold text-slate-500 mb-2">
        {label}
      </span>

      <div className="relative">

        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full h-11 rounded-xl bg-white/[0.025] border border-white/[0.07] outline-none px-4 pr-10 text-[13px] text-white focus:border-[#18E0C4]/30 transition"
        >

          {options.map((option) => (

            <option
              key={option}
              value={option}
              className="bg-[#0B1420]"
            >
              {option}
            </option>

          ))}

        </select>

        <ChevronDown
          size={15}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600"
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
    <div className="px-6 sm:px-7 py-5 border-b border-white/[0.06] flex items-center justify-between gap-5">

      <div>

        <h2 className="text-[19px] font-bold text-white">
          {title}
        </h2>

        <p className="mt-1.5 text-[12px] text-slate-600">
          {subtitle}
        </p>

      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-10 h-10 rounded-xl bg-white/[0.025] border border-white/[0.06] text-slate-500 hover:text-white flex items-center justify-center transition"
      >
        <X size={17} />
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
      className="fixed inset-0 z-[100] p-4 sm:p-6 flex items-center justify-center bg-black/75 backdrop-blur-md overflow-y-auto"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 15,
          scale: 0.98,
        }}
        transition={{
          duration: 0.22,
        }}
        className="w-full flex justify-center my-auto"
      >
        {children}
      </motion.div>

    </motion.div>
  );
}
