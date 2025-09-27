import * as bcrypt from "bcrypt"

export class UsuarioEntity{
    // login(senha: string) {
    //     throw new Error("Method not implemented.");
    // }
    // trocarSenha(valor: string) {
    //     throw new Error("Method not implemented.");
    // }
    id: string;
    nome: string;
    idade: number;
    cidade: string;
    email: string;
    telefone: string;
    senha: string;

    constructor(id: string, nome: string, idade: number, cidade: string, email: string, telefone: string,senha: string) {
        var saltOrRouds = 10;
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
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