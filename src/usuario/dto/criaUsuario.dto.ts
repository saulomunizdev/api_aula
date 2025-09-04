import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    nome: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    @IsString()
    @IsNotEmpty()
    @EmailUnico({message: 'Email já cadastrado'})
    email: string;

    @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsNotEmpty()
    @IsString()
    senha: string;

    @IsNotEmpty()
    @IsNumber(undefined, {message: 'A idade deve ser um númeo inteiro'})
    idade: number;

    @IsNotEmpty({message: 'Cidade não pode ser vazia'})
    @IsString()
    cidade: string;

    @IsNotEmpty({message: 'Telefone não pode ser vazio'})
    @IsString()
    telefone: string;
}