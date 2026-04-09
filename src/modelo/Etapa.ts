import StatusEtapa from "../enum/StatusEtapa";
import Entrada from "../util/Entrada";
import Funcionario from "./Funcionario";
import fs from "fs"
import path from "path"

class Etapa{
    public idEtapa: string
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Array<Funcionario>

    constructor(id: string, nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario>){
        this.idEtapa = id
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    public static associarFuncionario(idEtapa: string): void {
        const caminho = path.resolve(__dirname, "../../data/Etapas.txt")

        if (!fs.existsSync(caminho)) {
            console.log("Arquivo não encontrado.")
            return
        }

        const dados = fs.readFileSync(caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")

        const caminhoFunc = path.resolve(__dirname, "../../data/Usuarios.txt")
        const dadosFunc = fs.readFileSync(caminhoFunc, "utf-8")
        const linhasFunc = dadosFunc.split("\n").filter(l => l.trim() !== "")

        console.log("\nFuncionários disponíveis:")
        for (let linha of linhasFunc) {
            const partes = linha.split(";")
            console.log(`ID: ${partes[0]} | Nome: ${partes[1]}`)
        }

        const entrada = new Entrada()
        let novosFuncionarios = ""

        let adicionar = entrada.receberTexto("Deseja adicionar funcionário? (s/n): ")
        while (adicionar.toLowerCase() === "s") {
            let idEscolhido = entrada.receberTexto("Digite o ID do funcionário: ")

            let encontrado = linhasFunc.find(l => l.split(";")[0] === idEscolhido)

            if (encontrado) {
                if (novosFuncionarios !== "") novosFuncionarios += ","
                novosFuncionarios += idEscolhido
                console.log("Funcionário adicionado!")
            } else {
                console.log("Funcionário não encontrado.")
            }

            adicionar = entrada.receberTexto("Adicionar outro? (s/n): ")
        }

        let novasLinhas = ""
        for (let linha of linhas) {
            const partes = linha.split(";")
            const id = partes[0]

            if (id === idEtapa) {
                // Mantém os funcionários que já tinham e adiciona os novos
                let funcionariosAtuais = partes[4] ? partes[4].trim() : ""
                let funcionariosFinais = funcionariosAtuais

                if (novosFuncionarios !== "") {
                    if (funcionariosFinais !== "") funcionariosFinais += ","
                    funcionariosFinais += novosFuncionarios
                }

                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${partes[3]};${funcionariosFinais}\n`
            } else {
                novasLinhas += linha + "\n"
            }
        }

        fs.writeFileSync(caminho, novasLinhas)
        console.log("Funcionários associados com sucesso!")
    }

    public static salvar(etapas: Array<Etapa>): void {
        const caminho = path.resolve(__dirname, "../../data/Etapas.txt")
        
        const pasta = path.dirname(caminho)

        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true })
        }

        const etapa = etapas[etapas.length - 1]

        let idsDosFuncionarios = ""
        for (let func of etapa.funcionarios) {
            if (idsDosFuncionarios !== "") {
                idsDosFuncionarios += ","
            }
            idsDosFuncionarios += func.id
        }

        let novasLinhas = `${etapa.idEtapa};${etapa.nome};${etapa.prazo};${etapa.status};${idsDosFuncionarios}\n`
        
            
        if (novasLinhas) {
            fs.appendFileSync(caminho, novasLinhas)
        }
            
        console.log("Etapa salva com sucesso")
    }
        
    public static carregar(codigo_etapa: string): Etapa[] {
        const caminho = path.resolve(__dirname, "../../data/Etapas.txt");
                            
        if (!fs.existsSync(caminho)) {
            return []
        }
                
        const dados = fs.readFileSync(caminho, "utf-8")
                    
        if (!dados.trim()) {
            return [];
        }
                
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const etapas: Etapa[] = []
                
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [id, nome, prazo, status, funcionariosStr] = partes
                
            if (id === codigo_etapa) {

                let idsFuncionarios: string[] = []

                if (funcionariosStr && funcionariosStr.trim() !== "") {
                    idsFuncionarios = funcionariosStr.trim().split(",")
                }

                   
                let funcionarios: Funcionario[] = []
                for (let idFunc of idsFuncionarios) {
                    let func = new Funcionario(idFunc, "", "", "", "", "", "" as any)
                    funcionarios.push(func)
                }

                const etapa = new Etapa(id, nome, prazo, status as any, [])
                etapas.push(etapa)
            }
        }

        return etapas
    }

    
    public static iniciar(id: string): void {
        const caminho = path.resolve(__dirname, "../../data/Etapas.txt")

        const dados = fs.readFileSync(caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")

        let indiceEtapa = -1
        for (let i = 0; i < linhas.length; i++) {
            if (linhas[i].split(";")[0] === id) {
                indiceEtapa = i
                break
            }
        }

        if (indiceEtapa === -1) {
            console.log("Etapa não encontrada.")
            return
        }

        if (indiceEtapa > 0) {
            const etapaAnterior = linhas[indiceEtapa - 1].split(";")
            const statusAnterior = etapaAnterior[3]

            if (statusAnterior !== StatusEtapa.CONCLUIDA) {
                console.log(`Não é possível iniciar. A etapa anterior está com status: ${statusAnterior}`)
                return
            }
        }

        let novasLinhas = ""

        for (let linha of linhas) {
            const partes = linha.split(";")
            let idEtapa = partes[0]
     
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${StatusEtapa.EM_ANDAMENTO};${partes[4] || ""}\n`
            } 
            else {
                novasLinhas += linha + "\n"
            }
        }

        fs.writeFileSync(caminho, novasLinhas)
        console.log("Etapa iniciada!")
    }

    public static finalizar(id: string): void {
        const caminho = path.resolve(__dirname, "../../data/Etapas.txt")

        const dados = fs.readFileSync(caminho, "utf-8")
        const linhas = dados.split("\n").filter(l => l.trim() !== "")

        let novasLinhas = ""

        for (let linha of linhas) {
            const partes = linha.split(";")
            let idEtapa = partes[0]
     
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${StatusEtapa.CONCLUIDA};${partes[4] || ""}\n`
            } 
            else {
                novasLinhas += linha + "\n"
            }
        }

        fs.writeFileSync(caminho, novasLinhas)
        console.log("Etapa iniciada!")
    }

    public static associarAeronave(idAeronave: string, idEtapa: string): void {
        const caminho = path.resolve(__dirname, "../../data/AeronavesEtapas.txt")
        fs.appendFileSync(caminho, `${idAeronave};${idEtapa}\n`)
        console.log("Etapa associada à aeronave!")
    }
}

export default Etapa