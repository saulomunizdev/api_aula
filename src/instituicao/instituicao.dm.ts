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
            }
        possivelInstituicao[chave] = valor;
        }
    );

    return possivelInstituicao;
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