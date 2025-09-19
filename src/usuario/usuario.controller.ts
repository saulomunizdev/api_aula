import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('/usuarios')
@ApiTags('usuario')
export class UsuarioController {
    constructor(private Usuarios : UsuariosArmazenados){

    }

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome, dadosUsuario.idade, 
                                            dadosUsuario.cidade, dadosUsuario.email, 
                                            dadosUsuario.telefone, dadosUsuario.senha);

      
        
        this.Usuarios.AdicionarUsuario(novoUsuario);
        var retorno = { 
            novoUsuario,
            message: 'Usuário criado com sucesso'
        };
        return retorno;
    }

    @Get()
    async retonoUsuario (): Promise<ListaUsuarioDTO[]>{

        var usuarioListados = this.Usuarios.Usuarios;
        const ListaRetorno = usuarioListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );
        return ListaRetorno;
    }
}