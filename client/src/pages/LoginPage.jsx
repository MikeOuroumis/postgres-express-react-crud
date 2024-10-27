export function LoginPage() {
  return (
    <div className="login-screen-container">
      <div>
        <h1>Login Here</h1>
        <form>
          <input placeholder="email" />
          <input placeholder="password" />
          <button type="submit">Login</button>
        </form>
        <p>
          Not registered yet? <a href="/register">click here to register</a>
        </p>
      </div>
    </div>
  );
}
