import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Button from "../../../shared/components/Button";
import "../style/register.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({ email, username, password });
    setUsername("");
    setPassword("");
    setEmail("");
    navigate("/");
  }
  if (loading) {
    return (
      <main>
        <h1>Register........</h1>
      </main>
    );
  }
  return (
    <main className="form-page">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Form
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Username"}
            placeholder={"Enter Username"}
            type={"text"}
          />
          <Form
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label={"Email"}
            placeholder={"Enter Your Email"}
            type={"text"}
          />
          <Form
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
          <Button name={"Register"} />
        </form>
        <p>
          Already have an Account.{" "}
          <Link className="toggle" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
