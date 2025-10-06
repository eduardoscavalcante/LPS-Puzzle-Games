import { GameEngine } from '../../../core/gameEngine.js';

const boardEl = document.getElementById('board');
const startBtn = document.getElementById('startBtn');
const difficulty = document.getElementById('difficulty');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const modal = document.getElementById('modal');
const stats = document.getElementById('stats');
const playerName = document.getElementById('playerName');
const saveBtn = document.getElementById('saveBtn');
const closeModal = document.getElementById('closeModal');
const scoresBtn = document.getElementById('scoresBtn');
const scoresModal = document.getElementById('scoresModal');
const scoresList = document.getElementById('scoresList');
const closeScores = document.getElementById('closeScores');

let engine = new GameEngine('Memory');
let first=null, second=null, lock=false;
let moves=0, matches=0, pairs=0, startTime=0, timerInterval=null;

const DIFF = { easy:[3,4], medium:[4,4], hard:[4,6] };

startBtn.addEventListener('click', init);
saveBtn.addEventListener('click', saveScore);
closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
scoresBtn.addEventListener('click', openScores);
closeScores.addEventListener('click', ()=> scoresModal.classList.add('hidden'));

function init(){
  clearInterval(timerInterval);
  engine.reset();
  first=second=null; lock=false;
  moves=0; matches=0;
  movesEl.textContent = moves;
  timerEl.textContent = '00:00';
  playerName.value='';
  const d = difficulty.value;
  const [r,c] = DIFF[d];
  pairs = (r*c)/2;
  boardEl.style.gridTemplateColumns = `repeat(${c}, 1fr)`;
  const values=[];
  for(let i=1;i<=pairs;i++) values.push(i);
  const deck = shuffle([...values,...values]);
  boardEl.innerHTML='';
  deck.forEach((v, idx)=>{
    const card = document.createElement('button');
    card.className = 'card';
    card.dataset.value = v;
    card.textContent = '';
    card.addEventListener('click', ()=> onClick(card));
    boardEl.appendChild(card);
  });
  startTime = Date.now();
  timerInterval = setInterval(()=> {
    timerEl.textContent = formatTime(Math.floor((Date.now()-startTime)/1000));
  }, 500);
}

function onClick(card){
  if(lock) return;
  if(card.classList.contains('flipped')) return;
  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  if(!first){ first=card; return; }
  second=card; lock=true; moves++; movesEl.textContent = moves;
  if(first.dataset.value === second.dataset.value){
    first.classList.add('matched'); second.classList.add('matched');
    engine.addScore(10);
    matches++;
    resetTurn();
    if(matches === pairs) win();
  } else {
    setTimeout(()=> {
      first.classList.remove('flipped'); first.textContent='';
      second.classList.remove('flipped'); second.textContent='';
      resetTurn();
    }, 700);
  }
}

function resetTurn(){ first=second=null; lock=false; }

function win(){
  clearInterval(timerInterval);
  const time = Math.floor((Date.now()-startTime)/1000);
  stats.textContent = `Movimentos: ${moves} • Tempo: ${formatTime(time)} • Pontos: ${engine.score}`;
  modal.classList.remove('hidden');
}

async function saveScore(){
  const name = playerName.value || 'Anon';
  const diff = difficulty.value;
  const time = Math.floor((Date.now()-startTime)/1000);
  const payload = { name, game:'memory', difficulty:diff, moves, time, date: new Date().toISOString() };
  try {
    await fetch('http://localhost:3001/scores', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    alert('Pontuação salva!');
    modal.classList.add('hidden');
  } catch(e){
    alert('Erro ao salvar pontuação. Verifique o Score Service.');
    console.error(e);
  }
}

async function openScores(){
  const diff = difficulty.value;
  try {
    const res = await fetch(`http://localhost:3001/scores?difficulty=${diff}`);
    const list = await res.json();
    scoresList.innerHTML='';
    if(list.length===0) scoresList.innerHTML='<li>Nenhuma pontuação</li>';
    else list.forEach(s=>{
      const li = document.createElement('li');
      li.textContent = `${s.name} — movimentos ${s.moves} • tempo ${formatTime(s.time)}`;
      scoresList.appendChild(li);
    });
    scoresModal.classList.remove('hidden');
  } catch(e){ alert('Não foi possível carregar pontuações.'); }
}

function shuffle(a){ return a.sort(()=>0.5 - Math.random()); }
function formatTime(sec){ const m=Math.floor(sec/60); const s=sec%60; return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
