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
}
