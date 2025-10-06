# LPS Puzzle Games - Linha de Produto de Software (Projeto Acadêmico)

Projeto simples demonstrando uma Linha de Produto de Software (LPS) para jogos não violentos.
Contém:
- Frontend com 3 jogos (Memory, Sudoku - versão simples, Puzzle - versão simplificada)
- Componentes reutilizáveis (ES modules)
- Microservices reais em Node.js: score-service, auth-service, game-api
- Server estático para frontend

## Como executar (passo a passo)

Pré-requisitos:
- Node.js (v16+ recomendado)
- npm

1. No terminal, vá para a pasta do projeto:
```bash
cd lps-puzzle-games
```

2. Instale dependências globais do root (concurrently) e dependências locais:
```bash
npm install
cd microservices/score-service && npm install
cd ../auth-service && npm install
cd ../game-api && npm install
cd ../../frontend && npm install
cd ..
```

(ou, de forma mais direta:)
```bash
# a partir da raiz do projeto
npm run bootstrap
```

3. Inicie todos os serviços (frontend + microservices):
```bash
npm run start:all
```

Isso irá iniciar:
- Frontend (servido em http://localhost:5500)
- Score Service (http://localhost:3001)
- Auth Service (http://localhost:3002)
- Game API (http://localhost:3003)

4. Abra no navegador:
```
http://localhost:5500/games/memory/index.html
http://localhost:5500/games/sudoku/index.html
http://localhost:5500/games/puzzle/index.html
```

## Estrutura principal
```
lps-puzzle-games/
├─ core/                     # componentes reutilizáveis (ES modules)
├─ frontend/                 # servidor estático + assets
│  ├─ games/
│  │  ├─ memory/
│  │  ├─ sudoku/
│  │  └─ puzzle/
│  └─ server.js              # servidor estático para desenvolvimento
├─ microservices/
│  ├─ score-service/
│  ├─ auth-service/
│  └─ game-api/
└─ README.md
```

## Notas
- Os microservices usam arquivos JSON simples para persistência (fácil de explicar no relatório).
- O projeto foi feito para ser simples e demonstrar arquitetura, variabilidade e reuso dentro de uma LPS.
- Se quiser, posso gerar o arquivo ZIP do repositório já pronto para upload (eu já gerei; baixe pelo link fornecido).
