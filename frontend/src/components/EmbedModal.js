import React from "react";
import ReactPlayer from "react-player";

const Overlay = ({ children, onClose }) => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  }} onClick={onClose}>
    <div style={{ position: "relative", width: "90%", maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
      {children}
      <button onClick={onClose} style={{ position: "absolute", top: -10, right: -10, background: "#fff", borderRadius: 20, border: "none", padding: "6px 10px", cursor: "pointer" }}>✕</button>
    </div>
  </div>
);

const EmbedModal = ({ url, onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: "#000", padding: 8, borderRadius: 8 }}>
            <div style={{ width: 560, height: 315 }}>
              <iframe
                src={url}
                title="Spotify Player"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ borderRadius: 8 }}
              />
            </div>
          </div>
    </Overlay>
  );
};

export default EmbedModal;
