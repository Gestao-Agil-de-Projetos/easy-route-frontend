import React from "react";
import "../../styles/LoginPage.css";

import blob1 from "../../assets/blob1.png";
import blob2 from "../../assets/blob2.png";
import blob3 from "../../assets/blob3.png";
import backgroundLogo from "../../assets/background.png";
import bus from "../../assets/bus.png";
import ball1 from "../../assets/ball1.png";
import ball2 from "../../assets/ball2.png";
import rotafacil from "../../assets/rotafacil.png";

export default function LoginPage() {
  return (
    <div className="login-container">
      {/* LADO ESQUERDO */}
      <div className="left-side">
        <img src={blob1} alt="blob" className="blob blob1" />
        <img src={blob2} alt="blob" className="blob blob2" />
        <img src={blob3} alt="blob" className="blob blob3" />
        <img src={bus} alt="bus" className="bus" />
        <img src={ball1} alt="ball1" className="ball1" />
        <img src={ball2} alt="ball2" className="ball2" />
        <img src={rotafacil} alt="rotafacil" className="rotafacil" />
        <p className="left-text">
          Conectando passageiros e motoristas de forma rápida e segura.
        </p>
      </div>

      {/* LADO DIREITO */}
      <div className="right-side">
        <h1>Bem-vindo de volta!</h1>

        <p className="cadastro-text">
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Escreva seu email completo" />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" />
          

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
