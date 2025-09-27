import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { ApiTags } from "@nestjs/swagger";
import { AlteraUsuarioDTO } from "./dto/AlteraUsuarios.dto";
import { LoginUsuariosDTO } from "./dto/loginUsuarios.dto";

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


     @Put('/:id')
            async atualizaUsuarios(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO){
            const UsuariosAtualizado = await this.Usuarios.atualizaUsuarios(id, dadosAtualizacao);
            return {
            evento: UsuariosAtualizado,
            message: 'Instituição atualizado com sucesso!'
            };
        }
    
        @Delete('/:id')
            async deletaInstituicao(@Param('id') id: string){
            const UsuariosRemovido = await this.Usuarios.removeUsuarios(id);
            return {
            evento: UsuariosRemovido,
            message: 'Instituição removido com sucesso!'
            };
        }
    
        @Post('/login')
            async login(@Body() dadosLogin: LoginUsuariosDTO) {
            const usuarioLogado = this.Usuarios.loginUsuario(dadosLogin.email, dadosLogin.senha);   
            if(usuarioLogado){
                return {
                    usuario: usuarioLogado,
                    message: 'Login realizado com sucesso'
                };
            }
            return {
                message: 'Email ou senha inválidos'
            };
        }  



}