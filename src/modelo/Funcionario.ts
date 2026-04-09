import NivelPermissao from "../enum/NivelPermissao";
import fs from "fs"
import path from "path"

class Funcionario{
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivelPermissao: NivelPermissao

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivel: NivelPermissao){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivel
    }

    public autenticar(usuario: string, senha: string): boolean{
        return this.usuario === usuario && this.senha === senha
    }

    public static listarFuncionarios(): Array<Funcionario> {
        const caminho = path.resolve(__dirname, "../../data/Usuarios.txt");

        if (!fs.existsSync(caminho)) {
            return []
        }
    
        const dados = fs.readFileSync(caminho, "utf-8")
    
        if (!dados.trim()) {
            return [];
        }
    
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const funcionarios: Funcionario[] = []
    
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [id, nome, telefone, endereco, usuario, senha, nivel] = partes
            const funcionario = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel as any)
            funcionarios.push(funcionario)
        }
    
        return funcionarios
    }

    public static salvar(funcionarios: Array<Funcionario>): void {
        const caminho = path.resolve(__dirname, "../../data/Usuarios.txt");
        const pasta = path.dirname(caminho);
    
        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true });
        }
    
        let idsSalvos: string[] = []
            
        if (fs.existsSync(caminho)) {
            const linhas = fs.readFileSync(caminho, "utf-8").split("\n")
            for (let linha of linhas) {
                if (linha.trim() !== "") {
                    idsSalvos.push(linha.split(";")[0])
                }
            }
        }
            
        let novasLinhas = ""
    
        for (let func of funcionarios) {
            if (!idsSalvos.includes(func.id)) {
                novasLinhas += `${func.id};${func.nome};${func.telefone};${func.endereco};${func.usuario};${func.senha};${func.nivelPermissao}\n`
            }
        }
    
        if (novasLinhas) {
            fs.appendFileSync(caminho, novasLinhas)
        }
    
        console.log("Funcionario salvo com sucesso")
    }

    public static carregar(id_func: string): Funcionario[] {
        const caminho = path.resolve(__dirname, "../../data/Usuarios.txt");

        if (!fs.existsSync(caminho)) {
            return []
        }
    
        const dados = fs.readFileSync(caminho, "utf-8")
    
        if (!dados.trim()) {
            return [];
        }
    
        const linhas = dados.split("\n").filter(l => l.trim() !== "")
        const funcionarios: Funcionario[] = []
    
        for (let linha of linhas) {
            const partes = linha.split(";")
            const [idStr, nome, telefone, endereco, usuario, senha, nivel] = partes
    
            if (idStr === id_func) {
                const funcionario = new Funcionario(idStr, nome, telefone, endereco, usuario, senha, nivel as any)
                funcionarios.push(funcionario)
            }
        }
    
        return funcionarios
    }
}

export default Funcionario