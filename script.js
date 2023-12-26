import { rowData } from "./data.js";

const content = document.getElementById("content");
const buttons = document.getElementById("buttons");

let mainTable;
let searchByIdInput;
let searchByNameInput;
let isModalOpen = false;

const createButton = (label, onClick) => {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.addEventListener("click", onClick);
  return button;
};

const createInput = (placeholder) => {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  return input;
};

const createDiv = (label, input, button) => {
  const div = document.createElement("div");
  div.innerHTML = `${label} :`;
  div.appendChild(input);
  div.appendChild(button);
  return div;
};

const createTable = (data) => {
  const table = document.createElement("table");
  table.style.border = "3px solid";

  let keysDisplayed = false;
  let displayKeyIndex = 0;
  let keyId = 1;
  const maxDisplayedIndex = 6;

  for (const key in data) {
    const props = data[key];

    if (!keysDisplayed) {
      const trKey = document.createElement("tr");
      trKey.style.border = "1px solid";
      table.appendChild(trKey);

      const tdKeyId = document.createElement("td");
      tdKeyId.innerHTML = "ID";
      tdKeyId.style.border = "1px solid";
      trKey.appendChild(tdKeyId);

      for (const propKey in props) {
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
    table.appendChild(trValue);

    for (const propKey in props) {
      const propValue = props[propKey];

      if (displayKeyIndex === 0) {
        const tdValueId = document.createElement("td");
        tdValueId.innerHTML = keyId;
        tdValueId.style.border = "1px solid";
        trValue.appendChild(tdValueId);
        keyId++;
      }

      if (displayKeyIndex % 2 === 0 && displayKeyIndex < 5) {
        if (propValue) {
          const tdValue = document.createElement("td");
          tdValue.innerHTML = propValue;
          tdValue.style.border = "1px solid";
          trValue.appendChild(tdValue);
        }
      }

      if (displayKeyIndex === 4) {
        const tdCreatedValue = document.createElement("td");
        tdCreatedValue.style.border = "1px solid";
        const dateObject = new Date(props["created"]);
        const day = (dateObject.getDate() < 10 ? "0" : "") + dateObject.getDate();
        const month = ((dateObject.getMonth() + 1) < 10 ? "0" : "") + (dateObject.getMonth() + 1);
        const formattedDate = `${day}-${month}-${dateObject.getFullYear()}`;
        tdCreatedValue.innerHTML = formattedDate;
        trValue.appendChild(tdCreatedValue);
      }

      if (displayKeyIndex === 5) {
        const buttonPlus = createButton("+", () => showModal(props));
        const buttonMinus = createButton("-", () => table.removeChild(trValue));
        const rowCheckbox = document.createElement("input");
        rowCheckbox.type = "checkbox";

        const tdButtons = document.createElement("td");
        tdButtons.style.border = "1px solid";
        tdButtons.appendChild(buttonPlus);
        tdButtons.appendChild(buttonMinus);
        tdButtons.appendChild(rowCheckbox);
        trValue.appendChild(tdButtons);
      }

      displayKeyIndex++;
    }
  }

  return table;
};

const createTableButtons = () => {
  const tableButtons = document.createElement("td");
  const buttonPrev = createButton("Prev", () => {});
  const buttonNext = createButton("Next", () => {});
  const tableInput = createInput("1");

  const selectElement = document.createElement("select");

  const option1 = document.createElement("option");
  option1.value = "10";
  option1.text = "10";

  const option2 = document.createElement("option");
  option2.value = "20";
  option2.text = "20";

  selectElement.add(option1);
  selectElement.add(option2);

  tableButtons.appendChild(buttonPrev);
  tableButtons.appendChild(tableInput);
  tableButtons.appendChild(buttonNext);
  tableButtons.appendChild(selectElement);

  return tableButtons;
};

const createDeleteButton = () => {
  const deleteButton = createButton("Delete checked rows", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const rowToDelete = checkbox.closest("tr");
        if (rowToDelete) {
          mainTable.removeChild(rowToDelete);
        }
      }
    });
    deleteButton.style.display = "none";
  });
  deleteButton.style.display = "none";
  return deleteButton;
};

const showModal = (data) => {
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
  
      const buttonX = createButton("X", () => {
        isModalOpen = false;
        content.removeChild(modal);
      });
      modal.appendChild(buttonX);
      content.appendChild(modal);
  
      const tableModal = document.createElement("table");
      tableModal.style.width = "100%";
      tableModal.style.overflowX = "auto";
      modal.appendChild(tableModal);
  
      for (const propKey in data) {
        const propValue = data[propKey];
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
  };

const filterTableByName = (nameString) => {
  const rows = mainTable.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    const nameCell = row.cells[1];

    if (nameCell) {
      const nameText = nameCell.textContent.toLowerCase();

      if (nameText.includes(nameString.toLowerCase())) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
};

const filterTableById = (searchId) => {
  const rows = mainTable.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    const idCell = row.querySelector("td:first-child");
    if (idCell) {
      const rowId = parseInt(idCell.innerHTML);
      if (rowId === searchId) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
};

const initTable = (key) => {
  content.innerHTML = "";
  const buttonsObject = rowData[key];

  searchByIdInput = createInput(`1 - ${buttonsObject.length}`);
  const searchByIdDiv = createDiv("Search by Id", searchByIdInput, createButton("Search", () => filterTableById(parseInt(searchByIdInput.value))));

  searchByNameInput = createInput(key === "films" ? "Search by title" : "Search by name");
  const searchByNameDiv = createDiv(
    key === "films" ? "Search by title" : "Search by name",
    searchByNameInput,
    createButton("Search", () => filterTableByName(searchByNameInput.value))
  );

  mainTable = createTable(buttonsObject);

  content.appendChild(searchByIdDiv);
  content.appendChild(searchByNameDiv);
  content.appendChild(mainTable);

  const tableButtons = createTableButtons();
  content.appendChild(tableButtons);

  const deleteButton = createDeleteButton();
  content.appendChild(deleteButton);

  document.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const atLeastOneChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    deleteButton.style.display = atLeastOneChecked ? "block" : "none";
  });
};

const initUI = () => {
  Object.keys(rowData).forEach((key) => {
    const button = createButton(key, () => initTable(key));
    buttons.appendChild(button);
  });
};

initUI();