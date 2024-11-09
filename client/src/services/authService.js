import apiClient from "../api/apiClient";

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
    const response = await apiClient.post("/login", { email, password });

    const data = response.data;

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
  }
}
