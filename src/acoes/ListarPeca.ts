import Peca from "../modelo/Peca";
import Listagem from "./Listagem";
import fs from 'fs'
import path from 'path'

class ListagemPeca extends Listagem {
    private pecas: Array<Peca>
    private caminho = path.resolve(__dirname, "../../data/Pecas.txt")

    constructor(pecas: Array<Peca>) {
        super()
        this.pecas = pecas
    }

    private lerDoArquivo(): Peca[] {
        if (!fs.existsSync(this.caminho) || !fs.readFileSync(this.caminho, "utf-8").trim()) {
            return []
        }

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const pecas: Peca[] = []

        for (let linha of linhas) {
            const [idPeca, nome, tipo, fornecedor, status] = linha.split(";")
            const peca = new Peca(idPeca, nome, tipo as any, fornecedor, status as any)
            pecas.push(peca)
        }

        return pecas
    }

    public listar(): void {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.pecas]

        dadosTXT.forEach(pec => {
            const jaExiste = todos.some(existente => existente.nome === pec.nome)
            if (!jaExiste) todos.push(pec)
        })

        if (todos.length === 0) {
            console.log(`Nenhuma peca cadastrada.`)
            return
        }

        console.log(`\nLista de todas as pecas:`)
        todos.forEach(peca => {
            console.log(`ID: ` + peca.idPeca)
            console.log(`Nome: ` + peca.nome)
            console.log(`Tipo: ` + peca.tipo)
            console.log(`Fornecedor: ` + peca.fornecedor)
            console.log(`Status: ` + peca.status)
            console.log(`--------------------------------------`)
        });
        console.log(`\n`);
    }
}
export default ListagemPeca