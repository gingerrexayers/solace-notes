import React, { useState } from "react";
import AddNotesPresenter from "./AddNotesPresenter";

export default function AddNoteComponent() {
  let addNotesPresenter = new AddNotesPresenter();
  let submissionEnabled = false;

  const [note, setNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  if (note.length >= 20 && note.length <= 300) {
    submissionEnabled = true;
  }

  return (
    <div
      className={`max-w-md min-w-fit h-fit px-8 py-4 mt-16 mx-4 bg-slate-100 rounded-lg shadow-lg dark:bg-gray-800 ${
        isAdding ? "w-2/3" : ""
      }`}
    >
      <h2
        className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0"
        onClick={() => setIsAdding(true)}
      >
        New Note
      </h2>

      {isAdding && (
        <>
          <textarea
            value={note}
            className="bg-transparent w-full align-middle mx-2 mt-2 p-1 rounded-lg text-sm text-gray-600 dark:text-gray-200 bg-slate-100 dark:bg-gray-700"
            onChange={(e) => setNote((e.target as HTMLTextAreaElement).value)}
          ></textarea>
          {note.length < 20 && (
            <p className="text-red-500 mt-1">
              Note must be at least 20 characters long
            </p>
          )}
          {note.length > 300 && (
            <p className="text-red-500 mt-1">
              Note must be at most 300 characters long
            </p>
          )}

          <div className="flex justify-end mt-4">
            <>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNote("");
                }}
                className="text-lg mr-2 font-medium text-red-600 dark:text-red-300"
                role="link"
              >
                Cancel
              </button>
              <button
                disabled={!submissionEnabled}
                onClick={async () => {
                  await addNotesPresenter.addNote(note);
                  setNote("");
                  setIsAdding(false);
                }}
                className="disabled:text-slate-300 text-lg font-medium text-blue-600 dark:text-blue-300"
                role="link"
              >
                Save
              </button>
            </>
          </div>
        </>
      )}
    </div>
  );
}
