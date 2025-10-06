const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', (req,res) => {
  res.json({
    family: 'LPS Puzzle Games',
    games: [
      { id: 'memory', name:'Memory', description:'Jogo da memória tradicional' },
      { id: 'sudoku', name:'Sudoku (mini)', description:'Versão didática 3x3' },
      { id: 'puzzle', name:'Quebra-cabeça', description:'Arraste as peças para ordenar' }
    ]
  });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, ()=> console.log(`Game API rodando em http://localhost:${PORT}`));
