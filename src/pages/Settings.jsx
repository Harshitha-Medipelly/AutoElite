import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  Cloud,
  Database,
  Globe2,
  KeyRound,
  Laptop,
  LockKeyhole,
  Mail,
  MapPin,
  Palette,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserCog,
  UserPlus,
  Users,
  Webhook,
  X,
  Zap,
  CarFront,
  Clock3,
  WalletCards,
  FileText,
} from "lucide-react";

/* ============================================================
   INITIAL DATA
   ============================================================ */

const initialUsers = [
  {
    id: "USR-001",
    name: "Arjun Mehta",
    email: "arjun@autodrive.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Just now",
    initials: "AM",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya@autodrive.com",
    role: "Sales Manager",
    status: "Active",
    lastActive: "8 min ago",
    initials: "PS",
  },
  {
    id: "USR-003",
    name: "Rahul Verma",
    email: "rahul@autodrive.com",
    role: "Inventory Manager",
    status: "Active",
    lastActive: "21 min ago",
    initials: "RV",
  },
  {
    id: "USR-004",
    name: "Ananya Rao",
    email: "ananya@autodrive.com",
    role: "Sales Executive",
    status: "Active",
    lastActive: "1 hr ago",
    initials: "AR",
  },
];

const initialIntegrations = [
  {
    id: "crm",
    name: "CRM Sync",
    description:
      "Synchronize customer leads, activities and sales pipeline.",
    icon: Users,
    connected: true,
    category: "Customer",
  },
  {
    id: "finance",
    name: "Finance Gateway",
    description:
      "Sync payments, financing approvals and transaction data.",
    icon: Database,
    connected: true,
    category: "Finance",
  },
  {
    id: "maps",
    name: "Maps & Location",
    description:
      "Vehicle locations, dealerships and customer proximity.",
    icon: MapPin,
    connected: false,
    category: "Location",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description:
      "Send real-time dealership events to external systems.",
    icon: Webhook,
    connected: false,
    category: "Developer",
  },
];

const settingsSections = [
  {
    id: "general",
    label: "General",
    description: "Dealership and account preferences",
    icon: Globe2,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and communication preferences",
    icon: Bell,
  },
  {
    id: "team",
    label: "Team & Access",
    description: "Users, roles and permissions",
    icon: Users,
  },
  {
    id: "security",
    label: "Security",
    description: "Authentication and account security",
    icon: ShieldCheck,
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connected applications and services",
    icon: Zap,
  },
  {
    id: "data",
    label: "Data & Privacy",
    description: "Data retention and privacy settings",
    icon: Database,
  },
];

/* ============================================================
   MAIN SETTINGS
   ============================================================ */

function Settings() {
  const [activeSection, setActiveSection] = useState("general");

  const [users, setUsers] = useState(initialUsers);

  const [integrations, setIntegrations] = useState(
    initialIntegrations
  );

  const [showAddUser, setShowAddUser] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [toast, setToast] = useState("");

  const [hasChanges, setHasChanges] = useState(false);

  const [profile, setProfile] = useState({
    dealershipName: "AutoDrive Motors",
    legalName: "AutoDrive Motors Private Limited",
    email: "admin@autodrive.com",
    phone: "+91 98765 43210",
    address: "Road No. 36, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    timezone: "Asia/Kolkata",
    currency: "INR — Indian Rupee",
    language: "English",
  });

  const [appearance, setAppearance] = useState({
    compactMode: false,
    animations: true,
    glassEffects: true,
  });

  const [notifications, setNotifications] = useState({
    newLead: true,
    saleCompleted: true,
    lowInventory: true,
    overdueService: false,
    financeApproval: true,
    dailySummary: true,
    weeklyReport: true,
    email: true,
    browser: true,
    mobile: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30 minutes",
    loginAlerts: true,
    trustedDevices: true,
  });

  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    analyticsTracking: true,
    dataRetention: "7 years",
    anonymizeExports: false,
  });

  const activeSectionData = useMemo(
    () =>
      settingsSections.find(
        (section) => section.id === activeSection
      ),
    [activeSection]
  );

  /* ==========================================================
     TOAST
     ========================================================== */

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(
      showToast.timeoutId
    );

    showToast.timeoutId = window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ==========================================================
     PROFILE
     ========================================================== */

  const updateProfile = (key, value) => {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));

    setHasChanges(true);
  };

  /* ==========================================================
     SAVE / RESET
     ========================================================== */

  const saveChanges = () => {
    setHasChanges(false);
    showToast("Settings saved successfully.");
  };

  const resetChanges = () => {
    setHasChanges(false);
    showToast("Changes have been reset.");
  };

  /* ==========================================================
     INTEGRATIONS
     ========================================================== */

  const toggleIntegration = (id) => {
    const selected = integrations.find(
      (item) => item.id === id
    );

    if (!selected) return;

    setIntegrations((current) =>
      current.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              connected: !integration.connected,
            }
          : integration
      )
    );

    setHasChanges(true);

    showToast(
      selected.connected
        ? `${selected.name} disconnected.`
        : `${selected.name} connected successfully.`
    );
  };

  /* ==========================================================
     USERS
     ========================================================== */

  const addUser = (user) => {
    const initials = user.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setUsers((current) => [
      ...current,
      {
        ...user,
        id: `USR-${String(
          current.length + 1
        ).padStart(3, "0")}`,
        status: "Active",
        lastActive: "Invited just now",
        initials,
      },
    ]);

    setShowAddUser(false);
    setHasChanges(true);

    showToast("User invitation sent.");
  };

  const removeUser = (id) => {
    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );

    setHasChanges(true);
    showToast("User removed.");
  };

  /* ==========================================================
     DELETE
     ========================================================== */

  const deleteAccount = () => {
    setShowDelete(false);
    showToast(
      "Deletion request submitted."
    );
  };

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div className="w-full pb-8">

      {/* ======================================================
          HEADER
          ====================================================== */}

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
          duration: 0.4,
        }}
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-5
          mb-7
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#18E0C4]
                shadow-[0_0_12px_rgba(24,224,196,0.8)]
              "
            />

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.18em]
                font-semibold
                text-[#18E0C4]
              "
            >
              Control Center
            </span>
          </div>

          <h1
            className="
              mt-2
              text-[30px]
              sm:text-[34px]
              lg:text-[38px]
              leading-tight
              font-bold
              tracking-[-0.04em]
              text-white
            "
          >
            Settings
          </h1>

          <p
            className="
              mt-2
              max-w-[680px]
              text-[14px]
              sm:text-[15px]
              leading-6
              text-slate-500
            "
          >
            Configure your dealership, team,
            security and platform preferences.
          </p>
        </div>

        {hasChanges && (
          <div
            className="
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-[#FBBF24]/[0.06]
              border
              border-[#FBBF24]/15
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#FBBF24]
              "
            />

            <span
              className="
                text-[12px]
                font-semibold
                text-[#FCD34D]
              "
            >
              Unsaved changes
            </span>
          </div>
        )}
      </motion.div>

      {/* ======================================================
          MAIN SETTINGS GRID
          ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[270px_minmax(0,1fr)]
          gap-5
        "
      >

        {/* ====================================================
            SETTINGS NAVIGATION
            ==================================================== */}

        <aside
          className="
            h-fit
            rounded-2xl
            bg-gradient-to-br
            from-[#0D1725]
            to-[#09111D]
            border
            border-white/[0.07]
            p-3
          "
        >
          <div className="px-3 pt-2 pb-3">
            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.14em]
                font-semibold
                text-slate-600
              "
            >
              Settings
            </p>
          </div>

          <nav className="space-y-1.5">
            {settingsSections.map(
              (section) => {
                const Icon = section.icon;

                const active =
                  activeSection ===
                  section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        section.id
                      )
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      text-left
                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-[#18E0C4]/[0.08]
                            border
                            border-[#18E0C4]/15
                          `
                          : `
                            border
                            border-transparent
                            hover:bg-white/[0.035]
                            hover:border-white/[0.05]
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-xl
                        shrink-0

                        ${
                          active
                            ? "bg-[#18E0C4]/10"
                            : "bg-white/[0.035]"
                        }
                      `}
                    >
                      <Icon
                        size={17}
                        className={
                          active
                            ? "text-[#18E0C4]"
                            : "text-slate-500"
                        }
                      />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`
                          text-[13px]
                          font-semibold

                          ${
                            active
                              ? "text-white"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {section.label}
                      </p>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[11px]
                          leading-4
                          text-slate-600
                        "
                      >
                        {section.description}
                      </p>
                    </div>
                  </button>
                );
              }
            )}
          </nav>

          <div
            className="
              mt-4
              pt-4
              px-3
              pb-2
              border-t
              border-white/[0.05]
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-slate-600
              "
            >
              Platform
            </p>

            <p
              className="
                mt-1.5
                text-[12px]
                font-medium
                text-slate-500
              "
            >
              AutoDrive v2.4.0
            </p>
          </div>
        </aside>

        {/* ====================================================
            CONTENT
            ==================================================== */}

        <main className="min-w-0">

          <div
            className="
              flex
              items-center
              justify-between
              mb-5
            "
          >
            <div>
              <h2
                className="
                  text-[20px]
                  sm:text-[22px]
                  font-bold
                  text-white
                "
              >
                {activeSectionData?.label}
              </h2>

              <p
                className="
                  mt-1.5
                  text-[13px]
                  sm:text-[14px]
                  text-slate-500
                "
              >
                {activeSectionData?.description}
              </p>
            </div>
          </div>

          {/* GENERAL */}

          {activeSection === "general" && (
            <GeneralSettings
              profile={profile}
              updateProfile={updateProfile}
              appearance={appearance}
              setAppearance={(value) => {
                setAppearance(value);
                setHasChanges(true);
              }}
            />
          )}

          {/* NOTIFICATIONS */}

          {activeSection ===
            "notifications" && (
            <NotificationSettings
              notifications={notifications}
              setNotifications={(value) => {
                setNotifications(value);
                setHasChanges(true);
              }}
            />
          )}

          {/* TEAM */}

          {activeSection === "team" && (
            <TeamSettings
              users={users}
              onAdd={() =>
                setShowAddUser(true)
              }
              onRemove={removeUser}
            />
          )}

          {/* SECURITY */}

          {activeSection === "security" && (
            <SecuritySettings
              security={security}
              setSecurity={(value) => {
                setSecurity(value);
                setHasChanges(true);
              }}
              onPasswordChange={() =>
                showToast(
                  "Password change flow opened."
                )
              }
            />
          )}

          {/* INTEGRATIONS */}

          {activeSection ===
            "integrations" && (
            <IntegrationSettings
              integrations={integrations}
              onToggle={toggleIntegration}
            />
          )}

          {/* DATA */}

          {activeSection === "data" && (
            <DataSettings
              dataSettings={dataSettings}
              setDataSettings={(value) => {
                setDataSettings(value);
                setHasChanges(true);
              }}
              onDelete={() =>
                setShowDelete(true)
              }
              onExport={() =>
                showToast(
                  "Data export prepared successfully."
                )
              }
            />
          )}

          {/* ==================================================
              ACTION BAR
              ================================================== */}

          <div
            className="
              sticky
              bottom-4
              z-30
              mt-6
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
              p-4
              rounded-2xl
              bg-[#0D1725]/95
              border
              border-white/[0.08]
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.4)]
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
                  bg-[#18E0C4]/[0.07]
                  border
                  border-[#18E0C4]/10
                "
              >
                <ShieldCheck
                  size={17}
                  className="text-[#18E0C4]"
                />
              </div>

              <div>
                <p
                  className="
                    text-[13px]
                    font-semibold
                    text-slate-300
                  "
                >
                  Settings are protected
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-600
                  "
                >
                  Your preferences are stored securely.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                gap-2
              "
            >
              <button
                type="button"
                onClick={resetChanges}
                className="
                  h-10
                  px-5
                  rounded-xl
                  bg-white/[0.025]
                  border
                  border-white/[0.07]
                  text-[12px]
                  font-semibold
                  text-slate-400
                  hover:text-white
                  hover:bg-white/[0.05]
                  transition
                "
              >
                Reset
              </button>

              <button
                type="button"
                onClick={saveChanges}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  h-10
                  px-6
                  rounded-xl
                  bg-gradient-to-r
                  from-[#18E0C4]
                  to-[#28D7FF]
                  text-[12px]
                  font-bold
                  text-[#031014]
                  shadow-[0_8px_25px_rgba(24,224,196,0.12)]
                  hover:brightness-105
                  transition
                "
              >
                <Save size={15} />
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================
          ADD USER MODAL
          ====================================================== */}

      <AnimatePresence>
        {showAddUser && (
          <AddUserModal
            onClose={() =>
              setShowAddUser(false)
            }
            onAdd={addUser}
          />
        )}
      </AnimatePresence>

      {/* ======================================================
          DELETE MODAL
          ====================================================== */}

      <AnimatePresence>
        {showDelete && (
          <DeleteModal
            onClose={() =>
              setShowDelete(false)
            }
            onConfirm={deleteAccount}
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
            className="
              fixed
              right-5
              bottom-5
              z-[200]
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-2xl
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
                w-9
                h-9
                rounded-xl
                bg-[#18E0C4]/10
              "
            >
              <Check
                size={17}
                className="text-[#18E0C4]"
              />
            </div>

            <span
              className="
                text-[13px]
                font-semibold
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

/* ============================================================
   GENERAL SETTINGS
   ============================================================ */

function GeneralSettings({
  profile,
  updateProfile,
  appearance,
  setAppearance,
}) {
  return (
    <div className="space-y-5">

      <SettingsCard
        icon={Globe2}
        title="Dealership Profile"
        description="Information displayed across your AutoDrive workspace."
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >
          <SettingsInput
            label="Dealership Name"
            value={profile.dealershipName}
            onChange={(value) =>
              updateProfile(
                "dealershipName",
                value
              )
            }
          />

          <SettingsInput
            label="Legal Business Name"
            value={profile.legalName}
            onChange={(value) =>
              updateProfile(
                "legalName",
                value
              )
            }
          />

          <SettingsInput
            label="Business Email"
            value={profile.email}
            onChange={(value) =>
              updateProfile(
                "email",
                value
              )
            }
            icon={Mail}
            type="email"
          />

          <SettingsInput
            label="Phone Number"
            value={profile.phone}
            onChange={(value) =>
              updateProfile(
                "phone",
                value
              )
            }
            icon={Smartphone}
          />

          <SettingsInput
            label="Address"
            value={profile.address}
            onChange={(value) =>
              updateProfile(
                "address",
                value
              )
            }
            icon={MapPin}
          />

          <SettingsInput
            label="City"
            value={profile.city}
            onChange={(value) =>
              updateProfile(
                "city",
                value
              )
            }
          />

          <SettingsInput
            label="State"
            value={profile.state}
            onChange={(value) =>
              updateProfile(
                "state",
                value
              )
            }
          />

          <SettingsInput
            label="Country"
            value={profile.country}
            onChange={(value) =>
              updateProfile(
                "country",
                value
              )
            }
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Globe2}
        title="Regional Preferences"
        description="Control how dates, currencies and time are displayed."
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          "
        >
          <SettingsSelect
            label="Timezone"
            value={profile.timezone}
            onChange={(value) =>
              updateProfile(
                "timezone",
                value
              )
            }
            options={[
              "Asia/Kolkata",
              "Asia/Dubai",
              "Europe/London",
              "America/New_York",
            ]}
          />

          <SettingsSelect
            label="Currency"
            value={profile.currency}
            onChange={(value) =>
              updateProfile(
                "currency",
                value
              )
            }
            options={[
              "INR — Indian Rupee",
              "USD — US Dollar",
              "AED — UAE Dirham",
              "EUR — Euro",
            ]}
          />

          <SettingsSelect
            label="Language"
            value={profile.language}
            onChange={(value) =>
              updateProfile(
                "language",
                value
              )
            }
            options={[
              "English",
              "Telugu",
              "Hindi",
            ]}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Palette}
        title="Appearance"
        description="Personalize the AutoDrive workspace experience."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ToggleRow
            icon={Laptop}
            title="Compact Mode"
            description="Reduce spacing throughout the dashboard."
            checked={appearance.compactMode}
            onChange={(checked) =>
              setAppearance({
                ...appearance,
                compactMode: checked,
              })
            }
          />

          <ToggleRow
            icon={Activity}
            title="Animations"
            description="Enable smooth interface transitions."
            checked={appearance.animations}
            onChange={(checked) =>
              setAppearance({
                ...appearance,
                animations: checked,
              })
            }
          />

          <ToggleRow
            icon={Cloud}
            title="Glass Effects"
            description="Use subtle translucent surfaces."
            checked={appearance.glassEffects}
            onChange={(checked) =>
              setAppearance({
                ...appearance,
                glassEffects: checked,
              })
            }
          />
        </div>
      </SettingsCard>
    </div>
  );
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */

function NotificationSettings({
  notifications,
  setNotifications,
}) {
  const update = (key, value) => {
    setNotifications({
      ...notifications,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">

      <SettingsCard
        icon={Bell}
        title="Operational Alerts"
        description="Choose which dealership events should trigger notifications."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <ToggleRow
            icon={UserPlus}
            title="New Lead"
            description="Notify when a new customer lead arrives."
            checked={notifications.newLead}
            onChange={(value) =>
              update("newLead", value)
            }
          />

          <ToggleRow
            icon={Check}
            title="Sale Completed"
            description="Notify when a vehicle sale is completed."
            checked={notifications.saleCompleted}
            onChange={(value) =>
              update(
                "saleCompleted",
                value
              )
            }
          />

          <ToggleRow
            icon={CarFront}
            title="Low Inventory"
            description="Alert when stock reaches a critical threshold."
            checked={notifications.lowInventory}
            onChange={(value) =>
              update(
                "lowInventory",
                value
              )
            }
          />

          <ToggleRow
            icon={Clock3}
            title="Overdue Service"
            description="Notify about delayed customer service events."
            checked={notifications.overdueService}
            onChange={(value) =>
              update(
                "overdueService",
                value
              )
            }
          />

          <ToggleRow
            icon={WalletCards}
            title="Finance Approval"
            description="Notify when a financing request is approved."
            checked={notifications.financeApproval}
            onChange={(value) =>
              update(
                "financeApproval",
                value
              )
            }
          />

          <ToggleRow
            icon={FileText}
            title="Daily Summary"
            description="Receive a daily dealership performance digest."
            checked={notifications.dailySummary}
            onChange={(value) =>
              update(
                "dailySummary",
                value
              )
            }
          />

          <ToggleRow
            icon={FileText}
            title="Weekly Report"
            description="Receive the dealership weekly performance report."
            checked={notifications.weeklyReport}
            onChange={(value) =>
              update(
                "weeklyReport",
                value
              )
            }
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Mail}
        title="Communication Channels"
        description="Select where AutoDrive should deliver alerts."
      >
        <div className="space-y-3">

          <ToggleRow
            icon={Mail}
            title="Email Notifications"
            description="Receive important alerts at your account email."
            checked={notifications.email}
            onChange={(value) =>
              update("email", value)
            }
          />

          <ToggleRow
            icon={Laptop}
            title="Browser Notifications"
            description="Show alerts directly in your browser."
            checked={notifications.browser}
            onChange={(value) =>
              update(
                "browser",
                value
              )
            }
          />

          <ToggleRow
            icon={Smartphone}
            title="Mobile Notifications"
            description="Push dealership alerts to the mobile application."
            checked={notifications.mobile}
            onChange={(value) =>
              update(
                "mobile",
                value
              )
            }
          />
        </div>
      </SettingsCard>
    </div>
  );
}

/* ============================================================
   TEAM
   ============================================================ */

function TeamSettings({
  users,
  onAdd,
  onRemove,
}) {
  return (
    <SettingsCard
      icon={Users}
      title="Team & Access"
      description="Manage people who have access to your dealership workspace."
      action={
        <button
          type="button"
          onClick={onAdd}
          className="
            flex
            items-center
            gap-2
            h-10
            px-4
            rounded-xl
            bg-[#18E0C4]/[0.07]
            border
            border-[#18E0C4]/15
            text-[12px]
            font-semibold
            text-[#18E0C4]
            hover:bg-[#18E0C4]/[0.12]
            transition
          "
        >
          <Plus size={15} />
          Add User
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">

          <thead>
            <tr className="border-b border-white/[0.06]">

              <TeamHead>
                User
              </TeamHead>

              <TeamHead>
                Role
              </TeamHead>

              <TeamHead>
                Status
              </TeamHead>

              <TeamHead>
                Last Active
              </TeamHead>

              <TeamHead>
                Action
              </TeamHead>

            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="
                  border-b
                  border-white/[0.04]
                  last:border-0
                "
              >
                <td className="py-4 pr-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        bg-[#18E0C4]/[0.07]
                        border
                        border-[#18E0C4]/10
                        text-[12px]
                        font-bold
                        text-[#18E0C4]
                      "
                    >
                      {user.initials}
                    </div>

                    <div>
                      <p
                        className="
                          text-[13px]
                          font-semibold
                          text-slate-200
                        "
                      >
                        {user.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          text-slate-600
                        "
                      >
                        {user.email}
                      </p>
                    </div>

                  </div>

                </td>

                <td className="py-4 pr-4">
                  <span
                    className="
                      text-[12px]
                      font-medium
                      text-slate-400
                    "
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-4 pr-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[12px]
                      font-medium
                      text-[#86EFAC]
                    "
                  >
                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-[#22C55E]
                      "
                    />
                    {user.status}
                  </span>
                </td>

                <td className="py-4 pr-4">
                  <span
                    className="
                      text-[12px]
                      text-slate-500
                    "
                  >
                    {user.lastActive}
                  </span>
                </td>

                <td className="py-4">

                  <button
                    type="button"
                    onClick={() =>
                      onRemove(user.id)
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-lg
                      text-slate-600
                      hover:text-[#FCA5A5]
                      hover:bg-[#EF4444]/[0.07]
                      transition
                    "
                    title="Remove user"
                  >
                    <Trash2 size={15} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="
          flex
          items-center
          gap-3
          mt-5
          pt-5
          border-t
          border-white/[0.05]
        "
      >
        <ShieldCheck
          size={17}
          className="text-[#18E0C4]"
        />

        <span
          className="
            text-[12px]
            text-slate-500
          "
        >
          Role-based access control is enabled
          for this workspace.
        </span>
      </div>
    </SettingsCard>
  );
}

/* ============================================================
   SECURITY
   ============================================================ */

function SecuritySettings({
  security,
  setSecurity,
  onPasswordChange,
}) {
  return (
    <div className="space-y-5">

      <SettingsCard
        icon={ShieldCheck}
        title="Authentication"
        description="Protect your AutoDrive account with additional security controls."
      >
        <div className="space-y-3">

          <ToggleRow
            icon={KeyRound}
            title="Two-Factor Authentication"
            description="Require an additional verification code when signing in."
            checked={security.twoFactor}
            onChange={(value) =>
              setSecurity({
                ...security,
                twoFactor: value,
              })
            }
          />

          <ToggleRow
            icon={Bell}
            title="Login Alerts"
            description="Notify administrators about new sign-in activity."
            checked={security.loginAlerts}
            onChange={(value) =>
              setSecurity({
                ...security,
                loginAlerts: value,
              })
            }
          />

          <ToggleRow
            icon={Laptop}
            title="Trusted Devices"
            description="Remember verified devices for future sessions."
            checked={security.trustedDevices}
            onChange={(value) =>
              setSecurity({
                ...security,
                trustedDevices: value,
              })
            }
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={LockKeyhole}
        title="Session Security"
        description="Control how long inactive sessions remain authenticated."
      >
        <SettingsSelect
          label="Automatic Session Timeout"
          value={security.sessionTimeout}
          onChange={(value) =>
            setSecurity({
              ...security,
              sessionTimeout: value,
            })
          }
          options={[
            "15 minutes",
            "30 minutes",
            "1 hour",
            "4 hours",
            "Never",
          ]}
        />
      </SettingsCard>

      <SettingsCard
        icon={RefreshCw}
        title="Password"
        description="Keep your account credentials secure."
        action={
          <button
            type="button"
            onClick={onPasswordChange}
            className="
              h-10
              px-4
              rounded-xl
              bg-white/[0.03]
              border
              border-white/[0.07]
              text-[12px]
              font-semibold
              text-slate-400
              hover:text-white
              hover:bg-white/[0.06]
              transition
            "
          >
            Change Password
          </button>
        }
      >
        <div
          className="
            p-4
            rounded-xl
            bg-[#22C55E]/[0.04]
            border
            border-[#22C55E]/[0.10]
          "
        >
          <div className="flex items-center gap-3">

            <Check
              size={17}
              className="text-[#4ADE80]"
            />

            <span
              className="
                text-[13px]
                font-semibold
                text-[#86EFAC]
              "
            >
              Your account is protected.
            </span>

          </div>

          <p
            className="
              mt-2
              text-[12px]
              leading-5
              text-slate-500
            "
          >
            Strong password and two-factor
            authentication are currently enabled.
          </p>
        </div>
      </SettingsCard>
    </div>
  );
}

/* ============================================================
   INTEGRATIONS
   ============================================================ */

function IntegrationSettings({
  integrations,
  onToggle,
}) {
  return (
    <SettingsCard
      icon={Zap}
      title="Integrations"
      description="Connect AutoDrive with the systems your dealership already uses."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {integrations.map(
          (integration) => {
            const Icon = integration.icon;

            return (
              <div
                key={integration.id}
                className="
                  p-5
                  rounded-2xl
                  bg-white/[0.018]
                  border
                  border-white/[0.06]
                  hover:border-white/[0.10]
                  transition
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
                      items-center
                      justify-center
                      w-11
                      h-11
                      rounded-xl
                      bg-[#18E0C4]/[0.06]
                      border
                      border-[#18E0C4]/10
                    "
                  >
                    <Icon
                      size={20}
                      className="text-[#18E0C4]"
                    />
                  </div>

                  <span
                    className={`
                      px-2.5
                      py-1.5
                      rounded-lg
                      text-[10px]
                      font-semibold

                      ${
                        integration.connected
                          ? `
                            bg-[#22C55E]/[0.06]
                            text-[#86EFAC]
                          `
                          : `
                            bg-white/[0.04]
                            text-slate-500
                          `
                      }
                    `}
                  >
                    {integration.connected
                      ? "Connected"
                      : "Not connected"}
                  </span>
                </div>

                <h3
                  className="
                    mt-5
                    text-[15px]
                    font-semibold
                    text-white
                  "
                >
                  {integration.name}
                </h3>

                <p
                  className="
                    mt-2
                    min-h-[48px]
                    text-[12px]
                    leading-5
                    text-slate-500
                  "
                >
                  {integration.description}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    onToggle(
                      integration.id
                    )
                  }
                  className={`
                    w-full
                    h-10
                    mt-5
                    rounded-xl
                    border
                    text-[12px]
                    font-semibold
                    transition

                    ${
                      integration.connected
                        ? `
                          bg-white/[0.025]
                          border-white/[0.07]
                          text-slate-400
                          hover:text-white
                          hover:bg-white/[0.05]
                        `
                        : `
                          bg-[#18E0C4]/[0.07]
                          border-[#18E0C4]/15
                          text-[#18E0C4]
                          hover:bg-[#18E0C4]/[0.12]
                        `
                    }
                  `}
                >
                  {integration.connected
                    ? "Disconnect"
                    : "Connect"}
                </button>
              </div>
            );
          }
        )}
      </div>
    </SettingsCard>
  );
}

/* ============================================================
   DATA SETTINGS
   ============================================================ */

function DataSettings({
  dataSettings,
  setDataSettings,
  onDelete,
  onExport,
}) {
  return (
    <div className="space-y-5">

      <SettingsCard
        icon={Database}
        title="Data Management"
        description="Control backup, retention and analytics preferences."
      >
        <div className="space-y-3">

          <ToggleRow
            icon={Cloud}
            title="Automatic Backups"
            description="Create encrypted backups of dealership data."
            checked={
              dataSettings.autoBackup
            }
            onChange={(value) =>
              setDataSettings({
                ...dataSettings,
                autoBackup: value,
              })
            }
          />

          <ToggleRow
            icon={Activity}
            title="Product Analytics"
            description="Help improve the platform using anonymous usage analytics."
            checked={
              dataSettings.analyticsTracking
            }
            onChange={(value) =>
              setDataSettings({
                ...dataSettings,
                analyticsTracking: value,
              })
            }
          />

          <ToggleRow
            icon={ShieldCheck}
            title="Anonymize Exports"
            description="Automatically hide sensitive customer information in exports."
            checked={
              dataSettings.anonymizeExports
            }
            onChange={(value) =>
              setDataSettings({
                ...dataSettings,
                anonymizeExports: value,
              })
            }
          />
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Clock3}
        title="Data Retention"
        description="Choose how long operational records should remain available."
      >
        <SettingsSelect
          label="Retention Period"
          value={
            dataSettings.dataRetention
          }
          onChange={(value) =>
            setDataSettings({
              ...dataSettings,
              dataRetention: value,
            })
          }
          options={[
            "1 year",
            "3 years",
            "5 years",
            "7 years",
            "Indefinitely",
          ]}
        />
      </SettingsCard>

      <SettingsCard
        icon={Database}
        title="Export Data"
        description="Download a copy of your dealership information."
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            p-5
            rounded-xl
            bg-white/[0.018]
            border
            border-white/[0.05]
          "
        >
          <div>
            <p
              className="
                text-[14px]
                font-semibold
                text-slate-200
              "
            >
              Export dealership data
            </p>

            <p
              className="
                mt-1
                text-[12px]
                leading-5
                text-slate-500
              "
            >
              Generate a secure export of your
              current workspace data.
            </p>
          </div>

          <button
            type="button"
            onClick={onExport}
            className="
              h-10
              px-5
              shrink-0
              rounded-xl
              bg-white/[0.035]
              border
              border-white/[0.07]
              text-[12px]
              font-semibold
              text-slate-300
              hover:bg-white/[0.06]
              hover:text-white
              transition
            "
          >
            Export Data
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={Trash2}
        title="Danger Zone"
        description="Irreversible actions affecting your dealership workspace."
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            p-5
            rounded-xl
            bg-[#EF4444]/[0.025]
            border
            border-[#EF4444]/10
          "
        >
          <div>
            <p
              className="
                text-[14px]
                font-semibold
                text-[#FCA5A5]
              "
            >
              Delete dealership workspace
            </p>

            <p
              className="
                mt-1.5
                max-w-[600px]
                text-[12px]
                leading-5
                text-slate-500
              "
            >
              Permanently remove all dealership
              data, users and configuration.
            </p>
          </div>

          <button
            type="button"
            onClick={onDelete}
            className="
              h-10
              px-5
              shrink-0
              rounded-xl
              bg-[#EF4444]/[0.08]
              border
              border-[#EF4444]/15
              text-[12px]
              font-semibold
              text-[#FCA5A5]
              hover:bg-[#EF4444]/[0.13]
              transition
            "
          >
            Delete Workspace
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}

/* ============================================================
   SETTINGS CARD
   ============================================================ */

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
  action,
}) {
  return (
    <section
      className="
        rounded-2xl
        bg-gradient-to-br
        from-[#0D1725]
        to-[#09111D]
        border
        border-white/[0.07]
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
          gap-4
          mb-6
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
            <Icon
              size={19}
              className="text-[#18E0C4]"
            />
          </div>

          <div>
            <h3
              className="
                text-[16px]
                sm:text-[17px]
                font-semibold
                text-white
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-1.5
                max-w-[700px]
                text-[12px]
                sm:text-[13px]
                leading-5
                text-slate-500
              "
            >
              {description}
            </p>
          </div>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

/* ============================================================
   INPUT
   ============================================================ */

function SettingsInput({
  label,
  value,
  onChange,
  icon: Icon,
  type = "text",
}) {
  return (
    <div>
      <label
        className="
          block
          text-[12px]
          font-semibold
          text-slate-400
        "
      >
        {label}
      </label>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            size={15}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-slate-600
            "
          />
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className={`
            w-full
            h-11
            ${
              Icon
                ? "pl-10"
                : "pl-4"
            }
            pr-4
            rounded-xl
            bg-white/[0.025]
            border
            border-white/[0.07]
            text-[13px]
            text-slate-200
            placeholder:text-slate-700
            outline-none
            transition
            focus:border-[#18E0C4]/30
            focus:ring-2
            focus:ring-[#18E0C4]/[0.05]
          `}
        />
      </div>
    </div>
  );
}

/* ============================================================
   SELECT
   ============================================================ */

function SettingsSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        className="
          block
          text-[12px]
          font-semibold
          text-slate-400
        "
      >
        {label}
      </label>

      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="
            w-full
            h-11
            px-4
            pr-10
            appearance-none
            rounded-xl
            bg-[#0D1725]
            border
            border-white/[0.07]
            text-[13px]
            text-slate-300
            outline-none
            cursor-pointer
            focus:border-[#18E0C4]/30
          "
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
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-600
            pointer-events-none
          "
        />
      </div>
    </div>
  );
}

/* ============================================================
   TOGGLE
   ============================================================ */

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        p-4
        rounded-xl
        bg-white/[0.018]
        border
        border-white/[0.05]
        hover:border-white/[0.08]
        transition
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          min-w-0
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
            bg-white/[0.035]
          "
        >
          <Icon
            size={17}
            className={
              checked
                ? "text-[#18E0C4]"
                : "text-slate-600"
            }
          />
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[13px]
              font-semibold
              text-slate-200
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-[11px]
              sm:text-[12px]
              leading-5
              text-slate-600
            "
          >
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() =>
          onChange(!checked)
        }
        className={`
          relative
          w-11
          h-6
          shrink-0
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
            w-4
            h-4
            rounded-full
            bg-white
            shadow
            transition-transform

            ${
              checked
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </button>
    </div>
  );
}

/* ============================================================
   TABLE HEAD
   ============================================================ */

function TeamHead({ children }) {
  return (
    <th
      className="
        py-3
        pr-4
        text-left
        text-[11px]
        uppercase
        tracking-[0.08em]
        font-semibold
        text-slate-600
      "
    >
      {children}
    </th>
  );
}

/* ============================================================
   ADD USER MODAL
   ============================================================ */

function AddUserModal({
  onClose,
  onAdd,
}) {
  const [name, setName] = useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("Sales Executive");

  const [error, setError] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter the user's name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter the user's email.");
      return;
    }

    onAdd({
      name: name.trim(),
      email: email.trim(),
      role,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[150]
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
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
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 10,
        }}
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-[500px]
          rounded-2xl
          bg-[#0D1725]
          border
          border-white/[0.08]
          p-6
          shadow-[0_30px_100px_rgba(0,0,0,0.55)]
        "
      >
        <div className="flex items-start justify-between gap-4">

          <div>
            <h2
              className="
                text-[20px]
                font-bold
                text-white
              "
            >
              Add User
            </h2>

            <p
              className="
                mt-1
                text-[13px]
                text-slate-500
              "
            >
              Invite a new team member.
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
              text-slate-500
              hover:text-white
              hover:bg-white/[0.05]
            "
          >
            <X size={17} />
          </button>
        </div>

        <div className="mt-6 space-y-4">

          <SettingsInput
            label="Full Name"
            value={name}
            onChange={setName}
          />

          <SettingsInput
            label="Email Address"
            value={email}
            onChange={setEmail}
            icon={Mail}
            type="email"
          />

          <SettingsSelect
            label="Role"
            value={role}
            onChange={setRole}
            options={[
              "Administrator",
              "Sales Manager",
              "Inventory Manager",
              "Sales Executive",
            ]}
          />

          {error && (
            <p
              className="
                text-[12px]
                font-medium
                text-[#FCA5A5]
              "
            >
              {error}
            </p>
          )}
        </div>

        <div
          className="
            flex
            justify-end
            gap-2
            mt-6
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              px-5
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.07]
              text-[12px]
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
              gap-2
              h-10
              px-5
              rounded-xl
              bg-gradient-to-r
              from-[#18E0C4]
              to-[#28D7FF]
              text-[12px]
              font-bold
              text-[#031014]
            "
          >
            <UserPlus size={15} />
            Invite User
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/* ============================================================
   DELETE MODAL
   ============================================================ */

function DeleteModal({
  onClose,
  onConfirm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[160]
        flex
        items-center
        justify-center
        p-4
        bg-black/70
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
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
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 10,
        }}
        className="
          w-full
          max-w-[480px]
          rounded-2xl
          bg-[#0D1725]
          border
          border-[#EF4444]/15
          p-6
          shadow-[0_30px_100px_rgba(0,0,0,0.55)]
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            w-12
            h-12
            rounded-xl
            bg-[#EF4444]/[0.08]
            border
            border-[#EF4444]/10
          "
        >
          <Trash2
            size={21}
            className="text-[#F87171]"
          />
        </div>

        <h2
          className="
            mt-5
            text-[20px]
            font-bold
            text-white
          "
        >
          Delete Workspace?
        </h2>

        <p
          className="
            mt-2
            text-[13px]
            leading-6
            text-slate-500
          "
        >
          This action will permanently remove
          the dealership workspace, users and
          configuration. This cannot be undone.
        </p>

        <div
          className="
            flex
            justify-end
            gap-2
            mt-6
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              h-10
              px-5
              rounded-xl
              bg-white/[0.025]
              border
              border-white/[0.07]
              text-[12px]
              font-semibold
              text-slate-400
              hover:text-white
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              h-10
              px-5
              rounded-xl
              bg-[#EF4444]/[0.10]
              border
              border-[#EF4444]/15
              text-[12px]
              font-bold
              text-[#FCA5A5]
              hover:bg-[#EF4444]/[0.16]
            "
          >
            Delete Workspace
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
