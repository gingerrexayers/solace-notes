import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNote.dto';
import { NotesService } from './notes.service';
import { NoteEntity } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  getAllNotes(): Promise<NoteEntity[]> {
    return this.notesService.findAll();
  }
}
