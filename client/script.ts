const { io } = await import(
  "https://cdn.jsdelivr.net/npm/socket.io-client@4.8.0/dist/socket.io.esm.min.js"
);

//first page
var entries = document.getElementsByClassName("enter-chat");

if (entries.length > 0) {
  for (let i = 0; i < entries.length; i++) {
    entries[i].addEventListener("click", function () {
      window.location.href = "post-index.html";
    });
  }
}
//--------------------------------------------------------------------------------------
//second page
// Declare shocket
const socket = io("http://localhost:3000", {
  auth: {
    serverOffset: 0,
  },
});

//show messages on chat
socket.on("chat message", (msg: any) => {
  if (messages.length > 0) {
    const messagesContainer = messages[0] as HTMLElement;

    const item = `<li>${msg}</li>`;
    messagesContainer.insertAdjacentHTML("beforeend", item);

    // move on messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

const form = document.querySelector("form");
const inputs = document.getElementsByClassName("input");
const messages = document.getElementsByClassName("messages");

// button to clean chat
var delete1 = document.getElementsByClassName("delete-button");
if (delete1.length > 0) {
  for (let i = 0; i < delete1.length; i++) {
    delete1[i].addEventListener("click", () => {
      socket.emit("vaciar tabla");
      const items = document.querySelectorAll("li");
      if (items.length === 0) {
        console.log("El chat ya está vacío.");
      } else {
        items.forEach((item) => item.remove());
      }
    });
  }
}

// Return welcome-page
var page1 = document.getElementsByClassName("return-button");
if (page1.length > 0) {
  for (let i = 0; i < page1.length; i++) {
    page1[i].addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

// send messages on submit
if (form && inputs.length > 0) {
  // Comprobar que ambos existen
  const input = inputs[0] as HTMLInputElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //don't recharge

    if (input.value.trim()) {
      socket.emit("chat message", input.value); // send message to server
      input.value = ""; //clean input after send
      console.log("Mensaje enviado y almacenado");
    } else {
      console.log("No se puede enviar un mensaje vacío.");
    }
  });
} else {
  console.error("El formulario o el campo de entrada no se encontraron.");
}
export {};
