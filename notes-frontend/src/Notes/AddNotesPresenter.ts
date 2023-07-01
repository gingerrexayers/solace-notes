import notesRepository from "./NotesRepository";

export default class AddNotesPresenter {
  addNote = async (note: string) => {
    await notesRepository.addNote({ note });
  };
}
