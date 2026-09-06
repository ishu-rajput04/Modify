import React, { useState } from "react";
import Form from "../components/Form";
import Button from "../../../shared/components/Button";
import "../style/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading, } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ username, password });
    setUsername("");
    setPassword("");
    navigate("/");
  }
  if (loading) {
    return <main>Login page Loading...</main>;
  }
  return (
    <main className="form-page">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Form
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={"Username or Email"}
            placeholder={"Enter Username or Email"}
            type={"text"}
          />
          <Form
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
          <Button name={"Login"} />
        </form>
        <p>
          Don't have an Account.{" "}
          <Link className="toggle" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
