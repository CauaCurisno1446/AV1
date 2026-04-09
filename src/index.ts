import Entrada from './util/Entrada'

import Companhia from './modelo/Companhia'
import Aeronave from './modelo/Aeronave'
import Peca from './modelo/Peca'
import Etapa from './modelo/Etapa'
import Funcionario from './modelo/Funcionario'
import Teste from './modelo/Teste'
import Relatorio from './modelo/Relatorio'


import CadastrarFuncionario from './acoes/CadastrarFuncionario'
import ListagemFuncionarios from './acoes/ListarFuncionarios'

import CadastrarAeronave from './acoes/CadastrarAeronave'
import ListagemAeronaves from './acoes/ListarAeronaves'

import CadastrarPeca from './acoes/CadastrarPeca'
import ListagemPeca from './acoes/ListarPeca'

import CadastrarTeste from './acoes/CadastrarTeste'

import CadastrarEtapa from './acoes/CadastrarEtapa'
import ListagemEtapa from './acoes/ListarEtapas'

import StatusPeca from './enum/StatusPeca'
import NivelPermissao from './enum/NivelPermissao'


let companhia = new Companhia()
let execucao = true

let temAeronaveCarregada = false
let temPecaCarregada = false
let temEtapaCarregada = false

var aerCarregada = ''
var pecCarregada = ''
var etpCarregada = ''


let funcionarioLogado: Funcionario | null = null

console.log(`\nBem-vindo ao aerocode`)
console.log(`\nLOGIN:`)

while (funcionarioLogado === null) {
    let entradaLogin = new Entrada()
    let usuarioDigitado = entradaLogin.receberTexto(`Usuário: `)
    let senhaDigitada = entradaLogin.receberTexto(`Senha: `)

    let todosFuncionarios = Funcionario.listarFuncionarios()
    let encontrado = false

    for (let func of todosFuncionarios) {
        if (func.autenticar(usuarioDigitado, senhaDigitada)) {
            funcionarioLogado = func
            encontrado = true
            break
        }
    }

    if (!encontrado) {
        console.log(`Usuário ou senha incorretos. Tente novamente.\n`)
    }
}

console.log(`\nOlá, ${funcionarioLogado.nome}! Nível de acesso: ${funcionarioLogado.nivelPermissao}`)
let nivelAtual = funcionarioLogado.nivelPermissao


while (execucao) {
    console.log("\n")

    if (temAeronaveCarregada){
        console.log(`Aeronave carregada: ${aerCarregada}`)
    } 

    if (temPecaCarregada) {
        console.log(`Peça carregada: ${pecCarregada}`)
    }

    if (temEtapaCarregada) {
        console.log(`Etapa carregada: ${etpCarregada}`)
    }

    console.log(`\nOpções disponíveis:`)


    if (nivelAtual === NivelPermissao.ADMINISTRADOR) {
        console.log("\n FUNCIONARIOS: ")
        console.log(`1 - Cadastrar funcionario`)
        console.log(`2 - Listar todos os funcionarios`)
    }

    if (nivelAtual === NivelPermissao.ADMINISTRADOR || nivelAtual === NivelPermissao.ENGENHEIRO) {
        console.log("\n AERONAVES: ")
        console.log(`4 - Cadastrar aeronave`)
        console.log(`5 - Listar aeronaves`)
        console.log(`6 - Carregar Aeronave`)
    }

    console.log("\n PEÇAS: ")
    console.log(`7 - Cadastrar peca`)
    console.log(`8 - Listar pecas`)
    console.log(`9 - Carregar Peca`)
    console.log(`10 - Atualizar status da peça`)
    console.log(`11 - Associar peça a aeronave`)

    console.log("\n ETAPAS: ")
    console.log(`12 - Cadastrar etapa`)
    console.log(`13 - Listar etapas`)
    console.log(`14 - Carregar etapa`)
    console.log(`15 - Iniciar etapa`)
    console.log(`16 - Finalizar etapa`)
    console.log(`17 - Associar funcionário a etapa`)
    console.log(`18 - Associar aeronave a etapa`)

    if (nivelAtual === NivelPermissao.ADMINISTRADOR || nivelAtual === NivelPermissao.ENGENHEIRO) {
        console.log("\n TESTES:")
        console.log(`19 - Realizar teste`)
    }

    if(nivelAtual === NivelPermissao.ADMINISTRADOR){
        console.log("\n RELATÓRIOS:")
        console.log(`20 - Gerar relatório de aeronave`)
    }

    console.log(`0 - Sair`)

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`\nPor favor, escolha uma opção: `)

    let acessoNegado = false

    if (opcao === 1 && nivelAtual !== NivelPermissao.ADMINISTRADOR){
        acessoNegado = true
    }

    if (opcao === 2 && nivelAtual === NivelPermissao.OPERADOR){
        acessoNegado = true
    }

    if ((opcao === 4 || opcao === 5 || opcao === 6) && nivelAtual === NivelPermissao.OPERADOR){
        acessoNegado = true
    }

    if (opcao === 18 && nivelAtual === NivelPermissao.OPERADOR){
        acessoNegado = true
    }

    if (acessoNegado) {
        console.log(`\nAcesso negado! Seu nível (${nivelAtual}) não tem permissão para essa opção.`)
        continue
    }

    switch (opcao) {
        //FUNCIONARIOS
        case 1:
            let cadastroFun = new CadastrarFuncionario(companhia.getFuncionarios)
            cadastroFun.cadastrar()
            Funcionario.salvar(companhia.getFuncionarios)
            break;

        case 2:
            let listagemFun = new ListagemFuncionarios(companhia.getFuncionarios)
            listagemFun.listar()
            break;

        //AERONAVES
        case 4:
            let cadastroAer = new CadastrarAeronave(companhia.getAeronaves)
            cadastroAer.cadastrar()
            Aeronave.salvar(companhia.getAeronaves)
            break;

        case 5:
            let listagemAer = new ListagemAeronaves(companhia.getAeronaves)
            listagemAer.listar()
            break;

        case 6:
            let entradaCodigo = new Entrada()
            let codigoBuscado = entradaCodigo.receberTexto(`Por favor, informe o código da aeronave: `)
            let resultadoAer = Aeronave.carregar(codigoBuscado)

            if (resultadoAer.length === 0) {
                console.log(`Nenhuma aeronave encontrada com codigo ${codigoBuscado}`)
            } 
            else {
                if (temAeronaveCarregada) {
                    console.log(`Aeronave ${aerCarregada} descarregada.`)
                    aerCarregada = ''
                }
                aerCarregada = codigoBuscado
                temAeronaveCarregada = true
                new ListagemAeronaves(resultadoAer).listar()
                console.log(`Aeronave ${aerCarregada} carregada com sucesso`)
            }
            break;

        //PECAS
        case 7:
            let cadastroPec = new CadastrarPeca(companhia.getPecas)
            cadastroPec.cadastrar()
            Peca.salvar(companhia.getPecas)
            break;

        case 8:
            let listagemPec = new ListagemPeca(companhia.getPecas)
            listagemPec.listar()
            break;

        case 9:
            let entradaCodigoPec = new Entrada()
            let codigoBuscadoPec = entradaCodigoPec.receberTexto(`Por favor, informe o código da peça: `)
            let resultadoPec = Peca.carregar(codigoBuscadoPec)

            if (resultadoPec.length === 0) {
                console.log(`Nenhuma peça encontrada com codigo ${codigoBuscadoPec}`)
            } 
            else {
                if (temPecaCarregada) {
                    console.log(`Peça ${pecCarregada} descarregada.`)
                    pecCarregada = ''
                }
                pecCarregada = codigoBuscadoPec
                temPecaCarregada = true
                new ListagemPeca(resultadoPec).listar()
                console.log(`Peça ${pecCarregada} carregada com sucesso`)
            }
            break;

        case 10:
            let entradaCodigoPecAtualizar = new Entrada()
            let codigoBuscadoPecAtualizar = entradaCodigoPecAtualizar.receberTexto(`Por favor, informe o código da peça: `)

            console.log('\n 1 - EM PRODUÇÃO, 2 - EM TRANSPORTE, 3 - PRONTA')
            let status = entradaCodigoPecAtualizar.receberNumero(`Por favor informe o código do status: `)

            let statusPec
            switch (status) {
                case 1: statusPec = StatusPeca.EM_PRODUCAO; break;
                case 2: statusPec = StatusPeca.EM_TRANSPORTE; break;
                case 3: statusPec = StatusPeca.PRONTA; break;
            }

            Peca.atualizarStatus(codigoBuscadoPecAtualizar, statusPec as any)
            break;

        case 11:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!")
                break
            }
            let entradaPeca = new Entrada()
            let idPecaAssoc = entradaPeca.receberTexto("Digite o ID da peça: ")
            Peca.associarAeronave(aerCarregada, idPecaAssoc)
            break;

        //ETAPAS
        case 12:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!")
                break
            }

            let cadastroEtp = new CadastrarEtapa(companhia.getEtapas)
            cadastroEtp.cadastrar()
            Etapa.salvar(companhia.getEtapas)
            let ultimaEtapa = companhia.getEtapas[companhia.getEtapas.length - 1]
            Etapa.associarAeronave(aerCarregada, ultimaEtapa.idEtapa)
            break;

        case 13:
            let listagemEtp = new ListagemEtapa(companhia.getEtapas)
            listagemEtp.listar()
            break;

        case 14:
            let entradaCodigoEtp = new Entrada()
            let codigoBuscadoEtp = entradaCodigoEtp.receberTexto(`Por favor, informe o código da etapa: `)
            let resultadoEtp = Etapa.carregar(codigoBuscadoEtp)

            if(resultadoEtp.length === 0){
                console.log(`Nenhuma etapa encontrada com codigo ${codigoBuscadoEtp}`)
            } 
            else{
                if(temEtapaCarregada){
                    console.log(`Etapa ${etpCarregada} descarregada.`)
                    etpCarregada = ''
                }

                etpCarregada = codigoBuscadoEtp
                temEtapaCarregada = true
                new ListagemEtapa(resultadoEtp).listar()
                console.log(`Etapa ${etpCarregada} carregada com sucesso`)
            }
            break;

        case 15:
            if(!temEtapaCarregada){
                console.log("Nenhuma etapa carregada!")
                break
            }
            Etapa.iniciar(etpCarregada)
            break;

        case 16:
            if(!temEtapaCarregada){
                console.log("Nenhuma etapa carregada!")
                break
            }
            Etapa.finalizar(etpCarregada)
            break;

        case 17:
            let entradaAssoc = new Entrada()
            let idAssoc = entradaAssoc.receberTexto("Digite o ID da etapa: ")
            Etapa.associarFuncionario(idAssoc)
            break;

        case 18:
            let entradaAssocAer = new Entrada()
            let idAssocAer = entradaAssocAer.receberTexto("Digite o ID da aeronave: ")
            Etapa.associarAeronave(idAssocAer, etpCarregada)
            break;

        //TESTES
        case 19:
            if(!temAeronaveCarregada){
                console.log("Nenhuma aeronave carregada!")
                break
            }

            let cadastroTeste = new CadastrarTeste(companhia.getTestes)
            cadastroTeste.cadastrar()
            Teste.salvar(companhia.getTestes)
            let ultimoTeste = companhia.getTestes[companhia.getTestes.length - 1]
            Teste.associarAeronave(aerCarregada, ultimoTeste.idTeste)
            break;

        //RELATÓRIOS
        case 20:
            if (!temAeronaveCarregada) {
                console.log("Nenhuma aeronave carregada!")
                break
            }
            let entradaCliente = new Entrada()
            let nomeCliente = entradaCliente.receberTexto("Nome do cliente: ")

            let resultadoRelatorio = Aeronave.carregar(aerCarregada)
            if (resultadoRelatorio.length > 0) {
                let relatorio = new Relatorio(resultadoRelatorio[0])
                relatorio.gerar(nomeCliente)
            }
            break;

        //EASTER EGG
        case 42:
            console.log(`\nA resposta para a vida, o universo e tudo mais... mas aqui só temos aeronaves.\n`)
            break;

        case 0:
            execucao = false
            console.log(`Até mais`)
            break;

        default:
            console.log(`Operação não entendida :(`)
    }
}