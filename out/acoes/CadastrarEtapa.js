"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("../util/Entrada"));
const Cadastro_1 = __importDefault(require("./Cadastro"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const StatusEtapa_1 = __importDefault(require("../enum/StatusEtapa"));
const Etapa_1 = __importDefault(require("../modelo/Etapa"));
class CadastrarEtapa extends Cadastro_1.default {
    constructor(etapa) {
        super();
        this.caminho = path_1.default.resolve(__dirname, "../../data/Etapas.txt");
        this.etapas = etapa;
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
            const id = parseInt(codigo.replace("ETP0", ""));
            if (id > maiorId)
                maiorId = id;
        }
        return maiorId;
    }
    cadastrar() {
        console.log(`\nInício do cadastro de etapa`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome da etapa: `);
        let prazo = this.entrada.receberTexto(`Por favor informe o prazo para a etapa, no padrão (dd/mm/yyyy): `);
        // console.log('\n Qual o status da etapa?')
        // console.log('\n 1 - PENDENTE, 2 - EM ANDAMENTO, 3 - CONCLUIDA')
        // let status = this.entrada.receberNumero(`Por favor informe o código do status: `)
        // let statusEtp
        // switch(status){
        //     case 1:
        //         statusEtp = StatusEtapa.PENDENTE
        //         break;
        //     case 2:
        //         statusEtp = StatusEtapa.EM_ANDAMENTO
        //         break;
        //     case 3:
        //         statusEtp = StatusEtapa.CONCLUIDA
        //         break;
        // }
        let maiorIdMemoria = 0;
        for (let etp of this.etapas) {
            const idAtual = parseInt(etp.idEtapa);
            if (idAtual > maiorIdMemoria) {
                maiorIdMemoria = idAtual;
            }
        }
        const maiorIdArquivo = this.maiorIdDoArquivo();
        const maiorId = Math.max(maiorIdMemoria, maiorIdArquivo);
        let codigo = (maiorId + 1).toString();
        let codigoFinal = "ETP0" + codigo;
        let statusEtp = StatusEtapa_1.default.PENDENTE;
        let etapa = new Etapa_1.default(codigoFinal, nome, prazo, statusEtp, []);
        this.etapas.push(etapa);
        console.log(`\nCadastro concluído :)\n`);
    }
}
exports.default = CadastrarEtapa;
