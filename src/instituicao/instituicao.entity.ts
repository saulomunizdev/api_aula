export class instituicaoEntity{
    id: string;
    nomeInstituicao: string;
    nomeResponsavel: string;
    cidade: string;
    estado: string;
    telefone: string;
    email: string;
    senha: string

    constructor (id: string, nomeInstituicao: string, nomeResponsavel: string, cidade: string, estado: string, telefone: string, email: string, senha: string){
        this.id = id;
        this.nomeInstituicao = nomeInstituicao;
        this.nomeResponsavel = nomeResponsavel;
        this.cidade = cidade;
        this.estado = estado;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        }
}
