"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const Peca_1 = __importDefault(require("../modelo/Peca"));
const TipoPeca_1 = __importDefault(require("../enum/TipoPeca"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const StatusPeca_1 = __importDefault(require("../enum/StatusPeca"));
class CadastrarPeca extends Cadastro_1.default {
    constructor(pecas) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Pecas.txt");
        this.pecas = pecas;
        this.entrada = new Entrada_1.default();
    }
    maiorIdDoArquivo() {
        if (!fs_1.default.existsSync(this.caminho))
            return 0;
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        let maiorId = 0;
        for (let linha of linhas) {
            const codigo = linha.split(";")[0].trim();
            const id = parseInt(codigo.replace("PEC0", ""));
            if (id > maiorId)
                maiorId = id;
        }
        return maiorId;
    }
    cadastrar() {
        console.log(`\nInício do cadastro de peca`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome da peca: `);
        let fornecedor = this.entrada.receberTexto(`Por favor informe o fornecedor da peca: `);
        console.log('\n Qual o tipo da peca?');
        console.log('\n 1 - NACIONAL, 2 - IMPORTADA');
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `);
        console.log('\n Qual o status da peca?');
        console.log('\n 1 - EM PRODUCAO, 2 - EM TRANSPORTE, 3 - PRONTA');
        let status = this.entrada.receberNumero(`Por favor informe o código do status: `);
        let tipoPeca;
        switch (tipo) {
            case 1:
                tipoPeca = TipoPeca_1.default.NACIONAL;
                break;
            case 2:
                tipoPeca = TipoPeca_1.default.IMPORTADA;
                break;
        }
        let statusPeca;
        switch (status) {
            case 1:
                statusPeca = StatusPeca_1.default.EM_PRODUCAO;
                break;
            case 2:
                statusPeca = StatusPeca_1.default.EM_TRANSPORTE;
                break;
            case 3:
                statusPeca = StatusPeca_1.default.PRONTA;
                break;
        }
        let maiorIdMemoria = 0;
        for (let pec of this.pecas) {
            const idAtual = parseInt(pec.idPeca.replace("PEC0", ""));
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual;
            }
        }
        const maiorIdArquivo = this.maiorIdDoArquivo();
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo);
        let codigo = (maiorId + 1).toString();
        let codigoFinal = "PEC0" + codigo;
        let peca = new Peca_1.default(codigoFinal, nome, tipoPeca, fornecedor, statusPeca);
        this.pecas.push(peca);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastrarPeca;
