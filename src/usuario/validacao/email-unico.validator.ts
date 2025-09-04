import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint ,ValidatorConstraintInterface,registerDecorator} from "class-validator";
import { UsuariosArmazenados } from "../usuario.dm";


@Injectable()
@ValidatorConstraint({ async: true})

export class EmailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private clsUsuariosArmazenados: UsuariosArmazenados) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail = await this.clsUsuariosArmazenados.validaEmail(value);
        return !validarEmail;
    }
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        });
    }
}