"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listagem_1 = __importDefault(require("./Listagem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Etapa_1 = __importDefault(require("../modelo/Etapa"));
class ListagemEtapa extends Listagem_1.default {
    constructor(etapas) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        this.etapas = etapas;
    }
    lerDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho) || !fs_1.default.readFileSync(this.caminho, "utf-8").trim()) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const etapas = [];
        for (let linha of linhas) {
            const [id, nome, prazo, status, funcionarios] = linha.split(";");
            const etapa = new Etapa_1.default(id, nome, prazo, status, funcionarios);
            etapas.push(etapa);
        }
        return etapas;
    }
    listar() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.etapas];
        dadosTXT.forEach(etp => {
            const jaExiste = todos.some(existente => existente.idEtapa === etp.idEtapa);
            if (!jaExiste)
                todos.push(etp);
        });
        if (todos.length === 0) {
            console.log(`Nenhuma etapa cadastrada.`);
            return;
        }
        console.log(`\nLista de todas as etapas:`);
        todos.forEach(etapa => {
            console.log(`ID: ` + etapa.idEtapa);
            console.log(`Nome: ` + etapa.nome);
            console.log(`Prazo: ` + etapa.prazo);
            console.log(`Status: ` + etapa.status);
            console.log(`Funcionarios (ID): ` + etapa.funcionarios);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemEtapa;
