# promptprof

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="48" />
  <p><strong>Arckhé AI</strong></p>
</div>


EspaÃ§o de **pesquisa/experimento com prompts** (imagem, vÃ­deo e direÃ§Ã£o de arte).
NÃ£o Ã© um app nem repositÃ³rio git â€” Ã© uma pasta de trabalho onde cada subprojeto
explora um fluxo de geraÃ§Ã£o diferente, da intenÃ§Ã£o ao resultado final.

> Natureza: pesquisa / educaÃ§Ã£o / testes.

## O que tem aqui

| Pasta | O que Ã© |
|---|---|
| [`kairoboost/`](kairoboost/) | **Base de conhecimento de prompts** â€” reconstruÃ§Ã£o aberta do "KairoBoost" da [kairogen.ai](https://kairogen.ai). Um motor "diretor de arte" que expande intenÃ§Ã£o curta em prompt cinematogrÃ¡fico. |
| [`hormozi-12/`](hormozi-12/) | **VÃ­deo 9:16** "13 anos em 47s" â€” 12 liÃ§Ãµes de negÃ³cios do Hormozi. Pipeline completo: plano â†’ direÃ§Ã£o â†’ imagens â†’ render. |

---

## kairoboost/ â€” motor de prompts

Cola os 3 arquivos como system prompt em qualquer LLM e manda
`intenÃ§Ã£o: X / preset: Y / formato: Z` â†’ sai o prompt refinado.

- `SYSTEM-PROMPT.md` â€” o motor (diretor de arte): estrutura fixa, regras, formato de saÃ­da.
- `presets.md` â€” 15 presets (CinematogrÃ¡fico, Editorial, Neon noirâ€¦) â†’ lente/luz/grading/textura/mood.
- `vocabulario.md` â€” dicionÃ¡rio de lente, luz, color grading, textura + termos por modelo (Sora/VEO/Nano/MJ/Flux).
- `README.md` â€” como usar.

## hormozi-12/ â€” vÃ­deo das 12 liÃ§Ãµes

VÃ­deo dark premium Ã¢mbar, 9:16, ~58,7s, narraÃ§Ã£o TTS + fundo cinematogrÃ¡fico
ilustrativo por liÃ§Ã£o (blur leve + movimento de cÃ¢mera dirigido) + CTA INEMA.CLUB.

**Documentos de direÃ§Ã£o:**
- `prompts-kairoboost.md` â€” KairoBoost aplicado: 14 cenas, conceito â†’ metÃ¡fora visual â†’ prompt.
- `PROMPT-PLANEJAMENTO.md` â€” o prompt usado para planejar (system prompt + tarefa + traduÃ§Ã£o conceitoâ†’imagem).
- `MDD-PACKAGE.md` â€” pacote de DireÃ§Ã£o DinÃ¢mica (storyboard 14 painÃ©is, cÃ¢mera/aÃ§Ã£o/continuidade, faixa do diretor).
- `plano-edicao.json` + `RESUMO.md` â€” plano de ediÃ§Ã£o validado (skill video-plan-editor).

**Projeto de render (`video/`):**
- `build-index.mjs` â€” gerador da composiÃ§Ã£o HyperFrames (HTMLâ†’MP4). Timing = fonte Ãºnica (Ã¡udio + animaÃ§Ã£o batidos).
- `narration.sh` â€” gera as 14 faixas TTS (voz pf_dora).
- `assets/img/` â€” 14 stills geradas no inemaimg (flux2-klein, 9:16).
- `assets/audio/` Â· `assets/txt/` â€” narraÃ§Ã£o e roteiros por cena.
- `renders/` â€” MP4s (`hormozi-12-mdd-9x16.mp4` = versÃ£o final).

### Como re-renderizar o vÃ­deo
```bash
cd hormozi-12/video
node build-index.mjs --vertical          # gera index.html (9:16)
npx hyperframes render --quality high --output renders/saida.mp4
```
Para regenerar a narraÃ§Ã£o: `bash narration.sh`. Para regenerar imagens: usar o
client `~/projetos/mkvideos/pipeline/generate-image-inemaimg.js` (servidor
inemaimg em `localhost:8000`).

---

## Stack usada
- **Texto/prompt:** LLM + base kairoboost.
- **Imagem:** [inemaimg](../inemaimg) (FastAPI local, modelo `flux2-klein`).
- **VÃ­deo:** [HyperFrames](https://hyperframes.heygen.com) (HTML/CSS/GSAP â†’ MP4) + TTS Kokoro (`pf_dora`) + FFmpeg.
- **Skills:** video-explicativo, mestre-direcao-dinamica (MDD), video-plan-editor (VPE).

## Identidade visual
Dark premium Ã¢mbar â€” bg `#0D1321`, painel `#1D2D44`, accent `#FFC300`.
Fontes Sora (tÃ­tulos) Â· Inter (corpo) Â· JetBrains Mono (mono). CTA: **INEMA.CLUB**.

---

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="32" />
  <p><strong>Arckhé AI</strong></p>
</div>