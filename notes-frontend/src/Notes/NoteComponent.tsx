import * as React from "react";
import { useState } from "react";
import { NoteResponseDto } from "./dto/NoteResponse.dto";

interface EditState {
  isEditing: boolean;
  note: string;
}

export const NoteComponent = (props: {
  note: NoteResponseDto;
  submitChanges: (id: string, note: string | null) => Promise<boolean>;
}) => {
  let submissionEnabled = false;
  const [deleteConfirmationState, setDeleteConfirmationState] = useState(false);
  const [editState, setEditState] = useState<EditState>({
    isEditing: false,
    note: props.note.note,
  });

  if (
    editState.isEditing &&
    editState.note.length >= 20 &&
    editState.note.length <= 300
  ) {
    submissionEnabled = true;
  }

  return (
    <div className="flex-row w-1/2 max-w-md min-w-max px-8 py-4 mt-16 mx-4 bg-slate-100 rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex mt-1 justify-end">
        <span
          className={`mr-2 text-slate-300 ${
            deleteConfirmationState ? "inline" : "hidden"
          }`}
          onClick={() => setDeleteConfirmationState(false)}
        >
          CANCEL
        </span>
        <span
          className={`-mr-3 text-red-300 ${
            deleteConfirmationState ? "inline" : "hidden"
          }`}
          onClick={(e) => {
            props.submitChanges(props.note.id, null);
            setEditState({ isEditing: false, note: props.note.note });
            setDeleteConfirmationState(false);
          }}
        >
          DELETE
        </span>
        <svg
          className={`object-cover h-6 w-6 text-red-300 ${
            deleteConfirmationState ? "hidden" : "block"
          }`}
          onClick={() => {
            setDeleteConfirmationState(true);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
        {props.note.createdAt.toLocaleString()}
      </h2>

      {editState.isEditing ? (
        <textarea
          value={editState.note}
          className="bg-transparent w-full align-middle mx-2 mt-2 p-1 rounded-lg text-sm text-gray-600 dark:text-gray-200 bg-slate-100 dark:bg-gray-700"
          onChange={(e) =>
            setEditState({
              isEditing: true,
              note: (e.target as HTMLTextAreaElement).value,
            })
          }
        ></textarea>
      ) : (
        <p className="text-left mx-2 mt-2 p-1 text-sm text-gray-600 dark:text-gray-200">
          {props.note.note}
        </p>
      )}
      {editState.isEditing && editState.note.length < 20 && (
        <p className="text-red-500 mt-1">
          Note must be at least 20 characters long
        </p>
      )}
      {editState.isEditing && editState.note.length > 300 && (
        <p className="text-red-500 mt-1">
          Note must be at most 300 characters long
        </p>
      )}

      <div className="flex justify-end mt-4">
        {!editState.isEditing ? (
          <button
            onClick={() => {
              setEditState({
                isEditing: true,
                note: props.note.note,
              });
            }}
            className="text-lg font-medium text-blue-600 dark:text-blue-300"
            role="link"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setEditState({
                  isEditing: false,
                  note: props.note.note,
                });
              }}
              className="text-lg mr-2 font-medium text-red-600 dark:text-red-300"
              role="link"
            >
              Cancel
            </button>
            <button
              disabled={!submissionEnabled}
              onClick={async () => {
                const result = await props.submitChanges(
                  props.note.id,
                  editState.note
                );
                if (result) {
                  setEditState({
                    isEditing: false,
                    note: editState.note,
                  });
                }
              }}
              className="disabled:text-slate-300 text-lg font-medium text-blue-600 dark:text-blue-300"
              role="link"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};
