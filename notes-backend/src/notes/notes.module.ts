import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './note.entity';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
