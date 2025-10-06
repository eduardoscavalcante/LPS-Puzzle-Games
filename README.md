# Linha de Produto de Software (LPS) - Jogos de Puzzle Não Violentos 🧩

## 🎯 Descrição Geral
Este projeto apresenta uma **Linha de Produto de Software (LPS)** voltada para o desenvolvimento de **jogos de puzzle não violentos**, utilizando **componentes de software reutilizáveis** e uma **arquitetura baseada em microserviços**.  
O objetivo é demonstrar como diferentes variações de jogos (por exemplo, Sudoku, Quebra-Cabeça e Jogo da Memória) podem ser geradas a partir de um núcleo comum de funcionalidades.

---

## 🧱 Estrutura da LPS
A LPS é composta por:
- **Core (Núcleo Comum)**: lógica base de gerenciamento de níveis, pontuação e interface.
- **Componentes Variáveis**: regras de jogo específicas de cada puzzle.
- **Microserviços**:
  - `auth-service`: autenticação e login de jogadores.
  - `score-service`: registro e consulta de pontuação.
  - `puzzle-engine`: lógica principal do jogo.
  - `game-api`: comunicação entre front-end e back-end.

---

## 🕹️ Jogos Derivados (Exemplos)
1. **Sudoku Puzzle**
   - Geração aleatória de tabuleiros.
   - Validação de regras.
   - Interface com dicas e tempo.

2. **Quebra-Cabeça**
   - Divisão de imagem em peças.
   - Sistema de arrastar e soltar.
   - Contador de movimentos.

3. **Jogo da Memória**
   - Cartas viradas.
   - Sistema de pares.
   - Contador de tentativas e tempo.

---

## ⚙️ Tecnologias Utilizadas
- **Front-end:** React.js (ou HTML/CSS/JS simples para protótipo)
- **Back-end:** Node.js com Express
- **Banco de Dados:** MongoDB (para pontuações e perfis)
- **Comunicação:** REST API
- **Containerização:** Docker (opcional)

---

## 🧩 Componentização
Cada jogo herda componentes do núcleo:
- `GameEngine` → lógica base de execução.
- `ScoreManager` → registro e exibição de pontuação.
- `UserSession` → controle de sessão e progresso.
- `GameUI` → interface reutilizável com personalização via tema.

---

## 🏗️ Como Rodar o Projeto
1. **Clonar o repositório:**
   ```bash
   git clone [link]
   cd lps-puzzle-games
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Executar os microserviços:**
   ```bash
   npm run start:auth
   npm run start:score
   npm run start:engine
   npm run start:api
   ```

4. **Executar o front-end:**
   ```bash
   npm start
   ```

---

## 📚 Conceitos de Engenharia de Software Aplicados
- **Reutilização de Componentes**
- **Modularização e Separação de Responsabilidades**
- **Arquitetura de Microserviços**
- **Variabilidade de Produto**
- **Manutenibilidade e Escalabilidade**

---

## 🧠 Possíveis Extensões Futuras
- Sistema de login social (Google/Facebook)
- Ranking global de jogadores
- Modo multiplayer cooperativo
- Suporte a temas (ex: natureza, espaço, arte)

---

## 👨‍💻 Autor
**Eduardo Serpa**  
Disciplina: *Tópicos em Engenharia de Software*  
Curso: *Ciência da Computação – Universidade Federal de Alagoas*  
Contato institucional: esc3@ic.ufal.br
