import * as React from "react";
import { useState, useEffect } from "react";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import { NotesListPresenter } from "./NotesListPresenter";
import { NoteResponseDto } from "./dto/NoteResponse.dto";
import { NoteComponent } from "./NoteComponent";

export const NotesListComponent = observer((props) => {
  let notesListPresenter = new NotesListPresenter();
  const [shadowViewModel, setViewModel] = useState<NoteResponseDto[]>([]);

  useEffect(() => {
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
  }, [notesListPresenter]);

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-wrap w-full justify-around">
          {shadowViewModel.map((note, i) => {
            return (
              <NoteComponent
                note={note}
                submitChanges={async (id, note) =>
                  await notesListPresenter.submitChanges(id, note)
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
});
