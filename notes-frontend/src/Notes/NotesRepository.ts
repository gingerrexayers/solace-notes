import { observable, makeObservable } from "mobx";
import { AddNoteDto } from "./dto/AddNote.dto";
import { HttpGateway } from "../Core/HttpGateway";
import { NoteResponseDto } from "./dto/NoteResponse.dto";

export class NotesRepository {
  notesPm = [];
  httpGateway = new HttpGateway();

  constructor() {
    makeObservable(this, {
      notesPm: observable,
    });
    this.load();
  }
  load = async () => {
    if (this.notesPm.length === 0) {
      await this.loadApiData();
    } else {
      this.refreshModelData();
    }
  };

  addNote = async (dto: AddNoteDto) => {
    await this.httpGateway.post("http://localhost:3000/notes", dto);
    await this.loadApiData();
  };

  loadApiData = async () => {
    const response = await this.httpGateway.get("http://localhost:3000/notes");
    console.log(response);
    this.notesPm = response.map((note: NoteResponseDto) => {
      return note;
    });
  };

  refreshModelData = () => {
    this.notesPm = this.notesPm.map((pm) => {
      return pm;
    });
  };
}
const notesRepository = new NotesRepository();
export default notesRepository;
