import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Plus,
  CarFront,
  CheckCircle2,
  Clock3,
  XCircle,
  IndianRupee,
  MoreHorizontal,
  Eye,
  ArrowUpRight,
  PackageCheck,
  Trash2,
  Pencil,
  X,
  ShoppingCart,
  Truck,
  AlertCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

/* =========================================================
   CONSTANTS
   ========================================================= */

const STORAGE_KEY = "autoelite_purchases";

const INITIAL_PURCHASES = [
  {
    id: "PO-1001",
    vehicle: "Toyota Fortuner",
    supplier: "Toyota Motors",
    quantity: 4,
    amount: 18000000,
    status: "Completed",
    date: "21 Aug 2026",
  },
  {
    id: "PO-1002",
    vehicle: "Hyundai Creta",
    supplier: "Hyundai Motors",
    quantity: 8,
    amount: 14800000,
    status: "Pending",
    date: "20 Aug 2026",
  },
  {
    id: "PO-1003",
    vehicle: "Kia Seltos",
    supplier: "Kia India",
    quantity: 6,
    amount: 10100000,
    status: "Processing",
    date: "19 Aug 2026",
  },
  {
    id: "PO-1004",
    vehicle: "Mahindra XUV700",
    supplier: "Mahindra Auto",
    quantity: 3,
    amount: 7250000,
    status: "Completed",
    date: "18 Aug 2026",
  },
  {
    id: "PO-1005",
    vehicle: "Tata Harrier",
    supplier: "Tata Motors",
    quantity: 5,
    amount: 11500000,
    status: "Cancelled",
    date: "17 Aug 2026",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function formatCurrency(value) {
  if (!Number.isFinite(Number(value))) {
    return "₹0";
  }

  const amount = Number(value);

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
}

function getToday() {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getNextPurchaseId(purchases) {
  const numbers = purchases
    .map((purchase) =>
      Number(
        String(purchase.id).replace(
          "PO-",
          ""
        )
      )
    )
    .filter(Number.isFinite);

  const next =
    numbers.length > 0
      ? Math.max(...numbers) + 1
      : 1001;

  return `PO-${next}`;
}

/* =========================================================
   STATUS CONFIG
   ========================================================= */

const STATUS_CONFIG = {
  Completed: {
    icon: CheckCircle2,
    iconClass: "text-[#4ADE80]",
    className:
      "border-[#22C55E]/15 bg-[#22C55E]/10 text-[#4ADE80]",
  },

  Pending: {
    icon: Clock3,
    iconClass: "text-[#FBBF24]",
    className:
      "border-[#F59E0B]/15 bg-[#F59E0B]/10 text-[#FBBF24]",
  },

  Processing: {
    icon: PackageCheck,
    iconClass: "text-[#28D7FF]",
    className:
      "border-[#28D7FF]/15 bg-[#28D7FF]/10 text-[#28D7FF]",
  },

  Cancelled: {
    icon: XCircle,
    iconClass: "text-[#F87171]",
    className:
      "border-[#EF4444]/15 bg-[#EF4444]/10 text-[#F87171]",
  },
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

function Purchases() {
  const navigate = useNavigate();

  /* -------------------------------------------------------
     STATE
     ------------------------------------------------------- */

  const [purchases, setPurchases] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch (error) {
        console.error(
          "Unable to load purchases:",
          error
        );
      }

      return INITIAL_PURCHASES;
    });

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [showAdd, setShowAdd] =
    useState(false);

  const [selectedPurchase, setSelectedPurchase] =
    useState(null);

  const [menuId, setMenuId] =
    useState(null);

  const [toast, setToast] =
    useState(null);

  const [form, setForm] = useState({
    vehicle: "",
    supplier: "",
    quantity: "1",
    amount: "",
    status: "Pending",
  });

  const [formError, setFormError] =
    useState("");

  /* -------------------------------------------------------
     SAVE DATA
     ------------------------------------------------------- */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(purchases)
      );
    } catch (error) {
      console.error(
        "Unable to save purchases:",
        error
      );
    }
  }, [purchases]);

  /* -------------------------------------------------------
     TOAST
     ------------------------------------------------------- */

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /* -------------------------------------------------------
     FILTER
     ------------------------------------------------------- */

  const filteredPurchases = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return purchases.filter(
      (purchase) => {
        const matchesSearch =
          !query ||
          purchase.vehicle
            .toLowerCase()
            .includes(query) ||
          purchase.supplier
            .toLowerCase()
            .includes(query) ||
          purchase.id
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          status === "All" ||
          purchase.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [purchases, search, status]);

  /* -------------------------------------------------------
     SUMMARY
     ------------------------------------------------------- */

  const summary = useMemo(() => {
    const activePurchases =
      purchases.filter(
        (purchase) =>
          purchase.status !==
          "Cancelled"
      );

    const purchaseValue =
      activePurchases.reduce(
        (total, purchase) =>
          total +
          Number(purchase.amount || 0),
        0
      );

    const quantity =
      activePurchases.reduce(
        (total, purchase) =>
          total +
          Number(purchase.quantity || 0),
        0
      );

    return {
      total: purchases.length,
      value: purchaseValue,
      quantity,
      pending: purchases.filter(
        (purchase) =>
          purchase.status ===
          "Pending"
      ).length,
      processing: purchases.filter(
        (purchase) =>
          purchase.status ===
          "Processing"
      ).length,
      completed: purchases.filter(
        (purchase) =>
          purchase.status ===
          "Completed"
      ).length,
      cancelled: purchases.filter(
        (purchase) =>
          purchase.status ===
          "Cancelled"
      ).length,
    };
  }, [purchases]);

  /* -------------------------------------------------------
     FORM
     ------------------------------------------------------- */

  const handleFormChange = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const resetForm = () => {
    setForm({
      vehicle: "",
      supplier: "",
      quantity: "1",
      amount: "",
      status: "Pending",
    });

    setFormError("");
  };

  const openAddModal = () => {
    resetForm();
    setShowAdd(true);
  };

  const closeAddModal = () => {
    setShowAdd(false);
    resetForm();
  };

  /* -------------------------------------------------------
     CREATE PURCHASE
     ------------------------------------------------------- */

  const handleCreatePurchase = () => {
    const vehicle =
      form.vehicle.trim();

    const supplier =
      form.supplier.trim();

    const quantity =
      Number(form.quantity);

    const amount =
      Number(
        String(form.amount)
          .replace(/,/g, "")
          .replace(/[₹]/g, "")
          .trim()
      );

    if (!vehicle) {
      setFormError(
        "Please enter a vehicle name."
      );
      return;
    }

    if (!supplier) {
      setFormError(
        "Please enter a supplier name."
      );
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      setFormError(
        "Quantity must be at least 1."
      );
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setFormError(
        "Please enter a valid purchase amount."
      );
      return;
    }

    const newPurchase = {
      id: getNextPurchaseId(
        purchases
      ),
      vehicle,
      supplier,
      quantity,
      amount,
      status: form.status,
      date: getToday(),
    };

    setPurchases((current) => [
      newPurchase,
      ...current,
    ]);

    closeAddModal();

    showToast(
      `${newPurchase.id} created successfully.`
    );
  };

  /* -------------------------------------------------------
     STATUS UPDATE
     ------------------------------------------------------- */

  const updateStatus = (
    purchaseId,
    newStatus
  ) => {
    setPurchases((current) =>
      current.map((purchase) =>
        purchase.id === purchaseId
          ? {
              ...purchase,
              status: newStatus,
            }
          : purchase
      )
    );

    setMenuId(null);

    showToast(
      `${purchaseId} marked as ${newStatus}.`
    );
  };

  /* -------------------------------------------------------
     DELETE
     ------------------------------------------------------- */

  const deletePurchase = (
    purchaseId
  ) => {
    const confirmed =
      window.confirm(
        `Delete purchase order ${purchaseId}?`
      );

    if (!confirmed) {
      return;
    }

    setPurchases((current) =>
      current.filter(
        (purchase) =>
          purchase.id !== purchaseId
      )
    );

    setMenuId(null);

    if (
      selectedPurchase?.id ===
      purchaseId
    ) {
      setSelectedPurchase(null);
    }

    showToast(
      `${purchaseId} deleted.`,
      "info"
    );
  };

  /* -------------------------------------------------------
     RESET DEMO DATA
     ------------------------------------------------------- */

  const resetDemoData = () => {
    const confirmed =
      window.confirm(
        "Restore the default purchase data?"
      );

    if (!confirmed) {
      return;
    }

    setPurchases(
      INITIAL_PURCHASES
    );

    setMenuId(null);

    showToast(
      "Purchase data restored.",
      "info"
    );
  };

  /* -------------------------------------------------------
     PURCHASE FLOW
     ------------------------------------------------------- */

  const openPurchaseFlow = (
    purchase
  ) => {
    /*
      PurchaseFlow expects a vehicleId.
      We create a URL-safe identifier from
      the purchase vehicle name.
    */

    const vehicleId =
      purchase.vehicle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(
          /^-|-$/g,
          ""
        );

    navigate(
      `/purchase/${vehicleId}`,
      {
        state: {
          purchase,
        },
      }
    );
  };

  /* -------------------------------------------------------
     RENDER
     ------------------------------------------------------- */

  return (
    <div className="w-full space-y-7">

      {/* =================================================
          HEADER
          ================================================= */}

      <section
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-end
          xl:justify-between
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
                h-2
                w-2
                rounded-full
                bg-[#18E0C4]
                shadow-[0_0_10px_rgba(24,224,196,0.9)]
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#18E0C4]
              "
            >
              Procurement Center
            </span>
          </div>

          <h1
            className="
              mt-2
              text-[32px]
              font-bold
              tracking-[-0.04em]
              text-white
              sm:text-[38px]
            "
          >
            Purchases
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-[14px]
              leading-6
              text-slate-400
              sm:text-[15px]
            "
          >
            Manage vehicle procurement,
            suppliers and purchase orders
            from one place.
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
            onClick={resetDemoData}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              px-4
              text-[13px]
              font-semibold
              text-slate-400
              transition
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <RefreshCw size={16} />

            Reset
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              px-5
              text-[13px]
              font-bold
              text-[#031014]
              shadow-[0_8px_30px_rgba(24,224,196,0.12)]
              transition
              hover:brightness-105
            "
          >
            <Plus size={18} />

            New Purchase
          </button>
        </div>
      </section>

      {/* =================================================
          SUMMARY CARDS
          ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <SummaryCard
          icon={PackageCheck}
          title="Total Purchases"
          value={summary.total}
          subtitle={`${summary.quantity} vehicles ordered`}
          iconClass="text-[#18E0C4]"
        />

        <SummaryCard
          icon={IndianRupee}
          title="Purchase Value"
          value={formatCurrency(
            summary.value
          )}
          subtitle="Active procurement value"
          iconClass="text-[#28D7FF]"
        />

        <SummaryCard
          icon={Clock3}
          title="Pending"
          value={summary.pending}
          subtitle="Awaiting processing"
          iconClass="text-[#FBBF24]"
        />

        <SummaryCard
          icon={CheckCircle2}
          title="Completed"
          value={summary.completed}
          subtitle="Successfully received"
          iconClass="text-[#4ADE80]"
        />
      </div>

      {/* =================================================
          QUICK STATUS
          ================================================= */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
          lg:grid-cols-4
        "
      >
        <MiniStatus
          label="Completed"
          value={summary.completed}
          color="green"
        />

        <MiniStatus
          label="Processing"
          value={summary.processing}
          color="cyan"
        />

        <MiniStatus
          label="Pending"
          value={summary.pending}
          color="amber"
        />

        <MiniStatus
          label="Cancelled"
          value={summary.cancelled}
          color="red"
        />
      </div>

      {/* =================================================
          PURCHASE TABLE
          ================================================= */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.055]
          bg-gradient-to-br
          from-[#0D1725]
          to-[#09111D]
        "
      >
        {/* TOOLBAR */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-white/[0.05]
            p-5
            sm:p-6
            lg:flex-row
            lg:items-center
            lg:justify-between
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
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#18E0C4]/10
                  bg-[#18E0C4]/10
                "
              >
                <ShoppingCart
                  size={19}
                  className="text-[#18E0C4]"
                />
              </div>

              <div>
                <h2
                  className="
                    text-[18px]
                    font-semibold
                    text-white
                  "
                >
                  Purchase Orders
                </h2>

                <p
                  className="
                    mt-1
                    text-[13px]
                    text-slate-500
                  "
                >
                  {filteredPurchases.length}{" "}
                  purchase
                  {filteredPurchases.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  displayed
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            {/* SEARCH */}

            <div
              className="
                relative
                w-full
                sm:w-[290px]
              "
            >
              <Search
                size={18}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-600
                "
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search vehicle, supplier or PO..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  pl-11
                  pr-4
                  text-[13px]
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-700
                  focus:border-[#18E0C4]/30
                  focus:bg-white/[0.04]
                "
              />
            </div>

            {/* STATUS */}

            <div className="relative">
              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value
                  )
                }
                className="
                  h-11
                  min-w-[150px]
                  cursor-pointer
                  appearance-none
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-[#0A1320]
                  px-4
                  pr-10
                  text-[13px]
                  font-medium
                  text-slate-300
                  outline-none
                  transition
                  focus:border-[#18E0C4]/30
                "
              >
                <option value="All">
                  All Status
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-600
                "
              />
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-white/[0.045]">
                <TableHead>
                  Purchase Order
                </TableHead>

                <TableHead>
                  Vehicle
                </TableHead>

                <TableHead>
                  Supplier
                </TableHead>

                <TableHead>
                  Quantity
                </TableHead>

                <TableHead>
                  Amount
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Date
                </TableHead>

                <TableHead align="right">
                  Action
                </TableHead>
              </tr>
            </thead>

            <tbody>
              {filteredPurchases.map(
                (purchase) => {
                  const config =
                    STATUS_CONFIG[
                      purchase.status
                    ] ||
                    STATUS_CONFIG.Pending;

                  const StatusIcon =
                    config.icon;

                  return (
                    <tr
                      key={purchase.id}
                      className="
                        border-b
                        border-white/[0.035]
                        transition
                        hover:bg-white/[0.018]
                      "
                    >
                      {/* PO */}

                      <TableCell>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPurchase(
                              purchase
                            )
                          }
                          className="
                            font-semibold
                            text-[#18E0C4]
                            transition
                            hover:text-[#5EEAD4]
                          "
                        >
                          {purchase.id}
                        </button>
                      </TableCell>

                      {/* VEHICLE */}

                      <TableCell>
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
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-[#18E0C4]/10
                              bg-[#18E0C4]/10
                            "
                          >
                            <CarFront
                              size={18}
                              className="text-[#18E0C4]"
                            />
                          </div>

                          <div>
                            <p
                              className="
                                text-[14px]
                                font-semibold
                                text-slate-200
                              "
                            >
                              {purchase.vehicle}
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-[11px]
                                text-slate-600
                              "
                            >
                              Procurement vehicle
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* SUPPLIER */}

                      <TableCell>
                        <span
                          className="
                            text-[13px]
                            font-medium
                            text-slate-400
                          "
                        >
                          {purchase.supplier}
                        </span>
                      </TableCell>

                      {/* QUANTITY */}

                      <TableCell>
                        <span
                          className="
                            text-[14px]
                            font-semibold
                            text-slate-300
                          "
                        >
                          {purchase.quantity}
                        </span>
                      </TableCell>

                      {/* AMOUNT */}

                      <TableCell>
                        <span
                          className="
                            text-[14px]
                            font-bold
                            text-white
                          "
                        >
                          {formatCurrency(
                            purchase.amount
                          )}
                        </span>
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-semibold
                            ${config.className}
                          `}
                        >
                          <StatusIcon
                            size={14}
                          />

                          {purchase.status}
                        </span>
                      </TableCell>

                      {/* DATE */}

                      <TableCell>
                        <span
                          className="
                            text-[13px]
                            text-slate-500
                          "
                        >
                          {purchase.date}
                        </span>
                      </TableCell>

                      {/* ACTIONS */}

                      <TableCell align="right">
                        <div
                          className="
                            relative
                            flex
                            items-center
                            justify-end
                            gap-2
                          "
                        >
                          <button
                            type="button"
                            title="View purchase"
                            onClick={() =>
                              setSelectedPurchase(
                                purchase
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-white/[0.06]
                              bg-white/[0.025]
                              text-slate-500
                              transition
                              hover:border-[#18E0C4]/20
                              hover:text-[#18E0C4]
                            "
                          >
                            <Eye
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            title="More actions"
                            onClick={() =>
                              setMenuId(
                                menuId ===
                                  purchase.id
                                  ? null
                                  : purchase.id
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-white/[0.06]
                              bg-white/[0.025]
                              text-slate-500
                              transition
                              hover:text-white
                            "
                          >
                            <MoreHorizontal
                              size={16}
                            />
                          </button>

                          {menuId ===
                            purchase.id && (
                            <ActionMenu
                              purchase={
                                purchase
                              }
                              onView={() => {
                                setSelectedPurchase(
                                  purchase
                                );
                                setMenuId(
                                  null
                                );
                              }}
                              onProcess={() =>
                                updateStatus(
                                  purchase.id,
                                  "Processing"
                                )
                              }
                              onComplete={() =>
                                updateStatus(
                                  purchase.id,
                                  "Completed"
                                )
                              }
                              onCancel={() =>
                                updateStatus(
                                  purchase.id,
                                  "Cancelled"
                                )
                              }
                              onPurchase={() =>
                                openPurchaseFlow(
                                  purchase
                                )
                              }
                              onDelete={() =>
                                deletePurchase(
                                  purchase.id
                                )
                              }
                            />
                          )}
                        </div>
                      </TableCell>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}

        {filteredPurchases.length ===
          0 && (
          <div
            className="
              px-6
              py-20
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
              "
            >
              <Search
                size={24}
                className="text-slate-600"
              />
            </div>

            <p
              className="
                mt-5
                text-[16px]
                font-semibold
                text-slate-300
              "
            >
              No purchases found
            </p>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-[13px]
                leading-5
                text-slate-600
              "
            >
              Try another search term or
              change the status filter.
            </p>

            {(search ||
              status !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatus("All");
                }}
                className="
                  mt-5
                  text-[13px]
                  font-semibold
                  text-[#18E0C4]
                  hover:text-[#5EEAD4]
                "
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* =================================================
          ADD PURCHASE MODAL
          ================================================= */}

      {showAdd && (
        <Modal
          title="New Purchase Order"
          subtitle="Create a vehicle procurement order."
          onClose={closeAddModal}
        >
          <div className="space-y-5">

            {formError && (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#EF4444]/15
                  bg-[#EF4444]/[0.06]
                  p-3.5
                "
              >
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#F87171]"
                />

                <p
                  className="
                    text-[13px]
                    leading-5
                    text-[#FCA5A5]
                  "
                >
                  {formError}
                </p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Vehicle"
                required
                placeholder="e.g. Toyota Fortuner"
                value={form.vehicle}
                onChange={(value) =>
                  handleFormChange(
                    "vehicle",
                    value
                  )
                }
              />

              <Field
                label="Supplier"
                required
                placeholder="e.g. Toyota Motors"
                value={form.supplier}
                onChange={(value) =>
                  handleFormChange(
                    "supplier",
                    value
                  )
                }
              />

              <Field
                label="Quantity"
                required
                type="number"
                min="1"
                value={form.quantity}
                onChange={(value) =>
                  handleFormChange(
                    "quantity",
                    value
                  )
                }
              />

              <Field
                label="Purchase Amount"
                required
                type="number"
                min="1"
                placeholder="Enter amount in ₹"
                value={form.amount}
                onChange={(value) =>
                  handleFormChange(
                    "amount",
                    value
                  )
                }
              />
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-[12px]
                  font-semibold
                  text-slate-300
                "
              >
                Initial Status
              </label>

              <select
                value={form.status}
                onChange={(event) =>
                  handleFormChange(
                    "status",
                    event.target.value
                  )
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-[#09121F]
                  px-3
                  text-[13px]
                  text-slate-200
                  outline-none
                  focus:border-[#18E0C4]/30
                "
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-white/[0.05]
                pt-5
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={closeAddModal}
                className="
                  h-11
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-5
                  text-[13px]
                  font-semibold
                  text-slate-400
                  transition
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleCreatePurchase
                }
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#18E0C4]
                  to-[#28D7FF]
                  px-5
                  text-[13px]
                  font-bold
                  text-[#031014]
                  transition
                  hover:brightness-105
                "
              >
                <PackageCheck
                  size={17}
                />

                Create Purchase
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =================================================
          PURCHASE DETAILS MODAL
          ================================================= */}

      {selectedPurchase && (
        <PurchaseDetails
          purchase={
            selectedPurchase
          }
          onClose={() =>
            setSelectedPurchase(
              null
            )
          }
          onPurchase={() =>
            openPurchaseFlow(
              selectedPurchase
            )
          }
          onStatusChange={(
            newStatus
          ) => {
            updateStatus(
              selectedPurchase.id,
              newStatus
            );

            setSelectedPurchase(
              (current) =>
                current
                  ? {
                      ...current,
                      status:
                        newStatus,
                    }
                  : null
            );
          }}
        />
      )}

      {/* =================================================
          TOAST
          ================================================= */}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
}

/* =========================================================
   TABLE HEAD
   ========================================================= */

function TableHead({
  children,
  align = "left",
}) {
  return (
    <th
      className={`
        whitespace-nowrap
        px-5
        py-4
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.1em]
        text-slate-600
        ${
          align === "right"
            ? "text-right"
            : "text-left"
        }
      `}
    >
      {children}
    </th>
  );
}

/* =========================================================
   TABLE CELL
   ========================================================= */

function TableCell({
  children,
  align = "left",
}) {
  return (
    <td
      className={`
        px-5
        py-4
        ${
          align === "right"
            ? "text-right"
            : "text-left"
        }
      `}
    >
      {children}
    </td>
  );
}

/* =========================================================
   SUMMARY CARD
   ========================================================= */

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconClass,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/[0.055]
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        p-5
        transition
        hover:border-white/[0.09]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.035]
          "
        >
          <Icon
            size={21}
            className={iconClass}
          />
        </div>

        <ArrowUpRight
          size={17}
          className="text-[#4ADE80]"
        />
      </div>

      <p
        className="
          mt-5
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.13em]
          text-slate-600
        "
      >
        {title}
      </p>

      <p
        className="
          mt-2
          text-[27px]
          font-bold
          tracking-[-0.04em]
          text-white
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1.5
          text-[12px]
          text-slate-500
        "
      >
        {subtitle}
      </p>
    </div>
  );
}

/* =========================================================
   MINI STATUS
   ========================================================= */

function MiniStatus({
  label,
  value,
  color,
}) {
  const colors = {
    green: {
      dot: "bg-[#22C55E]",
      text: "text-[#86EFAC]",
    },

    cyan: {
      dot: "bg-[#28D7FF]",
      text: "text-[#67E8F9]",
    },

    amber: {
      dot: "bg-[#F59E0B]",
      text: "text-[#FCD34D]",
    },

    red: {
      dot: "bg-[#EF4444]",
      text: "text-[#FCA5A5]",
    },
  };

  const theme =
    colors[color] || colors.cyan;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-white/[0.05]
        bg-white/[0.02]
        px-4
        py-3.5
      "
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`
            h-2
            w-2
            rounded-full
            ${theme.dot}
          `}
        />

        <span
          className="
            text-[12px]
            font-medium
            text-slate-500
          "
        >
          {label}
        </span>
      </div>

      <span
        className={`
          text-[15px]
          font-bold
          ${theme.text}
        `}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   ACTION MENU
   ========================================================= */

function ActionMenu({
  purchase,
  onView,
  onProcess,
  onComplete,
  onCancel,
  onPurchase,
  onDelete,
}) {
  return (
    <div
      className="
        absolute
        right-0
        top-11
        z-30
        w-[210px]
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-[#0B1421]
        p-1.5
        shadow-2xl
      "
    >
      <MenuButton
        icon={Eye}
        label="View details"
        onClick={onView}
      />

      {purchase.status ===
        "Pending" && (
        <MenuButton
          icon={PackageCheck}
          label="Start processing"
          onClick={onProcess}
        />
      )}

      {purchase.status !==
        "Completed" &&
        purchase.status !==
          "Cancelled" && (
          <MenuButton
            icon={CheckCircle2}
            label="Mark completed"
            onClick={onComplete}
          />
        )}

      {purchase.status !==
        "Cancelled" &&
        purchase.status !==
          "Completed" && (
          <MenuButton
            icon={XCircle}
            label="Cancel purchase"
            danger
            onClick={onCancel}
          />
        )}

      <MenuButton
        icon={Truck}
        label="Open purchase flow"
        onClick={onPurchase}
      />

      <div className="my-1 border-t border-white/[0.05]" />

      <MenuButton
        icon={Trash2}
        label="Delete purchase"
        danger
        onClick={onDelete}
      />
    </div>
  );
}

/* =========================================================
   MENU BUTTON
   ========================================================= */

function MenuButton({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-lg
        px-3
        py-2.5
        text-left
        text-[12px]
        font-medium
        transition
        ${
          danger
            ? "text-[#F87171] hover:bg-[#EF4444]/10"
            : "text-slate-400 hover:bg-white/[0.045] hover:text-white"
        }
      `}
    >
      <Icon size={15} />

      {label}
    </button>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  required,
  type = "text",
  min,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-[12px]
          font-semibold
          text-slate-300
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-[#18E0C4]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="
          h-11
          w-full
          rounded-xl
          border
          border-white/[0.07]
          bg-[#09121F]
          px-3.5
          text-[13px]
          text-white
          outline-none
          transition
          placeholder:text-slate-700
          focus:border-[#18E0C4]/30
          focus:bg-[#0B1726]
        "
      />
    </div>
  );
}

/* =========================================================
   MODAL
   ========================================================= */

function Modal({
  title,
  subtitle,
  onClose,
  children,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        className="
          w-full
          max-w-[620px]
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0B1421]
          p-6
          shadow-2xl
          sm:p-7
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
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
            <h3
              className="
                text-[21px]
                font-bold
                text-white
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-1.5
                text-[13px]
                leading-5
                text-slate-500
              "
            >
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-600
              transition
              hover:bg-white/[0.04]
              hover:text-white
            "
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PURCHASE DETAILS
   ========================================================= */

function PurchaseDetails({
  purchase,
  onClose,
  onPurchase,
  onStatusChange,
}) {
  const config =
    STATUS_CONFIG[
      purchase.status
    ] || STATUS_CONFIG.Pending;

  const StatusIcon =
    config.icon;

  return (
    <Modal
      title={purchase.id}
      subtitle="Purchase order details"
      onClose={onClose}
    >
      <div className="space-y-5">

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            p-4
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              border
              border-[#18E0C4]/10
              bg-[#18E0C4]/10
            "
          >
            <CarFront
              size={25}
              className="text-[#18E0C4]"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4
              className="
                truncate
                text-[18px]
                font-bold
                text-white
              "
            >
              {purchase.vehicle}
            </h4>

            <p
              className="
                mt-1
                text-[13px]
                text-slate-500
              "
            >
              {purchase.supplier}
            </p>
          </div>

          <span
            className={`
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-lg
              border
              px-3
              py-2
              text-[11px]
              font-semibold
              ${config.className}
            `}
          >
            <StatusIcon size={14} />

            {purchase.status}
          </span>
        </div>

        {/* DETAILS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-4
          "
        >
          <DetailBox
            label="Quantity"
            value={`${purchase.quantity} vehicles`}
          />

          <DetailBox
            label="Amount"
            value={formatCurrency(
              purchase.amount
            )}
          />

          <DetailBox
            label="Supplier"
            value={purchase.supplier}
          />

          <DetailBox
            label="Order Date"
            value={purchase.date}
          />
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-white/[0.05]
            pt-5
            sm:flex-row
          "
        >
          {purchase.status ===
            "Pending" && (
            <button
              type="button"
              onClick={() =>
                onStatusChange(
                  "Processing"
                )
              }
              className="
                flex
                h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#28D7FF]/15
                bg-[#28D7FF]/10
                text-[13px]
                font-semibold
                text-[#67E8F9]
                transition
                hover:bg-[#28D7FF]/15
              "
            >
              <PackageCheck
                size={17}
              />

              Start Processing
            </button>
          )}

          {purchase.status ===
            "Processing" && (
            <button
              type="button"
              onClick={() =>
                onStatusChange(
                  "Completed"
                )
              }
              className="
                flex
                h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#22C55E]/10
                text-[13px]
                font-semibold
                text-[#86EFAC]
                transition
                hover:bg-[#22C55E]/15
              "
            >
              <CheckCircle2
                size={17}
              />

              Mark Completed
            </button>
          )}

          {purchase.status !==
            "Cancelled" &&
            purchase.status !==
              "Completed" && (
              <button
                type="button"
                onClick={() =>
                  onStatusChange(
                    "Cancelled"
                  )
                }
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#EF4444]/10
                  bg-[#EF4444]/[0.06]
                  px-4
                  text-[13px]
                  font-semibold
                  text-[#F87171]
                  transition
                  hover:bg-[#EF4444]/10
                "
              >
                <XCircle size={17} />

                Cancel
              </button>
            )}

          <button
            type="button"
            onClick={onPurchase}
            className="
              flex
              h-11
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              px-4
              text-[13px]
              font-bold
              text-[#031014]
              transition
              hover:brightness-105
            "
          >
            <Truck size={17} />

            Open Purchase Flow
          </button>
        </div>
      </div>
    </Modal>
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
        min-w-0
        rounded-xl
        border
        border-white/[0.05]
        bg-white/[0.02]
        p-3.5
      "
    >
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.1em]
          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          truncate
          text-[13px]
          font-semibold
          text-slate-200
        "
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   TOAST
   ========================================================= */

function Toast({
  message,
  type,
}) {
  const isInfo =
    type === "info";

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[200]
        flex
        max-w-[360px]
        items-center
        gap-3
        rounded-xl
        border
        border-white/[0.08]
        bg-[#0B1421]
        px-4
        py-3.5
        shadow-2xl
      "
    >
      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${
            isInfo
              ? "bg-[#28D7FF]/10"
              : "bg-[#22C55E]/10"
          }
        `}
      >
        {isInfo ? (
          <AlertCircle
            size={17}
            className="text-[#28D7FF]"
          />
        ) : (
          <CheckCircle2
            size={17}
            className="text-[#4ADE80]"
          />
        )}
      </div>

      <p
        className="
          text-[13px]
          font-medium
          text-slate-200
        "
      >
        {message}
      </p>
    </div>
  );
}

export default Purchases;
