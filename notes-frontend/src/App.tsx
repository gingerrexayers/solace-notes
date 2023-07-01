import React from "react";
import "./App.css";
import AddNotesComponent from "./Notes/AddNotesComponent";
import { NotesListComponent } from "./Notes/NotesListComponent";

function App() {
  return (
    <div className="App">
      <AddNotesComponent></AddNotesComponent>
      <NotesListComponent></NotesListComponent>
    </div>
  );
}

export default App;
