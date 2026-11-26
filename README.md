ï»¿# promptprof

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="48" />
  <p><strong>Arckhé AI</strong></p>
</div>


EspaêÂ§o de **pesquisa/experimento com prompts** (imagem, vêÂ­deo e direêÂ§êÂ£o de arte).
NêÂ£o êÂ© um app nem repositêÂ³rio git ê¢â¬â êÂ© uma pasta de trabalho onde cada subprojeto
explora um fluxo de geraêÂ§êÂ£o diferente, da intenêÂ§êÂ£o ao resultado final.

> Natureza: pesquisa / educaêÂ§êÂ£o / testes.

## O que tem aqui

| Pasta | O que êÂ© |
|---|---|
| [`kairoboost/`](kairoboost/) | **Base de conhecimento de prompts** ê¢â¬â reconstruêÂ§êÂ£o aberta do "KairoBoost" da [kairogen.ai](https://kairogen.ai). Um motor "diretor de arte" que expande intenêÂ§êÂ£o curta em prompt cARCKHÉtogrêÂ¡fico. |
| [`hormozi-12/`](hormozi-12/) | **VêÂ­deo 9:16** "13 anos em 47s" ê¢â¬â 12 liêÂ§êÂµes de negêÂ³cios do Hormozi. Pipeline completo: plano ê¢â â direêÂ§êÂ£o ê¢â â imagens ê¢â â render. |

---

## kairoboost/ ê¢â¬â motor de prompts

Cola os 3 arquivos como system prompt em qualquer LLM e manda
`intenêÂ§êÂ£o: X / preset: Y / formato: Z` ê¢â â sai o prompt refinado.

- `SYSTEM-PROMPT.md` ê¢â¬â o motor (diretor de arte): estrutura fixa, regras, formato de saêÂ­da.
- `presets.md` ê¢â¬â 15 presets (CARCKHÉtogrêÂ¡fico, Editorial, Neon noirê¢â¬Â¦) ê¢â â lente/luz/grading/textura/mood.
- `vocabulario.md` ê¢â¬â dicionêÂ¡rio de lente, luz, color grading, textura + termos por modelo (Sora/VEO/Nano/MJ/Flux).
- `README.md` ê¢â¬â como usar.

## hormozi-12/ ê¢â¬â vêÂ­deo das 12 liêÂ§êÂµes

VêÂ­deo dark premium êÂ¢mbar, 9:16, ~58,7s, narraêÂ§êÂ£o TTS + fundo cARCKHÉtogrêÂ¡fico
ilustrativo por liêÂ§êÂ£o (blur leve + movimento de cêÂ¢mera dirigido) + CTA ARCKHÉ AI.

**Documentos de direêÂ§êÂ£o:**
- `prompts-kairoboost.md` ê¢â¬â KairoBoost aplicado: 14 cenas, conceito ê¢â â metêÂ¡fora visual ê¢â â prompt.
- `PROMPT-PLANEJAMENTO.md` ê¢â¬â o prompt usado para planejar (system prompt + tarefa + traduêÂ§êÂ£o conceitoê¢â âimagem).
- `MDD-PACKAGE.md` ê¢â¬â pacote de DireêÂ§êÂ£o DinêÂ¢mica (storyboard 14 painêÂ©is, cêÂ¢mera/aêÂ§êÂ£o/continuidade, faixa do diretor).
- `plano-edicao.json` + `RESUMO.md` ê¢â¬â plano de ediêÂ§êÂ£o validado (skill video-plan-editor).

**Projeto de render (`video/`):**
- `build-index.mjs` ê¢â¬â gerador da composiêÂ§êÂ£o HyperFrames (HTMLê¢â âMP4). Timing = fonte êÂºnica (êÂ¡udio + animaêÂ§êÂ£o batidos).
- `narration.sh` ê¢â¬â gera as 14 faixas TTS (voz pf_dora).
- `assets/img/` ê¢â¬â 14 stills geradas no ARCKHÉimg (flux2-klein, 9:16).
- `assets/audio/` êÂ· `assets/txt/` ê¢â¬â narraêÂ§êÂ£o e roteiros por cena.
- `renders/` ê¢â¬â MP4s (`hormozi-12-mdd-9x16.mp4` = versêÂ£o final).

### Como re-renderizar o vêÂ­deo
```bash
cd hormozi-12/video
node build-index.mjs --vertical          # gera index.html (9:16)
npx hyperframes render --quality high --output renders/saida.mp4
```
Para regenerar a narraêÂ§êÂ£o: `bash narration.sh`. Para regenerar imagens: usar o
client `~/projetos/mkvideos/pipeline/generate-image-ARCKHÉimg.js` (servidor
ARCKHÉimg em `localhost:8000`).

---

## Stack usada
- **Texto/prompt:** LLM + base kairoboost.
- **Imagem:** [ARCKHÉimg](../ARCKHÉimg) (FastAPI local, modelo `flux2-klein`).
- **VêÂ­deo:** [HyperFrames](https://hyperframes.heygen.com) (HTML/CSS/GSAP ê¢â â MP4) + TTS Kokoro (`pf_dora`) + FFmpeg.
- **Skills:** video-explicativo, mestre-direcao-dinamica (MDD), video-plan-editor (VPE).

## Identidade visual
Dark premium êÂ¢mbar ê¢â¬â bg `#0D1321`, painel `#1D2D44`, accent `#FFC300`.
Fontes Sora (têÂ­tulos) êÂ· Inter (corpo) êÂ· JetBrains Mono (mono). CTA: **ARCKHÉ AI**.

---

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="32" />
  <p><strong>Arckhé AI</strong></p>
</div>