const smallData = document.getElementById("btn1");
const bigData = document.getElementById("btn2");

smallData.addEventListener("click", () => {
  const containerForTableData = document.getElementsByClassName("dataTable")[0];

  const table = document.createElement("table");
  table.innerHTML += `<tr><th>Hello!</th></tr>
  <tr><td>Hello!</td></tr>`;

  containerForTableData.appendChild(table);
});

bigData.addEventListener("click", () => {});
