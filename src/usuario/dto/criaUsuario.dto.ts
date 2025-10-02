import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriaUsuarioDTO {
    @IsString()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @ApiProperty({example:'Saulo', description: 'Nome'})
    nome: string;

    @IsEmail(undefined,{message: 'Email inválido'})
    @IsString()
    @IsNotEmpty()
    @EmailUnico({message: 'Email já cadastrado'})
    @ApiProperty({example:'teste@teste.com.br', description: 'Email do usuario'})
    email: string;

    @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:'123456', description: 'A senha deve ter no mínimo 6 caracteres'})
    senha: string;

    @IsNotEmpty()
    @IsNumber(undefined, {message: 'A idade deve ser um númeo inteiro'})
    @ApiProperty({example:'37', description: 'Idade do usuario'})
    idade: number;

    @IsNotEmpty({message: 'Cidade não pode ser vazia'})
    @IsString()
    @ApiProperty({example:'Bauru', description: 'Cidade do usuario'})
    cidade: string;

    @IsNotEmpty({message: 'Telefone não pode ser vazio'})
    @IsString()
    @ApiProperty({example:'(11)999999999', description: 'Telefone do usuario'})
    telefone: string;



    @IsNotEmpty({message: 'complemento não pode ser vazio'})
    @IsString()
    @ApiProperty({example:'casa', description: 'complemento do usuario'})
    complemento: string;

    @IsNotEmpty({message: 'CEP não pode ser vazio'})
    @IsString()
    @ApiProperty({example:'17030-028', description: 'CEP do usuario'})
    cep: string;

}