let inputUsername = document.querySelector("#username");
let inputPassword = document.querySelector("#password");
let formRegisterBtn = document.querySelector("#formRegisterBtn");
let responseOutput = document.querySelector(".h3-response");

formRegisterBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let username = inputUsername.value;
  let password = inputPassword.value;

  const response = await fetch("http://localhost:5050/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Data ->", data);

  responseOutput.textContent = data.message;
});
