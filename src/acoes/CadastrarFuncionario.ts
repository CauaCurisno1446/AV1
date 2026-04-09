import Entrada from "../util/Entrada"
import Funcionario from "../modelo/Funcionario"
import NivelPermissao from "../enum/NivelPermissao"
import Cadastro from "./Cadastro"
import fs from 'fs'
import path from 'path'

class CadastrarFuncionario extends Cadastro {
    private funcionarios: Array<Funcionario>
    private entrada: Entrada
    private caminho = path.resolve(__dirname, "../../data/Usuarios.txt")

    constructor(funcionarios: Array<Funcionario>) {
        super()
        this.funcionarios = funcionarios
        this.entrada = new Entrada()
    }

    private maiorIdDoArquivo(): number {
        if (!fs.existsSync(this.caminho)) return 0

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")

        let maiorId = 0
        for (let linha of linhas) {
            const id = parseInt(linha.split(";")[0])
            if (id > maiorId) maiorId = id
        }

        return maiorId
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do funcionario`)
        let nome = this.entrada.receberTexto(`Por favor informe o nome do funcionario: `)
        let telefone = this.entrada.receberTexto(`Por favor informe o número de telefone, no padrão (##) #########: `)
        let endereco = this.entrada.receberTexto(`Por favor informe o endereco (Rua, Bairro, Numero, Complemento): `)
        let usuario = this.entrada.receberTexto(`Por favor informe o usuario do funcionario: `)
        let senha = this.entrada.receberTexto(`Por favor informe a senha do funcionario: `)

        console.log('\n Qual o nível de acesso do funcionario?')
        console.log('\n 1 - ADMINISTRADOR, 2 - ENGENHEIRO, 3 - OPERADOR')
        let nivel = this.entrada.receberNumero(`Por favor informe o código do nível de acesso: `)

        let nivelAcesso
        switch(nivel){
            case 1:
                nivelAcesso = NivelPermissao.ADMINISTRADOR
                break;
            case 2:
                nivelAcesso = NivelPermissao.ENGENHEIRO
                break;
            case 3:
                nivelAcesso = NivelPermissao.OPERADOR
                break;
        }

        let maiorIdMemoria = 0

        for (let f of this.funcionarios) {
            const idAtual = parseInt(f.id)
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual
            }
        }

        const maiorIdArquivo = this.maiorIdDoArquivo()
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo)
        const id = (maiorId + 1).toString()

        let funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelAcesso);
        this.funcionarios.push(funcionario)
        console.log(`\nCadastro concluído :)\n`);
    }
}


export default CadastrarFuncionario