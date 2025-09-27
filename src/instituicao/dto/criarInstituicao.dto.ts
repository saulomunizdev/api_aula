import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail} from "class-validator";
import { SenhaForte } from "src/usuario/validacao/strong-pass.validator";


export class CriaInstituicaoDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome da instituição não pode ser vazio'})
    @ApiProperty({example:'CVV', description: 'Nome da instituição'})
    nomeInstituicao: string;

    @IsString()
    @IsNotEmpty({message: 'O nome do responsável não pode ser vazio'})
    @ApiProperty({example:'saulo', description: 'Nome do responsavel pela instituição'})
    nomeResponsavel: string;

    @IsString()
    @IsNotEmpty({message: 'A cidade não pode ser vazio'})
    @ApiProperty({example:'Bauru', description: 'Nome da cidade da instituição'})
    cidade: string;

    @IsString()
    @IsNotEmpty({message: 'O estado não pode ser vazio'})
    @ApiProperty({example:'SP', description: 'Nome do estado da instituição'})
    estado: string;

    @IsString()
    @IsNotEmpty({message: 'O telefone não pode ser vazio'})
    @ApiProperty({example:'(11)99999999', description: 'Telefone da instituição'})
    telefone: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    @IsString()
    @IsNotEmpty({message: 'O email não pode ser vazio'})
    @ApiProperty({example:'teste@teste.com.br', description: 'email da instituição'})
    email: string;

    @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:'123456', description: 'A senha deve ter no mínimo 6 caracteres'})
    @SenhaForte({message: 'A senha deve ser mais forte'})
    senha: string


}