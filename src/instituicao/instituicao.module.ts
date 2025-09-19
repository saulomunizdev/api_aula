import { Module } from "@nestjs/common";
import { InstituicaoController } from "./instituicao.controller";
import { instituicaoArmazenados } from "./instituicao.dm";
import { DiaValidator } from "src/validacao/dia.validador";

@Module({
    controllers: [InstituicaoController],
    providers: [instituicaoArmazenados, DiaValidator],
})
export class InstituicaoModule {}