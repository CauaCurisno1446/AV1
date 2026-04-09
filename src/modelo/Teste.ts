import ResultadoTeste from "../enum/ResultadoTeste";
import TipoTeste from "../enum/TipoTeste";
import fs from "fs"
import path from "path"



class Teste{
    public idTeste: string
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(id: string, tipo: TipoTeste, resultado: ResultadoTeste){
        this.idTeste = id
        this.tipo = tipo
        this.resultado = resultado
    }

    public static salvar(testes: Array<Teste>): void {
        const caminho = path.resolve(__dirname, "../../data/Testes.txt");
        
        const pasta = path.dirname(caminho);
    
        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true });
        }
            
        let novasLinhas = ""
        
        for (let teste of testes) {
            novasLinhas += `${teste.idTeste};${teste.tipo};${teste.resultado}\n`
        }
        
        if (novasLinhas) {
            fs.appendFileSync(caminho, novasLinhas)
        }
        
        console.log("Teste salvo com sucesso")
    }
    
    public static carregar(codigo_teste: string): Teste[] {
        const caminho = path.resolve(__dirname, "../../data/Testes.txt");
                        
        if (!fs.existsSync(caminho)) {
            return []
        }
            
        const dados = fs.readFileSync(caminho, "utf-8")
                
        if (!dados.trim()) {
            return [];
        }
            
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const testes: Teste[] = []
            
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [id, tipo, resultado] = partes
            
            if (id === codigo_teste) {
                const teste = new Teste(id, tipo as any, resultado as any)
                testes.push(teste)
            }
        }
        return testes
    }

    public static associarAeronave(idAeronave: string, idEtapa: string): void {
        const caminho = path.resolve(__dirname, "../../data/AeronavesTestes.txt")
        fs.appendFileSync(caminho, `${idAeronave};${idEtapa}\n`)
        console.log("Etapa associada à aeronave!")
    }
}

export default Teste    