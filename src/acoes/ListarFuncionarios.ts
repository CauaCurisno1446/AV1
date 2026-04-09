import Funcionario from "../modelo/Funcionario";
import Listagem from "./Listagem";
import fs from 'fs'
import path from 'path'

class ListagemFuncionarios extends Listagem {
    private funcionarios: Array<Funcionario>
    private caminho = path.resolve(__dirname, "../../data/Usuarios.txt")

    constructor(funcionarios: Array<Funcionario>) {
        super()
        this.funcionarios = funcionarios
    }

    private lerDoArquivo(): Funcionario[] {
        if (!fs.existsSync(this.caminho) || !fs.readFileSync(this.caminho, "utf-8").trim()) {
            return []
        }

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const funcionarios: Funcionario[] = []

        for (let linha of linhas) {
            const [id, nome, telefone, endereco, usuario, senha, nivelPermissao] = linha.split(";")
            const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao as any)
            funcionarios.push(funcionario)
        }

        return funcionarios
    }

    public obterFuncionarios(): Funcionario[] {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.funcionarios]

        dadosTXT.forEach(f => {
            const jaExiste = todos.some(existente => existente.id === f.id)
            if (!jaExiste) todos.push(f)
        })

        return todos
    }

    public listar(): void {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.funcionarios]

        dadosTXT.forEach(f => {
            const jaExiste = todos.some(existente => existente.id === f.id)
            if (!jaExiste) todos.push(f)
        })

        if (todos.length === 0) {
            console.log(`Nenhum funcionário cadastrado.`)
            return
        }

        console.log(`\nLista de todos os funcionarios:`)
        todos.forEach(funcionario => {
            console.log(`ID: ` + funcionario.id)
            console.log(`Nome: ` + funcionario.nome)
            console.log(`Telefone: ` + funcionario.telefone)
            console.log(`Endereço: ` + funcionario.endereco)
            console.log(`Usuario: ` + funcionario.usuario)
            console.log(`Senha: ` + funcionario.senha)
            console.log(`Nível de Permissão: ` + funcionario.nivelPermissao)
            console.log(`--------------------------------------`)
        });
        console.log(`\n`);
    }
}
export default ListagemFuncionarios