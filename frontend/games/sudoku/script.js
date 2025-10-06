const container = document.getElementById('sudoku');
const result = document.getElementById('result');

function build(){
  const table = document.createElement('div');
  table.style.display='grid';
  table.style.gridTemplateColumns='repeat(3,60px)';
  table.style.gap='6px';
  for(let i=0;i<9;i++){
    const inp = document.createElement('input');
    inp.type='number'; inp.min=1; inp.max=3; inp.style.width='56px'; inp.style.height='56px'; inp.style.fontSize='20px';
    table.appendChild(inp);
  }
  container.innerHTML=''; container.appendChild(table);
}
document.getElementById('check').addEventListener('click', ()=> {
  const vals = Array.from(container.querySelectorAll('input')).map(i=>Number(i.value)||0);
  // check rows and cols
  let ok=true;
  for(let r=0;r<3;r++){
    const row = vals.slice(r*3, r*3+3);
    if(new Set(row).size !== 3 || row.some(x=>x<1 || x>3)) ok=false;
  }
  for(let c=0;c<3;c++){
    const col = [vals[c], vals[c+3], vals[c+6]];
    if(new Set(col).size !== 3 || col.some(x=>x<1 || x>3)) ok=false;
  }
  result.textContent = ok ? 'Correto!' : 'Inválido';
});
build();
