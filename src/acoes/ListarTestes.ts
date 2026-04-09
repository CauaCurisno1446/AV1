import Listagem from "./Listagem";
import fs from 'fs'
import path from 'path'
import Teste from "../modelo/Teste";
import Etapa from "../modelo/Etapa";

class ListagemTeste extends Listagem {
    private testes: Array<Teste>
    private caminho = path.resolve(__dirname, "../../data/Testes.txt")

    constructor(testes: Array<Teste>) {
        super()
        this.testes = testes
    }

    private lerDoArquivo(): Teste[] {
        if (!fs.existsSync(this.caminho) || !fs.readFileSync(this.caminho, "utf-8").trim()) {
            return []
        }

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const etapas: Teste[] = []

        for (let linha of linhas) {
            const [idTeste, tipo, resultado] = linha.split(";")
            const etapa = new Teste(idTeste, tipo as any, resultado as any)
            etapas.push(etapa)
        }

        return etapas
    }

    public listar(): void {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.testes]

        dadosTXT.forEach(etp => {
            const jaExiste = todos.some(existente => existente.idTeste === etp.idTeste)
            if (!jaExiste) todos.push(etp)
        })

        if (todos.length === 0) {
            console.log(`Nenhum teste cadastrado.`)
            return
        }

        console.log(`\nLista de todas as etapas:`)
        todos.forEach(etapa => {
            console.log(`ID: ` + etapa.idTeste)
            console.log(`Tipo: ` + etapa.tipo)
            console.log(`Resultado: ` + etapa.resultado)
           
            console.log(`--------------------------------------`)
        });
        console.log(`\n`);
    }
}
export default ListagemTeste