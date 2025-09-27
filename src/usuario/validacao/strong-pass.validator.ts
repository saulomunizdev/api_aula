import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint ,ValidatorConstraintInterface,registerDecorator} from "class-validator";
import { UsuariosArmazenados } from "../usuario.dm";
import * as zxcvbn from 'zxcvbn';

@Injectable()
@ValidatorConstraint({ async: true})

export class StrongPassValidator implements ValidatorConstraintInterface{
    constructor() {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const result = zxcvbn(value);
        var validarSenha = result.score >= 3;
        return validarSenha;
    }
}

export const SenhaForte = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: StrongPassValidator
        });
    }
}