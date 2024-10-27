export function RegisterPage() {
  return (
    <div className="login-screen-container">
      <div>
        <h1>Register Here</h1>
        <form>
          <input placeholder="email" />
          <input placeholder="password" />
          <button type="submit">Registered</button>
        </form>
        <p>
          Registered aldeady? <a href="/login">click here to login</a>
        </p>
      </div>
    </div>
  );
}
