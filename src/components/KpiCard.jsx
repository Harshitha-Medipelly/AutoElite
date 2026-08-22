import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { motion } from "framer-motion";

function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel = "vs last month",
  trendDirection = "up",
  iconClass = "text-[#18E0C4]",
  iconBg = "bg-[#18E0C4]/10",
  accent = "teal",
  delay = 0,
}) {
  const isPositive =
    trendDirection === "up";

  const isNegative =
    trendDirection === "down";

  const isNeutral =
    trendDirection === "neutral";

  const TrendIcon = isNeutral
    ? Minus
    : isPositive
      ? ArrowUpRight
      : ArrowDownRight;

  const trendColor = isNeutral
    ? "text-slate-500"
    : isPositive
      ? "text-[#4ADE80]"
      : "text-[#F87171]";

  const glowColor =
    accent === "violet"
      ? "rgba(139,92,246,0.10)"
      : accent === "cyan"
        ? "rgba(40,215,255,0.10)"
        : "rgba(24,224,196,0.10)";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        overflow-hidden

        min-w-0

        rounded-2xl

        border
        border-white/[0.055]

        bg-gradient-to-br
        from-[#0F1928]
        to-[#09111D]

        p-4
        sm:p-5

        shadow-[0_15px_45px_rgba(0,0,0,0.12)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-white/[0.10]
        hover:shadow-[0_20px_55px_rgba(0,0,0,0.22)]
      "
      style={{
        "--card-glow": glowColor,
      }}
    >
      {/* ====================================================
          DECORATIVE GLOW
          ==================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          -top-16
          -right-16

          w-32
          h-32

          rounded-full

          blur-3xl

          opacity-40

          transition-opacity
          duration-300

          group-hover:opacity-70
        "
        style={{
          background:
            "var(--card-glow)",
        }}
      />

      {/* ====================================================
          TOP ROW
          ==================================================== */}

      <div
        className="
          relative

          flex
          items-start
          justify-between

          gap-3
        "
      >
        {/* Icon */}

        <div
          className={`
            flex
            items-center
            justify-center

            w-10
            h-10

            rounded-xl

            border
            border-white/[0.055]

            ${iconBg}

            transition-transform
            duration-300

            group-hover:scale-105
          `}
        >
          {Icon && (
            <Icon
              size={18}
              strokeWidth={1.9}
              className={iconClass}
            />
          )}
        </div>

        {/* Trend */}

        {trend !== undefined &&
          trend !== null && (
            <div
              className={`
                flex
                items-center
                gap-0.5

                px-2
                py-1

                rounded-lg

                bg-white/[0.025]

                border
                border-white/[0.04]

                ${trendColor}
              `}
            >
              <TrendIcon size={11} />

              <span
                className="
                  text-[9px]
                  font-semibold
                "
              >
                {trend}
              </span>
            </div>
          )}
      </div>

      {/* ====================================================
          CONTENT
          ==================================================== */}

      <div
        className="
          relative
          mt-5
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.14em]
            font-semibold
            text-slate-600
          "
        >
          {title}
        </p>

        <div
          className="
            mt-2

            flex
            items-baseline
            gap-2
          "
        >
          <h3
            className="
              text-[25px]
              sm:text-[28px]

              leading-none

              font-bold
              tracking-[-0.045em]

              text-white
            "
          >
            {value}
          </h3>
        </div>

        {subtitle && (
          <p
            className="
              mt-2

              text-[9px]
              leading-4

              text-slate-600
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* ====================================================
          FOOTER
          ==================================================== */}

      {trend !== undefined &&
        trend !== null && (
          <div
            className="
              relative

              mt-4
              pt-3

              border-t
              border-white/[0.045]

              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[8px]
                text-slate-600
              "
            >
              {trendLabel}
            </span>

            <span
              className={`
                text-[8px]
                font-medium
                ${trendColor}
              `}
            >
              {isPositive
                ? "Growing"
                : isNegative
                  ? "Declining"
                  : "Stable"}
            </span>
          </div>
        )}

      {/* ====================================================
          BOTTOM ACCENT
          ==================================================== */}

      <div
        className={`
          absolute
          left-0
          bottom-0

          h-[2px]

          w-0

          rounded-r-full

          transition-all
          duration-500

          group-hover:w-1/3

          ${
            accent === "violet"
              ? "bg-gradient-to-r from-[#8B5CF6] to-transparent"
              : accent === "cyan"
                ? "bg-gradient-to-r from-[#28D7FF] to-transparent"
                : "bg-gradient-to-r from-[#18E0C4] to-transparent"
          }
        `}
      />
    </motion.div>
  );
}

export default KpiCard;
