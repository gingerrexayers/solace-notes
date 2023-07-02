import { observable, observe, makeObservable } from "mobx";
import notesRepository from "./NotesRepository";
import { NoteResponseDto } from "./dto/NoteResponse.dto";

export class NotesListPresenter {
  viewModel: NoteResponseDto[] = [];

  constructor() {
    makeObservable(this, {
      viewModel: observable,
    });
  }

  load = async () => {
    var self = this;
    observe(
      notesRepository,
      "notesPm",
      (obj) => {
        self.viewModel = obj.newValue;
      },
      true
    );
  };

  submitChanges = async (id: string, note: string | null): Promise<boolean> => {
    let result = null;
    if (note === null) {
      result = await notesRepository.deleteNote(id);
    } else {
      result = await notesRepository.updateNote({ id, note });
    }
    return result.success;
  };
}
