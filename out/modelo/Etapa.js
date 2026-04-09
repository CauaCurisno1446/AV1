"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatusEtapa_1 = __importDefault(require("../enum/StatusEtapa"));
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Funcionario_1 = __importDefault(require("./Funcionario"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Etapa {
    constructor(id, nome, prazo, status, funcionarios) {
        this.idEtapa = id;
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = funcionarios;
    }
    static associarFuncionario(idEtapa) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        if (!fs_1.default.existsSync(caminho)) {
            console.log("Arquivo não encontrado.");
            return;
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const caminhoFunc = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
        const dadosFunc = fs_1.default.readFileSync(caminhoFunc, "utf-8");
        const linhasFunc = dadosFunc.split("\n").filter(l => l.trim() !== "");
        console.log("\nFuncionários disponíveis:");
        for (let linha of linhasFunc) {
            const partes = linha.split(";");
            console.log(`ID: ${partes[0]} | Nome: ${partes[1]}`);
        }
        const entrada = new Entrada_1.default();
        let novosFuncionarios = "";
        let adicionar = entrada.receberTexto("Deseja adicionar funcionário? (s/n): ");
        while (adicionar.toLowerCase() === "s") {
            let idEscolhido = entrada.receberTexto("Digite o ID do funcionário: ");
            let encontrado = linhasFunc.find(l => l.split(";")[0] === idEscolhido);
            if (encontrado) {
                if (novosFuncionarios !== "")
                    novosFuncionarios += ",";
                novosFuncionarios += idEscolhido;
                console.log("Funcionário adicionado!");
            }
            else {
                console.log("Funcionário não encontrado.");
            }
            adicionar = entrada.receberTexto("Adicionar outro? (s/n): ");
        }
        let novasLinhas = "";
        for (let linha of linhas) {
            const partes = linha.split(";");
            const id = partes[0];
            if (id === idEtapa) {
                // Mantém os funcionários que já tinham e adiciona os novos
                let funcionariosAtuais = partes[4] ? partes[4].trim() : "";
                let funcionariosFinais = funcionariosAtuais;
                if (novosFuncionarios !== "") {
                    if (funcionariosFinais !== "")
                        funcionariosFinais += ",";
                    funcionariosFinais += novosFuncionarios;
                }
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${partes[3]};${funcionariosFinais}\n`;
            }
            else {
                novasLinhas += linha + "\n";
            }
        }
        fs_1.default.writeFileSync(caminho, novasLinhas);
        console.log("Funcionários associados com sucesso!");
    }
    static salvar(etapas) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        const pasta = path_1.default.dirname(caminho);
        if (!fs_1.default.existsSync(pasta)) {
            fs_1.default.mkdirSync(pasta, { recursive: true });
        }
        const etapa = etapas[etapas.length - 1];
        let idsDosFuncionarios = "";
        for (let func of etapa.funcionarios) {
            if (idsDosFuncionarios !== "") {
                idsDosFuncionarios += ",";
            }
            idsDosFuncionarios += func.id;
        }
        let novasLinhas = `${etapa.idEtapa};${etapa.nome};${etapa.prazo};${etapa.status};${idsDosFuncionarios}\n`;
        if (novasLinhas) {
            fs_1.default.appendFileSync(caminho, novasLinhas);
        }
        console.log("Etapa salva com sucesso");
    }
    static carregar(codigo_etapa) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const etapas = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [id, nome, prazo, status, funcionariosStr] = partes;
            if (id === codigo_etapa) {
                let idsFuncionarios = [];
                if (funcionariosStr && funcionariosStr.trim() !== "") {
                    idsFuncionarios = funcionariosStr.trim().split(",");
                }
                let funcionarios = [];
                for (let idFunc of idsFuncionarios) {
                    let func = new Funcionario_1.default(idFunc, "", "", "", "", "", "");
                    funcionarios.push(func);
                }
                const etapa = new Etapa(id, nome, prazo, status, []);
                etapas.push(etapa);
            }
        }
        return etapas;
    }
    static iniciar(id) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        let indiceEtapa = -1;
        for (let i = 0; i < linhas.length; i++) {
            if (linhas[i].split(";")[0] === id) {
                indiceEtapa = i;
                break;
            }
        }
        if (indiceEtapa === -1) {
            console.log("Etapa não encontrada.");
            return;
        }
        if (indiceEtapa > 0) {
            const etapaAnterior = linhas[indiceEtapa - 1].split(";");
            const statusAnterior = etapaAnterior[3];
            if (statusAnterior !== StatusEtapa_1.default.CONCLUIDA) {
                console.log(`Não é possível iniciar. A etapa anterior está com status: ${statusAnterior}`);
                return;
            }
        }
        let novasLinhas = "";
        for (let linha of linhas) {
            const partes = linha.split(";");
            let idEtapa = partes[0];
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${StatusEtapa_1.default.EM_ANDAMENTO};${partes[4] || ""}\n`;
            }
            else {
                novasLinhas += linha + "\n";
            }
        }
        fs_1.default.writeFileSync(caminho, novasLinhas);
        console.log("Etapa iniciada!");
    }
    static finalizar(id) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        let novasLinhas = "";
        for (let linha of linhas) {
            const partes = linha.split(";");
            let idEtapa = partes[0];
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${StatusEtapa_1.default.CONCLUIDA};${partes[4] || ""}\n`;
            }
            else {
                novasLinhas += linha + "\n";
            }
        }
        fs_1.default.writeFileSync(caminho, novasLinhas);
        console.log("Etapa iniciada!");
    }
    static associarAeronave(idAeronave, idEtapa) {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesEtapas.txt");
        fs_1.default.appendFileSync(caminho, `${idAeronave};${idEtapa}\n`);
        console.log("Etapa associada à aeronave!");
    }
}
exports.default = Etapa;
