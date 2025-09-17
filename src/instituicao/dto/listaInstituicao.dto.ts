export class ListaInstituicaoDTO {
    constructor (
        readonly id: string,
        readonly nomeInstituicao: string,
        readonly nomeResponsavel: string,
        readonly cidade: string,
        readonly estado: string,
        readonly telefone: string,
        readonly email: string,
        readonly senha: string
){}
}