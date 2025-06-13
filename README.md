# 📘 Projeto Utilizando LLMs para geração de projetos

> ⚠️ O seguinte README refere-se a um projeto para a obtenção de nota ou aprovação em um Bootcamp da [Digital Innovation One](https://www.dio.me/en) e está de acordo com a respectiva **"Descrição do Desafio"** que possuir.  

---

# Projeto de Integração de IAs

Este repositório contém quatro aplicações com propósitos distintos, desenvolvidas em JavaScript/HTML/CSS:

- **API**: Um microserviço em Node.js que consulta o ViaCEP para obter endereço a partir de um CEP e retorna JSON.
- **Cloud**: Jogo de Roleta Física com animações e simulação de física (gravidade, atrito) em HTML5 Canvas.
- **Gemini**: Jogo Flapbird - Mario Edition, um clone do Flappy Bird usando HTML5 Canvas e JavaScript.
- **o1**: Outra implementação de Jogo de Roleta Física estática em Canvas com lógica similar ao da pasta `Cloud`.

---

## 🎯 Objetivos do Projeto

Ao concluir este desafio, você será capaz de:

- ✅ Explorar o uso prático de múltiplos modelos de GenAI com o GitHub Copilot.
- ✅ Comparar sugestões e comportamentos entre modelos em contextos distintos.
- ✅ Avaliar a atuação do Copilot em códigos interativos como jogos em Canvas.
- ✅ Compreender como o Copilot contribui na construção de APIs simples com integração externa.
- ✅ Aplicar insights de diferentes respostas geradas para aperfeiçoar o código manualmente.

---

## Estrutura do Projeto

```
/API       - API em Node.js para consulta de CEP via ViaCEP
/Cloud     - Jogo de Roleta Física (HTML5 Canvas, JavaScript, CSS)
/Gemini    - Flapbird - Mario Edition (HTML5 Canvas, JavaScript)
/o1        - Jogo de Roleta Física (HTML5 Canvas, JavaScript, CSS)
```

## Pré-requisitos

- Node.js >= 14 (apenas para `API`)
- Servidor HTTP estático (VS Code Live Server, `http-server` ou similar) para pastas estáticas

## Configuração e Instalação

1. Clone este repositório:
   ```cmd
   git clone <url-do-repositorio>
   cd "GitHub Copilot"
   ```

2. API (`API`):
   ```cmd
   cd API
   npm install
   npm start
   ```
   O servidor escutará na porta 3000. Use `GET /cep/{CEP}` para obter dados.

3. Jogo de Roleta (`Cloud`):
   - Abra `Cloud/index.html` no navegador ou via servidor estático.

4. Flapbird - Mario (`Gemini`):
   - Sirva a pasta `Gemini` por um servidor HTTP e acesse `index.html`.

5. Jogo de Roleta Estática (`o1`):
   - Abra `o1/index.html` diretamente ou via servidor estático.

## Uso

### API de CEP
- **GET** http://localhost:3000/cep/01001000

### Cloud (Roleta Física)
- Clique em "Girar Roleta" e "Resetar" para controlar o jogo.

### Gemini (Flapbird)
- Clique ou pressione SPACE para voar e resetar após game over.

### o1 (Roleta Física)
- Similar à versão em `Cloud`, com controles de girar e resetar.

## Contribuição

Contribuições são bem-vindas! Abra issues ou pull requests para melhorias.

## Licença

MIT

---

# 🧾 Notas Finais

### Este README é um modelo padrão reutilizável CRIADO POR MIM para projetos desenvolvidos em bootcamps.
Adapto conforme o desafio proposto, mantendo a estrutura clara e objetiva.

---
