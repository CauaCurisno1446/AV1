import Listagem from "./Listagem";
import fs from 'fs'
import path from 'path'
import Etapa from "../modelo/Etapa";

class ListagemEtapa extends Listagem {
    private etapas: Array<Etapa>
    private caminho = path.resolve(__dirname, "../../data/Etapas.txt")

    constructor(etapas: Array<Etapa>) {
        super()
        this.etapas = etapas
    }

    private lerDoArquivo(): Etapa[] {
        if (!fs.existsSync(this.caminho) || !fs.readFileSync(this.caminho, "utf-8").trim()) {
            return []
        }

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const etapas: Etapa[] = []

        for (let linha of linhas) {
            const [id, nome, prazo, status, funcionarios] = linha.split(";")
            const etapa = new Etapa(id, nome, prazo, status as any, funcionarios as any)
            etapas.push(etapa)
        }

        return etapas
    }

    public listar(): void {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.etapas]

        dadosTXT.forEach(etp => {
            const jaExiste = todos.some(existente => existente.idEtapa === etp.idEtapa)
            if (!jaExiste) todos.push(etp)
        })

        if (todos.length === 0) {
            console.log(`Nenhuma etapa cadastrada.`)
            return
        }

        console.log(`\nLista de todas as etapas:`)
        todos.forEach(etapa => {
            console.log(`ID: ` + etapa.idEtapa)
            console.log(`Nome: ` + etapa.nome)
            console.log(`Prazo: ` + etapa.prazo)
            console.log(`Status: ` + etapa.status)
            console.log(`Funcionarios (ID): ` + etapa.funcionarios)
           
            console.log(`--------------------------------------`)
        });
        console.log(`\n`);
    }
}
export default ListagemEtapa