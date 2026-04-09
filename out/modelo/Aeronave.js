"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    get mostrarDetalhes() {
        let detalhes = "Código da aeronave: " + `${this.codigo}` + "\n" +
            "Modelo da aeronave: " + `${this.modelo}` + "\n" +
            "Tipo da aeronave: " + `${this.tipo}` + "\n" +
            "Capacidade da aeronave: " + `${this.capacidade}` + "\n" +
            "Alcance da aeronave: " + `${this.alcance}` + "\n";
        return detalhes;
    }
    static salvar(aeronaves) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Aeronaves.txt");
        const pasta = path_1.default.dirname(caminho);
        if (!fs_1.default.existsSync(pasta)) {
            fs_1.default.mkdirSync(pasta, { recursive: true });
        }
        let idsSalvos = [];
        if (fs_1.default.existsSync(caminho)) {
            const linhas = fs_1.default.readFileSync(caminho, "utf-8").split("\n");
            for (let linha of linhas) {
                if (linha.trim() !== "") {
                    idsSalvos.push(linha.split(";")[0]);
                }
            }
        }
        let novasLinhas = "";
        for (let aer of aeronaves) {
            if (!idsSalvos.includes(aer.codigo)) {
                novasLinhas += `${aer.codigo};${aer.modelo};${aer.tipo};${aer.capacidade};${aer.alcance}\n`;
            }
        }
        if (novasLinhas) {
            fs_1.default.appendFileSync(caminho, novasLinhas);
        }
        console.log("Aeronave salva com sucesso");
    }
    static carregar(codigo_aer) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Aeronaves.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const aeronaves = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [codigo, modelo, tipo, capacidade, alcance] = partes;
            if (codigo === codigo_aer) {
                const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
                aeronaves.push(aeronave);
            }
        }
        return aeronaves;
    }
}
exports.default = Aeronave;
