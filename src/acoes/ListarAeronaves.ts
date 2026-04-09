import Aeronave from "../modelo/Aeronave";
import Listagem from "./Listagem";
import fs from 'fs'
import path from 'path'

class ListagemAeronaves extends Listagem {
    private aeronaves: Array<Aeronave>
    private caminho = path.resolve(__dirname, "../../data/Aeronaves.txt")

    constructor(aeronaves: Array<Aeronave>) {
        super()
        this.aeronaves = aeronaves
    }

    private lerDoArquivo(): Aeronave[] {
        if (!fs.existsSync(this.caminho) || !fs.readFileSync(this.caminho, "utf-8").trim()) {
            return []
        }

        const dados = fs.readFileSync(this.caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const aeronaves: Aeronave[] = []

        for (let linha of linhas) {
            const [codigo, modelo, tipo, capacidade, alcance] = linha.split(";")
            const aeronave = new Aeronave(codigo, modelo, tipo as any, capacidade as any, alcance as any)
            aeronaves.push(aeronave)
        }

        return aeronaves
    }

    public listar(): void {
        const dadosTXT = this.lerDoArquivo()

        const todos = [...this.aeronaves]

        dadosTXT.forEach(aer => {
            const jaExiste = todos.some(existente => existente.codigo === aer.codigo)
            if (!jaExiste) todos.push(aer)
        })

        if (todos.length === 0) {
            console.log(`Nenhuma aeronave cadastrada.`)
            return
        }

        console.log(`\nLista de todas as aeronaves:`)
        todos.forEach(aeronave => {
            console.log(`Código: ` + aeronave.codigo)
            console.log(`Modelo: ` + aeronave.modelo)
            console.log(`Tipo: ` + aeronave.tipo)
            console.log(`Capacidade: ` + aeronave.capacidade)
            console.log(`Alcance: ` + aeronave.alcance)
            console.log(`--------------------------------------`)
        });
        console.log(`\n`);
    }
}
export default ListagemAeronaves