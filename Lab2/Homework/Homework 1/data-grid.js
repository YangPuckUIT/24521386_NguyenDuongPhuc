
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

  getTotalPages() {
    return Math.max(
      1,
      Math.ceil(this.getProcessedData().length / this.pageSize)
    );
  }

  render() {
    const processedData = this.getProcessedData();
    const start = (this.currentPage - 1) * this.pageSize;
    const pageData = processedData.slice(
      start,
      start + this.pageSize
    );

    const table = document.createElement("table");
    table.setAttribute("role", "grid");
    table.setAttribute("aria-label", this.ariaLabel);
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

          const indicator = document.createElement("span");
          indicator.setAttribute("aria-hidden", "true");
          indicator.textContent =
            this.sortDirection === "asc" ? " ↑" : " ↓";
          button.appendChild(indicator);
        }

        button.addEventListener("click", () => {
          this.sortBy(column.accessorKey);
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

      this.columns.forEach((column, columnIndex) => {
        const td = document.createElement("td");
        td.setAttribute("role", "gridcell");
        td.setAttribute("aria-colindex", String(columnIndex + 1));

        const value = item[column.accessorKey];
        td.textContent = value == null ? "" : String(value);

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

  sortBy(key) {
    if (this.sortKey === key) {
      this.sortDirection =
        this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = key;
      this.sortDirection = "asc";
    }

    this.currentPage = 1;
    this.update();
  }

  setSearch(query) {
    this.searchQuery = query.trim();
    this.currentPage = 1;
    this.update();
  }

  goToPage(page) {
    if (page < 1 || page > this.getTotalPages()) return;

    this.currentPage = page;
    this.update();
  }

  update() {
    if (!this.container) return;

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
  }

  mount(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("DataGrid requires a valid container.");
    }

    this.container = container;
    this.update();
  }
}
