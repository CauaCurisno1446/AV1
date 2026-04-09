import Entrada from "../util/Entrada"
import Cadastro from "./Cadastro"
import Peca from "../modelo/Peca"
import TipoPeca from "../enum/TipoPeca"
import fs from 'fs'
import path from 'path'
import StatusPeca from "../enum/StatusPeca"

class CadastrarPeca extends Cadastro{
    private pecas: Array<Peca>
    private entrada: Entrada
    private caminho = path.resolve(__dirname, "../../data/Pecas.txt")

    constructor(pecas: Array<Peca>) {
        super()
        this.pecas = pecas
        this.entrada = new Entrada()
    }

    private maiorIdDoArquivo(): number {
                if (!fs.existsSync(this.caminho)) return 0
        
                const dados = fs.readFileSync(this.caminho, "utf-8")
                const linhas = dados.split("\n").filter(l => l.trim() !== "")
        
                let maiorId = 0
                for (let linha of linhas) {
                    const codigo = linha.split(";")[0].trim()
                    const id = parseInt(codigo.replace("PEC0", ""))
                    if (id > maiorId) maiorId = id
                }
        
                return maiorId
        }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de peca`)
        let nome = this.entrada.receberTexto(`Por favor informe o nome da peca: `)
        let fornecedor = this.entrada.receberTexto(`Por favor informe o fornecedor da peca: `)
    
        console.log('\n Qual o tipo da peca?')
        console.log('\n 1 - NACIONAL, 2 - IMPORTADA')
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `)

        console.log('\n Qual o status da peca?')
        console.log('\n 1 - EM PRODUCAO, 2 - EM TRANSPORTE, 3 - PRONTA')
        let status = this.entrada.receberNumero(`Por favor informe o código do status: `)

        let tipoPeca
        switch(tipo){
            case 1:
                tipoPeca = TipoPeca.NACIONAL
                break;
            case 2:
                tipoPeca = TipoPeca.IMPORTADA
                break;
        }

        let statusPeca
        switch(status){
            case 1:
                statusPeca = StatusPeca.EM_PRODUCAO
                break;
            case 2:
                statusPeca = StatusPeca.EM_TRANSPORTE
                break;
            case 3:
                statusPeca = StatusPeca.PRONTA
                break;
        }

        let maiorIdMemoria = 0

        for (let pec of this.pecas) {
            const idAtual = parseInt(pec.idPeca.replace("PEC0", ""))
            
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual
            }
        }

        const maiorIdArquivo = this.maiorIdDoArquivo()
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo)
        let codigo =  (maiorId + 1).toString()
        let codigoFinal = "PEC0" + codigo


        let peca = new Peca(codigoFinal, nome, tipoPeca, fornecedor, statusPeca)
        this.pecas.push(peca)
        console.log(`\nCadastro concluído :)\n`);
    }
}

export default CadastrarPeca