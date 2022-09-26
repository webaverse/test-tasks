import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import movies from "./movies";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ListActions = ({ row }) => (
  <DropdownButton key={`actions-${row.id}`} title="Actions">
    <Dropdown.Item href={`#/cubes/${row.id}/edit`}>Edit</Dropdown.Item>
    <Dropdown.Item href={`#/cubes/${row.id}/targets`}>Targets</Dropdown.Item>
    <Dropdown.Item href={`#/cubes/${row.id}/clone`}>Clone</Dropdown.Item>
  </DropdownButton>
);

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Directior",
    selector: "director",
    sortable: true
  },
  {
    name: "Runtime (m)",
    selector: "runtime",
    sortable: true,
    right: true
  },
  {
    name: "Actions",
    cell: row => <ListActions row={row} />
  }
];

function App() {
  return (
    <div className="App">
      <div>
        Works outside table
        <ListActions row={{ id: 999 }} />
      </div>
      <hr />
      <Card>
        <DataTable
          title="Movies"
          columns={columns}
          data={movies}
          defaultSortField="title"
          sortIcon={<SortIcon />}
          pagination
          selectableRows
        />
      </Card>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
