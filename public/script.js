const createMessageButton = document.getElementById("createMessageButton");
const messageDialog = document.getElementById("messageDialog");
const cancelButton = document.getElementById("cancelButton");

createMessageButton.addEventListener("click", () => {
  messageDialog.style.display = "block";
});

cancelButton.addEventListener("click", () => {
  messageDialog.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (
    e.target !== messageDialog &&
    !messageDialog.contains(e.target) &&
    e.target !== createMessageButton
  ) {
    messageDialog.style.display = "none";
  }
});
