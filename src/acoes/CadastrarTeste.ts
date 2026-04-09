import Entrada from "../util/Entrada"
import Cadastro from "./Cadastro"
import Teste from "../modelo/Teste"
import TipoTeste from "../enum/TipoTeste"
import fs from 'fs'
import path from 'path'
import ResultadoTeste from "../enum/ResultadoTeste"

class CadastrarTeste  extends Cadastro{
    private testes: Array<Teste>
    private entrada: Entrada
    private caminho = path.resolve(__dirname, "../../data/Testes.txt")

    constructor(testes: Array<Teste>) {
        super()
        this.testes = testes
        this.entrada = new Entrada()
    }

    private maiorIdDoArquivo(): number {
                if (!fs.existsSync(this.caminho)) return 0
        
                const dados = fs.readFileSync(this.caminho, "utf-8")
                const linhas = dados.split("\n").filter(l => l.trim() !== "")
        
                let maiorId = 0
                for (let linha of linhas) {
                    const codigo = linha.split(";")[0].trim()
                    const id = parseInt(codigo.replace("TES0", ""))
                    if (id > maiorId) maiorId = id
                }
        
                return maiorId
        }

    public cadastrar(): void {
        console.log(`\nInício da realização de teste`)

        console.log('\n Qual o tipo do teste?')
        console.log('\n 1 - AERODINAMICO, 2 - ELETRICO, 3 - HIDRAULICO')
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `)

        let tipoTeste
        switch(tipo){
            case 1:
                tipoTeste = TipoTeste.AERODINAMICO
                break;
            case 2:
                tipoTeste = TipoTeste.ELETRICO
                break;
            case 3:
                tipoTeste = TipoTeste.HIDRAULICO
                break;
        }

        console.log('\n Qual o tipo do teste?')
        console.log('\n 4 - APROVADO, 5 - REPROVADO')
        let resultado = this.entrada.receberNumero(`Por favor informe o código do tipo: `)

        let resultadoTeste
        switch(resultado){
            case 4:
                resultadoTeste = ResultadoTeste.APROVADO
                break;
            case 5:
                resultadoTeste = ResultadoTeste.REPROVADO
                break;
        }

        

        let maiorIdMemoria = 0

        for (let teste of this.testes) {
            const idAtual = parseInt(teste.idTeste.replace("TES0", ""))
            
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual
            }
        }

        const maiorIdArquivo = this.maiorIdDoArquivo()
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo)
        let codigo =  (maiorId + 1).toString()
        let codigoFinal = "TES0" + codigo


        let teste = new Teste(codigoFinal, tipoTeste, resultadoTeste)
        this.testes.push(teste)
        console.log(`\nCadastro concluído :)\n`);
    }
}

export default CadastrarTeste