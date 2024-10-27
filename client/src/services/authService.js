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
