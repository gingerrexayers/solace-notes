import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @Length(20, 300)
  note: string;
}
