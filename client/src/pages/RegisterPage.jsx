import { useState } from "react";
import * as AuthService from "../services/authService";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const response = await AuthService.registerUser(email, password);

    if (response.errors) {
      setMessage(response.errors[0].msg);
      return;
    }
    setMessage(response.message);
  };

  return (
    <div className="login-screen-container" onSubmit={registerUser}>
      <div>
        <h1>Register Here</h1>
        <form>
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registered</button>
        </form>
        <p>
          Registered aldeady? <a href="/login">click here to login</a>
        </p>
        <br />
        <p>{message}</p>
      </div>
    </div>
  );
}
