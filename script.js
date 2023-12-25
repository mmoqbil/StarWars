import { rowData } from "./data.js";

const clickListener = function (event) {
  content.innerHTML = "";
  const keyData = event.target.innerHTML;
  const buttonsObject = rowData[keyData];
  const mainTable = document.createElement("table");
  mainTable.style.border = "3px solid";
  content.appendChild(mainTable);

  let keysDisplayed = false;
  let displayKeyIndex = 0;
  let valueId = 1;
  const maxDisplayedIndex = 6;
  let isModalOpen = false;

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
        const rowCheckbox = document.createElement("input");
        rowCheckbox.type = "checkbox";
        buttonPlus.innerHTML = "+";
        buttonMinus.innerHTML = "-";
        const tdButtons = document.createElement("td");
        tdButtons.style.border = "1px solid";
        tdButtons.appendChild(buttonPlus);
        tdButtons.appendChild(buttonMinus);
        tdButtons.appendChild(rowCheckbox);
        trValue.appendChild(tdButtons);

        buttonPlus.addEventListener("click", function () {
            if (!isModalOpen) {
            isModalOpen = true;
            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.backgroundColor = "white";
            modal.style.padding = "20px";
            modal.style.border = "2px solid yellow";
            modal.style.zIndex = "1000";
            modal.style.maxWidth = "80%"; 
          
            const buttonX = document.createElement("button");
            buttonX.innerHTML = "X";
            modal.appendChild(buttonX);
            content.appendChild(modal);
          
            const tableModal = document.createElement("table");
            tableModal.style.width = "100%"; 
            tableModal.style.overflowX = "auto"; 
            modal.appendChild(tableModal);
          
            for (const propKey in buttonProps) {
              const propValue = buttonProps[propKey];
              const trModal = document.createElement("tr");
              const tdKeyModal = document.createElement("td");
              const tdValueModal = document.createElement("td");

              tdKeyModal.style.maxWidth = "1000px"; 
              tdKeyModal.style.overflow = "hidden";
              tdKeyModal.style.textOverflow = "ellipsis"; 
              tdKeyModal.style.whiteSpace = "nowrap"; 
              
              tdValueModal.style.maxWidth = "1000px"; 
              tdValueModal.style.overflow = "hidden";
              tdValueModal.style.textOverflow = "ellipsis";
              tdValueModal.style.whiteSpace = "nowrap";

              tdKeyModal.innerHTML = propKey;
              tdValueModal.innerHTML = propValue;
              trModal.appendChild(tdKeyModal);
              trModal.appendChild(tdValueModal);
              tableModal.appendChild(trModal);
            }
          
            buttonX.addEventListener("click", function () {
                isModalOpen = false;
              content.removeChild(modal);
            });
        }
          });

        buttonMinus.addEventListener("click", function () {
          0;
          mainTable.removeChild(trValue);
        });
      }
      displayKeyIndex++;
    }
  }
  const tableButtons = document.createElement("td");
  const buttonPrev = document.createElement("button");
  const buttonNext = document.createElement("button");
  const tableInput = document.createElement("input");
  tableInput.placeholder = "1";
  buttonPrev.innerHTML = "Prev";

  const selectElement = document.createElement("select");

  const option1 = document.createElement("option");
  option1.value = "10";
  option1.text = "10";

  const option2 = document.createElement("option");
  option2.value = "20";
  option2.text = "20";

  selectElement.add(option1);
  selectElement.add(option2);
  selectElement.position = "right";

  buttonNext.innerHTML = "Next";
  tableButtons.appendChild(buttonPrev);
  tableButtons.appendChild(tableInput);
  tableButtons.appendChild(buttonNext);
  tableButtons.appendChild(selectElement);
  content.appendChild(tableButtons);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete checked rows";
  deleteButton.style.display = "none";
  content.appendChild(deleteButton);

  document.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const atLeastOneChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );

    deleteButton.style.display = atLeastOneChecked ? "block" : "none";
  });

  deleteButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        const rowToDelete = checkbox.closest("tr");
        if (rowToDelete) {
          mainTable.removeChild(rowToDelete);
        }
      }
    });

    deleteButton.style.display = "none";
  });
};
const buttons = document.getElementById("buttons");
const content = document.getElementById("content");

Object.keys(rowData).forEach((key) => {
  const button = document.createElement("button");
  button.innerHTML = key;
  button.addEventListener("click", clickListener);
  buttons.appendChild(button);
});
