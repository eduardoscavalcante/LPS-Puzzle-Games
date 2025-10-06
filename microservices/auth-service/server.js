const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
const DB = path.join(__dirname, 'users.json');

function readDB(){
  try { return JSON.parse(fs.readFileSync(DB,'utf8')); } catch(e){ return { users: [] }; }
}
function writeDB(db){ fs.writeFileSync(DB, JSON.stringify(db, null, 2)); }

app.post('/register', (req, res) => {
  const { name } = req.body;
  if(!name) return res.status(400).json({ error: 'name required' });
  const db = readDB();
  if(db.users.find(u=>u.name===name)) return res.status(400).json({ error:'user exists' });
  db.users.push({ name, created: new Date().toISOString() });
  writeDB(db);
  res.json({ ok:true });
});

app.post('/login', (req,res)=>{
  const { name } = req.body;
  const db = readDB();
  const user = db.users.find(u=>u.name===name);
  if(!user) return res.status(401).json({ error: 'not found' });
  res.json({ ok:true, user });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=> console.log(`Auth Service rodando em http://localhost:${PORT}`));
