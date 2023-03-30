let inputUsername = document.querySelector("#username");
let inputPassword = document.querySelector("#password");
let formLoginBtn = document.querySelector("#formLoginBtn");
let responseOutput = document.querySelector(".h3-response");

formLoginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  let username = inputUsername.value;
  let password = inputPassword.value;

  const response = await fetch("http://localhost:5050/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log("Data ->", data);

  document.body.textContent = data.message;
});
