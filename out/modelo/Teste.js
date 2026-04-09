"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Teste {
    constructor(id, tipo, resultado) {
        this.idTeste = id;
        this.tipo = tipo;
        this.resultado = resultado;
    }
    static salvar(testes) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Testes.txt");
        const pasta = path_1.default.dirname(caminho);
        if (!fs_1.default.existsSync(pasta)) {
            fs_1.default.mkdirSync(pasta, { recursive: true });
        }
        let novasLinhas = "";
        for (let teste of testes) {
            novasLinhas += `${teste.idTeste};${teste.tipo};${teste.resultado}\n`;
        }
        if (novasLinhas) {
            fs_1.default.appendFileSync(caminho, novasLinhas);
        }
        console.log("Teste salvo com sucesso");
    }
    static carregar(codigo_teste) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Testes.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const testes = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [id, tipo, resultado] = partes;
            if (id === codigo_teste) {
                const teste = new Teste(id, tipo, resultado);
                testes.push(teste);
            }
        }
        return testes;
    }
    static associarAeronave(idAeronave, idEtapa) {
        const caminho = path_1.default.resolve(__dirname, "../../data/AeronavesTestes.txt");
        fs_1.default.appendFileSync(caminho, `${idAeronave};${idEtapa}\n`);
        console.log("Etapa associada à aeronave!");
    }
}
exports.default = Teste;
