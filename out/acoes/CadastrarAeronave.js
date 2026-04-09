"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const Aeronave_1 = __importDefault(require("../modelo/Aeronave"));
const TipoAeronave_1 = __importDefault(require("../enum/TipoAeronave"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class CadastrarAeronave extends Cadastro_1.default {
    constructor(aeronaves) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Aeronaves.txt");
        this.aeronaves = aeronaves;
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
            const id = parseInt(codigo.replace("AER0", ""));
            if (id > maiorId)
                maiorId = id;
        }
        return maiorId;
    }
    cadastrar() {
        console.log(`\nInício do cadastro do aeronave`);
        let modelo = this.entrada.receberTexto(`Por favor informe o modelo da aeronave: `);
        let capacidade = this.entrada.receberTexto(`Por favor informe a capacidade da aeronave: `);
        let alcance = this.entrada.receberTexto(`Por favor informe o alcance da aeronave: `);
        console.log('\n Qual o tipo da aeronave?');
        console.log('\n 1 - COMERCIAL, 2 - MILITAR');
        let tipo = this.entrada.receberNumero(`Por favor informe o código do tipo: `);
        let tipoAero;
        switch (tipo) {
            case 1:
                tipoAero = TipoAeronave_1.default.COMERCIAL;
                break;
            case 2:
                tipoAero = TipoAeronave_1.default.MILITAR;
                break;
        }
        let maiorIdMemoria = 0;
        for (let aer of this.aeronaves) {
            const idAtual = parseInt(aer.codigo);
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual;
            }
        }
        const maiorIdArquivo = this.maiorIdDoArquivo();
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo);
        let codigo = (maiorId + 1).toString();
        let codigoFinal = "AER0" + codigo;
        let aeronave = new Aeronave_1.default(codigoFinal, modelo, tipoAero, parseInt(capacidade), parseInt(alcance));
        this.aeronaves.push(aeronave);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastrarAeronave;
