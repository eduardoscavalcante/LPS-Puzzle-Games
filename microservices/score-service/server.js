const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
const DB = path.join(__dirname, 'scores.json');

function readDB(){
  try { return JSON.parse(fs.readFileSync(DB,'utf8')); } catch(e){ return { scores: [] }; }
}
function writeDB(db){ fs.writeFileSync(DB, JSON.stringify(db, null, 2)); }

app.get('/scores', (req, res) => {
  const diff = req.query.difficulty || 'medium';
  const db = readDB();
  const list = db.scores.filter(s => s.game === 'memory' && s.difficulty === diff);
  list.sort((a,b)=> a.moves - b.moves || a.time - b.time);
  res.json(list.slice(0,10));
});

app.post('/scores', (req, res) => {
  const { name, game, difficulty, moves, time, date } = req.body;
  if(!name || !game || !difficulty || typeof moves !== 'number' || typeof time !== 'number'){
    return res.status(400).json({ error: 'payload inválido' });
  }
  const db = readDB();
  db.scores.push({ name, game, difficulty, moves, time, date: date || new Date().toISOString() });
  writeDB(db);
  res.status(201).json({ ok:true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Score Service rodando em http://localhost:${PORT}`));
