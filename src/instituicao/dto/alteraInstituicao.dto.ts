import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional} from "class-validator";
import { SenhaForte } from "src/usuario/validacao/strong-pass.validator";


export class AlteraInstituicaoDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome da instituição não pode ser vazio'})
    @ApiPropertyOptional({example:'CVV', description: 'Nome da instituição'})
    nomeInstituicao: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome do responsável não pode ser vazio'})
    @ApiPropertyOptional({example:'saulo', description: 'Nome do responsavel pela instituição'})
    nomeResponsavel: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'A cidade não pode ser vazio'})
    @ApiPropertyOptional({example:'Bauru', description: 'Nome da cidade da instituição'})
    cidade: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O estado não pode ser vazio'})
    @ApiPropertyOptional({example:'SP', description: 'Nome do estado da instituição'})
    estado: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O telefone não pode ser vazio'})
    @ApiPropertyOptional({example:'(11)99999999', description: 'Telefone da instituição'})
    telefone: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O email não pode ser vazio'})
    @ApiPropertyOptional({example:'teste@teste.com.br', description: 'Nome do estado da instituição'})
    email: string;

    @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({example:'123456', description: 'A senha deve ter no mínimo 6 caracteres'})
    @SenhaForte ({message: 'A senha deve ser mais forte'})
    senha: string


}