export async function registerUser(email, password) {
  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export async function login(email, password) {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
  }
}
