# KairoBoost replicável — sua própria base de conhecimento de prompts

Reconstrução aberta da "base de conhecimento" por trás do **KairoBoost™** da
[Kairogen](https://kairogen.ai/). O KairoBoost não é público — ele é só um LLM
com 3 coisas embutidas. Aqui estão essas 3 coisas, suas, pra rodar em qualquer LLM.

## A "base de conhecimento" são 3 arquivos

| Arquivo | O que é |
|---|---|
| `SYSTEM-PROMPT.md` | O **motor**: o system prompt do "diretor de arte" que reescreve sua intenção. |
| `presets.md` | A **tabela de presets** (Cinematográfico, Editorial, Neon noir…) → parâmetros. |
| `vocabulario.md` | O **dicionário** de lente, luz, color grading, textura, modelo. |

## Como usar (3 passos)

1. Abra qualquer LLM (Claude, ChatGPT, Gemini).
2. Cole o conteúdo de `SYSTEM-PROMPT.md` + `presets.md` + `vocabulario.md` como
   instrução de sistema (ou no início do chat).
3. Mande sua intenção curta no formato:
   ```
   intenção: cachorro correndo na praia
   preset: Cinematográfico
   formato: vídeo 9:16
   ```
   → o modelo devolve o prompt refinado, negativos e parâmetros.

## Fluxo (igual ao da Kairogen, 4 passos)

1. **Descreva** — intenção curta.
2. **Refine** — escolha preset + ajuste lente/paleta/atmosfera.
3. **Compare** — gere 4 variações, escolha o melhor frame.
4. **Publique** — upscale 4K + export no formato do feed.

## Exemplo real

**Entrada:** `"cachorro correndo na praia ao pôr do sol"` + preset Cinematográfico
**Saída:** `Golden retriever correndo em câmera lenta por uma praia ao pôr do sol,
hora dourada, lente 85mm anamórfica, profundidade rasa, grão 35mm, partículas de
areia suspensas, color grading quente.`

12 palavras → 46 palavras. É exatamente o que o KairoBoost faz.

## Diferença pra plataforma paga

O que a Kairogen entrega **além** desta base (e que justifica a assinatura):
- catálogo de modelos integrado (Sora 2, VEO 3.1, Kling, Nano Banana) sem trocar de conta
- geração paralela, upscale 4K (Topaz/Magnific), ViralFX, licença comercial

A **inteligência de prompt** em si é o que está reconstruído aqui — de graça.

---
Gerado em 2026-06-07. Expanda `presets.md` e `vocabulario.md` à vontade.
