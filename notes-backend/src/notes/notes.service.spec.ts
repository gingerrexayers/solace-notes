import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { NoteEntity } from './note.entity';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { CreateNoteDto } from './dto/CreateNote.dto';

describe('NotesService', () => {
  let service: NotesService;
  let notesRepo: Repository<NoteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: Repository<NoteEntity>,
          useValue: createMock<Repository<NoteEntity>>(),
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    notesRepo = module.get<Repository<NoteEntity>>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a note', () => {
    const dto: CreateNoteDto = {
      note: 'here is a test note exceeding 20 characters',
    };
    service.create(dto);
    expect(notesRepo.save).toBeCalledWith(dto);
  });
});
