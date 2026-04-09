import Aeronave from "./Aeronave"
import Etapa from "./Etapa"
import Teste from "./Teste"
import Peca from "./Peca"
import Funcionario from "./Funcionario"
import fs from "fs"
import path from "path"

class Relatorio {
    public aeronave: Aeronave

    constructor(aeronave: Aeronave) {
        this.aeronave = aeronave
    }

    public gerar(nomeCliente: string): void {
        const caminhoRelatorio = path.resolve(__dirname, `../../relatorios/Relatorio_${this.aeronave.codigo}.txt`)

        let conteudo = ""
        conteudo += `========================================\n`
        conteudo += `        RELATÓRIO DA AERONAVE           \n`
        conteudo += `========================================\n`
        conteudo += `Cliente: ${nomeCliente}\n`
        conteudo += `Código:  ${this.aeronave.codigo}\n`
        conteudo += `Modelo:  ${this.aeronave.modelo}\n`
        conteudo += `Tipo:  ${this.aeronave.tipo}\n`
        conteudo += `Capacidade:  ${this.aeronave.capacidade}\n`
        conteudo += `Alcance:  ${this.aeronave.alcance}\n`
        conteudo += `\n`

        conteudo += `========================================\n`
        conteudo += `                ETAPAS                  \n`
        conteudo += `========================================\n`

        const etapas = this.buscarEtapas()

        if (etapas.length === 0) {
            conteudo += `Nenhuma etapa associada.\n`
        }

        for (let etapa of etapas) {
            conteudo += `\nID:     ${etapa.idEtapa}\n`
            conteudo += `Nome:   ${etapa.nome}\n`
            conteudo += `Prazo:  ${etapa.prazo}\n`
            conteudo += `Status: ${etapa.status}\n`

            conteudo += `Funcionários:\n`
            const nomesFunc = this.buscarNomesFuncionarios(etapa.idEtapa)
            if (nomesFunc.length === 0) {
                conteudo += `  Nenhum funcionário associado.\n`
            }
            for (let nome of nomesFunc) {
                conteudo += `  - ${nome}\n`
            }

            conteudo += `----------------------------------------\n`
        }

        conteudo += `\n`

        conteudo += `========================================\n`
        conteudo += `                PEÇAS                   \n`
        conteudo += `========================================\n`

        const pecas = this.buscarPecas()

        if (pecas.length === 0) {
            conteudo += `Nenhuma peça associada.\n`
        }

        for (let peca of pecas) {
            conteudo += `\nID:         ${peca.idPeca}\n`
            conteudo += `Nome:       ${peca.nome}\n`
            conteudo += `Tipo:       ${peca.tipo}\n`
            conteudo += `Fornecedor: ${peca.fornecedor}\n`
            conteudo += `Status:     ${peca.status}\n`
            conteudo += `----------------------------------------\n`
        }

        conteudo += `\n`

        conteudo += `========================================\n`
        conteudo += `                TESTES                  \n`
        conteudo += `========================================\n`

        const testes = this.buscarTestes()

        if (testes.length === 0) {
            conteudo += `Nenhum teste realizado.\n`
        }

        for (let teste of testes) {
            conteudo += `\nID:        ${teste.idTeste}\n`
            conteudo += `Tipo:      ${teste.tipo}\n`
            conteudo += `Resultado: ${teste.resultado}\n`
            conteudo += `----------------------------------------\n`
        }

        fs.writeFileSync(caminhoRelatorio, conteudo)
        console.log(`\nRelatório gerado em: ${caminhoRelatorio}`)
    }

    private buscarEtapas(): Etapa[] {
        const caminho = path.resolve(__dirname, "../../data/AeronavesEtapas.txt")
        if (!fs.existsSync(caminho)) return []

        const linhas = fs.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "")
        const etapas: Etapa[] = []

        for (let linha of linhas) {
            const partes = linha.split(";")
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Etapa.carregar(partes[1])
                if (resultado.length > 0) etapas.push(resultado[0])
            }
        }

        return etapas
    }

    private buscarNomesFuncionarios(idEtapa: string): string[] {
        const caminhoEtapas = path.resolve(__dirname, "../../data/Etapas.txt")
        if (!fs.existsSync(caminhoEtapas)) return []

        const linhas = fs.readFileSync(caminhoEtapas, "utf-8").split("\n").filter(l => l.trim() !== "")
        const nomes: string[] = []

        for (let linha of linhas) {
            const partes = linha.split(";")
            if (partes[0] === idEtapa) {
                const funcionariosStr = partes[4] ? partes[4].trim() : ""
                if (funcionariosStr === "") break

                const ids = funcionariosStr.split(",")
                for (let id of ids) {
                    const resultado = Funcionario.carregar(id.trim())
                    if (resultado.length > 0) {
                        nomes.push(resultado[0].nome)
                    }
                }
                break
            }
        }

        return nomes
    }

    private buscarPecas(): Peca[] {
        const caminho = path.resolve(__dirname, "../../data/AeronavesPecas.txt")
        if (!fs.existsSync(caminho)) return []

        const linhas = fs.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "")
        const pecas: Peca[] = []

        for (let linha of linhas) {
            const partes = linha.split(";")
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Peca.carregar(partes[1])
                if (resultado.length > 0) pecas.push(resultado[0])
            }
        }

        return pecas
    }

    private buscarTestes(): Teste[] {
        const caminho = path.resolve(__dirname, "../../data/AeronavesTestes.txt")
        if (!fs.existsSync(caminho)) return []

        const linhas = fs.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "")
        const testes: Teste[] = []

        for (let linha of linhas) {
            const partes = linha.split(";")
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Teste.carregar(partes[1])
                if (resultado.length > 0) testes.push(resultado[0])
            }
        }

        return testes
    }
}

export default Relatorio