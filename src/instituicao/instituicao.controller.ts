import {Body, Controller, Post, Get, Put, Delete, Param, NotFoundException, InternalServerErrorException} from "@nestjs/common";
import { instituicaoEntity } from "./instituicao.entity";
import {v4 as uuid} from 'uuid';
import { CriaInstituicaoDTO } from "./dto/criarInstituicao.dto";
import { instituicaoArmazenados } from "./instituicao.dm";
import { ListaInstituicaoDTO } from "./dto/listaInstituicao.dto";
import { AlteraInstituicaoDTO } from "./dto/alteraInstituicao.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { RetornoPadraoDTO } from "src/dto/retorno.dto";

@Controller('/instituicao')
@ApiTags('instituicao')
export class InstituicaoController {
    constructor(private Instituicao : instituicaoArmazenados){

    }

    @Put('/:id')
        async atualizaInstituicao(@Param('id') id: string, @Body() dadosAtualizacao: AlteraInstituicaoDTO): Promise <RetornoPadraoDTO>{
        try{
            const instituicaoAtualizado = await this.Instituicao.atualizaInstituicao(id, dadosAtualizacao);
            return new RetornoPadraoDTO(
            'Instituição atualizado com sucesso!',
            instituicaoAtualizado,
            );
        }catch (error) {
            if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
            }
                throw new InternalServerErrorException('Erro inesperado no servidor');
        }    
    }

    @Delete('/:id')
        async deletaInstituicao(@Param('id') id: string): Promise <RetornoPadraoDTO>{
            try{
                const instituicaoRemovido = await this.Instituicao.removeInstituicao(id);
                return new RetornoPadraoDTO(
                'Instituição removido com sucesso!',
                instituicaoRemovido
                );
            } catch (error) {
                if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
            }
                throw new InternalServerErrorException('Erro inesperado no servidor');
            }
    }

    @Post('/login')
        async login(@Body() dadosLogin: LoginDTO): Promise <RetornoPadraoDTO> {
            try{
                const usuarioLogado = this.Instituicao.loginUsuario(dadosLogin.email, dadosLogin.senha);   
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




    @Post()
    async criaInstituicao(@Body() dadosInstituicao: CriaInstituicaoDTO): Promise <RetornoPadraoDTO> {
        try{
            var novoInstituicao = new instituicaoEntity(uuid(),dadosInstituicao.nomeInstituicao, dadosInstituicao.nomeResponsavel, dadosInstituicao.cidade, dadosInstituicao.estado,
                                                        dadosInstituicao.telefone, dadosInstituicao.email, dadosInstituicao.senha);

            this.Instituicao.AdicionarInstituicao(novoInstituicao);
            var retorno = new RetornoPadraoDTO( 
                'Instituição criado com sucesso',
                novoInstituicao
            );
            return retorno;
       } catch (error) {
                if (error.message === 'Usuário não encontrado'){
                throw new NotFoundException(`Usuário com id $(id) não encontrado`);
            }
                throw new InternalServerErrorException('Erro inesperado no servidor');
            } 
    }




     @Get()
    async retonoInstituicao(): Promise<ListaInstituicaoDTO[]> {  
        var InstituicaoListados = this.Instituicao.Instituicao;
        return InstituicaoListados;    
    }


}

