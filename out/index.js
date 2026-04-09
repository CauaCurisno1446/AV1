"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entrada_1 = __importDefault(require("./util/Entrada"));
const Companhia_1 = __importDefault(require("./modelo/Companhia"));
const Aeronave_1 = __importDefault(require("./modelo/Aeronave"));
const Peca_1 = __importDefault(require("./modelo/Peca"));
const Etapa_1 = __importDefault(require("./modelo/Etapa"));
const Funcionario_1 = __importDefault(require("./modelo/Funcionario"));
const Teste_1 = __importDefault(require("./modelo/Teste"));
const Relatorio_1 = __importDefault(require("./modelo/Relatorio"));
const CadastrarFuncionario_1 = __importDefault(require("./acoes/CadastrarFuncionario"));
const ListarFuncionarios_1 = __importDefault(require("./acoes/ListarFuncionarios"));
const CadastrarAeronave_1 = __importDefault(require("./acoes/CadastrarAeronave"));
const ListarAeronaves_1 = __importDefault(require("./acoes/ListarAeronaves"));
const CadastrarPeca_1 = __importDefault(require("./acoes/CadastrarPeca"));
const ListarPeca_1 = __importDefault(require("./acoes/ListarPeca"));
const CadastrarTeste_1 = __importDefault(require("./acoes/CadastrarTeste"));
const CadastrarEtapa_1 = __importDefault(require("./acoes/CadastrarEtapa"));
const ListarEtapas_1 = __importDefault(require("./acoes/ListarEtapas"));
const StatusPeca_1 = __importDefault(require("./enum/StatusPeca"));
const NivelPermissao_1 = __importDefault(require("./enum/NivelPermissao"));
let companhia = new Companhia_1.default();
let execucao = true;
let temAeronaveCarregada = false;
let temPecaCarregada = false;
let temEtapaCarregada = false;
var aerCarregada = '';
var pecCarregada = '';
var etpCarregada = '';
let funcionarioLogado = null;
console.log(`\nBem-vindo ao aerocode`);
console.log(`\nLOGIN:`);
while (funcionarioLogado === null) {
    let entradaLogin = new Entrada_1.default();
    let usuarioDigitado = entradaLogin.receberTexto(`Usuário: `);
    let senhaDigitada = entradaLogin.receberTexto(`Senha: `);
    let todosFuncionarios = Funcionario_1.default.listarFuncionarios();
    let encontrado = false;
    for (let func of todosFuncionarios) {
        if (func.autenticar(usuarioDigitado, senhaDigitada)) {
            funcionarioLogado = func;
            encontrado = true;
            break;
        }
    }
    if (!encontrado) {
        console.log(`Usuário ou senha incorretos. Tente novamente.\n`);
    }
}
console.log(`\nOlá, ${funcionarioLogado.nome}! Nível de acesso: ${funcionarioLogado.nivelPermissao}`);
let nivelAtual = funcionarioLogado.nivelPermissao;
while (execucao) {
    console.log("\n");
    if (temAeronaveCarregada) {
        console.log(`Aeronave carregada: ${aerCarregada}`);
    }
    if (temPecaCarregada) {
        console.log(`Peça carregada: ${pecCarregada}`);
    }
    if (temEtapaCarregada) {
        console.log(`Etapa carregada: ${etpCarregada}`);
    }
    console.log(`\nOpções disponíveis:`);
    if (nivelAtual === NivelPermissao_1.default.ADMINISTRADOR) {
        console.log("\n FUNCIONARIOS: ");
        console.log(`1 - Cadastrar funcionario`);
        console.log(`2 - Listar todos os funcionarios`);
    }
    if (nivelAtual === NivelPermissao_1.default.ADMINISTRADOR || nivelAtual === NivelPermissao_1.default.ENGENHEIRO) {
        console.log("\n AERONAVES: ");
        console.log(`4 - Cadastrar aeronave`);
        console.log(`5 - Listar aeronaves`);
        console.log(`6 - Carregar Aeronave`);
    }
    console.log("\n PEÇAS: ");
    console.log(`7 - Cadastrar peca`);
    console.log(`8 - Listar pecas`);
    console.log(`9 - Carregar Peca`);
    console.log(`10 - Atualizar status da peça`);
    console.log(`11 - Associar peça a aeronave`);
    console.log("\n ETAPAS: ");
    console.log(`12 - Cadastrar etapa`);
    console.log(`13 - Listar etapas`);
    console.log(`14 - Carregar etapa`);
    console.log(`15 - Iniciar etapa`);
    console.log(`16 - Finalizar etapa`);
    console.log(`17 - Associar funcionário a etapa`);
    console.log(`18 - Associar aeronave a etapa`);
    if (nivelAtual === NivelPermissao_1.default.ADMINISTRADOR || nivelAtual === NivelPermissao_1.default.ENGENHEIRO) {
        console.log("\n TESTES:");
        console.log(`19 - Realizar teste`);
    }
    if (nivelAtual === NivelPermissao_1.default.ADMINISTRADOR) {
        console.log("\n RELATÓRIOS:");
        console.log(`20 - Gerar relatório de aeronave`);
    }
    console.log(`0 - Sair`);
    let entrada = new Entrada_1.default();
    let opcao = entrada.receberNumero(`\nPor favor, escolha uma opção: `);
    let acessoNegado = false;
    if (opcao === 1 && nivelAtual !== NivelPermissao_1.default.ADMINISTRADOR) {
        acessoNegado = true;
    }
    if (opcao === 2 && nivelAtual === NivelPermissao_1.default.OPERADOR) {
        acessoNegado = true;
    }
    if ((opcao === 4 || opcao === 5 || opcao === 6) && nivelAtual === NivelPermissao_1.default.OPERADOR) {
        acessoNegado = true;
    }
    if (opcao === 18 && nivelAtual === NivelPermissao_1.default.OPERADOR) {
        acessoNegado = true;
    }
    if (acessoNegado) {
        console.log(`\nAcesso negado! Seu nível (${nivelAtual}) não tem permissão para essa opção.`);
        continue;
    }
    switch (opcao) {
        //FUNCIONARIOS
        case 1:
            let cadastroFun = new CadastrarFuncionario_1.default(companhia.getFuncionarios);
            cadastroFun.cadastrar();
            Funcionario_1.default.salvar(companhia.getFuncionarios);
            break;
        case 2:
            let listagemFun = new ListarFuncionarios_1.default(companhia.getFuncionarios);
            listagemFun.listar();
            break;
        //AERONAVES
        case 4:
            let cadastroAer = new CadastrarAeronave_1.default(companhia.getAeronaves);
            cadastroAer.cadastrar();
            Aeronave_1.default.salvar(companhia.getAeronaves);
            break;
        case 5:
            let listagemAer = new ListarAeronaves_1.default(companhia.getAeronaves);
            listagemAer.listar();
            break;
        case 6:
            let entradaCodigo = new Entrada_1.default();
            let codigoBuscado = entradaCodigo.receberTexto(`Por favor, informe o código da aeronave: `);
            let resultadoAer = Aeronave_1.default.carregar(codigoBuscado);
            if (resultadoAer.length === 0) {
                console.log(`Nenhuma aeronave encontrada com codigo ${codigoBuscado}`);
            }
            else {
                if (temAeronaveCarregada) {
                    console.log(`Aeronave ${aerCarregada} descarregada.`);
                    aerCarregada = '';
                }
                aerCarregada = codigoBuscado;
                temAeronaveCarregada = true;
                new ListarAeronaves_1.default(resultadoAer).listar();
                console.log(`Aeronave ${aerCarregada} carregada com sucesso`);
            }
            break;
        //PECAS
        case 7:
            let cadastroPec = new CadastrarPeca_1.default(companhia.getPecas);
            cadastroPec.cadastrar();
            Peca_1.default.salvar(companhia.getPecas);
            break;
        case 8:
            let listagemPec = new ListarPeca_1.default(companhia.getPecas);
            listagemPec.listar();
            break;
        case 9:
            let entradaCodigoPec = new Entrada_1.default();
            let codigoBuscadoPec = entradaCodigoPec.receberTexto(`Por favor, informe o código da peça: `);
            let resultadoPec = Peca_1.default.carregar(codigoBuscadoPec);
            if (resultadoPec.length === 0) {
                console.log(`Nenhuma peça encontrada com codigo ${codigoBuscadoPec}`);
            }
            else {
                if (temPecaCarregada) {
                    console.log(`Peça ${pecCarregada} descarregada.`);
                    pecCarregada = '';
                }
                pecCarregada = codigoBuscadoPec;
                temPecaCarregada = true;
                new ListarPeca_1.default(resultadoPec).listar();
                console.log(`Peça ${pecCarregada} carregada com sucesso`);
            }
            break;
        case 10:
            let entradaCodigoPecAtualizar = new Entrada_1.default();
            let codigoBuscadoPecAtualizar = entradaCodigoPecAtualizar.receberTexto(`Por favor, informe o código da peça: `);
            console.log('\n 1 - EM PRODUÇÃO, 2 - EM TRANSPORTE, 3 - PRONTA');
            let status = entradaCodigoPecAtualizar.receberNumero(`Por favor informe o código do status: `);
            let statusPec;
            switch (status) {
                case 1:
                    statusPec = StatusPeca_1.default.EM_PRODUCAO;
                    break;
                case 2:
                    statusPec = StatusPeca_1.default.EM_TRANSPORTE;
                    break;
                case 3:
                    statusPec = StatusPeca_1.default.PRONTA;
                    break;
            }
            Peca_1.default.atualizarStatus(codigoBuscadoPecAtualizar, statusPec);
            break;
        case 11:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!");
                break;
            }
            let entradaPeca = new Entrada_1.default();
            let idPecaAssoc = entradaPeca.receberTexto("Digite o ID da peça: ");
            Peca_1.default.associarAeronave(aerCarregada, idPecaAssoc);
            break;
        //ETAPAS
        case 12:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!");
                break;
            }
            let cadastroEtp = new CadastrarEtapa_1.default(companhia.getEtapas);
            cadastroEtp.cadastrar();
            Etapa_1.default.salvar(companhia.getEtapas);
            let ultimaEtapa = companhia.getEtapas[companhia.getEtapas.length - 1];
            Etapa_1.default.associarAeronave(aerCarregada, ultimaEtapa.idEtapa);
            break;
        case 13:
            let listagemEtp = new ListarEtapas_1.default(companhia.getEtapas);
            listagemEtp.listar();
            break;
        case 14:
            let entradaCodigoEtp = new Entrada_1.default();
            let codigoBuscadoEtp = entradaCodigoEtp.receberTexto(`Por favor, informe o código da etapa: `);
            let resultadoEtp = Etapa_1.default.carregar(codigoBuscadoEtp);
            if (resultadoEtp.length === 0) {
                console.log(`Nenhuma etapa encontrada com codigo ${codigoBuscadoEtp}`);
            }
            else {
                if (temEtapaCarregada) {
                    console.log(`Etapa ${etpCarregada} descarregada.`);
                    etpCarregada = '';
                }
                etpCarregada = codigoBuscadoEtp;
                temEtapaCarregada = true;
                new ListarEtapas_1.default(resultadoEtp).listar();
                console.log(`Etapa ${etpCarregada} carregada com sucesso`);
            }
            break;
        case 15:
            if (!temEtapaCarregada) {
                console.log("Nenhuma etapa carregada!");
                break;
            }
            Etapa_1.default.iniciar(etpCarregada);
            break;
        case 16:
            if (!temEtapaCarregada) {
                console.log("Nenhuma etapa carregada!");
                break;
            }
            Etapa_1.default.finalizar(etpCarregada);
            break;
        case 17:
            let entradaAssoc = new Entrada_1.default();
            let idAssoc = entradaAssoc.receberTexto("Digite o ID da etapa: ");
            Etapa_1.default.associarFuncionario(idAssoc);
            break;
        case 18:
            let entradaAssocAer = new Entrada_1.default();
            let idAssocAer = entradaAssocAer.receberTexto("Digite o ID da aeronave: ");
            Etapa_1.default.associarAeronave(idAssocAer, etpCarregada);
            break;
        //TESTES
        case 19:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!");
                break;
            }
            let cadastroTeste = new CadastrarTeste_1.default(companhia.getTestes);
            cadastroTeste.cadastrar();
            Teste_1.default.salvar(companhia.getTestes);
            let ultimoTeste = companhia.getTestes[companhia.getTestes.length - 1];
            Teste_1.default.associarAeronave(aerCarregada, ultimoTeste.idTeste);
            break;
        //RELATÓRIOS
        case 20:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!");
                break;
            }
            let entradaCliente = new Entrada_1.default();
            let nomeCliente = entradaCliente.receberTexto("Nome do cliente: ");
            let resultadoRelatorio = Aeronave_1.default.carregar(aerCarregada);
            if (resultadoRelatorio.length > 0) {
                let relatorio = new Relatorio_1.default(resultadoRelatorio[0]);
                relatorio.gerar(nomeCliente);
            }
            break;
        case 0:
            execucao = false;
            console.log(`Até mais`);
            break;
        default:
            console.log(`Operação não entendida :(`);
    }
}
