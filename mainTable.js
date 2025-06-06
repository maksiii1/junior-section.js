import { table } from "./fetchAPI.js";
import { copyDatas } from "./fetchAPI.js";

table.addEventListener("click", (event) => {
  const target = event.target;

  const tableRowName = target.parentNode;

  const tableArrHeaders = target.parentNode.parentNode;

  const headers = tableArrHeaders.querySelectorAll("th");

  const swapInfo = Array.from(
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

      swapInfo.forEach((value) => {
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

      let userLenght = datasJSON.userId.length;

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

      swapInfo.forEach((value, ind) => {
        for (let i = 0; i < value.childNodes.length; i++) {
          if (i === index) {
            switch (i) {
              case 0: {
                value.childNodes[i].textContent =
                  dataJSONSorted.userIdSorted[ind];

                let checker = true;
                datasJSON.userId.forEach((isValue) => {
                  if (value.childNodes[i].textContent === isValue && checker) {
                    value.childNodes[i + 1].textContent =
                      datasJSON.id[--userLenght];
                    value.childNodes[i + 2].textContent =
                      datasJSON.titles[userLenght];
                    value.childNodes[i + 3].textContent =
                      datasJSON.completed[userLenght];
                    checker = false;
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
