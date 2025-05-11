// Funzioni per la gestione delle notifiche di errore
// by Andrea Croci Angelini

let __DISPLAY_COLOR = {
  password: "blue",
  error: "red",
};

/* Tailwind */
// "bg-red-100 bg-yellow-100 bg-green-100 bg-blue-100"
// "bg-red-600 bg-yellow-600 bg-green-600 bg-blue-600"
// "text-red-600 text-yellow-600 text-green-600 text-blue-600"
// "border-red-600 border-yellow-600 border-green-600 border-blue-600"
// "hover:bg-red-100 hover:bg-yellow-100 hover:bg-green-100 hover:bg-blue-100"

function setPassword(count, color, password) {
  const passwordText = document.getElementById("passwordText");
  const passwordIcon = document.getElementById("passwordIcon");
  const passwordBox = document.getElementById("passwordBox");
  // Remove previous border color
  passwordBox.classList.remove(`border-${__DISPLAY_COLOR.password}-600`);
  passwordIcon.classList.remove(`bg-${__DISPLAY_COLOR.password}-600`);
  passwordText.classList.remove(`border-${__DISPLAY_COLOR.password}-600`);
  passwordText.classList.remove(`hover:bg-${__DISPLAY_COLOR.password}-100`);
  __DISPLAY_COLOR.password = color;

  // Sets up the display HTML
  if (password == "Generated Password") {
    passwordText.classList.remove("text-gray-900");
    passwordText.classList.add("text-gray-300");
  } else {
    passwordText.classList.remove("text-gray-300");
    passwordText.classList.add("text-gray-900");
    passwordText.classList.add(`hover:bg-${color}-100`);
  }
  if (count == 0 || count == null) {
    count = '<img class="w-4 h-4" src="icon/check.svg"/>';
  }

  // Applies the changes to the page elements
  passwordIcon.innerHTML = count;
  passwordText.innerText = password;
  passwordBox.classList.add(`border-${color}-600`);
  passwordIcon.classList.add(`bg-${color}-600`);
  passwordText.classList.add(`border-${color}-600`);
}

function setError(icon = "", color = "", title = "", description = []) {
  const errorDisplay = document.getElementById("errorDisplay");
  const errorIcon = document.getElementById("errorIcon");
  const errorDescription = document.getElementById("errorDescription");

  if (color == null || color == "") {
    errorDisplay.classList.remove("flex");
    errorDisplay.classList.add("hidden");
    return;
  }
  // Remove previous background and text color.
  errorDisplay.classList.remove(`bg-${__DISPLAY_COLOR.error}-100`);
  errorDisplay.classList.remove(`text-${__DISPLAY_COLOR.error}-600`);
  __DISPLAY_COLOR.error = color;

  // Build the display information
  display = `<p>${title}</p>`;
  for (text of description) {
    display += `<p class="pl-2 text-sm">${text}</p>`;
  }

  // Applies the changes to the page elements.
  errorIcon.src = icon;
  errorDescription.innerHTML = display;
  errorDisplay.classList.add(`bg-${color}-100`);
  errorDisplay.classList.add(`text-${color}-600`);
  errorDisplay.classList.add("flex");
  errorDisplay.classList.remove("hidden");
}
