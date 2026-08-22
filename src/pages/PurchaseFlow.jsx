import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileCheck2,
  IndianRupee,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  WalletCards,
  X,
} from "lucide-react";

import { vehicles } from "../data/mockData";

/* =========================================================
   PURCHASE FLOW
   ========================================================= */

function PurchaseFlow() {
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  /* =======================================================
     FIND VEHICLE
     ======================================================= */

  const vehicle = useMemo(() => {
    if (!Array.isArray(vehicles)) {
      return null;
    }

    return vehicles.find(
      (item) =>
        String(item.id) === String(vehicleId) ||
        String(item.vehicleId) === String(vehicleId) ||
        String(item._id) === String(vehicleId)
    );
  }, [vehicleId]);

  /* =======================================================
     STATE
     ======================================================= */

  const [step, setStep] = useState(1);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState({
    method: "finance",
    downPayment: "",
    loanAmount: "",
    tenure: "5",
  });

  const [confirmed, setConfirmed] = useState(false);

  const [showCancel, setShowCancel] = useState(false);

  /* =======================================================
     VEHICLE DETAILS
     ======================================================= */

  const vehicleName =
    vehicle?.name ||
    vehicle?.model ||
    vehicle?.title ||
    "Selected Vehicle";

  const vehicleBrand =
    vehicle?.brand ||
    vehicle?.make ||
    "AutoElite";

  const vehicleYear =
    vehicle?.year ||
    vehicle?.modelYear ||
    "2026";

  const vehiclePrice = Number(
    vehicle?.price ??
      vehicle?.sellingPrice ??
      vehicle?.amount ??
      0
  );

  const vehicleImage =
    vehicle?.image ||
    vehicle?.imageUrl ||
    vehicle?.photo ||
    vehicle?.thumbnail ||
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85";

  const vehicleLocation =
    vehicle?.location ||
    vehicle?.branch ||
    vehicle?.dealership ||
    "AutoElite Dealership";

  const vehicleMileage =
    vehicle?.mileage ??
    vehicle?.kilometers ??
    vehicle?.km ??
    "—";

  const vehicleFuel =
    vehicle?.fuel ||
    vehicle?.fuelType ||
    "Petrol";

  const vehicleTransmission =
    vehicle?.transmission ||
    "Automatic";

  /* =======================================================
     PRICE FORMAT
     ======================================================= */

  const formatPrice = (value) => {
    const amount = Number(value) || 0;

    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }

    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  /* =======================================================
     NUMERIC PRICE
     ======================================================= */

  const downPayment =
    Number(payment.downPayment) || 0;

  const loanAmount =
    payment.method === "full"
      ? 0
      : Math.max(
          vehiclePrice - downPayment,
          0
        );

  /* =======================================================
     CUSTOMER INPUT
     ======================================================= */

  const updateCustomer = (
    field,
    value
  ) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     PAYMENT INPUT
     ======================================================= */

  const updatePayment = (
    field,
    value
  ) => {
    setPayment((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     STEP VALIDATION
     ======================================================= */

  const validateCustomer = () => {
    if (!customer.name.trim()) {
      alert("Please enter the customer's name.");
      return false;
    }

    if (!customer.phone.trim()) {
      alert("Please enter the customer's phone number.");
      return false;
    }

    if (customer.phone.trim().length < 10) {
      alert("Please enter a valid phone number.");
      return false;
    }

    if (!customer.email.trim()) {
      alert("Please enter the customer's email address.");
      return false;
    }

    if (!customer.email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!customer.address.trim()) {
      alert("Please enter the customer's address.");
      return false;
    }

    if (!customer.city.trim()) {
      alert("Please enter the city.");
      return false;
    }

    if (!customer.pincode.trim()) {
      alert("Please enter the pincode.");
      return false;
    }

    return true;
  };

  const validatePayment = () => {
    if (payment.method === "full") {
      return true;
    }

    if (downPayment <= 0) {
      alert("Please enter a valid down payment.");
      return false;
    }

    if (downPayment >= vehiclePrice) {
      alert(
        "For finance, the down payment must be less than the vehicle price."
      );
      return false;
    }

    return true;
  };

  /* =======================================================
     NEXT
     ======================================================= */

  const handleNext = () => {
    if (step === 1) {
      if (!vehicle) {
        alert("Vehicle details could not be found.");
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validateCustomer()) {
        return;
      }

      setStep(3);
      return;
    }

    if (step === 3) {
      if (!validatePayment()) {
        return;
      }

      setStep(4);
    }
  };

  /* =======================================================
     BACK
     ======================================================= */

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }

    setStep((current) =>
      Math.max(current - 1, 1)
    );
  };

  /* =======================================================
     CONFIRM PURCHASE
     ======================================================= */

  const handleConfirmPurchase = () => {
    if (!validateCustomer()) {
      setStep(2);
      return;
    }

    if (!validatePayment()) {
      setStep(3);
      return;
    }

    const purchase = {
      id: `AE-${Date.now()}`,
      vehicleId,
      vehicleName,
      vehicleBrand,
      customer,
      payment,
      vehiclePrice,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
    };

    /* Store latest purchase locally */

    localStorage.setItem(
      "autoelite_last_purchase",
      JSON.stringify(purchase)
    );

    /* Store purchase history */

    const existingPurchases =
      JSON.parse(
        localStorage.getItem(
          "autoelite_purchases"
        ) || "[]"
      );

    localStorage.setItem(
      "autoelite_purchases",
      JSON.stringify([
        purchase,
        ...existingPurchases,
      ])
    );

    setConfirmed(true);
  };

  /* =======================================================
     CANCEL
     ======================================================= */

  const handleCancel = () => {
    setShowCancel(false);
    navigate("/inventory");
  };

  /* =======================================================
     VEHICLE NOT FOUND
     ======================================================= */

  if (!vehicle) {
    return (
      <div className="min-h-[calc(100vh-76px)] flex items-center justify-center p-6">
        <div
          className="
            w-full
            max-w-[520px]
            rounded-3xl
            bg-gradient-to-br
            from-[#0E1827]
            to-[#09111D]
            border
            border-white/[0.07]
            p-8
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              items-center
              justify-center
              w-16
              h-16
              rounded-2xl
              bg-[#F59E0B]/10
              border
              border-[#F59E0B]/15
            "
          >
            <CarFront
              size={28}
              className="text-[#FBBF24]"
            />
          </div>

          <h1
            className="
              mt-6
              text-2xl
              font-bold
              text-white
            "
          >
            Vehicle not found
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            The selected vehicle could not be
            found in the dealership inventory.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/inventory")
            }
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              h-11
              px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-[#031014]
              text-sm
              font-bold
            "
          >
            <ArrowLeft size={16} />
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     SUCCESS SCREEN
     ======================================================= */

  if (confirmed) {
    return (
      <PurchaseSuccess
        vehicle={vehicle}
        vehicleName={vehicleName}
        customer={customer}
        vehiclePrice={vehiclePrice}
        payment={payment}
        onDashboard={() =>
          navigate("/dashboard")
        }
        onInventory={() =>
          navigate("/inventory")
        }
      />
    );
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto">

      {/* ===================================================
          HEADER
          =================================================== */}

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
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-7
        "
      >
        <div>

          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div
            className="
              flex
              items-center
              gap-2
              mt-4
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#18E0C4]
                shadow-[0_0_10px_rgba(24,224,196,0.8)]
              "
            />

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                font-semibold
                text-[#18E0C4]
              "
            >
              Dealership Purchase
            </span>
          </div>

          <h1
            className="
              mt-2
              text-3xl
              sm:text-4xl
              font-bold
              tracking-[-0.045em]
              text-white
            "
          >
            Purchase vehicle
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            Complete the purchase process
            securely and review all details
            before confirmation.
          </p>

        </div>

        {/* Cancel */}

        <button
          type="button"
          onClick={() =>
            setShowCancel(true)
          }
          className="
            self-start
            lg:self-center

            flex
            items-center
            gap-2

            h-10
            px-4

            rounded-xl

            bg-white/[0.025]
            border
            border-white/[0.07]

            text-sm
            font-medium
            text-slate-400

            hover:text-white
            hover:bg-white/[0.05]

            transition
          "
        >
          <X size={15} />
          Cancel
        </button>
      </motion.div>

      {/* ===================================================
          STEPPER
          =================================================== */}

      <PurchaseStepper step={step} />

      {/* ===================================================
          MAIN GRID
          =================================================== */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[minmax(0,1fr)_360px]
          gap-5
          mt-6
        "
      >

        {/* =================================================
            MAIN FORM
            ================================================= */}

        <section
          className="
            rounded-3xl
            bg-gradient-to-br
            from-[#0E1827]
            to-[#09111D]
            border
            border-white/[0.06]
            p-5
            sm:p-7
          "
        >

          {step === 1 && (
            <VehicleStep
              vehicle={vehicle}
              vehicleName={vehicleName}
              vehicleBrand={vehicleBrand}
              vehicleYear={vehicleYear}
              vehiclePrice={vehiclePrice}
              vehicleImage={vehicleImage}
              vehicleLocation={vehicleLocation}
              vehicleMileage={vehicleMileage}
              vehicleFuel={vehicleFuel}
              vehicleTransmission={
                vehicleTransmission
              }
            />
          )}

          {step === 2 && (
            <CustomerStep
              customer={customer}
              updateCustomer={
                updateCustomer
              }
            />
          )}

          {step === 3 && (
            <PaymentStep
              payment={payment}
              updatePayment={
                updatePayment
              }
              vehiclePrice={vehiclePrice}
              downPayment={downPayment}
              loanAmount={loanAmount}
            />
          )}

          {step === 4 && (
            <ReviewStep
              vehicle={vehicle}
              vehicleName={vehicleName}
              vehicleBrand={vehicleBrand}
              vehiclePrice={vehiclePrice}
              customer={customer}
              payment={payment}
              downPayment={downPayment}
              loanAmount={loanAmount}
            />
          )}

          {/* =================================================
              ACTION BAR
              ================================================= */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3

              mt-8
              pt-6

              border-t
              border-white/[0.05]
            "
          >

            <button
              type="button"
              onClick={handleBack}
              className="
                flex
                items-center
                justify-center
                gap-2

                h-11
                px-5

                rounded-xl

                bg-white/[0.025]
                border
                border-white/[0.07]

                text-sm
                font-semibold
                text-slate-400

                hover:text-white
                hover:bg-white/[0.05]

                transition
              "
            >
              <ArrowLeft size={15} />
              {step === 1
                ? "Back to Inventory"
                : "Previous"}
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
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

                  text-[#031014]

                  text-sm
                  font-bold

                  shadow-[0_10px_30px_rgba(24,224,196,0.12)]

                  hover:brightness-105

                  transition
                "
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={
                  handleConfirmPurchase
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

                  text-[#031014]

                  text-sm
                  font-bold

                  shadow-[0_10px_30px_rgba(24,224,196,0.14)]

                  hover:brightness-105

                  transition
                "
              >
                <CheckCircle2 size={17} />
                Confirm Purchase
              </button>
            )}

          </div>

        </section>

        {/* =================================================
            ORDER SUMMARY
            ================================================= */}

        <aside
          className="
            h-fit
            xl:sticky
            xl:top-6

            rounded-3xl

            bg-gradient-to-br
            from-[#101A2A]
            to-[#09111D]

            border
            border-white/[0.06]

            p-5
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <WalletCards
              size={17}
              className="text-[#18E0C4]"
            />

            <h2
              className="
                text-base
                font-bold
                text-white
              "
            >
              Purchase summary
            </h2>
          </div>

          {/* Vehicle */}

          <div
            className="
              mt-5
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.02]
            "
          >
            <img
              src={vehicleImage}
              alt={vehicleName}
              className="
                w-full
                h-[150px]
                object-cover
              "
            />

            <div className="p-4">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  font-semibold
                  text-[#18E0C4]
                "
              >
                {vehicleBrand}
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-white
                "
              >
                {vehicleName}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {vehicleYear} •{" "}
                {vehicleTransmission}
              </p>

            </div>
          </div>

          {/* Price */}

          <SummaryRow
            label="Vehicle price"
            value={formatPrice(vehiclePrice)}
          />

          {payment.method !== "full" && (
            <>
              <SummaryRow
                label="Down payment"
                value={
                  downPayment > 0
                    ? formatPrice(
                        downPayment
                      )
                    : "Not entered"
                }
              />

              <SummaryRow
                label="Finance amount"
                value={
                  loanAmount > 0
                    ? formatPrice(
                        loanAmount
                      )
                    : "—"
                }
              />
            </>
          )}

          <div
            className="
              mt-4
              pt-4
              border-t
              border-white/[0.06]
            "
          >

            <div
              className="
                flex
                items-end
                justify-between
                gap-3
              "
            >
              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                Total
              </span>

              <span
                className="
                  text-2xl
                  font-bold
                  tracking-[-0.04em]
                  text-white
                "
              >
                {formatPrice(
                  vehiclePrice
                )}
              </span>
            </div>

          </div>

          {/* Security */}

          <div
            className="
              flex
              gap-3

              mt-5
              p-3.5

              rounded-xl

              bg-[#22C55E]/[0.04]

              border
              border-[#22C55E]/10
            "
          >
            <ShieldCheck
              size={17}
              className="
                shrink-0
                text-[#4ADE80]
              "
            />

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#86EFAC]
                "
              >
                Secure transaction
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-4
                  text-slate-600
                "
              >
                Your purchase information
                is protected by AutoElite
                enterprise security.
              </p>

            </div>
          </div>

        </aside>

      </div>

      {/* ===================================================
          CANCEL MODAL
          =================================================== */}

      {showCancel && (
        <CancelModal
          onCancel={() =>
            setShowCancel(false)
          }
          onConfirm={handleCancel}
        />
      )}

    </div>
  );
}

/* =========================================================
   STEPPER
   ========================================================= */

function PurchaseStepper({ step }) {
  const steps = [
    {
      number: 1,
      label: "Vehicle",
    },
    {
      number: 2,
      label: "Customer",
    },
    {
      number: 3,
      label: "Payment",
    },
    {
      number: 4,
      label: "Review",
    },
  ];

  return (
    <div
      className="
        overflow-x-auto
        pb-1
      "
    >
      <div
        className="
          min-w-[600px]

          flex
          items-center
          justify-center

          px-3
          py-4

          rounded-2xl

          bg-white/[0.02]

          border
          border-white/[0.05]
        "
      >

        {steps.map(
          (item, index) => {
            const completed =
              step > item.number;

            const active =
              step === item.number;

            return (
              <div
                key={item.number}
                className="
                  flex
                  items-center
                  flex-1
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mx-auto
                  "
                >

                  <div
                    className={`
                      flex
                      items-center
                      justify-center

                      w-9
                      h-9

                      rounded-full

                      border

                      text-xs
                      font-bold

                      transition

                      ${
                        completed
                          ? `
                            bg-[#18E0C4]
                            border-[#18E0C4]
                            text-[#031014]
                          `
                          : active
                          ? `
                            bg-[#18E0C4]/10
                            border-[#18E0C4]/40
                            text-[#18E0C4]
                          `
                          : `
                            bg-white/[0.02]
                            border-white/[0.07]
                            text-slate-600
                          `
                      }
                    `}
                  >
                    {completed ? (
                      <Check size={16} />
                    ) : (
                      item.number
                    )}
                  </div>

                  <span
                    className={`
                      hidden
                      sm:block

                      text-sm
                      font-semibold

                      ${
                        active ||
                        completed
                          ? "text-white"
                          : "text-slate-600"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                </div>

                {index <
                  steps.length - 1 && (
                  <div
                    className={`
                      hidden
                      sm:block

                      flex-1
                      h-px
                      mx-3

                      ${
                        step >
                        item.number
                          ? "bg-[#18E0C4]/40"
                          : "bg-white/[0.06]"
                      }
                    `}
                  />
                )}

              </div>
            );
          }
        )}

      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE STEP
   ========================================================= */

function VehicleStep({
  vehicle,
  vehicleName,
  vehicleBrand,
  vehicleYear,
  vehiclePrice,
  vehicleImage,
  vehicleLocation,
  vehicleMileage,
  vehicleFuel,
  vehicleTransmission,
}) {
  return (
    <div>

      <SectionHeader
        icon={CarFront}
        eyebrow="STEP 01"
        title="Confirm vehicle"
        description="Verify the vehicle selected for this purchase."
      />

      <div
        className="
          mt-7

          grid
          grid-cols-1
          lg:grid-cols-[1fr_1fr]

          gap-5
        "
      >

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.02]
          "
        >
          <img
            src={vehicleImage}
            alt={vehicleName}
            className="
              w-full
              h-[260px]
              object-cover
            "
          />
        </div>

        <div
          className="
            flex
            flex-col
            justify-center
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              font-semibold
              text-[#18E0C4]
            "
          >
            {vehicleBrand}
          </p>

          <h2
            className="
              mt-2

              text-3xl
              font-bold
              tracking-[-0.04em]

              text-white
            "
          >
            {vehicleName}
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {vehicleYear} •{" "}
            {vehicleTransmission}
          </p>

          <div
            className="
              grid
              grid-cols-2
              gap-3
              mt-6
            "
          >

            <InfoBox
              label="Price"
              value={formatMoney(
                vehiclePrice
              )}
              icon={IndianRupee}
            />

            <InfoBox
              label="Mileage"
              value={
                typeof vehicleMileage ===
                "number"
                  ? `${vehicleMileage.toLocaleString(
                      "en-IN"
                    )} km`
                  : vehicleMileage
              }
              icon={CarFront}
            />

            <InfoBox
              label="Fuel"
              value={vehicleFuel}
              icon={Banknote}
            />

            <InfoBox
              label="Location"
              value={vehicleLocation}
              icon={MapPin}
            />

          </div>

        </div>

      </div>

      <div
        className="
          mt-6

          flex
          items-center
          gap-3

          p-4

          rounded-xl

          bg-[#18E0C4]/[0.04]

          border
          border-[#18E0C4]/10
        "
      >
        <BadgeCheck
          size={20}
          className="text-[#18E0C4]"
        />

        <div>

          <p
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            Vehicle ready for purchase
          </p>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Confirm the vehicle details
            and continue to customer
            information.
          </p>

        </div>
      </div>

    </div>
  );
}

/* =========================================================
   CUSTOMER STEP
   ========================================================= */

function CustomerStep({
  customer,
  updateCustomer,
}) {
  return (
    <div>

      <SectionHeader
        icon={User}
        eyebrow="STEP 02"
        title="Customer information"
        description="Enter the customer details for this purchase."
      />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2

          gap-5

          mt-7
        "
      >

        <InputField
          label="Full name"
          value={customer.name}
          onChange={(value) =>
            updateCustomer(
              "name",
              value
            )
          }
          placeholder="Enter full name"
          icon={User}
        />

        <InputField
          label="Phone number"
          value={customer.phone}
          onChange={(value) =>
            updateCustomer(
              "phone",
              value
            )
          }
          placeholder="Enter phone number"
          icon={Phone}
          type="tel"
        />

        <InputField
          label="Email address"
          value={customer.email}
          onChange={(value) =>
            updateCustomer(
              "email",
              value
            )
          }
          placeholder="customer@example.com"
          icon={WalletCards}
          type="email"
        />

        <InputField
          label="City"
          value={customer.city}
          onChange={(value) =>
            updateCustomer(
              "city",
              value
            )
          }
          placeholder="Enter city"
          icon={MapPin}
        />

        <div className="md:col-span-2">
          <InputField
            label="Address"
            value={customer.address}
            onChange={(value) =>
              updateCustomer(
                "address",
                value
              )
            }
            placeholder="Enter complete address"
            icon={MapPin}
          />
        </div>

        <InputField
          label="Pincode"
          value={customer.pincode}
          onChange={(value) =>
            updateCustomer(
              "pincode",
              value
            )
          }
          placeholder="500001"
          icon={MapPin}
        />

      </div>

    </div>
  );
}

/* =========================================================
   PAYMENT STEP
   ========================================================= */

function PaymentStep({
  payment,
  updatePayment,
  vehiclePrice,
  downPayment,
  loanAmount,
}) {
  return (
    <div>

      <SectionHeader
        icon={CreditCard}
        eyebrow="STEP 03"
        title="Payment method"
        description="Choose how the customer will complete the purchase."
      />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2

          gap-4

          mt-7
        "
      >

        <PaymentMethod
          selected={
            payment.method === "full"
          }
          onClick={() =>
            updatePayment(
              "method",
              "full"
            )
          }
          icon={Banknote}
          title="Full payment"
          description="Customer pays the complete amount."
        />

        <PaymentMethod
          selected={
            payment.method === "finance"
          }
          onClick={() =>
            updatePayment(
              "method",
              "finance"
            )
          }
          icon={CreditCard}
          title="Finance"
          description="Finance the vehicle through a loan."
        />

      </div>

      {payment.method ===
        "full" && (
        <div
          className="
            mt-6

            p-5

            rounded-2xl

            bg-[#18E0C4]/[0.04]

            border
            border-[#18E0C4]/10
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
              Full payment amount
            </span>

            <span
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {formatMoney(
                vehiclePrice
              )}
            </span>
          </div>
        </div>
      )}

      {payment.method ===
        "finance" && (
        <div
          className="
            mt-6

            space-y-5
          "
        >

          <InputField
            label="Down payment"
            value={
              payment.downPayment
            }
            onChange={(value) =>
              updatePayment(
                "downPayment",
                value.replace(
                  /[^0-9]/g,
                  ""
                )
              )
            }
            placeholder="Enter down payment"
            icon={IndianRupee}
            type="text"
          />

          <div>

            <label
              className="
                block
                mb-2

                text-xs
                font-semibold

                text-slate-400
              "
            >
              Loan tenure
            </label>

            <select
              value={payment.tenure}
              onChange={(event) =>
                updatePayment(
                  "tenure",
                  event.target.value
                )
              }
              className="
                w-full
                h-12

                px-4

                rounded-xl

                bg-[#09111D]

                border
                border-white/[0.08]

                text-sm
                text-white

                outline-none

                focus:border-[#18E0C4]/40
              "
            >
              <option value="3">
                3 years
              </option>

              <option value="5">
                5 years
              </option>

              <option value="7">
                7 years
              </option>
            </select>

          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >

            <InfoBox
              label="Vehicle price"
              value={formatMoney(
                vehiclePrice
              )}
              icon={IndianRupee}
            />

            <InfoBox
              label="Estimated loan"
              value={formatMoney(
                loanAmount
              )}
              icon={CreditCard}
            />

          </div>

          <div
            className="
              flex
              gap-3

              p-4

              rounded-xl

              bg-[#8B5CF6]/[0.05]

              border
              border-[#8B5CF6]/10
            "
          >
            <ShieldCheck
              size={18}
              className="
                shrink-0
                text-[#A78BFA]
              "
            />

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Finance information
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Final loan approval and
                interest rates are subject
                to the finance provider's
                assessment.
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   REVIEW STEP
   ========================================================= */

function ReviewStep({
  vehicleName,
  vehicleBrand,
  vehiclePrice,
  customer,
  payment,
  downPayment,
  loanAmount,
}) {
  return (
    <div>

      <SectionHeader
        icon={FileCheck2}
        eyebrow="STEP 04"
        title="Review purchase"
        description="Review the information carefully before confirming."
      />

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2

          gap-5

          mt-7
        "
      >

        {/* Vehicle */}

        <ReviewCard
          title="Vehicle"
          icon={CarFront}
        >

          <ReviewRow
            label="Brand"
            value={vehicleBrand}
          />

          <ReviewRow
            label="Vehicle"
            value={vehicleName}
          />

          <ReviewRow
            label="Price"
            value={formatMoney(
              vehiclePrice
            )}
            highlight
          />

        </ReviewCard>

        {/* Customer */}

        <ReviewCard
          title="Customer"
          icon={User}
        >

          <ReviewRow
            label="Name"
            value={customer.name}
          />

          <ReviewRow
            label="Phone"
            value={customer.phone}
          />

          <ReviewRow
            label="Email"
            value={customer.email}
          />

          <ReviewRow
            label="City"
            value={customer.city}
          />

        </ReviewCard>

        {/* Payment */}

        <ReviewCard
          title="Payment"
          icon={CreditCard}
        >

          <ReviewRow
            label="Method"
            value={
              payment.method ===
              "full"
                ? "Full payment"
                : "Finance"
            }
          />

          {payment.method ===
            "finance" && (
            <>
              <ReviewRow
                label="Down payment"
                value={formatMoney(
                  downPayment
                )}
              />

              <ReviewRow
                label="Loan amount"
                value={formatMoney(
                  loanAmount
                )}
              />

              <ReviewRow
                label="Tenure"
                value={`${payment.tenure} years`}
              />
            </>
          )}

          <ReviewRow
            label="Total"
            value={formatMoney(
              vehiclePrice
            )}
            highlight
          />

        </ReviewCard>

        {/* Confirmation */}

        <ReviewCard
          title="Ready to confirm"
          icon={CheckCircle2}
        >

          <div
            className="
              flex
              gap-3
              p-4
              rounded-xl
              bg-[#22C55E]/[0.04]
              border
              border-[#22C55E]/10
            "
          >
            <CheckCircle2
              size={20}
              className="
                shrink-0
                text-[#4ADE80]
              "
            />

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Everything looks good
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Click "Confirm Purchase"
                to complete this transaction.
              </p>

            </div>

          </div>

        </ReviewCard>

      </div>

      <div
        className="
          flex
          items-center
          gap-3

          mt-6
          p-4

          rounded-xl

          bg-[#18E0C4]/[0.035]

          border
          border-[#18E0C4]/10
        "
      >
        <ShieldCheck
          size={19}
          className="text-[#18E0C4]"
        />

        <p
          className="
            text-xs
            leading-5
            text-slate-500
          "
        >
          By confirming, you acknowledge
          that the customer and payment
          information has been reviewed
          and is ready for processing.
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   SUCCESS
   ========================================================= */

function PurchaseSuccess({
  vehicleName,
  customer,
  vehiclePrice,
  payment,
  onDashboard,
  onInventory,
}) {
  const purchaseId =
    JSON.parse(
      localStorage.getItem(
        "autoelite_last_purchase"
      ) || "{}"
    )?.id || "AE-PENDING";

  return (
    <div
      className="
        min-h-[calc(100vh-76px)]

        flex
        items-center
        justify-center

        p-5
      "
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
          max-w-[680px]

          rounded-3xl

          bg-gradient-to-br
          from-[#0E1B28]
          to-[#09111D]

          border
          border-white/[0.07]

          p-7
          sm:p-10

          text-center

          shadow-[0_30px_90px_rgba(0,0,0,0.3)]
        "
      >

        <div
          className="
            mx-auto

            flex
            items-center
            justify-center

            w-20
            h-20

            rounded-full

            bg-[#22C55E]/10

            border
            border-[#22C55E]/15

            shadow-[0_0_40px_rgba(34,197,94,0.08)]
          "
        >
          <CheckCircle2
            size={38}
            className="text-[#4ADE80]"
          />
        </div>

        <p
          className="
            mt-6

            text-[10px]
            uppercase
            tracking-[0.18em]
            font-bold

            text-[#4ADE80]
          "
        >
          Purchase completed
        </p>

        <h1
          className="
            mt-2

            text-3xl
            sm:text-4xl

            font-bold
            tracking-[-0.045em]

            text-white
          "
        >
          Purchase confirmed!
        </h1>

        <p
          className="
            mt-3

            text-sm
            leading-6

            text-slate-500
          "
        >
          The vehicle purchase has been
          successfully recorded in AutoElite.
        </p>

        <div
          className="
            mt-7

            p-5

            rounded-2xl

            bg-white/[0.025]

            border
            border-white/[0.06]

            text-left
          "
        >

          <SummaryRow
            label="Purchase ID"
            value={purchaseId}
          />

          <SummaryRow
            label="Vehicle"
            value={vehicleName}
          />

          <SummaryRow
            label="Customer"
            value={customer.name}
          />

          <SummaryRow
            label="Payment"
            value={
              payment.method ===
              "full"
                ? "Full payment"
                : "Finance"
            }
          />

          <SummaryRow
            label="Total"
            value={formatMoney(
              vehiclePrice
            )}
          />

        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row

            gap-3

            mt-7
          "
        >

          <button
            type="button"
            onClick={onInventory}
            className="
              flex
              items-center
              justify-center
              gap-2

              flex-1

              h-12

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.07]

              text-sm
              font-semibold
              text-slate-300

              hover:bg-white/[0.05]
              hover:text-white

              transition
            "
          >
            <CarFront size={16} />
            Back to Inventory
          </button>

          <button
            type="button"
            onClick={onDashboard}
            className="
              flex
              items-center
              justify-center
              gap-2

              flex-1

              h-12

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
            Go to Dashboard
            <ArrowRight size={16} />
          </button>

        </div>

      </motion.div>

    </div>
  );
}

/* =========================================================
   SECTION HEADER
   ========================================================= */

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}) {
  return (
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

            w-10
            h-10

            rounded-xl

            bg-[#18E0C4]/10

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

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              font-bold
              text-[#18E0C4]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-white
            "
          >
            {title}
          </h2>

        </div>

      </div>

      <p
        className="
          mt-3

          text-sm
          leading-6

          text-slate-500
        "
      >
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   INPUT FIELD
   ========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}) {
  return (
    <div>

      <label
        className="
          block

          mb-2

          text-xs
          font-semibold

          text-slate-400
        "
      >
        {label}
      </label>

      <div className="relative">

        <Icon
          size={16}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-slate-600
          "
        />

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

            pl-11
            pr-4

            rounded-xl

            bg-[#09111D]

            border
            border-white/[0.08]

            text-sm
            text-white

            placeholder:text-slate-700

            outline-none

            transition

            focus:border-[#18E0C4]/40
            focus:ring-2
            focus:ring-[#18E0C4]/5
          "
        />

      </div>

    </div>
  );
}

/* =========================================================
   INFO BOX
   ========================================================= */

function InfoBox({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        p-3.5

        rounded-xl

        bg-white/[0.025]

        border
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
        <Icon
          size={13}
          className="text-[#18E0C4]"
        />

        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.08em]
            text-slate-600
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2

          text-sm
          font-semibold

          text-slate-200

          truncate
        "
        title={String(value)}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   PAYMENT METHOD
   ========================================================= */

function PaymentMethod({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative

        w-full

        p-5

        rounded-2xl

        text-left

        border

        transition-all

        ${
          selected
            ? `
              bg-[#18E0C4]/[0.055]
              border-[#18E0C4]/30
              shadow-[0_10px_35px_rgba(24,224,196,0.06)]
            `
            : `
              bg-white/[0.02]
              border-white/[0.07]
              hover:bg-white/[0.035]
              hover:border-white/[0.11]
            `
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

        <div
          className="
            flex
            items-center
            gap-3
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

              ${
                selected
                  ? "bg-[#18E0C4]/10"
                  : "bg-white/[0.035]"
              }
            `}
          >
            <Icon
              size={19}
              className={
                selected
                  ? "text-[#18E0C4]"
                  : "text-slate-500"
              }
            />
          </div>

          <div>

            <p
              className="
                text-sm
                font-bold
                text-white
              "
            >
              {title}
            </p>

            <p
              className="
                mt-1

                text-xs
                leading-5

                text-slate-600
              "
            >
              {description}
            </p>

          </div>

        </div>

        <div
          className={`
            flex
            items-center
            justify-center

            w-5
            h-5

            rounded-full

            border

            ${
              selected
                ? `
                  bg-[#18E0C4]
                  border-[#18E0C4]
                `
                : `
                  border-white/[0.12]
                `
            }
          `}
        >
          {selected && (
            <Check
              size={12}
              className="text-[#031014]"
            />
          )}
        </div>

      </div>

    </button>
  );
}

/* =========================================================
   REVIEW CARD
   ========================================================= */

function ReviewCard({
  title,
  icon: Icon,
  children,
}) {
  return (
    <div
      className="
        rounded-2xl

        bg-white/[0.02]

        border
        border-white/[0.06]

        p-5
      "
    >

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
            text-sm
            font-bold
            text-white
          "
        >
          {title}
        </h3>

      </div>

      <div
        className="
          space-y-3
        "
      >
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   REVIEW ROW
   ========================================================= */

function ReviewRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
      "
    >

      <span
        className="
          text-xs
          text-slate-600
        "
      >
        {label}
      </span>

      <span
        className={`
          text-right
          text-xs
          font-semibold

          ${
            highlight
              ? "text-[#5EEAD4]"
              : "text-slate-300"
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   SUMMARY ROW
   ========================================================= */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4

        py-2
      "
    >

      <span
        className="
          text-xs
          text-slate-600
        "
      >
        {label}
      </span>

      <span
        className="
          text-right
          text-sm
          font-semibold
          text-slate-300
        "
      >
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   CANCEL MODAL
   ========================================================= */

function CancelModal({
  onCancel,
  onConfirm,
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

        p-5

        bg-black/70
        backdrop-blur-sm
      "
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
          max-w-[430px]

          rounded-2xl

          bg-[#0D1725]

          border
          border-white/[0.08]

          p-6

          shadow-2xl
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <h2
            className="
              text-lg
              font-bold
              text-white
            "
          >
            Cancel purchase?
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="
              flex
              items-center
              justify-center
              w-8
              h-8
              rounded-lg
              text-slate-500
              hover:text-white
              hover:bg-white/[0.05]
            "
          >
            <X size={16} />
          </button>

        </div>

        <p
          className="
            mt-3

            text-sm
            leading-6

            text-slate-500
          "
        >
          Your current purchase information
          will not be saved if you leave this
          page.
        </p>

        <div
          className="
            flex
            gap-3

            mt-6
          "
        >

          <button
            type="button"
            onClick={onCancel}
            className="
              flex-1
              h-11
              rounded-xl
              bg-white/[0.03]
              border
              border-white/[0.07]
              text-sm
              font-semibold
              text-slate-300
              hover:bg-white/[0.06]
            "
          >
            Continue purchase
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              h-11
              rounded-xl
              bg-[#EF4444]/10
              border
              border-[#EF4444]/15
              text-sm
              font-semibold
              text-[#FCA5A5]
              hover:bg-[#EF4444]/15
            "
          >
            Cancel purchase
          </button>

        </div>

      </motion.div>

    </div>
  );
}

/* =========================================================
   MONEY FORMAT
   ========================================================= */

function formatMoney(value) {
  const amount = Number(value) || 0;

  if (amount >= 10000000) {
    return `₹${(
      amount / 10000000
    ).toFixed(2)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(
      amount / 100000
    ).toFixed(2)}L`;
  }

  return `₹${amount.toLocaleString(
    "en-IN"
  )}`;
}

export default PurchaseFlow;
