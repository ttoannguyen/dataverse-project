import React, { useState } from "react";

const DataversePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "dataverse">("home");
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleTabChange = (tab: "home" | "dataverse") => {
    setActiveTab(tab);
    if (tab === "dataverse" && !iframeLoaded) {
      setIframeLoaded(true);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Trang Web Với Tabs</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleTabChange("home")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "home" ? "#007bff" : "#e0e0e0",
            color: activeTab === "home" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🏠 Trang chủ
        </button>

        <button
          onClick={() => handleTabChange("dataverse")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "dataverse" ? "#007bff" : "#e0e0e0",
            color: activeTab === "dataverse" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          📂 Dataverse
        </button>
      </div>

      {activeTab === "home" && (
        <div>
          <p>Chào mừng bạn đến với trang chủ.</p>
        </div>
      )}

      {activeTab === "dataverse" && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {iframeLoaded && (
            <iframe
              title="Dataverse"
              src="http://172.18.54.49:8080/dataverse/root"
              style={{ width: "100%", height: "600px", border: "none" }}
              loading="lazy"
              allowFullScreen
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DataversePage;
