import {
  CheckCircle2,
  CircleAlert,
  Info,
  X,
  Sparkles,
} from "lucide-react";


/* =========================================================
   TOAST
   ========================================================= */

function Toast({
  type = "success",
  title,
  message,
  onClose,
  action,
  actionLabel = "View",
}) {
  const configurations = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-[#22C55E]",
      iconBackground: "bg-[#22C55E]/[0.08]",
      iconBorder: "border-[#22C55E]/10",
      progress: "bg-[#22C55E]",
    },

    error: {
      icon: CircleAlert,
      iconColor: "text-[#F87171]",
      iconBackground: "bg-[#EF4444]/[0.08]",
      iconBorder: "border-[#EF4444]/10",
      progress: "bg-[#EF4444]",
    },

    warning: {
      icon: CircleAlert,
      iconColor: "text-[#FBBF24]",
      iconBackground: "bg-[#F59E0B]/[0.08]",
      iconBorder: "border-[#F59E0B]/10",
      progress: "bg-[#F59E0B]",
    },

    info: {
      icon: Info,
      iconColor: "text-[#38BDF8]",
      iconBackground: "bg-[#28D7FF]/[0.08]",
      iconBorder: "border-[#28D7FF]/10",
      progress: "bg-[#28D7FF]",
    },

    ai: {
      icon: Sparkles,
      iconColor: "text-[#A78BFA]",
      iconBackground: "bg-[#8B5CF6]/[0.08]",
      iconBorder: "border-[#8B5CF6]/10",
      progress: "bg-[#8B5CF6]",
    },
  };


  const config =
    configurations[type] ||
    configurations.success;


  const Icon =
    config.icon;


  return (
    <div
      className="
        relative

        w-[350px]
        max-w-[calc(100vw-32px)]

        overflow-hidden

        rounded-2xl

        bg-[#0D1725]/95

        backdrop-blur-2xl

        border
        border-white/[0.08]

        shadow-[0_25px_80px_rgba(0,0,0,0.55)]

        animate-[toastIn_0.35s_ease-out]
      "
    >

      {/* ===================================================
          CONTENT
          =================================================== */}

      <div
        className="
          flex

          items-start

          gap-3

          p-4
        "
      >

        {/* Icon */}

        <div
          className={`
            flex
            items-center
            justify-center

            w-9
            h-9

            shrink-0

            rounded-xl

            border

            ${config.iconBackground}
            ${config.iconBorder}
          `}
        >
          <Icon
            size={15}
            className={
              config.iconColor
            }
          />
        </div>


        {/* Message */}

        <div
          className="
            min-w-0

            flex-1
          "
        >

          <div
            className="
              flex

              items-start
              justify-between

              gap-3
            "
          >

            <p
              className="
                text-[9px]

                font-semibold

                leading-4

                text-white
              "
            >
              {title ||
                getDefaultTitle(
                  type
                )}
            </p>


            <button
              type="button"
              onClick={onClose}
              className="
                flex
                items-center
                justify-center

                w-6
                h-6

                shrink-0

                -mt-1

                -mr-1

                rounded-lg

                text-slate-700

                hover:text-slate-300

                hover:bg-white/[0.04]

                transition
              "
              aria-label="Close notification"
            >
              <X
                size={12}
              />
            </button>

          </div>


          {message && (
            <p
              className="
                mt-1

                text-[7px]

                leading-4

                text-slate-500
              "
            >
              {message}
            </p>
          )}


          {/* Action */}

          {action && (
            <button
              type="button"
              onClick={
                action
              }
              className={`
                mt-2

                text-[7px]

                font-semibold

                ${config.iconColor}

                hover:brightness-125

                transition
              `}
            >
              {actionLabel}
              {" →"}
            </button>
          )}

        </div>

      </div>


      {/* ===================================================
          PROGRESS BAR
          =================================================== */}

      <div
        className="
          absolute

          bottom-0
          left-0

          w-full
          h-[2px]

          bg-white/[0.03]
        "
      >

        <div
          className={`
            h-full

            w-full

            origin-left

            ${config.progress}

            animate-[toastProgress_4s_linear_forwards]
          `}
        />

      </div>

    </div>
  );
}


/* =========================================================
   DEFAULT TITLES
   ========================================================= */

function getDefaultTitle(
  type
) {
  switch (type) {
    case "success":
      return "Action completed";

    case "error":
      return "Something went wrong";

    case "warning":
      return "Attention required";

    case "info":
      return "Information";

    case "ai":
      return "AI Insight";

    default:
      return "Notification";
  }
}


/* =========================================================
   TOAST CONTAINER
   ========================================================= */

export function ToastContainer({
  toasts = [],
  removeToast,
}) {
  if (!toasts.length) {
    return null;
  }


  return (
    <div
      className="
        fixed

        top-5
        right-5

        z-[200]

        flex
        flex-col

        gap-3
      "
    >

      {toasts.map(
        (toast) => (
          <Toast
            key={
              toast.id
            }
            {...toast}
            onClose={() =>
              removeToast(
                toast.id
              )
            }
          />
        )
      )}

    </div>
  );
}


/* =========================================================
   TOAST HOOK
   ========================================================= */

export function useToast() {
  const [
    toasts,
    setToasts,
  ] = React.useState([]);


  const removeToast =
    React.useCallback(
      (id) => {
        setToasts(
          (current) =>
            current.filter(
              (toast) =>
                toast.id !==
                id
            )
        );
      },
      []
    );


  const showToast =
    React.useCallback(
      ({
        type = "success",
        title,
        message,
        action,
        actionLabel,
        duration = 4000,
      }) => {
        const id =
          `${Date.now()}-${Math.random()}`;


        setToasts(
          (current) => [
            ...current,
            {
              id,
              type,
              title,
              message,
              action,
              actionLabel,
            },
          ]
        );


        if (
          duration !==
          Infinity
        ) {
          setTimeout(
            () =>
              removeToast(
                id
              ),
            duration
          );
        }


        return id;
      },
      [removeToast]
    );


  return {
    toasts,
    showToast,
    removeToast,
  };
}


export default Toast;
