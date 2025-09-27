import { Injectable } from "@nestjs/common";
import { instituicaoEntity } from "./instituicao.entity";


@Injectable()
export class instituicaoArmazenados {
    #instituicao: instituicaoEntity[] = [];
    

    AdicionarInstituicao (instituicao: instituicaoEntity) {
        this.#instituicao.push(instituicao);
    }


    async atualizaInstituicao(id: string, dadosAtualizacao: Partial<instituicaoEntity>) {
        var possivelInstituicao = this.BuscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
        ([chave, valor]) => {
            if (chave === 'id') {
                return;
            }else if (valor === undefined) {
                return; 
            }else if (chave === 'senha' && typeof valor === 'string'){
                possivelInstituicao.trocarSenha(valor);
            }
        possivelInstituicao[chave] = valor;
        }
    );

    return possivelInstituicao;
    }

     async validaEmail(email: string): Promise<boolean>{
        const usuarioEncontrado = this.#instituicao.find(u => u.email === email);
        return usuarioEncontrado !== undefined;
    }

      
    private BuscaPorEmail(email: string): instituicaoEntity {
        const possivelUsuario = this.#instituicao.find(
            instituicaoSalvo => instituicaoSalvo.email === email
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }
        return possivelUsuario;
    }


    
    loginUsuario(email: string, senha: string): instituicaoEntity | null {
        const possivelUsuario = this.BuscaPorEmail(email);

        if(possivelUsuario && possivelUsuario.login(senha)){
            return possivelUsuario;
        }
        return null;

    }


    async removeInstituicao(id: string) {
    const eventos = this.BuscaPorID(id);

    this.#instituicao = this.#instituicao.filter(
    eventosSalvo => eventosSalvo.id !== id
    );

    return eventos;
    }

    BuscaPorID(id: string): instituicaoEntity {
    const possivelInstituicao = this.#instituicao.find(
        instituicaoSalvo => instituicaoSalvo.id === id
    );  
    if (!possivelInstituicao) {
        throw new Error('Instituição não encontrado');
    }   
    return possivelInstituicao;
}



    get Instituicao() {
        return this.#instituicao;
    }
}