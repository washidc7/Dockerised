import React, { useState } from "react";
import Iframe from "react-iframe";

export default function IframeDemo() {
  const [showIframe, setShowIframe] = useState(false);

  const handleOpen = () => {
    setShowIframe(!showIframe);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px 20px",
          background: "#4F46E5",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        React Iframe Demo
      </div>

      {/* Button */}
      <div style={{ padding: "20px" }}>
        <button
          onClick={handleOpen}
          style={{
            padding: "10px 18px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Open Iframe
        </button>
      </div>

      {/* Show iframe only when button clicked */}
      {showIframe && (
        <Iframe
          url="https://example.com"
          width="100%"
          height="600px"
          id="demoIframe"
          className="myIframe"
          display="block"
          position="relative"
          styles={{ border: "none" }}
        />
      )}
    </div>
  );
}
