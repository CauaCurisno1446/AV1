import Salvar from "./Salvar"
import fs from "fs"
import path from "path"
import Etapa from "../modelo/Etapa";

class SalvarEtapa extends Salvar<Etapa>{
    private caminho = path.resolve(__dirname, "../../data/Etapas.txt");

    public salvar(etapas: Array<Etapa>): void {
        const pasta = path.dirname(this.caminho);

        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true });
        }

        let idsSalvos: string[] = []
        
        if (fs.existsSync(this.caminho)) {
            const linhas = fs.readFileSync(this.caminho, "utf-8").split("\n")
            for (let linha of linhas) {
                if (linha.trim() !== "") {
                    idsSalvos.push(linha.split(";")[0])
                }
            }
        }
        
        let novasLinhas = ""

        for (let etp of etapas) {
            if (!idsSalvos.includes(etp.idEtapa)) {
                novasLinhas += `${etp.idEtapa};${etp.nome};${etp.prazo};${etp.status};${etp.funcionarios}\n`
            }
        }

        if (novasLinhas) {
            fs.appendFileSync(this.caminho, novasLinhas)
        }

        console.log("Aeronave salva com sucesso")
    }
}

export default SalvarEtapa