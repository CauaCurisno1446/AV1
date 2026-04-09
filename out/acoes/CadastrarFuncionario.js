"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Funcionario_1 = __importDefault(require("../modelo/Funcionario"));
const NivelPermissao_1 = __importDefault(require("../enum/NivelPermissao"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CadastrarFuncionario extends Cadastro_1.default {
    constructor(funcionarios) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Usuarios.txt");
        this.funcionarios = funcionarios;
        this.entrada = new Entrada_1.default();
    }
    maiorIdDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho))
            return 0;
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        let maiorId = 0;
        for (let linha of linhas) {
            const id = parseInt(linha.split(";")[0]);
            if (id > maiorId)
                maiorId = id;
        }
        return maiorId;
    }
    cadastrar() {
        console.log(`\nInício do cadastro do funcionario`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do funcionario: `);
        let telefone = this.entrada.receberTexto(`Por favor informe o número de telefone, no padrão (##) #########: `);
        let endereco = this.entrada.receberTexto(`Por favor informe o endereco (Rua, Bairro, Numero, Complemento): `);
        let usuario = this.entrada.receberTexto(`Por favor informe o usuario do funcionario: `);
        let senha = this.entrada.receberTexto(`Por favor informe a senha do funcionario: `);
        console.log('\n Qual o nível de acesso do funcionario?');
        console.log('\n 1 - ADMINISTRADOR, 2 - ENGENHEIRO, 3 - OPERADOR');
        let nivel = this.entrada.receberNumero(`Por favor informe o código do nível de acesso: `);
        let nivelAcesso;
        switch (nivel) {
            case 1:
                nivelAcesso = NivelPermissao_1.default.ADMINISTRADOR;
                break;
            case 2:
                nivelAcesso = NivelPermissao_1.default.ENGENHEIRO;
                break;
            case 3:
                nivelAcesso = NivelPermissao_1.default.OPERADOR;
                break;
        }
        let maiorIdMemoria = 0;
        for (let f of this.funcionarios) {
            const idAtual = parseInt(f.id);
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual;
            }
        }
        const maiorIdArquivo = this.maiorIdDoArquivo();
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo);
        const id = (maiorId + 1).toString();
        let funcionario = new Funcionario_1.default(id, nome, telefone, endereco, usuario, senha, nivelAcesso);
        this.funcionarios.push(funcionario);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastrarFuncionario;
