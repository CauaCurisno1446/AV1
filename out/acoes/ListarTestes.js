"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listagem_1 = __importDefault(require("./Listagem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Teste_1 = __importDefault(require("../modelo/Teste"));
class ListagemTeste extends Listagem_1.default {
    constructor(testes) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Testes.txt");
        this.testes = testes;
    }
    lerDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho) || !fs_1.default.readFileSync(this.caminho, "utf-8").trim()) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const etapas = [];
        for (let linha of linhas) {
            const [idTeste, tipo, resultado] = linha.split(";");
            const etapa = new Teste_1.default(idTeste, tipo, resultado);
            etapas.push(etapa);
        }
        return etapas;
    }
    listar() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.testes];
        dadosTXT.forEach(etp => {
            const jaExiste = todos.some(existente => existente.idTeste === etp.idTeste);
            if (!jaExiste)
                todos.push(etp);
        });
        if (todos.length === 0) {
            console.log(`Nenhum teste cadastrado.`);
            return;
        }
        console.log(`\nLista de todas as etapas:`);
        todos.forEach(etapa => {
            console.log(`ID: ` + etapa.idTeste);
            console.log(`Tipo: ` + etapa.tipo);
            console.log(`Resultado: ` + etapa.resultado);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemTeste;
