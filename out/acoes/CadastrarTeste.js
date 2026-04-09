"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const Teste_1 = __importDefault(require("../modelo/Teste"));
const TipoTeste_1 = __importDefault(require("../enum/TipoTeste"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ResultadoTeste_1 = __importDefault(require("../enum/ResultadoTeste"));
class CadastrarTeste extends Cadastro_1.default {
    constructor(testes) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Testes.txt");
        this.testes = testes;
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
            const id = parseInt(codigo.replace("TES0", ""));
            if (id > maiorId)
                maiorId = id;
        }
        return maiorId;
    }
    cadastrar() {
        console.log(`\nInício da realização de teste`);
        console.log('\n Qual o tipo do teste?');
        console.log('\n 1 - AERODINAMICO, 2 - ELETRICO, 3 - HIDRAULICO');
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `);
        let tipoTeste;
        switch (tipo) {
            case 1:
                tipoTeste = TipoTeste_1.default.AERODINAMICO;
                break;
            case 2:
                tipoTeste = TipoTeste_1.default.ELETRICO;
                break;
            case 3:
                tipoTeste = TipoTeste_1.default.HIDRAULICO;
                break;
        }
        console.log('\n Qual o tipo do teste?');
        console.log('\n 4 - APROVADO, 5 - REPROVADO');
        let resultado = this.entrada.receberNumero(`Por favor informe o código do tipo: `);
        let resultadoTeste;
        switch (resultado) {
            case 4:
                resultadoTeste = ResultadoTeste_1.default.APROVADO;
                break;
            case 5:
                resultadoTeste = ResultadoTeste_1.default.REPROVADO;
                break;
        }
        let maiorIdMemoria = 0;
        for (let teste of this.testes) {
            const idAtual = parseInt(teste.idTeste.replace("TES0", ""));
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual;
            }
        }
        const maiorIdArquivo = this.maiorIdDoArquivo();
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo);
        let codigo = (maiorId + 1).toString();
        let codigoFinal = "TES0" + codigo;
        let teste = new Teste_1.default(codigoFinal, tipoTeste, resultadoTeste);
        this.testes.push(teste);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastrarTeste;
