import React from "react";
import "./App.css";
import AddNoteComponent from "./Notes/AddNoteComponent";
import { NotesListComponent } from "./Notes/NotesListComponent";

function App() {
  return (
    <div className="bg-white dark:bg-slate-900 w-full h-screen overflow-y-scroll">
      <div className="flex flex-col items-center flex-wrap">
        <h1 className="w-full text-5xl pt-5 text-center text-slate-800 dark:text-slate-100">
          Solace Notes
        </h1>
        <AddNoteComponent />
        <NotesListComponent />
      </div>
    </div>
  );
}

export default App;
