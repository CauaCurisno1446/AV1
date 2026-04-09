import TipoAeronave from "../enum/TipoAeronave";
import fs from "fs"
import path from "path"

class Aeronave{
    public codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance: number

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number){
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
    }

    get mostrarDetalhes(){
        let detalhes =  "Código da aeronave: " + `${this.codigo}` + "\n" +
        "Modelo da aeronave: " + `${this.modelo}` + "\n" +
        "Tipo da aeronave: " + `${this.tipo}` + "\n" +
        "Capacidade da aeronave: " + `${this.capacidade}` + "\n" +
        "Alcance da aeronave: " + `${this.alcance}` + "\n"

        return detalhes
    }

    public static salvar(aeronaves: Array<Aeronave>): void{
        const caminho = path.resolve(__dirname, "../../data/Aeronaves.txt");
        const pasta = path.dirname(caminho);
        
        if (!fs.existsSync(pasta)) {
                fs.mkdirSync(pasta, { recursive: true });
        }
        
        let idsSalvos: string[] = []
                
        if (fs.existsSync(caminho)) {
            const linhas = fs.readFileSync(caminho, "utf-8").split("\n")

            for (let linha of linhas) {
                if (linha.trim() !== "") {
                        idsSalvos.push(linha.split(";")[0])
                }
            }
        }
                
        let novasLinhas = ""
        
        for (let aer of aeronaves) {
            if (!idsSalvos.includes(aer.codigo)) {
                novasLinhas += `${aer.codigo};${aer.modelo};${aer.tipo};${aer.capacidade};${aer.alcance}\n`
            }
        }
        
        if (novasLinhas) {
            fs.appendFileSync(caminho, novasLinhas)
        }
        
        console.log("Aeronave salva com sucesso")
    }


    public static carregar(codigo_aer: string): Aeronave[] {
        const caminho = path.resolve(__dirname, "../../data/Aeronaves.txt")
                
        if (!fs.existsSync(caminho)) {
            return []
        }
    
        const dados = fs.readFileSync(caminho, "utf-8")
        
        if (!dados.trim()) {
            return [];
        }
    
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const aeronaves: Aeronave[] = []
    
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [codigo, modelo, tipo, capacidade, alcance] = partes
    
            if (codigo === codigo_aer) {
                const aeronave = new Aeronave(codigo, modelo, tipo as any, capacidade as any, alcance as any)
                aeronaves.push(aeronave)
            }
        }
        return aeronaves
    }
}

export default Aeronave