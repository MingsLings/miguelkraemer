import conexao from "../config/conexao.js";

const MaldicaoSchema = conexao.Schema({
    nome:{type:String, required:true},
    tecnica:{type:String},
    especie:{type:String},
    grau:{type:String},
    status:{type:String}
    
})
const Maldicao = conexao.model("Maldicao", MaldicaoSchema);
export default Maldicao