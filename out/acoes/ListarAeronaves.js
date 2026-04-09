"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Aeronave_1 = __importDefault(require("../modelo/Aeronave"));
const Listagem_1 = __importDefault(require("./Listagem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ListagemAeronaves extends Listagem_1.default {
    constructor(aeronaves) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Aeronaves.txt");
        this.aeronaves = aeronaves;
    }
    lerDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho) || !fs_1.default.readFileSync(this.caminho, "utf-8").trim()) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const aeronaves = [];
        for (let linha of linhas) {
            const [codigo, modelo, tipo, capacidade, alcance] = linha.split(";");
            const aeronave = new Aeronave_1.default(codigo, modelo, tipo, capacidade, alcance);
            aeronaves.push(aeronave);
        }
        return aeronaves;
    }
    listar() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.aeronaves];
        dadosTXT.forEach(aer => {
            const jaExiste = todos.some(existente => existente.codigo === aer.codigo);
            if (!jaExiste)
                todos.push(aer);
        });
        if (todos.length === 0) {
            console.log(`Nenhuma aeronave cadastrada.`);
            return;
        }
        console.log(`\nLista de todas as aeronaves:`);
        todos.forEach(aeronave => {
            console.log(`Código: ` + aeronave.codigo);
            console.log(`Modelo: ` + aeronave.modelo);
            console.log(`Tipo: ` + aeronave.tipo);
            console.log(`Capacidade: ` + aeronave.capacidade);
            console.log(`Alcance: ` + aeronave.alcance);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemAeronaves;
