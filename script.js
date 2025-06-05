const smallData = document.getElementById("btn1");
const bigData = document.getElementById("btn2");
const table = document.createElement("table");

smallData.addEventListener("click", () => {
  const containerForTableData = document.getElementsByClassName("dataTable")[0];

  fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (table.childNodes) {
        table.innerHTML = "";
      }

      let headRow = "<tr>";
      for (property in json) {
        headRow += `<th>${property}<span>▲</span></th>`;
      }
      headRow += "</tr>";
      table.innerHTML += headRow;

      let dataRow = "<tr>";
      for (value in json) {
        dataRow += `<td>${json[value]}</td>`;
      }
      dataRow += "</tr>";
      table.innerHTML += dataRow;
    })
    .catch((error) => console.log(error));

  containerForTableData.appendChild(table);
});

bigData.addEventListener("click", () => {
  const containerForTableData = document.getElementsByClassName("dataTable")[0];

  fetch(`https://jsonplaceholder.typicode.com/todos`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (table.childNodes) {
        table.innerHTML = "";
      }

      let headRow = "<tr>";
      for (obj of json) {
        for (property in obj) {
          headRow += `<th>${property}<span>▲</span></th>`;
        }
        break;
      }
      headRow += "</tr>";
      table.innerHTML += headRow;

      let dataRow = "";
      for (obj of json) {
        dataRow += "<tr>";
        for (property in obj) {
          dataRow += `<td>${obj[property]}</td>`;
        }
        dataRow += "</tr>";
      }

      table.innerHTML += dataRow;
    })
    .catch((error) => console.log(error));

  containerForTableData.appendChild(table);
});

table.addEventListener("click", (event) => {
  const target = event.target;
  const tableRowName = target.parentNode;
  const tableArrHeaders = target.parentNode.parentNode;
  const headers = tableArrHeaders.querySelectorAll("th");
  const swapNames = Array.from(target.closest("table").querySelectorAll("tr"));
  const headerNames = [];
  let index;

  if (target.tagName === "SPAN") {
    if (target.textContent === "▼") {
      target.textContent = "▲";

      for (let i = 0; i < headers.length; i++) {
        if (headers[i].textContent === tableRowName.textContent) {
          index = i;
        }
      }

      swapNames.forEach((value) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (value.childNodes[i].tagName !== "TH") {
            if (i === index) {
              headerNames.push(value.childNodes[i].textContent);
            }
          }
        }
      });

      swapNames.forEach((value, ind) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (value.childNodes[i].tagName !== "TH") {
            if (i === index) {
              value.childNodes[i].textContent =
                headerNames[headerNames.length - ind];
            }
          }
        }
      });
    } else {
      target.textContent = "▼";

      for (let i = 0; i < headers.length; i++) {
        if (headers[i].textContent === tableRowName.textContent) {
          index = i;
        }
      }

      swapNames.forEach((value) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (value.childNodes[i].tagName !== "TH") {
            if (i === index) {
              headerNames.push(value.childNodes[i].textContent);
            }
          }
        }
      });

      swapNames.forEach((value, ind) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (value.childNodes[i].tagName !== "TH") {
            if (i === index) {
              value.childNodes[i].textContent =
                headerNames[headerNames.length - ind];
            }
          }
        }
      });
    }
  }
});
