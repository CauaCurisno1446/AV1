import fs from "fs"
import path from "path"
import StatusPeca from "../enum/StatusPeca";
import TipoPeca from "../enum/TipoPeca";

class Peca{
    public idPeca: string
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca

    constructor(id: string, nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca){
        this.idPeca = id
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    public static atualizarStatus(id: string, status: StatusPeca): void {
        const caminho = path.resolve(__dirname, "../../data/Pecas.txt")

        const dados = fs.readFileSync(caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")

        let novasLinhas = ""

        for (let linha of linhas) {
            const partes = linha.split(";")
            let idEtapa = partes[0]
     
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${partes[3]};${status}\n`
            } 
            else {
                novasLinhas += linha + "\n"
            }
        }

        fs.writeFileSync(caminho, novasLinhas)
        console.log("Peca atualizada!")
    }

    public static salvar(pecas: Array<Peca>): void {
        const caminho = path.resolve(__dirname, "../../data/Pecas.txt");
    
        const pasta = path.dirname(caminho);
    
        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true });
        }
        
        let novasLinhas = ""
    
        for (let pec of pecas) {
            novasLinhas += `${pec.idPeca};${pec.nome};${pec.tipo};${pec.fornecedor};${pec.status}\n`
        }
    
        if (novasLinhas) {
            fs.appendFileSync(caminho, novasLinhas)
        }
    
        console.log("Peca salva com sucesso")
    }

    public static carregar(codigo_pec: string): Peca[] {
        const caminho = path.resolve(__dirname, "../../data/Pecas.txt")
                    
        if (!fs.existsSync(caminho)) {
            return []
        }
        
        const dados = fs.readFileSync(caminho, "utf-8")
            
        if (!dados.trim()) {
            return [];
        }
        
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const pecas: Peca[] = []
        
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [id, nome, tipo, fornecedor, status] = partes
        
            if (id === codigo_pec) {
                const peca = new Peca(id, nome, tipo as any, fornecedor as any, status as any)
                pecas.push(peca)
            }
        }
        return pecas
    }

    public static associarAeronave(idAeronave: string, idPeca: string): void {
        const caminho = path.resolve(__dirname, "../../data/AeronavesPecas.txt")
        fs.appendFileSync(caminho, `${idAeronave};${idPeca}\n`)
        console.log("Peça associada à aeronave!")
    }
}

export default Peca