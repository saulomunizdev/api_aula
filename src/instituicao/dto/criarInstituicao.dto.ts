import { IsString, IsNotEmpty, MinLength, IsEmail} from "class-validator";
import { EmailUnico } from "src/usuario/validacao/email-unico.validator";


export class CriaInstituicaoDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome da instituição não pode ser vazio'})
    nomeInstituicao: string;

    @IsString()
    @IsNotEmpty({message: 'O nome do responsável não pode ser vazio'})
    nomeResponsavel: string;

    @IsString()
    @IsNotEmpty({message: 'A cidade não pode ser vazio'})
    cidade: string;

    @IsString()
    @IsNotEmpty({message: 'O estado não pode ser vazio'})
    estado: string;

    @IsString()
    @IsNotEmpty({message: 'O telefone não pode ser vazio'})
    telefone: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    @IsString()
    @IsNotEmpty({message: 'O email não pode ser vazio'})
    @EmailUnico({message: 'Email já cadastrado'})
    email: string;

    @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsString()
    @IsNotEmpty()
    senha: string


}