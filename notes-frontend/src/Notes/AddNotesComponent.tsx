import React, { useState } from "react";
import AddNotesPresenter from "./AddNotesPresenter";

export default function AddNotesComponent() {
  let addNotesPresenter = new AddNotesPresenter();
  const [note, setNote] = useState("");

  return (
    <div className="relative flex w-full flex-wrap items-stretch mb-3">
      <h5>New Note</h5>
      <input
        type="text"
        className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        onKeyUp={(e) => setNote((e.target as HTMLInputElement).value)}
      />
      <button
        onClick={() => {
          addNotesPresenter.addNote(note);
        }}
      >
        add note
      </button>
    </div>
  );
}
