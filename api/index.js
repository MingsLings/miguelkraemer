import { createServer } from 'http';

import express from 'express'
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const app = express();
import  Feiticeiro from '../models/Feiticeiro.js';
import  Tecnica from '../models/Tecnica.js';
import  Cla from '../models/Cla.js';
import  Maldicao from '../models/Maldicao.js';


app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set("views", path.join(process.cwd(), 'views'))

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
app.use(express.static(process.cwd() + '/public'))

app.get("/", (req, res) => {
    res.render("index", {
        feiticeiros: [],
        tecnicas: [],
        clas: [],
        maldicoes: []
    });
});

app.get('/feiticeiro/lst', async (req, res) => {
    const q = req.query.q || ""; // texto da busca

    const feiticeiros = await Feiticeiro.find({
        $or: [
            { nome: { $regex: q, $options: "i" } },
            { tecnica: { $regex: q, $options: "i" } },
            { estilo: { $regex: q, $options: "i" } },
            { grau: { $regex: q, $options: "i" } },
            { status: { $regex: q, $options: "i" } }
        ]
    });

    res.render("feiticeiro/lst", { feiticeiros, q });
});

app.post('/feiticeiro/add/ok', upload.single('foto'), async (req, res) => {
    await Feiticeiro.create({
        nome:req.body.nome,
        tecnica:req.body.tecnica,
        estilo:req.body.estilo,
        grau:req.body.grau,
        status:req.body.status,
        foto:req.file.buffer
    })
    res.render("feiticeiro/addok" )
})

app.get('/feiticeiro/add', (req, res) => {
    res.render("feiticeiro/add")
})

app.get('/feiticeiro/edt/:id', async (req, res) => {
    const feiticeiro = await Feiticeiro.findById(req.params.id)
    res.render("feiticeiro/edt", { feiticeiro })
})

app.post('/feiticeiro/edt/ok/:id', upload.single('foto'), async (req, res) => {
    const updateData = {
        nome: req.body.nome,
        tecnica: req.body.tecnica,
        estilo: req.body.estilo,
        grau: req.body.grau,
        status: req.body.status,
    };

    if (req.file) {
        updateData.foto = req.file.buffer;
    }

    await Feiticeiro.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/feiticeiro/lst');
});

app.get('/feiticeiro/del/:id', async (req, res) => {
    await Feiticeiro.findByIdAndDelete(req.params.id)
    res.redirect('/feiticeiro/lst')
})

///////////////////////////////////////////////


app.get('/tecnica/lst', async (req, res) => {
    const q = req.query.q || ""; // texto da busca

    const tecnica = await Tecnica.find({
        $or: [
            { nome: { $regex: q, $options: "i" } },
            { usuario: { $regex: q, $options: "i" } },
            { complexidade: { $regex: q, $options: "i" } },
            { capacidades: { $regex: q, $options: "i" } },
            { descricao: { $regex: q, $options: "i" } }
        ]
    });

    res.render("tecnica/lst", { tecnica, q });
});

app.post('/tecnica/add/ok', async (req, res) => {
    await Tecnica.create(req.body)
    res.render("tecnica/addok" )
})

app.get('/tecnica/add', (req, res) => {
    res.render("tecnica/add")
})

app.get('/tecnica/edt/:id', async (req, res) => {
    const tecnica = await Tecnica.findById(req.params.id)
    res.render("tecnica/edt", { tecnica })
})

app.post('/tecnica/edt/ok/:id', async (req, res) => {
    await Tecnica.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/tecnica/lst')
})

app.get('/tecnica/del/:id', async (req, res) => {
    await Tecnica.findByIdAndDelete(req.params.id)
    res.redirect('/tecnica/lst')
})

//////////////////////////////////////////////////

app.get('/cla/lst', async (req, res) => {
    const q = req.query.q || ""; // texto da busca

    const cla = await Cla.find({
        $or: [
            { nome: { $regex: q, $options: "i" } },
            { fundador: { $regex: q, $options: "i" } },
            { influencia: { $regex: q, $options: "i" } },
            { membros: { $regex: q, $options: "i" } },
            { tecnicas: { $regex: q, $options: "i" } }
        ]
    });

    res.render("cla/lst", { cla, q });
});


app.post('/cla/add/ok', async (req, res) => {
    await Cla.create(req.body)
    res.render("cla/addok" )
})

app.get('/cla/add', (req, res) => {
    res.render("cla/add")
})

app.get('/cla/edt/:id', async (req, res) => {
    const cla = await Cla.findById(req.params.id)
    res.render("cla/edt", { cla })
})

app.post('/cla/edt/ok/:id', async (req, res) => {
    await Cla.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/cla/lst')
})

app.get('/cla/del/:id', async (req, res) => {
    await Cla.findByIdAndDelete(req.params.id)
    res.redirect('/cla/lst')
})

///////////////////////////////////////////////

app.get('/maldicao/lst', async (req, res) => {
  const q = req.query.q || ""; // texto da busca
  
  const maldicao = await Maldicao.find({
        $or: [
            { nome: { $regex: q, $options: "i" } },
            { tecnica: { $regex: q, $options: "i" } },
            { especie: { $regex: q, $options: "i" } },
            { grau: { $regex: q, $options: "i" } },
            { status: { $regex: q, $options: "i" } }
        ]
    })

  res.render("maldicao/lst", { maldicao, q });
});


app.post('/maldicao/add/ok', async (req, res) => {
    await Maldicao.create(req.body)
    res.render("maldicao/addok" )
})

app.get('/maldicao/add', (req, res) => {
    res.render("maldicao/add")
})

app.get('/maldicao/edt/:id', async (req, res) => {
    const maldicao = await Maldicao.findById(req.params.id)
    res.render("maldicao/edt", { maldicao })
})

app.post('/maldicao/edt/ok/:id', async (req, res) => {
    await Maldicao.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/maldicao/lst')
})

app.get('/maldicao/del/:id', async (req, res) => {
    await Maldicao.findByIdAndDelete(req.params.id)
    res.redirect('/maldicao/lst')
})


app.listen(3011)