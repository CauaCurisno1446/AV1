import Funcionario from "./Funcionario"
import Aeronave from "./Aeronave"
import Peca from "./Peca"
import Etapa from "./Etapa"
import Teste from "./Teste"

class Companhia{
    private funcionarios: Array<Funcionario>
    private aeronaves: Array<Aeronave>
    private pecas: Array<Peca>
    private etapas: Array<Etapa>
    private testes: Array<Teste>

    constructor(){
        this.funcionarios = []
        this.aeronaves = []
        this.pecas = []
        this.etapas = []
        this.testes = []
    }

    public get getFuncionarios(){
        return this.funcionarios
    }

    public get getAeronaves(){
        return this.aeronaves
    }

    public get getPecas(){
        return this.pecas
    }

    public get getEtapas(){
        return this.etapas
    }

    public get getTestes(){
        return this.testes
    }
}

export default Companhia