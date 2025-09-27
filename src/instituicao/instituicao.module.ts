import { Module } from "@nestjs/common";
import { InstituicaoController } from "./instituicao.controller";
import { instituicaoArmazenados } from "./instituicao.dm";
import { DiaValidator } from "src/validacao/dia.validador";
import { StrongPassValidator } from "src/usuario/validacao/strong-pass.validator";

@Module({
    controllers: [InstituicaoController],
    providers: [instituicaoArmazenados, DiaValidator, StrongPassValidator],
})
export class InstituicaoModule {}