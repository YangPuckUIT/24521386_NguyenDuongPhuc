
export class DataGrid {
  constructor({ data, columns, onRowSelect, ariaLabel }) {
    this.data = data;
    this.columns = columns;
    this.onRowSelect = onRowSelect;
    this.ariaLabel = ariaLabel;

    this.searchQuery = "";
    this.sortKey = null;
    this.sortDirection = "asc";
    this.currentPage = 1;
    this.pageSize = 3;
    this.container = null;

    this.selectedRows = new Set();
    this.activeRow = 0;
    this.activeCol = 0;
  }

  getProcessedData() {
    let result = [...this.data];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();

      result = result.filter((item) =>
        this.columns.some((column) =>
          String(item[column.accessorKey] ?? "")
            .toLowerCase()
            .includes(query)
        )
      );
    }

    if (this.sortKey) {
      const key = this.sortKey;
      const direction = this.sortDirection === "asc" ? 1 : -1;

      result.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (typeof valueA === "number" &&
            typeof valueB === "number") {
          return (valueA - valueB) * direction;
        }

        return String(valueA ?? "").localeCompare(
          String(valueB ?? ""),
          undefined,
          { numeric: true, sensitivity: "base" }
        ) * direction;
      });
    }

    return result;
  }

  getPageData() {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.getProcessedData().slice(
      start,
      start + this.pageSize
    );
  }

  getTotalPages() {
    return Math.max(
      1,
      Math.ceil(this.getProcessedData().length / this.pageSize)
    );
  }

  getRowKey(item) {
    return String(item.id);
  }

  render() {
    const pageData = this.getPageData();

    const table = document.createElement("table");
    table.setAttribute("role", "grid");
    table.setAttribute("aria-label", this.ariaLabel);
    table.setAttribute(
    "aria-describedby",
    "keyboard-help"
    );
    table.setAttribute("aria-multiselectable", "true");
    table.setAttribute("aria-rowcount", String(pageData.length + 1));
    table.setAttribute("aria-colcount", String(this.columns.length));

    const thead = document.createElement("thead");
    thead.setAttribute("role", "rowgroup");

    const headerRow = document.createElement("tr");
    headerRow.setAttribute("role", "row");
    headerRow.setAttribute("aria-rowindex", "1");

    this.columns.forEach((column, columnIndex) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.setAttribute("role", "columnheader");
      th.setAttribute("aria-colindex", String(columnIndex + 1));

      if (column.sortable) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sort-button";
        button.textContent = column.header;

        if (this.sortKey === column.accessorKey) {
          th.setAttribute(
            "aria-sort",
            this.sortDirection === "asc"
              ? "ascending"
              : "descending"
          );
        }

        button.addEventListener("click", () => {
          const hadFocus = document.activeElement === button;
          this.sortBy(column.accessorKey);

          if (hadFocus) {
            const newButton = this.container.querySelector(
              `th:nth-child(${columnIndex + 1}) .sort-button`
            );
            newButton?.focus();
          }
        });

        th.appendChild(button);
      } else {
        th.textContent = column.header;
      }

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("role", "rowgroup");

    pageData.forEach((item, rowIndex) => {
      const tr = document.createElement("tr");
      tr.setAttribute("role", "row");
      tr.setAttribute("aria-rowindex", String(rowIndex + 2));

      const rowKey = this.getRowKey(item);

      tr.setAttribute(
        "aria-selected",
        String(this.selectedRows.has(rowKey))
      );

      if (this.selectedRows.has(rowKey)) {
        tr.classList.add("is-selected");
      }

      this.columns.forEach((column, columnIndex) => {
        const td = document.createElement("td");
        td.setAttribute("role", "gridcell");
        td.setAttribute("aria-colindex", String(columnIndex + 1));

        td.dataset.row = rowIndex;
        td.dataset.col = columnIndex;

        td.tabIndex =
          rowIndex === this.activeRow &&
          columnIndex === this.activeCol
            ? 0
            : -1;

        const value = item[column.accessorKey];
        td.textContent = value == null ? "" : String(value);

        td.addEventListener("keydown", (event) => {
          this.handleKeyDown(event, rowIndex, columnIndex);
        });

        td.addEventListener("focus", () => {
          this.activeRow = rowIndex;
          this.activeCol = columnIndex;
          this.syncTabIndex();
        });

        td.addEventListener("click", () => {
          this.focusCell(rowIndex, columnIndex);
        });

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    if (pageData.length === 0) {
      const tr = document.createElement("tr");
      tr.setAttribute("role", "row");

      const td = document.createElement("td");
      td.colSpan = this.columns.length;
      td.textContent = "No matching records found.";
      td.className = "empty-state";

      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    table.append(thead, tbody);
    return table;
  }

  syncTabIndex() {
    const cells = this.container.querySelectorAll(
      'tbody [role="gridcell"]'
    );

    cells.forEach((cell) => {
      const row = Number(cell.dataset.row);
      const col = Number(cell.dataset.col);

      cell.tabIndex =
        row === this.activeRow && col === this.activeCol
          ? 0
          : -1;
    });
  }

  focusCell(row, col) {
    const pageData = this.getPageData();

    if (pageData.length === 0) return;

    this.activeRow = Math.max(
      0,
      Math.min(row, pageData.length - 1)
    );

    this.activeCol = Math.max(
      0,
      Math.min(col, this.columns.length - 1)
    );

    this.syncTabIndex();

    const cell = this.container.querySelector(
      `td[data-row="${this.activeRow}"][data-col="${this.activeCol}"]`
    );

    cell?.focus();
  }

  handleKeyDown(event, row, col) {
    let nextRow = row;
    let nextCol = col;

    switch (event.key) {
      case "ArrowUp":
        nextRow--;
        break;

      case "ArrowDown":
        nextRow++;
        break;

      case "ArrowLeft":
        nextCol--;
        break;

      case "ArrowRight":
        nextCol++;
        break;

      case "Enter":
        event.preventDefault();
        this.selectRow(row, true);
        return;

      case " ":
        event.preventDefault();
        this.selectRow(row, false);
        return;

      default:
        return;
    }

    event.preventDefault();
    this.focusCell(nextRow, nextCol);
  }

  selectRow(rowIndex, selectOnly = false) {
    const item = this.getPageData()[rowIndex];
    if (!item) return;

    const key = this.getRowKey(item);

    if (selectOnly) {
      this.selectedRows.clear();
      this.selectedRows.add(key);
    } else {
      if (this.selectedRows.has(key)) {
        this.selectedRows.delete(key);
      } else {
        this.selectedRows.add(key);
      }
    }

    this.update(true);

    const isSelected = this.selectedRows.has(key);

this.announce(
  `${item.name ?? "Row"} ${
    isSelected ? "selected" : "deselected"
  }. ${this.selectedRows.size} rows selected.`
);

    if (typeof this.onRowSelect === "function") {
      this.onRowSelect(item);
    }
  }

  sortBy(key) {
    if (this.sortKey === key) {
      this.sortDirection =
        this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = key;
      this.sortDirection = "asc";
    }

    this.currentPage = 1;
    this.activeRow = 0;
    this.update();

    const column = this.columns.find(
  (item) => item.accessorKey === key
);

this.announce(
  `Sorted by ${column?.header ?? key}, ${
    this.sortDirection === "asc"
      ? "ascending"
      : "descending"
  }.`
);

  }

  setSearch(query) {
    this.searchQuery = query.trim();
    this.currentPage = 1;
    this.activeRow = 0;
    this.update();

    this.announce(
  `${this.getProcessedData().length} matching records.`
);

  }

  goToPage(page) {
    if (page < 1 || page > this.getTotalPages()) return;

    this.currentPage = page;
    this.activeRow = 0;
    this.update();

    this.announce(
  `Page ${this.currentPage} of ${this.getTotalPages()}.`
);

  }

  update(restoreFocus = false) {
    if (!this.container) return;

    const hadGridFocus = this.container.contains(
      document.activeElement
    );

    this.container.replaceChildren(this.render());

    const total = this.getProcessedData().length;
    const totalPages = this.getTotalPages();

    const start = total === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;

    const end = Math.min(
      this.currentPage * this.pageSize,
      total
    );

    document.querySelector("#result-count").textContent =
      `${total} records`;

    document.querySelector("#page-info").textContent =
      `Showing ${start}–${end} of ${total} records`;

    document.querySelector("#current-page").textContent =
      `Page ${this.currentPage} of ${totalPages}`;

    document.querySelector("#prev-page").disabled =
      this.currentPage === 1;

    document.querySelector("#next-page").disabled =
      this.currentPage === totalPages;

    if (restoreFocus && hadGridFocus) {
      this.focusCell(this.activeRow, this.activeCol);
    }
  }

  announce(message) {
  const region = document.querySelector("#grid-announcement");

  if (region) {
    region.textContent = message;
  }
}

  mount(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("DataGrid requires a valid container.");
    }

    this.container = container;
    this.update();
  }
}
