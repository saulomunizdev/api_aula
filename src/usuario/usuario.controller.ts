import { Body, Controller, Post } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Controller('/usuarios')
export class UsuarioController {

    @Post()
    async criaUsuario(@Body() dadosUsuario) {
        var novoUsuario = new UsuarioEntity("1",dadosUsuario.nome, dadosUsuario.idade, dadosUsuario.cidade, dadosUsuario.email, dadosUsuario.telefone, dadosUsuario.senha);

        console.log(novoUsuario);
        
        var retorno = { 
            dadosUsuario,
            message: 'Usuário criado com sucesso'
        };
        return retorno;
    }
}