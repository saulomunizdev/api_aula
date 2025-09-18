import { Module } from "@nestjs/common";
import { InstituicaoController } from "./instituicao.controller";
import { instituicaoArmazenados } from "./instituicao.dm";
import { DiaValidator } from "src/validacao/dia.validador";
import { EmailUnicoValidator } from "src/usuario/validacao/email-unico.validator";

@Module({
    controllers: [InstituicaoController],
    providers: [instituicaoArmazenados, DiaValidator,EmailUnicoValidator],
})
export class InstituicaoModule {}