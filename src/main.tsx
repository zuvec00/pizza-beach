import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InvitePage } from "./pages/InvitePage";
import { NotFound } from "./pages/NotFound";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/:slug" element={<InvitePage />} />
        {/* Landing with no slug → not-found (no default guest, per spec §6.1). */}
        <Route path="/" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
