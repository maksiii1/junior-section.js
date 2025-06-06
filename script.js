const smallData = document.getElementById("btn1");
const bigData = document.getElementById("btn2");
const table = document.createElement("table");
let copyDatas;

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

      copyDatas = headRow + dataRow;
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

  const swapNames = Array.from(
    target.closest("table").querySelectorAll("tr")
  ).slice(1);

  const datasJSON = {
    userId: [],
    id: [],
    titles: [],
    completed: [],
  };

  let index;

  if (target.tagName === "SPAN") {
    if (target.textContent === "▼") {
      target.textContent = "▲";
      table.innerHTML = copyDatas;
    } else {
      target.textContent = "▼";

      for (let i = 0; i < headers.length; i++) {
        if (headers[i].textContent === tableRowName.textContent) {
          index = i;
        }
      }

      swapNames.forEach((value) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          switch (i) {
            case 0: {
              datasJSON.userId.push(value.childNodes[i].textContent);
              break;
            }
            case 1: {
              datasJSON.id.push(value.childNodes[i].textContent);
              break;
            }
            case 2: {
              datasJSON.titles.push(value.childNodes[i].textContent);
              break;
            }
            case 3: {
              datasJSON.completed.push(value.childNodes[i].textContent);
              break;
            }
            default: {
              break;
            }
          }
        }
      });

      const dataJSONSorted = {
        userIdSorted: [...datasJSON.userId].sort((a, b) => {
          return b - a;
        }),
        idSorted: [...datasJSON.id].sort((a, b) => {
          return b - a;
        }),
        titlesSorted: [...datasJSON.titles].sort(),
        completedSorted: [...datasJSON.completed]
          .map((value) => {
            return value === "true";
          })
          .sort((a, b) => b - a),
      };

      swapNames.forEach((value, ind) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (i === index) {
            switch (i) {
              case 0: {
                value.childNodes[i].textContent =
                  dataJSONSorted.userIdSorted[ind];

                datasJSON.userId.forEach((isValue, index) => {
                  if (value.childNodes[i].textContent === isValue) {
                    value.childNodes[i + 1].textContent = datasJSON.id[index];
                    value.childNodes[i + 2].textContent =
                      datasJSON.titles[index];
                    value.childNodes[i + 3].textContent =
                      datasJSON.completed[index];
                  }
                });
                break;
              }
              case 1: {
                value.childNodes[i].textContent = dataJSONSorted.idSorted[ind];

                datasJSON.id.forEach((isValue, index) => {
                  if (value.childNodes[i].textContent === isValue) {
                    value.childNodes[i - 1].textContent =
                      datasJSON.userId[index];
                    value.childNodes[i + 1].textContent =
                      datasJSON.titles[index];
                    value.childNodes[i + 2].textContent =
                      datasJSON.completed[index];
                  }
                });

                break;
              }
              case 2: {
                value.childNodes[i].textContent =
                  dataJSONSorted.titlesSorted[ind];

                datasJSON.titles.forEach((isValue, index) => {
                  if (value.childNodes[i].textContent === isValue) {
                    value.childNodes[i - 2].textContent =
                      datasJSON.userId[index];
                    value.childNodes[i - 1].textContent = datasJSON.id[index];
                    value.childNodes[i + 1].textContent =
                      datasJSON.completed[index];
                  }
                });

                break;
              }
              case 3: {
                value.childNodes[i].textContent =
                  dataJSONSorted.completedSorted[ind];

                datasJSON.completed.forEach((isValue, index) => {
                  if (value.childNodes[i].textContent === isValue) {
                    value.childNodes[i - 3].textContent =
                      datasJSON.userId[index];
                    value.childNodes[i - 2].textContent = datasJSON.id[index];
                    value.childNodes[i - 1].textContent =
                      datasJSON.titles[index];
                  }
                });

                break;
              }
              default: {
                break;
              }
            }
          }
        }
      });
    }
  }
});
