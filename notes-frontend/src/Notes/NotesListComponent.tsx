import * as React from "react";
import { useState, useEffect } from "react";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { NotesListPresenter } from "./NotesListPresenter";
import { NoteResponseDto } from "./dto/NoteResponse.dto";

export const NotesListComponent = observer((props) => {
  const [shadowViewModel, setViewModel] = useState<NoteResponseDto[]>([]);

  useEffect(() => {
    let notesListPresenter = new NotesListPresenter();
    async function load() {
      observe(
        notesListPresenter,
        "viewModel",
        (obj) => {
          setViewModel(obj.newValue);
        },
        true
      );
      await notesListPresenter.load();
    }
    load();
  }, []);

  return (
    <>
      <div>
        <h5 className="note-list-title">Notes</h5>
        <div>
          {shadowViewModel.map((note, i) => {
            return <div key={i}>{note.note}</div>;
          })}
        </div>
      </div>
    </>
  );
});
