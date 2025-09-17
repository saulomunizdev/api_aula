import { Module } from "@nestjs/common";
import { InstituicaoController } from "./instituicao.controller";
import { instituicaoArmazenados } from "./instituicao.dm";

@Module({
    controllers: [InstituicaoController],
    providers: [instituicaoArmazenados],
})
export class InstituicaoModule {}