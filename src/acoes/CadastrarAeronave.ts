import Entrada from "../util/Entrada"
import Cadastro from "./Cadastro"
import Aeronave from "../modelo/Aeronave"
import TipoAeronave from "../enum/TipoAeronave"
import fs from 'fs'
import path from 'path'

class CadastrarAeronave extends Cadastro{
    private aeronaves: Array<Aeronave>
    private entrada: Entrada
    private caminho = path.resolve(__dirname, "../../data/Aeronaves.txt")

    constructor(aeronaves: Array<Aeronave>) {
        super()
        this.aeronaves = aeronaves
        this.entrada = new Entrada()
    }

    private maiorIdDoArquivo(): number {
            if (!fs.existsSync(this.caminho)) return 0
    
            const dados = fs.readFileSync(this.caminho, "utf-8")
            const linhas = dados.split("\n").filter(l => l.trim() !== "")
    
            let maiorId = 0
            for (let linha of linhas) {
                const codigo = linha.split(";")[0].trim()
                const id = parseInt(codigo.replace("AER0", ""))
                if (id > maiorId) maiorId = id
            }
    
            return maiorId
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do aeronave`)
        let modelo = this.entrada.receberTexto(`Por favor informe o modelo da aeronave: `)
        let capacidade = this.entrada.receberTexto(`Por favor informe a capacidade da aeronave: `)
        let alcance = this.entrada.receberTexto(`Por favor informe o alcance da aeronave: `)
    
        console.log('\n Qual o tipo da aeronave?')
        console.log('\n 1 - COMERCIAL, 2 - MILITAR')
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `)

        let tipoAero
        switch(tipo){
            case 1:
                tipoAero = TipoAeronave.COMERCIAL
                break;
            case 2:
                tipoAero = TipoAeronave.MILITAR
                break;
        }

       let maiorIdMemoria = 0

        for (let aer of this.aeronaves) {
            const idAtual = parseInt(aer.codigo)
            
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual
            }
        }

        const maiorIdArquivo = this.maiorIdDoArquivo()
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo)
        let codigo =  (maiorId + 1).toString()
        let codigoFinal = "AER0" + codigo

        let aeronave = new Aeronave(codigoFinal, modelo, tipoAero, parseInt(capacidade), parseInt(alcance))
        this.aeronaves.push(aeronave)
        console.log(`\nCadastro concluído :)\n`);
    }
}

export default CadastrarAeronave