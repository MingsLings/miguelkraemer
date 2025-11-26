import conexao from "../config/conexao.js";

const ClaSchema = conexao.Schema({
    nome:{type:String, required:true},
    fundador:{type:String},
    influencia:{type:String},
    membros:{type:String},
    tecnicas:{type:String}

})
const Cla = conexao.model("Clã", ClaSchema);
export default Cla