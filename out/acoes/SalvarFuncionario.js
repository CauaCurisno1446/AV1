"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Salvar_1 = __importDefault(require("./Salvar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class SalvarFuncionario extends Salvar_1.default {
    constructor() {
        super(...arguments);
        this.caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
    }
    salvar(funcionarios) {
        const pasta = path_1.default.dirname(this.caminho);
        if (!fs_1.default.existsSync(pasta)) {
            fs_1.default.mkdirSync(pasta, { recursive: true });
        }
        let idsSalvos = [];
        if (fs_1.default.existsSync(this.caminho)) {
            const linhas = fs_1.default.readFileSync(this.caminho, "utf-8").split("\n");
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
            fs_1.default.appendFileSync(this.caminho, novasLinhas);
        }
        console.log("Funcionario salvo com sucesso");
    }
}
exports.default = SalvarFuncionario;
