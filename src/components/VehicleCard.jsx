import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Heart,
  MapPin,
  ShoppingCart,
  Star,
  Tag,
} from "lucide-react";

function VehicleCard({
  vehicle,
  index = 0,
  isFavorite = false,
  onFavorite,
}) {
  const navigate = useNavigate();

  const [imageError, setImageError] =
    useState(false);

  if (!vehicle) {
    return null;
  }

  /* =========================================================
     VEHICLE DATA
     Supports the fields used by your mock data.
     ========================================================= */

  const vehicleId =
    vehicle.id ??
    vehicle.vehicleId ??
    vehicle._id;

  const name =
    vehicle.name ||
    vehicle.model ||
    vehicle.title ||
    "Premium Vehicle";

  const brand =
    vehicle.brand ||
    vehicle.make ||
    "";

  const displayName =
    brand &&
    !name.toLowerCase().includes(
      brand.toLowerCase()
    )
      ? `${brand} ${name}`
      : name;

  const year =
    vehicle.year ||
    vehicle.modelYear ||
    "2026";

  const price =
    vehicle.price ??
    vehicle.sellingPrice ??
    vehicle.amount ??
    0;

  const image =
    vehicle.image ||
    vehicle.imageUrl ||
    vehicle.photo ||
    vehicle.thumbnail ||
    "";

  const location =
    vehicle.location ||
    vehicle.branch ||
    vehicle.dealership ||
    "Main Dealership";

  const mileage =
    vehicle.mileage ??
    vehicle.kilometers ??
    vehicle.km ??
    "—";

  const fuel =
    vehicle.fuel ||
    vehicle.fuelType ||
    "Petrol";

  const transmission =
    vehicle.transmission ||
    "Automatic";

  const stock =
    vehicle.stock ??
    vehicle.availableUnits ??
    vehicle.units ??
    0;

  const soldUnits =
    vehicle.soldUnits ??
    vehicle.sales ??
    0;

  const rating =
    vehicle.rating ??
    4.8;

  /* =========================================================
     PRICE FORMATTER
     ========================================================= */

  const formatPrice = (value) => {
    const numericValue =
      Number(value) || 0;

    if (numericValue >= 10000000) {
      return `₹${(
        numericValue / 10000000
      ).toFixed(2)}Cr`;
    }

    if (numericValue >= 100000) {
      return `₹${(
        numericValue / 100000
      ).toFixed(2)}L`;
    }

    return `₹${numericValue.toLocaleString(
      "en-IN"
    )}`;
  };

  /* =========================================================
     NAVIGATION
     ========================================================= */

  const handlePurchase = () => {
    if (
      vehicleId === undefined ||
      vehicleId === null
    ) {
      console.error(
        "VehicleCard: vehicle ID is missing.",
        vehicle
      );

      return;
    }

    navigate(
      `/purchase/${encodeURIComponent(
        String(vehicleId)
      )}`
    );
  };

  const handleDetails = () => {
    if (
      vehicleId === undefined ||
      vehicleId === null
    ) {
      return;
    }

    navigate(
      `/vehicles/${encodeURIComponent(
        String(vehicleId)
      )}`
    );
  };

  /* =========================================================
     FAVORITE
     ========================================================= */

  const handleFavorite = (event) => {
    event.stopPropagation();

    if (onFavorite) {
      onFavorite(vehicle);
    }
  };

  /* =========================================================
     IMAGE FALLBACK
     ========================================================= */

  const fallbackImage =
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85";

  return (
    <article
      className="
        group
        relative
        overflow-hidden

        rounded-2xl

        bg-gradient-to-br
        from-[#0E1827]
        to-[#09111D]

        border
        border-white/[0.06]

        shadow-[0_18px_50px_rgba(0,0,0,0.18)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-white/[0.11]
        hover:shadow-[0_25px_65px_rgba(0,0,0,0.28)]
      "
    >

      {/* =====================================================
          VEHICLE IMAGE
          ===================================================== */}

      <div
        className="
          relative
          overflow-hidden

          h-[190px]
          sm:h-[205px]
        "
      >

        {!imageError ? (
          <img
            src={image || fallbackImage}
            alt={displayName}
            onError={() =>
              setImageError(true)
            }
            className="
              w-full
              h-full

              object-cover

              transition-transform
              duration-500

              group-hover:scale-[1.045]
            "
          />
        ) : (
          <img
            src={fallbackImage}
            alt={displayName}
            className="
              w-full
              h-full
              object-cover
            "
          />
        )}

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#07101A]
            via-transparent
            to-black/10
          "
        />

        {/* Top badges */}

        <div
          className="
            absolute
            top-3
            left-3
            right-3

            flex
            items-start
            justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-1.5

              px-2.5
              py-1.5

              rounded-lg

              bg-[#07101A]/80
              backdrop-blur-md

              border
              border-white/10

              text-[10px]
              font-semibold

              text-white
            "
          >
            <CarFront
              size={12}
              className="text-[#18E0C4]"
            />

            {year}
          </div>

          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className="
              flex
              items-center
              justify-center

              w-9
              h-9

              rounded-xl

              bg-[#07101A]/80
              backdrop-blur-md

              border
              border-white/10

              transition

              hover:bg-white/10
            "
          >
            <Heart
              size={16}
              className={
                isFavorite
                  ? "fill-[#F87171] text-[#F87171]"
                  : "text-slate-300"
              }
            />
          </button>

        </div>

        {/* Stock badge */}

        <div
          className="
            absolute
            bottom-3
            left-3

            flex
            items-center
            gap-1.5

            px-2.5
            py-1.5

            rounded-lg

            bg-[#18E0C4]/10
            backdrop-blur-md

            border
            border-[#18E0C4]/15

            text-[9px]
            font-semibold

            text-[#5EEAD4]
          "
        >
          <span
            className="
              w-1.5
              h-1.5
              rounded-full

              bg-[#18E0C4]

              shadow-[0_0_8px_rgba(24,224,196,0.8)]
            "
          />

          {stock > 0
            ? `${stock} in stock`
            : "Limited stock"}
        </div>

      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="p-4 sm:p-5">

        {/* Brand */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <div className="min-w-0">

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.13em]
                font-semibold

                text-[#18E0C4]
              "
            >
              {brand || "AutoElite"}
            </p>

            <h3
              className="
                mt-1.5

                text-[17px]
                sm:text-[18px]

                leading-tight

                font-bold
                tracking-[-0.025em]

                text-white

                truncate
              "
              title={displayName}
            >
              {displayName}
            </h3>

          </div>

          {/* Rating */}

          <div
            className="
              flex
              items-center
              gap-1

              shrink-0
            "
          >
            <Star
              size={13}
              className="
                fill-[#FBBF24]
                text-[#FBBF24]
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                text-slate-300
              "
            >
              {rating}
            </span>
          </div>

        </div>

        {/* =================================================
            DETAILS
            ================================================= */}

        <div
          className="
            grid
            grid-cols-2

            gap-2

            mt-4
          "
        >

          <Detail
            label="Mileage"
            value={
              typeof mileage === "number"
                ? `${mileage.toLocaleString(
                    "en-IN"
                  )} km`
                : mileage
            }
          />

          <Detail
            label="Fuel"
            value={fuel}
          />

          <Detail
            label="Transmission"
            value={transmission}
          />

          <Detail
            label="Sold"
            value={`${soldUnits}`}
          />

        </div>

        {/* Location */}

        <div
          className="
            flex
            items-center
            gap-2

            mt-4

            text-[10px]
            text-slate-500
          "
        >
          <MapPin
            size={13}
            className="text-slate-600"
          />

          <span className="truncate">
            {location}
          </span>
        </div>

        {/* =================================================
            PRICE
            ================================================= */}

        <div
          className="
            flex
            items-end
            justify-between

            gap-3

            mt-5
            pt-4

            border-t
            border-white/[0.05]
          "
        >

          <div>

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.12em]
                font-semibold

                text-slate-600
              "
            >
              Starting price
            </p>

            <p
              className="
                mt-1

                text-[22px]

                leading-none

                font-bold
                tracking-[-0.04em]

                text-white
              "
            >
              {formatPrice(price)}
            </p>

          </div>

          {soldUnits > 0 && (
            <div
              className="
                flex
                items-center
                gap-1.5

                text-[9px]
                font-semibold

                text-[#4ADE80]
              "
            >
              <TrendingIcon />

              {soldUnits} sold
            </div>
          )}

        </div>

        {/* =================================================
            ACTIONS
            ================================================= */}

        <div
          className="
            grid
            grid-cols-[0.8fr_1.2fr]

            gap-2.5

            mt-5
          "
        >

          {/* Details */}

          <button
            type="button"
            onClick={handleDetails}
            className="
              flex
              items-center
              justify-center
              gap-2

              h-11

              rounded-xl

              bg-white/[0.025]

              border
              border-white/[0.07]

              text-[10px]
              font-semibold

              text-slate-300

              hover:bg-white/[0.055]
              hover:text-white
              hover:border-white/[0.12]

              transition
            "
          >
            View details

            <ArrowRight
              size={13}
            />
          </button>

          {/* Purchase */}

          <button
            type="button"
            onClick={handlePurchase}
            disabled={
              vehicleId === undefined ||
              vehicleId === null
            }
            className="
              relative
              overflow-hidden

              flex
              items-center
              justify-center
              gap-2

              h-11

              rounded-xl

              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]

              text-[#031014]

              text-[10px]
              font-bold

              shadow-[0_8px_25px_rgba(24,224,196,0.12)]

              transition-all
              duration-200

              hover:brightness-105
              hover:shadow-[0_10px_30px_rgba(24,224,196,0.2)]

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            <ShoppingCart
              size={14}
              strokeWidth={2.3}
            />

            Purchase Vehicle

          </button>

        </div>

        {/* Small status */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-1.5

            mt-3

            text-[8px]
            text-slate-600
          "
        >
          <CheckCircle2
            size={11}
            className="text-[#22C55E]"
          />

          Ready for purchase processing
        </div>

      </div>

    </article>
  );
}

/* =========================================================
   DETAIL
   ========================================================= */

function Detail({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-lg

        bg-white/[0.02]

        border
        border-white/[0.045]

        px-3
        py-2.5
      "
    >
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.08em]

          text-slate-600
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1

          text-[10px]

          font-semibold

          text-slate-300

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
   SMALL TREND ICON
   ========================================================= */

function TrendingIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8.5L4.5 6L6.2 7.7L10 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7.8 3.5H10V5.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default VehicleCard;
