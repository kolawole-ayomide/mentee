import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import QR from "./QR";
import DeactivateAccount from "./modals/Deactivateaccount";

const TABS = ["Personal Info", "Security", "Quarterly Review"];

export default function Profile() {
const [activeTab,      setActiveTab]      = useState("Personal Info");
const [showDeactivate, setShowDeactivate] = useState(false);

return (
<>
     <div className="space-y-6">
     <h2 className="text-xl font-bold" style={{ color: "#1B1A23" }}>Settings</h2>

     {/* tabs */}
     <div className="flex items-center gap-6 border-b border-slate-100">
     {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
          className="pb-3 text-sm font-semibold border-b-2 transition whitespace-nowrap"
          style={activeTab === tab
               ? { borderColor: "#CF173C", color: "#CF173C" }
               : { borderColor: "transparent", color: "#616E7C" }}>
          {tab}
          </button>
     ))}
     </div>

     {/* tab content */}
     <div>
     {activeTab === "Personal Info"    && <PersonalInfo />}
     {activeTab === "Security"         && <Security />}
     {activeTab === "Quarterly Review" && <QR />}
     </div>

     {/* deactivate — only on Personal Info and Security tabs */}
     {activeTab !== "Quarterly Review" && (
     <div className="pt-2 pb-2">
          <button onClick={() => setShowDeactivate(true)}
          className="text-xs font-semibold transition hover:opacity-70"
          style={{ color: "#CF173C" }}>
          Deactivate Account
          </button>
     </div>
     )}
     </div>

     {showDeactivate && (
     <DeactivateAccount onClose={() => setShowDeactivate(false)} />
     )}
</>
);
}