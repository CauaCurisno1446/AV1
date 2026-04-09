import Entrada from "../util/Entrada"
import Cadastro from "./Cadastro"
import fs from 'fs'
import path from 'path'
import Funcionario from "../modelo/Funcionario"
import StatusEtapa from "../enum/StatusEtapa"
import Etapa from "../modelo/Etapa"
import ListagemFuncionarios from "./ListarFuncionarios"


class CadastrarEtapa extends Cadastro{
    private etapas: Array<Etapa>
    private entrada: Entrada
    private caminho = path.resolve(__dirname, "../../data/Etapas.txt")

    constructor(etapa: Array<Etapa>) {
        super()
        this.etapas = etapa
        this.entrada = new Entrada()
    }

    private maiorIdDoArquivo(): number {
            if (!fs.existsSync(this.caminho)) return 0
    
            const dados = fs.readFileSync(this.caminho, "utf-8")
            const linhas = dados.split("\n").filter(l => l.trim() !== "")
    
            let maiorId = 0
            for (let linha of linhas) {
                const codigo = linha.split(";")[0].trim()
                const id = parseInt(codigo.replace("ETP0", ""))
                if (id > maiorId) maiorId = id
            }
    
            return maiorId
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de etapa`)
        let nome = this.entrada.receberTexto(`Por favor informe o nome da etapa: `)
        let prazo = this.entrada.receberTexto(`Por favor informe o prazo para a etapa, no padrão (dd/mm/yyyy): `)
    
        // console.log('\n Qual o status da etapa?')
        // console.log('\n 1 - PENDENTE, 2 - EM ANDAMENTO, 3 - CONCLUIDA')
        // let status = this.entrada.receberNumero(`Por favor informe o código do status: `)

        // let statusEtp
        // switch(status){
        //     case 1:
        //         statusEtp = StatusEtapa.PENDENTE
        //         break;
        //     case 2:
        //         statusEtp = StatusEtapa.EM_ANDAMENTO
        //         break;
        //     case 3:
        //         statusEtp = StatusEtapa.CONCLUIDA
        //         break;
        // }


        let maiorIdMemoria = 0

        for (let etp of this.etapas) {
            const idAtual = parseInt(etp.idEtapa)
                
            if (idAtual > maiorIdMemoria) {
                    maiorIdMemoria = idAtual
            }
        }

        const maiorIdArquivo = this.maiorIdDoArquivo()
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo)
        let codigo =  (maiorId + 1).toString()
        let codigoFinal = "ETP0" + codigo

        let statusEtp = StatusEtapa.PENDENTE

        let etapa = new Etapa(codigoFinal, nome, prazo, (statusEtp as any), [])
        this.etapas.push(etapa)
        console.log(`\nCadastro concluído :)\n`);
    }
}

export default CadastrarEtapa