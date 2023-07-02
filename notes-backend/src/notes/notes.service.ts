import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteEntity } from './note.entity';
import { CreateNoteDto } from './dto/CreateNote.dto';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { SuccessResponse } from './dto/SuccessResponse.type';

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

  async update(id: string, dto: UpdateNoteDto): Promise<SuccessResponse> {
    console.log(id, dto);
    const updateResult = await this.notesRepository.update(id, dto);
    if (updateResult.affected) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async remove(id: string): Promise<SuccessResponse> {
    const deleteResult = await this.notesRepository.delete(id);
    if (deleteResult.affected) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
