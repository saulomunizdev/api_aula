import * as bcrypt from "bcrypt"

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
        var saltOrRouds = 10;
        this.id = id;
        this.nomeInstituicao = nomeInstituicao;
        this.nomeResponsavel = nomeResponsavel;
        this.cidade = cidade;
        this.estado = estado;
        this.telefone = telefone;
        this.email = email;
        this.senha = bcrypt.hashSync(senha, saltOrRouds);
        }
        
        trocarSenha(novaSenha: string){
        var saltOrRounds = 10;
        this.senha = bcrypt.hashSync(novaSenha, saltOrRounds); 
    }

        login(senha: string): boolean{
        return bcrypt.compareSync(senha, this.senha);
    }

}
