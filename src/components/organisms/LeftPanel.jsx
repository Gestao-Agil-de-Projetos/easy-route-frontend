import React from "react";

export default function LeftPanel() {
  return (
    <aside className="left-panel">
      <header className="left-header">
        <img src="/assets/logo-white.svg" alt="Rota Fácil" className="logo" />
      </header>

      <div className="left-illustration-wrap">
        <div className="white-contour">
          <img src="/assets/illustration.png" alt="Ilustração" className="illustration" />
        </div>
      </div>

      <footer className="left-footer">
        Conectando passageiros e motoristas de forma rápida e segura.
      </footer>
    </aside>
  );
}
