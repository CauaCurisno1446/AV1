"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Peca {
    constructor(id, nome, tipo, fornecedor, status) {
        this.idPeca = id;
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    static atualizarStatus(id, status) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Pecas.txt");
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        let novasLinhas = "";
        for (let linha of linhas) {
            const partes = linha.split(";");
            let idEtapa = partes[0];
            if (idEtapa === id) {
                novasLinhas += `${partes[0]};${partes[1]};${partes[2]};${partes[3]};${status}\n`;
            }
            else {
                novasLinhas += linha + "\n";
            }
        }
        fs_1.default.writeFileSync(caminho, novasLinhas);
        console.log("Peca atualizada!");
    }
    static salvar(pecas) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Pecas.txt");
        const pasta = path_1.default.dirname(caminho);
        if (!fs_1.default.existsSync(pasta)) {
            fs_1.default.mkdirSync(pasta, { recursive: true });
        }
        let novasLinhas = "";
        for (let pec of pecas) {
            novasLinhas += `${pec.idPeca};${pec.nome};${pec.tipo};${pec.fornecedor};${pec.status}\n`;
        }
        if (novasLinhas) {
            fs_1.default.appendFileSync(caminho, novasLinhas);
        }
        console.log("Peca salva com sucesso");
    }
    static carregar(codigo_pec) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Pecas.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const pecas = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [id, nome, tipo, fornecedor, status] = partes;
            if (id === codigo_pec) {
                const peca = new Peca(id, nome, tipo, fornecedor, status);
                pecas.push(peca);
            }
        }
        return pecas;
    }
    static associarAeronave(idAeronave, idPeca) {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesPecas.txt");
        fs_1.default.appendFileSync(caminho, `${idAeronave};${idPeca}\n`);
        console.log("Peça associada à aeronave!");
    }
}
exports.default = Peca;
