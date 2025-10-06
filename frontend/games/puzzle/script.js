const pieces = document.getElementById('pieces');
const shuffleBtn = document.getElementById('shuffle');
let arr = ['A','B','C','D'];

function render(){
  pieces.innerHTML='';
  arr.forEach((p, idx)=>{
    const b = document.createElement('div');
    b.textContent = p;
    b.style.width='80px'; b.style.height='80px'; b.style.background='#eee'; b.style.display='flex';
    b.style.alignItems='center'; b.style.justifyContent='center'; b.style.fontSize='28px';
    b.draggable=true;
    b.dataset.index=idx;
    b.addEventListener('dragstart', e=> e.dataTransfer.setData('text/plain', idx));
    b.addEventListener('dragover', e=> e.preventDefault());
    b.addEventListener('drop', e=>{
      const from = Number(e.dataTransfer.getData('text/plain'));
      const to = Number(b.dataset.index);
      [arr[from], arr[to]] = [arr[to], arr[from]];
      render();
    });
    pieces.appendChild(b);
  });
}
shuffleBtn.addEventListener('click', ()=> { arr = arr.sort(()=>0.5 - Math.random()); render(); });
render();
