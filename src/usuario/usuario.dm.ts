import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuariosArmazenados {
    #usuarios: UsuarioEntity[] = [];

    AdicionarUsuario (usuario: UsuarioEntity) {
        this.#usuarios.push(usuario);
    }

    async atualizaUsuarios(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
            var possivelUsuario = this.BuscaPorID(id);
    
            Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return; 
                }else if (chave === 'senha' && typeof valor === 'string'){
                    possivelUsuario.trocarSenha(valor);
                }
            possivelUsuario[chave] = valor;
            }
        );
    
        return possivelUsuario;
        }


    async validaEmail(email: string): Promise<boolean>{
        const usuarioEncontrado = this.#usuarios.find (u => u.email === email);
        return usuarioEncontrado !== undefined;
    }

    private BuscaPorEmail(email: string): UsuarioEntity{
            const possivelUsuario = this.#usuarios.find(
                usuariosSalvo => usuariosSalvo.email === email
            );
    
            if (!possivelUsuario) {
                throw new Error('Usuário não encontrado');
            }
            return possivelUsuario;
        }
    
    
        
        loginUsuario(email: string, senha: string): UsuarioEntity | null {
            const possivelUsuario = this.BuscaPorEmail(email);
    
            if(possivelUsuario && possivelUsuario.login(senha)){
                return possivelUsuario;
            }
            return null;
    
        }
    
    
        async removeUsuarios(id: string) {
        const eventos = this.BuscaPorID(id);
    
        this.#usuarios = this.#usuarios.filter(
        eventosSalvo => eventosSalvo.id !== id
        );
    
        return eventos;
        }
    
        BuscaPorID(id: string): UsuarioEntity {
        const possivelUsuario = this.#usuarios.find(
            usuariosSalvo => usuariosSalvo.id === id
        );  
        if (!possivelUsuario) {
            throw new Error('Instituição não encontrado');
        }   
        return possivelUsuario;
    }

    get Usuarios() {
        return this.#usuarios;
    }
}