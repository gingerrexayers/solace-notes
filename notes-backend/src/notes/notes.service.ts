import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from './note.entity';
import { CreateNoteDto } from './dto/CreateNote.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private notesRepository: Repository<NoteEntity>,
  ) {}

  create(dto: CreateNoteDto): Promise<NoteEntity> {
    const note = new NoteEntity();
    note.note = dto.note;
    return this.notesRepository.save(note);
  }

  findAll(): Promise<NoteEntity[]> {
    return this.notesRepository.find();
  }

  findOne(id: string): Promise<NoteEntity | null> {
    return this.notesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
