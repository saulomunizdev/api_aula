import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuariosArmazenados } from "./usuario.dm";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { StrongPassValidator } from "./validacao/strong-pass.validator";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [UsuarioController],
    providers: [UsuariosArmazenados, EmailUnicoValidator, StrongPassValidator],
})
export class UsuarioModule {}