export class DataGrid {
  constructor({ data, columns, onRowSelect, ariaLabel }) {
    this.data = data;
    this.columns = columns;
    this.onRowSelect = onRowSelect;
    this.ariaLabel = ariaLabel;
  }

  render() {
    const table = document.createElement("table");

    table.setAttribute("role", "grid");
    table.setAttribute("aria-label", this.ariaLabel);
    table.setAttribute("aria-rowcount", this.data.length + 1);
    table.setAttribute("aria-colcount", this.columns.length);

    const thead = document.createElement("thead");
    thead.setAttribute("role", "rowgroup");

    const headerRow = document.createElement("tr");
    headerRow.setAttribute("role", "row");
    headerRow.setAttribute("aria-rowindex", "1");

    this.columns.forEach((column, columnIndex) => {
      const th = document.createElement("th");

      th.setAttribute("scope", "col");
      th.setAttribute("role", "columnheader");
      th.setAttribute("aria-colindex", columnIndex + 1);

      th.textContent = column.header;

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("role", "rowgroup");

    this.data.forEach((item, rowIndex) => {
      const tr = document.createElement("tr");

      tr.setAttribute("role", "row");
      tr.setAttribute("aria-rowindex", rowIndex + 2);

      this.columns.forEach((column, columnIndex) => {
        const td = document.createElement("td");

        td.setAttribute("role", "gridcell");
        td.setAttribute("aria-colindex", columnIndex + 1);

        const value = item[column.accessorKey];

        td.textContent = value == null ? "" : String(value);

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
  }

  mount(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("DataGrid requires a valid container.");
    }

    container.replaceChildren(this.render());
  }
}