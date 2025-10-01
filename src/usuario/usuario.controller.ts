import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { ApiTags } from "@nestjs/swagger";
import { AlteraUsuarioDTO } from "./dto/AlteraUsuarios.dto";
import { LoginUsuariosDTO } from "./dto/loginUsuarios.dto";
import { RetornoPadraoDTO } from "src/dto/retorno.dto";

@Controller('/usuarios')
@ApiTags('usuario')
export class UsuarioController {
    constructor(private Usuarios : UsuariosArmazenados){

    }

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO): Promise <RetornoPadraoDTO> {
        try{
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome, dadosUsuario.idade, 
                                            dadosUsuario.cidade, dadosUsuario.email, 
                                            dadosUsuario.telefone, dadosUsuario.senha);

        this.Usuarios.AdicionarUsuario(novoUsuario);
        var retorno = new RetornoPadraoDTO( 
            'Usuário criado com sucesso',
            novoUsuario
        );
        return retorno;
        }catch (error) {
             if (error.message === 'Usuário não encontrado'){
                        throw new NotFoundException(`Usuário com id $(id) não encontrado`);
                    }
                        throw new InternalServerErrorException('Erro inesperado no servidor');
        }
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
            async atualizaUsuarios(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO):Promise <RetornoPadraoDTO>{
                try{
                    const UsuariosAtualizado = await this.Usuarios.atualizaUsuarios(id, dadosAtualizacao);
                    return new RetornoPadraoDTO(
                        'Usuário atualizado com sucesso!',
                        UsuariosAtualizado 
                    );
                }catch(error){
                    if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
                }
                throw new InternalServerErrorException('Erro inesperado no servidor');
                }    
             
        }
    
        @Delete('/:id')
            async deletaUsuario(@Param('id') id: string): Promise <RetornoPadraoDTO>{
                try{
                    const UsuariosRemovido = await this.Usuarios.removeUsuarios(id);
                    return new RetornoPadraoDTO(
                'Usuário removido com sucesso!',
                UsuariosRemovido
                    );
                    } catch (error) {
                if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
            }
                throw new InternalServerErrorException('Erro inesperado no servidor');
            }
        }
    
        @Post('/login')
            async login(@Body() dadosLogin: LoginUsuariosDTO): Promise <RetornoPadraoDTO> {
                try{
                    const usuarioLogado = this.Usuarios.loginUsuario(dadosLogin.email, dadosLogin.senha);   
                    if(usuarioLogado){
                    return new RetornoPadraoDTO(
                        'Login realizado com sucesso',
                        usuarioLogado
                    );
                }
                    return  new RetornoPadraoDTO(
                    'Email ou senha inválidos',
                    null
                 );
            } catch (error) {
                if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
                }
                throw new InternalServerErrorException('Erro inesperado no servidor');
            }    
        }        



}