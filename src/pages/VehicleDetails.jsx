import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  PackageCheck,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  X,
  ZoomIn,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  vehicles,
} from "../data/mockData";


function VehicleDetails() {
  const navigate = useNavigate();

  const { vehicleId } = useParams();

  const vehicle = vehicles.find(
    (item) =>
      item.id === vehicleId
  );

  const [activeImage, setActiveImage] =
    useState(0);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [showGallery, setShowGallery] =
    useState(false);

  const [showTestDrive, setShowTestDrive] =
    useState(false);

  const [showToast, setShowToast] =
    useState(false);

  /* ========================================================
     VEHICLE NOT FOUND
     ======================================================== */

  if (!vehicle) {
    return (
      <NotFound
        navigate={navigate}
      />
    );
  }

  /* ========================================================
     IMAGE GALLERY
     ======================================================== */

  const images = [
    vehicle.image,

    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85",

    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=85",

    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85",
  ];

  const nextImage = () => {
    setActiveImage(
      (current) =>
        (current + 1) %
        images.length
    );
  };

  const previousImage = () => {
    setActiveImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    );
  };

  /* ========================================================
     STOCK
     ======================================================== */

  const isOutOfStock =
    vehicle.stock === 0;

  const isLowStock =
    vehicle.stock > 0 &&
    vehicle.stock <=
      vehicle.reorderLevel;

  /* ========================================================
     AI SCORE
     ======================================================== */

  const demandScore =
    Math.min(
      99,
      72 +
        vehicle.soldUnits * 2
    );

  /* ========================================================
     PURCHASE
     ======================================================== */

  const handlePurchase = () => {
    navigate(
      `/purchase/${vehicle.id}`
    );
  };

  /* ========================================================
     TEST DRIVE
     ======================================================== */

  const handleTestDrive = () => {
    setShowTestDrive(true);
  };

  /* ========================================================
     FAVORITE
     ======================================================== */

  const handleFavorite = () => {
    setIsFavorite(
      (current) => !current
    );

    setShowToast(true);

    setTimeout(
      () => setShowToast(false),
      1800
    );
  };

  return (
    <div className="w-full">
      {/* ====================================================
          BREADCRUMB
          ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -8,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        className="
          flex
          items-center
          gap-2

          mb-5
        "
      >
        <button
          type="button"
          onClick={() =>
            navigate("/inventory")
          }
          className="
            flex
            items-center
            gap-2

            text-[9px]
            font-medium

            text-slate-600

            hover:text-[#18E0C4]

            transition
          "
        >
          <ArrowLeft size={12} />

          Inventory
        </button>

        <span
          className="
            text-slate-800
          "
        >
          /
        </span>

        <span
          className="
            text-[9px]
            text-slate-500
          "
        >
          {vehicle.brand}{" "}
          {vehicle.model}
        </span>
      </motion.div>


      {/* ====================================================
          MAIN HERO
          ==================================================== */}

      <div
        className="
          grid

          grid-cols-1
          xl:grid-cols-[1.2fr_0.8fr]

          gap-4
        "
      >
        {/* ==================================================
            IMAGE GALLERY
            ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            scale: 0.985,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            overflow-hidden

            rounded-2xl

            bg-[#0C1522]

            border
            border-white/[0.055]
          "
        >
          <div
            className="
              relative

              aspect-[16/10]

              overflow-hidden
            "
          >
            <img
              src={images[activeImage]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="
                w-full
                h-full

                object-cover

                transition-opacity
                duration-300
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#050912]/80
                via-transparent
                to-black/10

                pointer-events-none
              "
            />

            {/* Status */}

            <div
              className="
                absolute
                top-4
                left-4
              "
            >
              <StockBadge
                isOutOfStock={
                  isOutOfStock
                }
                isLowStock={
                  isLowStock
                }
              />
            </div>

            {/* Gallery controls */}

            <div
              className="
                absolute
                top-4
                right-4

                flex
                items-center
                gap-2
              "
            >
              <button
                type="button"
                onClick={() =>
                  setShowGallery(true)
                }
                className="
                  flex
                  items-center
                  justify-center

                  w-9
                  h-9

                  rounded-xl

                  bg-black/30

                  backdrop-blur-md

                  border
                  border-white/10

                  text-white/70

                  hover:text-white
                  hover:bg-black/50

                  transition
                "
                aria-label="Expand gallery"
              >
                <ZoomIn size={14} />
              </button>

              <button
                type="button"
                onClick={handleFavorite}
                className={`
                  flex
                  items-center
                  justify-center

                  w-9
                  h-9

                  rounded-xl

                  backdrop-blur-md

                  border

                  transition

                  ${
                    isFavorite
                      ? `
                        bg-[#EF4444]/20
                        border-[#EF4444]/20
                        text-[#FB7185]
                      `
                      : `
                        bg-black/30
                        border-white/10
                        text-white/70
                        hover:text-white
                      `
                  }
                `}
                aria-label="Favorite vehicle"
              >
                <Heart
                  size={14}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* Image arrows */}

            <button
              type="button"
              onClick={previousImage}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                flex
                items-center
                justify-center

                w-9
                h-9

                rounded-full

                bg-black/25

                backdrop-blur-md

                border
                border-white/10

                text-white/70

                hover:text-white
                hover:bg-black/45

                transition
              "
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                flex
                items-center
                justify-center

                w-9
                h-9

                rounded-full

                bg-black/25

                backdrop-blur-md

                border
                border-white/10

                text-white/70

                hover:text-white
                hover:bg-black/45

                transition
              "
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>

            {/* Image count */}

            <div
              className="
                absolute
                bottom-4
                right-4

                px-2.5
                py-1.5

                rounded-lg

                bg-black/35

                backdrop-blur-md

                border
                border-white/10

                text-[8px]
                font-medium

                text-white/70
              "
            >
              {activeImage + 1} /{" "}
              {images.length}
            </div>

            {/* Vehicle overlay */}

            <div
              className="
                absolute
                bottom-5
                left-5
                right-16
              "
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.15em]

                  text-white/45
                "
              >
                {vehicle.year} •{" "}
                {vehicle.category}
              </p>

              <h2
                className="
                  mt-1

                  text-[22px]
                  sm:text-[28px]

                  font-bold
                  tracking-[-0.04em]

                  text-white
                "
              >
                {vehicle.brand}{" "}
                {vehicle.model}
              </h2>

              <p
                className="
                  mt-1

                  text-[9px]

                  text-white/55
                "
              >
                {vehicle.variant}
              </p>
            </div>
          </div>

          {/* =================================================
              THUMBNAILS
              ================================================= */}

          <div
            className="
              grid
              grid-cols-4

              gap-2

              p-3
            "
          >
            {images.map(
              (image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    setActiveImage(index)
                  }
                  className={`
                    relative

                    aspect-[16/9]

                    overflow-hidden

                    rounded-lg

                    border

                    transition

                    ${
                      activeImage === index
                        ? `
                          border-[#18E0C4]/50
                          ring-1
                          ring-[#18E0C4]/20
                        `
                        : `
                          border-white/[0.05]
                          opacity-60
                          hover:opacity-100
                        `
                    }
                  `}
                >
                  <img
                    src={image}
                    alt=""
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  {activeImage ===
                    index && (
                    <div
                      className="
                        absolute
                        inset-0

                        bg-[#18E0C4]/10
                      "
                    />
                  )}
                </button>
              )
            )}
          </div>
        </motion.section>


        {/* ==================================================
            VEHICLE SUMMARY
            ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            x: 12,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
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
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.16em]

                  text-[#18E0C4]
                "
              >
                Vehicle profile
              </span>

              <h1
                className="
                  mt-2

                  text-[25px]

                  font-bold
                  tracking-[-0.045em]

                  text-white
                "
              >
                {vehicle.brand}{" "}
                {vehicle.model}
              </h1>

              <p
                className="
                  mt-1

                  text-[9px]

                  text-slate-500
                "
              >
                {vehicle.variant}
              </p>
            </div>

            <div
              className="
                hidden
                sm:flex

                items-center
                justify-center

                w-10
                h-10

                rounded-xl

                bg-white/[0.025]

                border
                border-white/[0.05]
              "
            >
              <CarFront
                size={16}
                className="text-slate-500"
              />
            </div>
          </div>

          {/* Price */}

          <div
            className="
              flex
              items-end
              justify-between

              gap-4

              mt-7

              pb-5

              border-b
              border-white/[0.05]
            "
          >
            <div>
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.13em]

                  text-slate-600
                "
              >
                Listed price
              </p>

              <p
                className="
                  mt-1

                  text-[30px]

                  leading-none

                  font-bold
                  tracking-[-0.05em]

                  text-white
                "
              >
                ₹
                {(
                  vehicle.price /
                  100000
                ).toFixed(2)}
                L
              </p>

              <p
                className="
                  mt-2

                  text-[8px]

                  text-slate-600
                "
              >
                Ex-showroom price
              </p>
            </div>

            <div
              className="
                text-right
              "
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]

                  text-slate-600
                "
              >
                Stock
              </p>

              <p
                className={`
                  mt-1

                  text-[18px]
                  font-bold

                  ${
                    isOutOfStock
                      ? "text-[#F87171]"
                      : isLowStock
                        ? "text-[#FBBF24]"
                        : "text-[#4ADE80]"
                  }
                `}
              >
                {vehicle.stock}
              </p>

              <p
                className="
                  text-[8px]
                  text-slate-600
                "
              >
                units available
              </p>
            </div>
          </div>

          {/* Specifications */}

          <div
            className="
              grid
              grid-cols-2

              gap-3

              mt-5
            "
          >
            <DetailSpec
              icon={Gauge}
              label="Mileage"
              value={`${vehicle.mileage.toLocaleString()} km`}
            />

            <DetailSpec
              icon={Fuel}
              label="Fuel"
              value={vehicle.fuel}
            />

            <DetailSpec
              icon={Settings2}
              label="Transmission"
              value={vehicle.transmission}
            />

            <DetailSpec
              icon={CarFront}
              label="Body type"
              value={vehicle.category}
            />
          </div>

          {/* Actions */}

          <div
            className="
              grid
              grid-cols-[1fr_auto]

              gap-2

              mt-6
            "
          >
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handlePurchase}
              className="
                flex
                items-center
                justify-center
                gap-2

                h-11

                rounded-xl

                bg-gradient-to-r
                from-[#18E0C4]
                to-[#28D7FF]

                text-[9px]
                font-bold

                text-[#031014]

                hover:brightness-105

                disabled:opacity-40
                disabled:cursor-not-allowed

                transition
              "
            >
              <PackageCheck size={14} />

              {isOutOfStock
                ? "Currently unavailable"
                : "Purchase vehicle"}

              {!isOutOfStock && (
                <ArrowRight size={13} />
              )}
            </button>

            <button
              type="button"
              onClick={handleTestDrive}
              className="
                flex
                items-center
                justify-center

                w-11
                h-11

                rounded-xl

                bg-white/[0.035]

                border
                border-white/[0.06]

                text-slate-400

                hover:text-white
                hover:bg-white/[0.06]

                transition
              "
              aria-label="Book test drive"
            >
              <CalendarDays size={15} />
            </button>
          </div>

          {/* Trust */}

          <div
            className="
              flex
              flex-wrap

              items-center

              gap-x-4
              gap-y-2

              mt-5
            "
          >
            <TrustItem
              icon={ShieldCheck}
              label="Verified vehicle"
            />

            <TrustItem
              icon={Wrench}
              label="150-point inspection"
            />

            <TrustItem
              icon={PackageCheck}
              label="Ready for delivery"
            />
          </div>
        </motion.section>
      </div>


      {/* ====================================================
          ANALYTICS / AI ROW
          ==================================================== */}

      <div
        className="
          grid

          grid-cols-1
          lg:grid-cols-3

          gap-4

          mt-4
        "
      >
        {/* Sales performance */}

        <InfoPanel
          icon={TrendingUp}
          title="Sales performance"
          subtitle="Vehicle demand"
        >
          <div
            className="
              flex
              items-end
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[24px]
                  font-bold

                  text-white
                "
              >
                {vehicle.soldUnits}
              </p>

              <p
                className="
                  mt-1

                  text-[8px]

                  text-slate-600
                "
              >
                units sold this year
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-1

                px-2
                py-1

                rounded-lg

                bg-[#22C55E]/[0.06]

                text-[#4ADE80]
              "
            >
              <ArrowUpRight size={10} />

              <span
                className="
                  text-[8px]
                  font-semibold
                "
              >
                {demandScore}%
              </span>
            </div>
          </div>

          <div
            className="
              h-1.5

              mt-5

              overflow-hidden

              rounded-full

              bg-white/[0.04]
            "
          >
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${demandScore}%`,
              }}
              transition={{
                duration: 0.9,
              }}
              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-[#18E0C4]
                to-[#28D7FF]
              "
            />
          </div>
        </InfoPanel>


        {/* Customer interest */}

        <InfoPanel
          icon={Users}
          title="Customer interest"
          subtitle="Last 30 days"
        >
          <div
            className="
              flex
              items-end
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[24px]
                  font-bold
                  text-white
                "
              >
                {Math.round(
                  vehicle.soldUnits *
                    4.7
                )}
              </p>

              <p
                className="
                  mt-1

                  text-[8px]

                  text-slate-600
                "
              >
                customer interactions
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-1

                text-[#A78BFA]
              "
            >
              <Eye size={11} />

              <span
                className="
                  text-[8px]
                  font-semibold
                "
              >
                High interest
              </span>
            </div>
          </div>

          <div
            className="
              flex
              items-end

              gap-1

              h-12

              mt-4
            "
          >
            {[35, 55, 42, 72, 58, 82, 68, 91, 75, 96, 84, 100].map(
              (height, index) => (
                <div
                  key={index}
                  className="
                    flex-1

                    rounded-t-sm

                    bg-gradient-to-t
                    from-[#8B5CF6]/20
                    to-[#8B5CF6]/70

                    transition
                  "
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}
          </div>
        </InfoPanel>


        {/* AI recommendation */}

        <InfoPanel
          icon={Sparkles}
          title="AI recommendation"
          subtitle="AutoElite Intelligence"
          ai
        >
          <div
            className="
              flex
              items-start
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

                bg-[#8B5CF6]/10

                border
                border-[#8B5CF6]/10

                shrink-0
              "
            >
              <Sparkles
                size={15}
                className="text-[#A78BFA]"
              />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  leading-4

                  font-medium

                  text-slate-300
                "
              >
                {isLowStock
                  ? "Restock this vehicle soon."
                  : "This vehicle has strong market demand."}
              </p>

              <p
                className="
                  mt-1.5

                  text-[8px]
                  leading-4

                  text-slate-600
                "
              >
                Based on sales velocity,
                customer interest and
                current inventory levels.
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              justify-between

              mt-4
              pt-3

              border-t
              border-white/[0.05]
            "
          >
            <span
              className="
                text-[8px]
                text-slate-600
              "
            >
              AI confidence
            </span>

            <span
              className="
                text-[9px]
                font-bold

                text-[#A78BFA]
              "
            >
              94%
            </span>
          </div>
        </InfoPanel>
      </div>


      {/* ====================================================
          DESCRIPTION + SPECIFICATIONS
          ==================================================== */}

      <div
        className="
          grid

          grid-cols-1
          lg:grid-cols-[1.25fr_0.75fr]

          gap-4

          mt-4
        "
      >
        {/* Description */}

        <section
          className="
            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

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
            <CarFront
              size={14}
              className="text-[#18E0C4]"
            />

            <h2
              className="
                text-[11px]
                font-semibold

                text-white
              "
            >
              Vehicle overview
            </h2>
          </div>

          <p
            className="
              mt-4

              text-[10px]
              leading-6

              text-slate-500
            "
          >
            The {vehicle.year}{" "}
            {vehicle.brand}{" "}
            {vehicle.model}{" "}
            {vehicle.variant} combines
            premium design, practical
            performance and advanced
            technology. This vehicle has
            been inspected by our dealership
            team and is ready for the next
            owner.
          </p>

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-4

              gap-3

              mt-5
            "
          >
            <SmallMetric
              label="Year"
              value={vehicle.year}
            />

            <SmallMetric
              label="Mileage"
              value={`${vehicle.mileage.toLocaleString()} km`}
            />

            <SmallMetric
              label="Fuel"
              value={vehicle.fuel}
            />

            <SmallMetric
              label="Transmission"
              value={vehicle.transmission}
            />
          </div>
        </section>


        {/* Location */}

        <section
          className="
            rounded-2xl

            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]

            border
            border-white/[0.055]

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
            <MapPin
              size={14}
              className="text-[#28D7FF]"
            />

            <h2
              className="
                text-[11px]
                font-semibold
                text-white
              "
            >
              Vehicle location
            </h2>
          </div>

          <div
            className="
              mt-4

              rounded-xl

              overflow-hidden

              h-[130px]

              bg-[#07101A]

              border
              border-white/[0.05]
            "
          >
            <div
              className="
                relative

                w-full
                h-full

                opacity-70

                bg-[linear-gradient(rgba(40,215,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(40,215,255,0.04)_1px,transparent_1px)]
                bg-[size:25px_25px]
              "
            >
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2

                  -translate-x-1/2
                  -translate-y-1/2

                  flex
                  items-center
                  justify-center

                  w-8
                  h-8

                  rounded-full

                  bg-[#18E0C4]/10

                  border
                  border-[#18E0C4]/30

                  shadow-[0_0_30px_rgba(24,224,196,0.25)]
                "
              >
                <MapPin
                  size={14}
                  className="text-[#18E0C4]"
                />
              </div>
            </div>
          </div>

          <div className="mt-3">
            <p
              className="
                text-[9px]
                font-semibold
                text-slate-300
              "
            >
              AutoElite Hyderabad
            </p>

            <p
              className="
                mt-1

                text-[8px]
                leading-4

                text-slate-600
              "
            >
              Main dealership showroom
              • Hyderabad, Telangana
            </p>
          </div>
        </section>
      </div>


      {/* ====================================================
          GALLERY MODAL
          ==================================================== */}

      {showGallery && (
        <GalleryModal
          images={images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          onClose={() =>
            setShowGallery(false)
          }
        />
      )}


      {/* ====================================================
          TEST DRIVE MODAL
          ==================================================== */}

      {showTestDrive && (
        <TestDriveModal
          vehicle={vehicle}
          onClose={() =>
            setShowTestDrive(false)
          }
          onSuccess={() => {
            setShowTestDrive(false);
            setShowToast(true);

            setTimeout(
              () => setShowToast(false),
              2200
            );
          }}
        />
      )}


      {/* ====================================================
          TOAST
          ==================================================== */}

      {showToast && (
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

            z-[100]

            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            bg-[#0D1725]

            border
            border-[#18E0C4]/15

            shadow-[0_20px_50px_rgba(0,0,0,0.4)]
          "
        >
          <div
            className="
              flex
              items-center
              justify-center

              w-7
              h-7

              rounded-lg

              bg-[#18E0C4]/10
            "
          >
            <Check
              size={13}
              className="text-[#18E0C4]"
            />
          </div>

          <span
            className="
              text-[9px]
              font-medium

              text-slate-300
            "
          >
            {isFavorite
              ? "Vehicle added to favorites."
              : "Action completed successfully."}
          </span>
        </motion.div>
      )}
    </div>
  );
}


/* ===========================================================
   STOCK BADGE
   =========================================================== */

function StockBadge({
  isOutOfStock,
  isLowStock,
}) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2

        px-2.5
        py-1.5

        rounded-lg

        backdrop-blur-md

        border

        text-[8px]
        font-semibold

        ${
          isOutOfStock
            ? `
              bg-[#EF4444]/15
              border-[#EF4444]/20
              text-[#F87171]
            `
            : isLowStock
              ? `
                bg-[#F59E0B]/15
                border-[#F59E0B]/20
                text-[#FBBF24]
              `
              : `
                bg-[#22C55E]/10
                border-[#22C55E]/15
                text-[#86EFAC]
              `
        }
      `}
    >
      <span
        className={`
          w-1.5
          h-1.5

          rounded-full

          ${
            isOutOfStock
              ? "bg-[#EF4444]"
              : isLowStock
                ? "bg-[#F59E0B]"
                : "bg-[#22C55E]"
          }
        `}
      />

      {isOutOfStock
        ? "Out of stock"
        : isLowStock
          ? "Low stock"
          : "Available"}
    </div>
  );
}


/* ===========================================================
   DETAIL SPEC
   =========================================================== */

function DetailSpec({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        p-3

        rounded-xl

        bg-white/[0.025]

        border
        border-white/[0.045]
      "
    >
      <Icon
        size={13}
        className="text-slate-600"
      />

      <p
        className="
          mt-2

          text-[7px]
          uppercase
          tracking-[0.1em]

          text-slate-700
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1

          truncate

          text-[9px]
          font-semibold

          text-slate-300
        "
      >
        {value}
      </p>
    </div>
  );
}


/* ===========================================================
   TRUST ITEM
   =========================================================== */

function TrustItem({
  icon: Icon,
  label,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
      "
    >
      <Icon
        size={10}
        className="text-[#18E0C4]"
      />

      <span
        className="
          text-[7px]
          text-slate-600
        "
      >
        {label}
      </span>
    </div>
  );
}


/* ===========================================================
   INFO PANEL
   =========================================================== */

function InfoPanel({
  icon: Icon,
  title,
  subtitle,
  children,
  ai = false,
}) {
  return (
    <section
      className={`
        rounded-2xl

        p-4

        border

        ${
          ai
            ? `
              bg-gradient-to-br
              from-[#10152A]
              to-[#09111D]

              border-[#8B5CF6]/10
            `
            : `
              bg-gradient-to-br
              from-[#0D1725]
              to-[#09111D]

              border-white/[0.055]
            `
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-2

          mb-5
        "
      >
        <Icon
          size={13}
          className={
            ai
              ? "text-[#A78BFA]"
              : "text-[#18E0C4]"
          }
        />

        <div>
          <h3
            className="
              text-[10px]
              font-semibold
              text-white
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5

              text-[7px]
              text-slate-600
            "
          >
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}


/* ===========================================================
   SMALL METRIC
   =========================================================== */

function SmallMetric({
  label,
  value,
}) {
  return (
    <div
      className="
        p-3

        rounded-xl

        bg-white/[0.025]

        border
        border-white/[0.045]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.1em]

          text-slate-700
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1

          text-[9px]
          font-semibold

          text-slate-300
        "
      >
        {value}
      </p>
    </div>
  );
}


/* ===========================================================
   GALLERY MODAL
   =========================================================== */

function GalleryModal({
  images,
  activeImage,
  setActiveImage,
  onClose,
}) {
  const next = () =>
    setActiveImage(
      (current) =>
        (current + 1) %
        images.length
    );

  const previous = () =>
    setActiveImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    );

  return (
    <div
      className="
        fixed
        inset-0

        z-[90]

        flex
        items-center
        justify-center

        p-4

        bg-[#02050A]/95

        backdrop-blur-xl
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

          bg-white/[0.05]

          border
          border-white/10

          text-white/70

          hover:text-white
        "
      >
        <X size={17} />
      </button>

      <button
        type="button"
        onClick={previous}
        className="
          absolute
          left-5

          flex
          items-center
          justify-center

          w-11
          h-11

          rounded-full

          bg-white/[0.05]

          border
          border-white/10

          text-white/70
        "
      >
        <ChevronLeft size={18} />
      </button>

      <motion.img
        key={activeImage}
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        src={images[activeImage]}
        alt="Vehicle"
        className="
          max-w-[90vw]
          max-h-[82vh]

          object-contain

          rounded-xl
        "
      />

      <button
        type="button"
        onClick={next}
        className="
          absolute
          right-5

          flex
          items-center
          justify-center

          w-11
          h-11

          rounded-full

          bg-white/[0.05]

          border
          border-white/10

          text-white/70
        "
      >
        <ChevronRight size={18} />
      </button>

      <div
        className="
          absolute
          bottom-5

          flex
          items-center
          gap-2
        "
      >
        {images.map(
          (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setActiveImage(index)
              }
              className={`
                w-1.5
                h-1.5

                rounded-full

                ${
                  activeImage === index
                    ? "bg-[#18E0C4]"
                    : "bg-white/20"
                }
              `}
            />
          )
        )}
      </div>
    </div>
  );
}


/* ===========================================================
   TEST DRIVE MODAL
   =========================================================== */

function TestDriveModal({
  vehicle,
  onClose,
  onSuccess,
}) {
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError(
        "Please enter your name."
      );
      return;
    }

    if (!phone.trim()) {
      setError(
        "Please enter your phone number."
      );
      return;
    }

    if (!date) {
      setError(
        "Please select a date."
      );
      return;
    }

    if (!time) {
      setError(
        "Please select a time."
      );
      return;
    }

    onSuccess();
  };

  return (
    <div
      className="
        fixed
        inset-0

        z-[90]

        flex
        items-center
        justify-center

        p-4

        bg-[#02050A]/80

        backdrop-blur-md
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        className="
          relative

          w-full
          max-w-[440px]

          rounded-2xl

          bg-[#0D1725]

          border
          border-white/[0.08]

          shadow-[0_30px_90px_rgba(0,0,0,0.5)]

          p-5
        "
      >
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            top-4
            right-4

            flex
            items-center
            justify-center

            w-8
            h-8

            rounded-lg

            text-slate-600

            hover:text-white
            hover:bg-white/[0.04]
          "
        >
          <X size={14} />
        </button>

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
            <CalendarDays
              size={17}
              className="text-[#18E0C4]"
            />
          </div>

          <div>
            <h2
              className="
                text-[13px]
                font-semibold

                text-white
              "
            >
              Book a test drive
            </h2>

            <p
              className="
                mt-1

                text-[8px]

                text-slate-600
              "
            >
              {vehicle.brand}{" "}
              {vehicle.model}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            mt-5

            space-y-3
          "
        >
          <input
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
            placeholder="Full name"
            className="auto-input h-10"
          />

          <input
            value={phone}
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
            placeholder="Phone number"
            className="auto-input h-10"
          />

          <div
            className="
              grid
              grid-cols-2

              gap-2
            "
          >
            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(
                  event.target.value
                )
              }
              className="
                auto-input
                h-10
              "
            />

            <input
              type="time"
              value={time}
              onChange={(event) =>
                setTime(
                  event.target.value
                )
              }
              className="
                auto-input
                h-10
              "
            />
          </div>

          {error && (
            <p
              className="
                px-3
                py-2

                rounded-lg

                bg-[#EF4444]/[0.06]

                border
                border-[#EF4444]/10

                text-[8px]

                text-[#FCA5A5]
              "
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="
              w-full
              h-10

              rounded-xl

              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]

              text-[9px]
              font-bold

              text-[#031014]
            "
          >
            Confirm test drive
          </button>
        </form>
      </motion.div>
    </div>
  );
}


/* ===========================================================
   NOT FOUND
   =========================================================== */

function NotFound({
  navigate,
}) {
  return (
    <div
      className="
        min-h-[500px]

        flex
        flex-col
        items-center
        justify-center

        text-center
      "
    >
      <CarFront
        size={35}
        className="text-slate-700"
      />

      <h2
        className="
          mt-4

          text-[16px]
          font-semibold

          text-white
        "
      >
        Vehicle not found
      </h2>

      <p
        className="
          mt-2

          text-[9px]

          text-slate-600
        "
      >
        This vehicle may have been removed
        from inventory.
      </p>

      <button
        type="button"
        onClick={() =>
          navigate("/inventory")
        }
        className="
          flex
          items-center
          gap-2

          mt-5

          h-9
          px-4

          rounded-xl

          bg-[#18E0C4]/10

          border
          border-[#18E0C4]/10

          text-[8px]
          font-semibold

          text-[#18E0C4]
        "
      >
        <ArrowLeft size={11} />

        Back to inventory
      </button>
    </div>
  );
}


export default VehicleDetails;
