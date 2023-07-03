import { observable, makeObservable } from "mobx";
import { AddNoteDto } from "./dto/AddNote.dto";
import { HttpGateway } from "../Core/HttpGateway";
import { NoteResponseDto } from "./dto/NoteResponse.dto";
import { UpdateNoteDto } from "./dto/UpdateNote.dto";
import { SuccessResponse } from "./dto/SuccessResponse.dto";

export class NotesRepository {
  notesPm: NoteResponseDto[] = [];
  httpGateway = new HttpGateway();
  host = process.env.REACT_APP_BACKEND_HOST;
  port = process.env.REACT_APP_BACKEND_PORT;

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
    await this.httpGateway.post(`http://${this.host}:${this.port}/notes`, dto);
    await this.loadApiData();
  };

  updateNote = async (dto: UpdateNoteDto): Promise<SuccessResponse> => {
    const result = await this.httpGateway.patch(
      `http://${this.host}:${this.port}/notes/` + dto.id,
      dto
    );
    if (result.success) {
      this.notesPm = this.notesPm.map((note) =>
        note.id === dto.id ? { ...note, note: dto.note } : note
      );
    }
    return result;
  };

  deleteNote = async (id: string): Promise<SuccessResponse> => {
    const result = await this.httpGateway.delete(
      `http://${this.host}:${this.port}/notes/` + id
    );
    if (result.success) {
      this.notesPm = this.notesPm.filter((note) => note.id !== id);
    }
    return result;
  };

  loadApiData = async () => {
    const response = await this.httpGateway.get(
      `http://${this.host}:${this.port}/notes`
    );
    this.notesPm = response.map((note: NoteResponseDto) => {
      return {
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      };
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
