import { table } from "./fetchAPI.js";
table.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName !== "SPAN" && target.tagName !== "TH") {
    target.parentNode.classList.toggle("focusStyle");
  }
});
