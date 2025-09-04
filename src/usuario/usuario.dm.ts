import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados {
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuario (usuario: UsuarioEntity) {
        this.#usuarios.push(usuario);
    }



    async validaEmail(email: string): Promise<boolean>{
        const usuarioEncontrado = this.#usuarios.find (u => u.email === email);
        return usuarioEncontrado !== undefined;
    }

    get Usuarios() {
        return this.#usuarios;
    }
}