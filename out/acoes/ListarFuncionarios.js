"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Funcionario_1 = __importDefault(require("../modelo/Funcionario"));
const Listagem_1 = __importDefault(require("./Listagem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ListagemFuncionarios extends Listagem_1.default {
    constructor(funcionarios) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
        this.funcionarios = funcionarios;
    }
    lerDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho) || !fs_1.default.readFileSync(this.caminho, "utf-8").trim()) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const funcionarios = [];
        for (let linha of linhas) {
            const [id, nome, telefone, endereco, usuario, senha, nivelPermissao] = linha.split(";");
            const funcionario = new Funcionario_1.default(id, nome, telefone, endereco, usuario, senha, nivelPermissao);
            funcionarios.push(funcionario);
        }
        return funcionarios;
    }
    obterFuncionarios() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.funcionarios];
        dadosTXT.forEach(f => {
            const jaExiste = todos.some(existente => existente.id === f.id);
            if (!jaExiste)
                todos.push(f);
        });
        return todos;
    }
    listar() {
        const dadosTXT = this.lerDoArquivo();
        const todos = [...this.funcionarios];
        dadosTXT.forEach(f => {
            const jaExiste = todos.some(existente => existente.id === f.id);
            if (!jaExiste)
                todos.push(f);
        });
        if (todos.length === 0) {
            console.log(`Nenhum funcionário cadastrado.`);
            return;
        }
        console.log(`\nLista de todos os funcionarios:`);
        todos.forEach(funcionario => {
            console.log(`ID: ` + funcionario.id);
            console.log(`Nome: ` + funcionario.nome);
            console.log(`Telefone: ` + funcionario.telefone);
            console.log(`Endereço: ` + funcionario.endereco);
            console.log(`Usuario: ` + funcionario.usuario);
            console.log(`Senha: ` + funcionario.senha);
            console.log(`Nível de Permissão: ` + funcionario.nivelPermissao);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}
exports.default = ListagemFuncionarios;
