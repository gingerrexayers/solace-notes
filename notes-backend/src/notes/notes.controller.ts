import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNote.dto';
import { NotesService } from './notes.service';
import { NoteEntity } from './note.entity';
import { UpdateNoteDto } from './dto/UpdateNote.dto';
import { SuccessResponse } from './dto/SuccessResponse.type';

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

  @Patch('/:id')
  updateNote(
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ): Promise<SuccessResponse> {
    return this.notesService.update(id, dto);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string): Promise<SuccessResponse> {
    return this.notesService.remove(id);
  }
}
