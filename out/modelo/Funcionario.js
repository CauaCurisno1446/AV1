"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Funcionario {
    constructor(id, nome, telefone, endereco, usuario, senha, nivel) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivel;
    }
    autenticar(usuario, senha) {
        return this.usuario === usuario && this.senha === senha;
    }
    static listarFuncionarios() {
        const caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const funcionarios = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [id, nome, telefone, endereco, usuario, senha, nivel] = partes;
            const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel);
            funcionarios.push(funcionario);
        }
        return funcionarios;
    }
    static salvar(funcionarios) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
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
        for (let func of funcionarios) {
            if (!idsSalvos.includes(func.id)) {
                novasLinhas += `${func.id};${func.nome};${func.telefone};${func.endereco};${func.usuario};${func.senha};${func.nivelPermissao}\n`;
            }
        }
        if (novasLinhas) {
            fs_1.default.appendFileSync(caminho, novasLinhas);
        }
        console.log("Funcionario salvo com sucesso");
    }
    static carregar(id_func) {
        const caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
        if (!fs_1.default.existsSync(caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const funcionarios = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [idStr, nome, telefone, endereco, usuario, senha, nivel] = partes;
            if (idStr === id_func) {
                const funcionario = new Funcionario(idStr, nome, telefone, endereco, usuario, senha, nivel);
                funcionarios.push(funcionario);
            }
        }
        return funcionarios;
    }
}
exports.default = Funcionario;
