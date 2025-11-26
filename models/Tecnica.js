import conexao from "../config/conexao.js";

const TecnicaSchema = conexao.Schema({
    nome:{type:String, required:true},
    usuario:{type:String},
    complexidade:{type:String},
    capacidades:{type:String},
    descricao:{type:String}

})
const Tecnica = conexao.model("Tecnica", TecnicaSchema);
export default Tecnica