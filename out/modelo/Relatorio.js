"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Etapa_1 = __importDefault(require("./Etapa"));
const Teste_1 = __importDefault(require("./Teste"));
const Peca_1 = __importDefault(require("./Peca"));
const Funcionario_1 = __importDefault(require("./Funcionario"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Relatorio {
    constructor(aeronave) {
        this.aeronave = aeronave;
    }
    gerar(nomeCliente) {
        const caminhoRelatorio = path_1.default.resolve(__dirname, `../../relatorios/Relatorio_${this.aeronave.codigo}.txt`);
        let conteudo = "";
        conteudo += `========================================\n`;
        conteudo += `        RELATÓRIO DA AERONAVE           \n`;
        conteudo += `========================================\n`;
        conteudo += `Cliente: ${nomeCliente}\n`;
        conteudo += `Código:  ${this.aeronave.codigo}\n`;
        conteudo += `Modelo:  ${this.aeronave.modelo}\n`;
        conteudo += `Tipo:  ${this.aeronave.tipo}\n`;
        conteudo += `Capacidade:  ${this.aeronave.capacidade}\n`;
        conteudo += `Alcance:  ${this.aeronave.alcance}\n`;
        conteudo += `\n`;
        conteudo += `========================================\n`;
        conteudo += `                ETAPAS                  \n`;
        conteudo += `========================================\n`;
        const etapas = this.buscarEtapas();
        if (etapas.length === 0) {
            conteudo += `Nenhuma etapa associada.\n`;
        }
        for (let etapa of etapas) {
            conteudo += `\nID:     ${etapa.idEtapa}\n`;
            conteudo += `Nome:   ${etapa.nome}\n`;
            conteudo += `Prazo:  ${etapa.prazo}\n`;
            conteudo += `Status: ${etapa.status}\n`;
            conteudo += `Funcionários:\n`;
            const nomesFunc = this.buscarNomesFuncionarios(etapa.idEtapa);
            if (nomesFunc.length === 0) {
                conteudo += `  Nenhum funcionário associado.\n`;
            }
            for (let nome of nomesFunc) {
                conteudo += `  - ${nome}\n`;
            }
            conteudo += `----------------------------------------\n`;
        }
        conteudo += `\n`;
        conteudo += `========================================\n`;
        conteudo += `                PEÇAS                   \n`;
        conteudo += `========================================\n`;
        const pecas = this.buscarPecas();
        if (pecas.length === 0) {
            conteudo += `Nenhuma peça associada.\n`;
        }
        for (let peca of pecas) {
            conteudo += `\nID:         ${peca.idPeca}\n`;
            conteudo += `Nome:       ${peca.nome}\n`;
            conteudo += `Tipo:       ${peca.tipo}\n`;
            conteudo += `Fornecedor: ${peca.fornecedor}\n`;
            conteudo += `Status:     ${peca.status}\n`;
            conteudo += `----------------------------------------\n`;
        }
        conteudo += `\n`;
        conteudo += `========================================\n`;
        conteudo += `                TESTES                  \n`;
        conteudo += `========================================\n`;
        const testes = this.buscarTestes();
        if (testes.length === 0) {
            conteudo += `Nenhum teste realizado.\n`;
        }
        for (let teste of testes) {
            conteudo += `\nID:        ${teste.idTeste}\n`;
            conteudo += `Tipo:      ${teste.tipo}\n`;
            conteudo += `Resultado: ${teste.resultado}\n`;
            conteudo += `----------------------------------------\n`;
        }
        fs_1.default.writeFileSync(caminhoRelatorio, conteudo);
        console.log(`\nRelatório gerado em: ${caminhoRelatorio}`);
    }
    buscarEtapas() {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesEtapas.txt");
        if (!fs_1.default.existsSync(caminho))
            return [];
        const linhas = fs_1.default.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "");
        const etapas = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Etapa_1.default.carregar(partes[1]);
                if (resultado.length > 0)
                    etapas.push(resultado[0]);
            }
        }
        return etapas;
    }
    buscarNomesFuncionarios(idEtapa) {
        const caminhoEtapas = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        if (!fs_1.default.existsSync(caminhoEtapas))
            return [];
        const linhas = fs_1.default.readFileSync(caminhoEtapas, "utf-8").split("\n").filter(l => l.trim() !== "");
        const nomes = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            if (partes[0] === idEtapa) {
                const funcionariosStr = partes[4] ? partes[4].trim() : "";
                if (funcionariosStr === "")
                    break;
                const ids = funcionariosStr.split(",");
                for (let id of ids) {
                    const resultado = Funcionario_1.default.carregar(id.trim());
                    if (resultado.length > 0) {
                        nomes.push(resultado[0].nome);
                    }
                }
                break;
            }
        }
        return nomes;
    }
    buscarPecas() {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesPecas.txt");
        if (!fs_1.default.existsSync(caminho))
            return [];
        const linhas = fs_1.default.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "");
        const pecas = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Peca_1.default.carregar(partes[1]);
                if (resultado.length > 0)
                    pecas.push(resultado[0]);
            }
        }
        return pecas;
    }
    buscarTestes() {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesTestes.txt");
        if (!fs_1.default.existsSync(caminho))
            return [];
        const linhas = fs_1.default.readFileSync(caminho, "utf-8").split("\n").filter(l => l.trim() !== "");
        const testes = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            if (partes[0] === this.aeronave.codigo) {
                const resultado = Teste_1.default.carregar(partes[1]);
                if (resultado.length > 0)
                    testes.push(resultado[0]);
            }
        }
        return testes;
    }
}
exports.default = Relatorio;
