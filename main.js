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

const createSearchDiv = (label, input, button) => {
  const div = document.createElement("div");
  div.innerHTML = `${label} :`;
  div.appendChild(input);
  div.appendChild(button);
  return div;
};

const createTable = (data) => {
  const table = document.createElement("table");
  table.style.border = "3px solid";

  let areKeysDisplayed = false;
  let displayKeyIndex = 0;
  let keyId = 1;
  const maxDisplayedKeyIndex = 6;

  for (const key in data) {
    const props = data[key];

    if (!areKeysDisplayed) {
      const trKey = document.createElement("tr");
      trKey.style.border = "1px solid";
      table.appendChild(trKey);

      const tdKeyId = document.createElement("td");
      tdKeyId.innerHTML = "ID";
      tdKeyId.style.border = "1px solid";
      trKey.appendChild(tdKeyId);

      for (const propKey in props) {
        if (
          displayKeyIndex % 2 === 0 &&
          displayKeyIndex < maxDisplayedKeyIndex
        ) {
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

      areKeysDisplayed = true;
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

      if (displayKeyIndex % 2 === 0 && displayKeyIndex < maxDisplayedKeyIndex) {
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
        const day =
          (dateObject.getDate() < 10 ? "0" : "") + dateObject.getDate();
        const month =
          (dateObject.getMonth() + 1 < 10 ? "0" : "") +
          (dateObject.getMonth() + 1);
        const formattedDate = `${day}-${month}-${dateObject.getFullYear()}`;
        tdCreatedValue.innerHTML = formattedDate;
        trValue.appendChild(tdCreatedValue);
      }

      if (displayKeyIndex === 5) {
        const buttonPlus = createButton("+", () => showModal(props));
        const buttonMinus = createButton("-", () => table.removeChild(trValue));
        const rowCheckbox = document.createElement("input");
        rowCheckbox.classList.add("input-default");
        rowCheckbox.type = "checkbox";
        rowCheckbox.classList.add("input-default");

        buttonPlus.classList.add("button-plus");
        buttonMinus.classList.add("button-minus");

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
  const buttonPrev = createButton("Prev", () => {
    if (tableInput.value > 1) {
      tableInput.value = parseInt(tableInput.value) - 1;
      updateTableRows(tableInput.value, selectElement.value);
      updatePageCounter();
    }
    if (parseInt(tableInput.value) === 1) {
      buttonPrev.disabled = true;
      buttonPrev.classList.add("disabledButton");
    }
    buttonNext.disabled = false;
    buttonNext.classList.remove("disabledButton");
  });

  buttonPrev.disabled = true;
  buttonPrev.classList.add("disabledButton");

  const buttonNext = createButton("Next", () => {
    if (tableInput.value < calculateMaxPages(selectElement.value)) {
      tableInput.value = parseInt(tableInput.value) + 1;
      updateTableRows(tableInput.value, selectElement.value);
      updatePageCounter();
    }
    if (parseInt(tableInput.value) === calculateMaxPages(selectElement.value)) {
      buttonNext.disabled = true;
      buttonNext.classList.add("disabledButton");
    }
    buttonPrev.disabled = false;
    buttonPrev.classList.remove("disabledButton");
  });

  const tableInput = createInput("1");
  tableInput.value = 1;

  const option1 = document.createElement("option");
  option1.value = "10";
  option1.text = "10";

  const option2 = document.createElement("option");
  option2.value = "20";
  option2.text = "20";

  const selectElement = document.createElement("select");

  selectElement.add(option1);
  selectElement.add(option2);

  selectElement.value = "10";

  selectElement.addEventListener("change", (event) => {
    const selectedValue = parseInt(event.target.value);
    const inputValue = parseInt(tableInput.value);
    updateTableRows(inputValue, selectedValue);
    updatePageCounter();

    const maxPages = calculateMaxPages(selectedValue);
    if (selectedValue == 10) {
      updateTableRows(inputValue * 2 - 1, 10);
      tableInput.value = inputValue * 2 - 1;
      if (
        calculateMaxPages(selectElement.value) !== parseInt(tableInput.value)
      ) {
        buttonNext.disabled = false;
        buttonNext.classList.remove("disabledButton");
      }
      updatePageCounter();
    } else if (selectedValue == 20) {
      updateTableRows(Math.ceil(inputValue / 2), 20);
      tableInput.value = Math.ceil(inputValue / 2);
      if (calculateMaxPages(selectElement.value) !== 1) {
        buttonPrev.disabled = false;
        buttonPrev.classList.remove("disabledButton");
      }
      if (parseInt(tableInput.value) === 1){
        buttonPrev.disabled = true;
        buttonPrev.classList.add("disabledButton");
      }
      if (calculateMaxPages(20) == parseInt(tableInput.value)) {
        buttonNext.disabled = true;
        buttonNext.classList.add("disabledButton");
      }
      updatePageCounter();
    } else if (inputValue > maxPages) {
      tableInput.value = maxPages;
      updateTableRows(tableInput.value, selectedValue);
      updatePageCounter();
    }
  });

  if (calculateMaxPages(selectElement.value) === 1) {
    buttonNext.disabled = true;
    buttonNext.classList.add("disabledButton");
  }

  const pageCounterDiv = document.createElement("div");
  pageCounterDiv.classList.add("page-counter");

  const updatePageCounter = () => {
    pageCounterDiv.innerHTML = `Page ${
      tableInput.value
    } from ${calculateMaxPages(selectElement.value)}`;
  };
  tableButtons.style.display = "flex";
  tableButtons.style.justifyContent = "space-between";
  tableButtons.style.marginBottom = "15px";
  tableButtons.appendChild(buttonPrev);
  tableButtons.appendChild(tableInput);
  tableButtons.appendChild(buttonNext);
  tableButtons.appendChild(pageCounterDiv);
  tableButtons.appendChild(selectElement);
  tableInput.classList.add("table-input");

  tableInput.addEventListener("input", (event) => {
    const inputValue = parseInt(event.target.value);
    const maxPages = calculateMaxPages(selectElement.value);
    const selectedValue = parseInt(selectElement.value);
    if(inputValue !== maxPages) {
      buttonNext.disabled = false;
      buttonNext.classList.remove("disabledButton");
    }
    if (inputValue === 1) {
      buttonPrev.disabled = true;
      buttonPrev.classList.add("disabledButton");
    }
    if(inputValue === maxPages) {
      buttonNext.disabled = true;
      buttonNext.classList.add("disabledButton");
    } 
    if(inputValue !== 1) {
      buttonPrev.disabled=false;
      buttonPrev.classList.remove("disabledButton");
    }
    if (inputValue < 1) {
      event.target.value = 1;
      buttonPrev.disabled = true;
      buttonPrev.classList.add("disabledButton");
    } else if (inputValue > maxPages) {
      event.target.value = maxPages;
      buttonNext.disabled = true;
      buttonNext.classList.add("disabledButton");
    }
    updateTableRows(event.target.value, selectedValue);
    updatePageCounter();
  });

  tableInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const inputValue = parseInt(tableInput.value);
      const selectedValue = parseInt(selectElement.value);
      if(inputValue !== calculateMaxPages(selectedValue)) {
        buttonNext.disabled = false;
        buttonNext.classList.remove("disabledButton");
      }
      updateTableRows(inputValue, selectedValue);
      updatePageCounter();
    }
  });

  updateTableRows(1, 10);
  updatePageCounter();

  return tableButtons;
};

const calculateMaxPages = (selectElementValue) => {
  const rowsPerPage = parseInt(selectElementValue);
  const totalRows = mainTable.querySelectorAll("tr").length - 1;
  return Math.ceil(totalRows / rowsPerPage);
};

const updateTableRows = (inputValue, selectedValue) => {
  const rows = mainTable.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index === 0) {
      return;
    }

    if (
      index >= (inputValue - 1) * selectedValue + 1 &&
      index <= inputValue * selectedValue
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
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
    modal.classList.add("modal");

    const buttonX = createButton("X", () => {
      isModalOpen = false;
      content.removeChild(modal);
    });
    modal.appendChild(buttonX);
    content.appendChild(modal);

    const tableModal = document.createElement("table");
    tableModal.classList.add("tableModal");
    modal.appendChild(tableModal);

    for (const propKey in data) {
      const propValue = data[propKey];
      const trModal = document.createElement("tr");
      const tdKeyModal = document.createElement("td");
      const tdValueModal = document.createElement("td");

      tdKeyModal.classList.add("tdModal");

      tdValueModal.classList.add("tdModal");

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

  const loadingContainer = document.getElementById("loadingContainer");
  content.classList.add("hide-able-element");
  loadingContainer.style.display = "flex";
  setTimeout(() => {
    loadingContainer.style.display = "none";
    content.classList.remove("hide-able-element");
  }, 300);

  const footer = document.getElementById("footer");
  footer.classList.add("footer-relative");

  console.log(rowData[key]);

  content.innerHTML = "";
  const divSearches = document.createElement("div");
  const buttonsObject = rowData[key];

  searchByIdInput = createInput(`1 - ${buttonsObject.length}`);
  const searchByIdDiv = createSearchDiv(
    "Search by Id",
    searchByIdInput,
    createButton("Search", () =>
      filterTableById(parseInt(searchByIdInput.value))
    )
  );

  searchByNameInput = createInput(
    key === "films" ? "Search by title" : "Search by name"
  )
  const searchByNameDiv = createSearchDiv(
    key === "films" ? "Search by title" : "Search by name",
    searchByNameInput,
    createButton("Search", () => filterTableByName(searchByNameInput.value))
  );

searchByNameInput.classList.add("input-default");
searchByIdInput.classList.add("input-default");

  mainTable = createTable(buttonsObject);
  mainTable.classList.add("mainTable");
  divSearches.classList.add("div-searches")
  divSearches.appendChild(searchByIdDiv);
  divSearches.appendChild(searchByNameDiv);
  content.appendChild(divSearches);
  content.appendChild(mainTable);

  const tableButtons = createTableButtons();
  content.appendChild(tableButtons);

  const deleteButtonDiv = document.createElement("div")
  const deleteButton = createDeleteButton();
  deleteButtonDiv.appendChild(deleteButton);
  content.appendChild(deleteButtonDiv);

  document.addEventListener("change", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const atLeastOneChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    deleteButton.style.display = atLeastOneChecked ? "block" : "none";

    checkboxes.forEach((checkbox) => {
      const checkedRow = checkbox.closest("tr");
  
      if (checkbox.checked) {
        if (checkedRow) {
          checkedRow.classList.add("checked-row");
        }
      } else {
        if (checkedRow) {
          checkedRow.classList.remove("checked-row");
        }
      }
    });
  });
};

const initTheme = () => {
  const lightIcon = document.getElementById('lightIcon');
  const darkIcon = document.getElementById('darkIcon');
  const themeToggle = document.getElementById('themeToggle'); 
  lightIcon.style.display = 'none';

  themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode'); // Dodaj lub usuń klasę light-mode z body

    lightIcon.style.display = lightIcon.style.display === 'none' ? 'inline' : 'none';
    darkIcon.style.display = darkIcon.style.display === 'none' ? 'inline' : 'none';
  });

  initUI();
};

const initUI = () => {
  Object.keys(rowData).forEach((key) => {
    const button = createButton(key, () => initTable(key));
    button.classList.add("main-button");
    buttons.appendChild(button);
  });
};

initTheme();