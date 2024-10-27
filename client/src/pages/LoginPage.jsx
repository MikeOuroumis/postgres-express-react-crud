import { useState } from "react";
import * as authService from "../services/authService";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await authService.login(email, password);

    if (data.errors) {
      setMessage(data.errors[0].msg);
      return;
    }
    setMessage(data.message);
  };

  return (
    <div className="login-screen-container">
      <div>
        <h1>Login Here</h1>
        <form onSubmit={handleLogin}>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Not registered yet? <a href="/register">click here to register</a>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}
