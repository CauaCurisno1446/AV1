"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Companhia {
    constructor() {
        this.funcionarios = [];
        this.aeronaves = [];
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    get getFuncionarios() {
        return this.funcionarios;
    }
    get getAeronaves() {
        return this.aeronaves;
    }
    get getPecas() {
        return this.pecas;
    }
    get getEtapas() {
        return this.etapas;
    }
    get getTestes() {
        return this.testes;
    }
}
exports.default = Companhia;
