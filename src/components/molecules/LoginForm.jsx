import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import EyeIcon from "../atoms/EyeIcon";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: chamar serviço de autenticação
    console.log("login", { email, password });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-title">Bem-vindo de volta!</h1>

      <p className="signup-note">
        Não tem uma conta? <a href="#" className="signup-link">Cadastre-se</a>
      </p>

      <div className="field">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Escreva seu email completo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <Input
          id="password"
          label="Senha"
          type={showPwd ? "text" : "password"}
          placeholder="Digite uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightElement={
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPwd((s) => !s)}
              aria-label="Alternar visibilidade da senha"
            >
              <EyeIcon open={showPwd} />
            </button>
          }
        />
      </div>

      <div className="button-wrap">
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
}
