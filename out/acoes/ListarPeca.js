"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Peca_1 = __importDefault(require("../modelo/Peca"));
const Listagem_1 = __importDefault(require("./Listagem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ListagemPeca extends Listagem_1.default {
    constructor(pecas) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Pecas.txt");
        this.pecas = pecas;
    }
    lerDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho) || !fs_1.default.readFileSync(this.caminho, "utf-8").trim()) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const pecas = [];
        for (let linha of linhas) {
            const [idPeca, nome, tipo, fornecedor, status] = linha.split(";");
            const peca = new Peca_1.default(idPeca, nome, tipo, fornecedor, status);
            pecas.push(peca);
        }
        return pecas;
    }
    listar() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.pecas];
        dadosTXT.forEach(pec => {
            const jaExiste = todos.some(existente => existente.nome === pec.nome);
            if (!jaExiste)
                todos.push(pec);
        });
        if (todos.length === 0) {
            console.log(`Nenhuma peca cadastrada.`);
            return;
        }
        console.log(`\nLista de todas as pecas:`);
        todos.forEach(peca => {
            console.log(`ID: ` + peca.idPeca);
            console.log(`Nome: ` + peca.nome);
            console.log(`Tipo: ` + peca.tipo);
            console.log(`Fornecedor: ` + peca.fornecedor);
            console.log(`Status: ` + peca.status);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemPeca;
