import { DataGrid } from "./data-grid.js";

const students = [
  {
    id: "24521386",
    name: "Nguyen Duong Phuc",
    major: "Information Systems",
    gpa: 3.8,
    status: "Active"
  },
  {
    id: "24521001",
    name: "Tran Minh Anh",
    major: "Computer Science",
    gpa: 3.6,
    status: "Active"
  },
  {
    id: "24521002",
    name: "Le Quoc Bao",
    major: "Information Security",
    gpa: 3.2,
    status: "Inactive"
  },
  {
    id: "24521003",
    name: "Pham Gia Huy",
    major: "Software Engineering",
    gpa: 3.9,
    status: "Active"
  },
  {
    id: "24521004",
    name: "Vo Thanh Ha",
    major: "Information Systems",
    gpa: 3.5,
    status: "Active"
  }
];

const columns = [
  {
    header: "Student ID",
    accessorKey: "id",
    sortable: true
  },
  {
    header: "Full Name",
    accessorKey: "name",
    sortable: true
  },
  {
    header: "Major",
    accessorKey: "major",
    sortable: true
  },
  {
    header: "GPA",
    accessorKey: "gpa",
    sortable: true
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: false
  }
];

const grid = new DataGrid({
  data: students,
  columns,
  ariaLabel: "Student records data grid",
  onRowSelect: (student) => {
    console.log("Selected student:", student);
  }
});

const container = document.querySelector("#data-grid-container");
const status = document.querySelector("#app-status");

grid.mount(container);

const searchInput = document.querySelector("#grid-search");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");

searchInput.addEventListener("input", (event) => {
  grid.setSearch(event.target.value);
});

prevButton.addEventListener("click", () => {
  grid.goToPage(grid.currentPage - 1);
});

nextButton.addEventListener("click", () => {
  grid.goToPage(grid.currentPage + 1);
});

status.textContent =
  `Data Grid loaded successfully. ${students.length} student records.`;