"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Funcionario_1 = __importDefault(require("../modelo/Funcionario"));
const Carregar_1 = __importDefault(require("./Carregar"));
class CarregarFuncionario extends Carregar_1.default {
    constructor() {
        super(...arguments);
        this.caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
    }
    carregar(id_func) {
        if (!fs_1.default.existsSync(this.caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const funcionarios = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [idStr, nome, telefone, endereco, usuario, senha, nivel] = partes;
            if (idStr === id_func) {
                const funcionario = new Funcionario_1.default(idStr, nome, telefone, endereco, usuario, senha, nivel);
                funcionarios.push(funcionario);
            }
        }
        return funcionarios;
    }
}
exports.default = CarregarFuncionario;
