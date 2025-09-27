import {Body, Controller, Post, Get, Put, Delete, Param} from "@nestjs/common";
import { instituicaoEntity } from "./instituicao.entity";
import {v4 as uuid} from 'uuid';
import { CriaInstituicaoDTO } from "./dto/criarInstituicao.dto";
import { instituicaoArmazenados } from "./instituicao.dm";
import { ListaInstituicaoDTO } from "./dto/listaInstituicao.dto";
import { AlteraInstituicaoDTO } from "./dto/alteraInstituicao.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";

@Controller('/instituicao')
@ApiTags('instituicao')
export class InstituicaoController {
    constructor(private Instituicao : instituicaoArmazenados){

    }

    @Put('/:id')
        async atualizaInstituicao(@Param('id') id: string, @Body() dadosAtualizacao: AlteraInstituicaoDTO){
        const instituicaoAtualizado = await this.Instituicao.atualizaInstituicao(id, dadosAtualizacao);
        return {
        evento: instituicaoAtualizado,
        message: 'Instituição atualizado com sucesso!'
        };
    }

    @Delete('/:id')
        async deletaInstituicao(@Param('id') id: string){
        const instituicaoRemovido = await this.Instituicao.removeInstituicao(id);
        return {
        evento: instituicaoRemovido,
        message: 'Instituição removido com sucesso!'
        };
    }

    @Post('/login')
        async login(@Body() dadosLogin: LoginDTO) {
        const usuarioLogado = this.Instituicao.loginUsuario(dadosLogin.email, dadosLogin.senha);   
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




    @Post()
    async criaInstituicao(@Body() dadosInstituicao: CriaInstituicaoDTO) {
        var novoInstituicao = new instituicaoEntity(uuid(),dadosInstituicao.nomeInstituicao, dadosInstituicao.nomeResponsavel, dadosInstituicao.cidade, dadosInstituicao.estado,
                                                    dadosInstituicao.telefone, dadosInstituicao.email, dadosInstituicao.senha);

        this.Instituicao.AdicionarInstituicao(novoInstituicao);
        var retorno = { 
            novoInstituicao,
            message: 'Instituição criado com sucesso'
        };
        return retorno;
    }


     @Get()
    async retonoInstituicao(): Promise<ListaInstituicaoDTO[]> {  
        var InstituicaoListados = this.Instituicao.Instituicao;
        return InstituicaoListados;    
    }


}

