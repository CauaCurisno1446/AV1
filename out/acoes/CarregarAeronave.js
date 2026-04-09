"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Carregar_1 = __importDefault(require("./Carregar"));
const Aeronave_1 = __importDefault(require("../modelo/Aeronave"));
class CarregarAeronave extends Carregar_1.default {
    constructor() {
        super(...arguments);
        this.caminho = path_1.default.resolve(__dirname, "../../data/Aeronaves.txt");
    }
    carregar(codigo_aer) {
        if (!fs_1.default.existsSync(this.caminho)) {
            return [];
        }
        const dados = fs_1.default.readFileSync(this.caminho, "utf-8");
        if (!dados.trim()) {
            return [];
        }
        const linhas = dados.split("\n").filter(l => l.trim() !== "");
        const aeronaves = [];
        for (let linha of linhas) {
            const partes = linha.split(";");
            const [codigo, modelo, tipo, capacidade, alcance] = partes;
            if (codigo === codigo_aer) {
                const aeronave = new Aeronave_1.default(codigo, modelo, tipo, capacidade, alcance);
                aeronaves.push(aeronave);
            }
        }
        return aeronaves;
    }
}
exports.default = CarregarAeronave;
