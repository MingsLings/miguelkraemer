import { type } from "os";
import conexao from "../config/conexao.js";

const FeiticeiroSchema = conexao.Schema({
    nome:{type:String, required:true},
    tecnica:{type:String},
    estilo:{type:String},
    grau:{type:String},
    status:{type:String},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }}

})
const Feiticeiro = conexao.model("Feiticeiro", FeiticeiroSchema);
export default Feiticeiro