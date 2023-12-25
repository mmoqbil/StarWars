import { rowData } from "./data.js";

const clickListener = function (event) {
  const keyData = event.target.innerHTML;
  const buttonsObject = rowData[keyData];
  const mainTable = document.createElement("table");
  mainTable.style.border = "3px solid";
  document.body.appendChild(mainTable);

  let keysDisplayed = false;
  let displayKeyIndex = 0;
  let valueId = 1;
  const maxDisplayedIndex = 6;

  for (const buttonKey in buttonsObject) {
    const buttonProps = buttonsObject[buttonKey];

    if (!keysDisplayed) {
      const trKey = document.createElement("tr");
      trKey.style.border = "1px solid";
      mainTable.appendChild(trKey);

      const tdKeyId = document.createElement("td");
      tdKeyId.innerHTML = "ID";
      tdKeyId.style.border = "1px solid";
      trKey.appendChild(tdKeyId);

      for (const propKey in buttonProps) {
        if (displayKeyIndex % 2 === 0 && displayKeyIndex < maxDisplayedIndex) {
          const tdKey = document.createElement("td");
          tdKey.innerHTML = propKey.toUpperCase();
          tdKey.style.border = "1px solid";
          trKey.appendChild(tdKey);
        }
        displayKeyIndex++;
      }

      const tdKeyCreated = document.createElement("td");
      tdKeyCreated.innerHTML = "CREATED AT";
      tdKeyCreated.style.border = "1px solid";
      trKey.appendChild(tdKeyCreated);

      const tdKeyActions = document.createElement("td");
      tdKeyActions.innerHTML = "ACTIONS";
      tdKeyActions.style.border = "1px solid";
      trKey.appendChild(tdKeyActions);

      keysDisplayed = true;
    }

    displayKeyIndex = 0;
    const trValue = document.createElement("tr");
    mainTable.appendChild(trValue);

    for (const propKey in buttonProps) {
      const propValue = buttonProps[propKey];
      if (displayKeyIndex === 0) {
        const tdValueId = document.createElement("td");
        tdValueId.innerHTML = valueId;
        tdValueId.style.border = "1px solid";
        trValue.appendChild(tdValueId);
        valueId++;
      }
      if (displayKeyIndex % 2 === 0 && displayKeyIndex < 5) {
        const tdValue = document.createElement("td");
        tdValue.innerHTML = propValue;
        tdValue.style.border = "1px solid";
        trValue.appendChild(tdValue);
      }
      if (displayKeyIndex === 4) {
        const tdCreatedValue = document.createElement("td");
        tdCreatedValue.style.border = "1px solid";
        const dateObject = new Date(buttonProps["created"]);
        const day =
          dateObject.getDate() < 10
            ? "0" + dateObject.getDate()
            : dateObject.getDate();
        const month =
          dateObject.getMonth() + 1 < 10
            ? "0" + (dateObject.getMonth() + 1)
            : dateObject.getMonth() + 1;
        const formattedDate = `${day}-${month}-${dateObject.getFullYear()}`;
        tdCreatedValue.innerHTML = formattedDate;
        trValue.appendChild(tdCreatedValue);
      }
      if (displayKeyIndex === 5) {
        const buttonPlus = document.createElement("button");
        const buttonMinus = document.createElement("button");
        buttonPlus.innerHTML = "+";
        buttonMinus.innerHTML = "-";
        const tdButtons = document.createElement("td");
        tdButtons.style.border = "1px solid";
        tdButtons.appendChild(buttonPlus);
        tdButtons.appendChild(buttonMinus);
        trValue.appendChild(tdButtons);
      }
      displayKeyIndex++;
    }
  }
};
const buttons = document.getElementById("buttons");

Object.keys(rowData).forEach((key) => {
  const button = document.createElement("button");
  button.innerHTML = key;
  button.addEventListener("click", clickListener);
  buttons.appendChild(button);
});
