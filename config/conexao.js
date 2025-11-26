import mongoose from "mongoose";

const url = "mongodb+srv://aluno:123@mingslings.t0cml4a.mongodb.net/?appName=MingsLings";

const conexao = await mongoose.connect(url)
export default conexao