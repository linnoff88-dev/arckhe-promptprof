# Prompt de planejamento do filme — Hormozi 12 lições

Documenta **exatamente** o raciocínio/prompt usado para planejar o visual do vídeo:
o motor KairoBoost (`../kairoboost/`) aplicado ao conteúdo do Hormozi.

---

## 1. Prompt-mãe (system prompt do "diretor de arte")

Este é o prompt que define o motor. Foi colado como instrução de sistema antes de planejar:

```
Você é um diretor de arte e diretor de fotografia especializado em prompts
para modelos de imagem/vídeo (Sora 2, VEO 3.1, Nano Banana 2, FLUX).
Recebe uma INTENÇÃO curta + um PRESET de estilo e reescreve como prompt
profissional, fotograficamente coerente.

Regras:
1. Nunca invente o sujeito — só ADICIONA direção técnica e estética.
2. Estrutura fixa: [sujeito+ação] · [ambiente] · [luz] · [lente/câmera] ·
   [composição/profundidade] · [textura/filme] · [color grading] · [movimento] · [proporção]
3. Aplique o PRESET (tabela presets.md).
4. Coerência física: luz, hora, lente e atmosfera têm que combinar.
5. 35–60 palavras (imagem); até 80 (vídeo, com movimento de câmera).
6. Saída: PROMPT / NEGATIVOS / PARÂMETROS.
```

(Fonte completa: `../kairoboost/SYSTEM-PROMPT.md` + `presets.md` + `vocabulario.md`)

## 2. Prompt de tarefa (o que pedi ao motor)

```
PRESET: Cinematográfico (85mm anamórfica · golden/warm · grão 35mm · teal&orange)
FORMATO: vídeo/still 9:16, fundo (b-roll) atrás de texto.

Para CADA cena do vídeo Hormozi (gancho + 12 lições + CTA):
1. O conceito é ABSTRATO (ex.: "oferta âncora"). Traduza em UMA metáfora
   visual concreta e filmável.
2. Escreva o prompt cinematográfico aplicando o preset.
3. Mantenha coerência de "filme" entre todas as cenas (mesma paleta/grão).
```

## 3. Regra de tradução conceito → metáfora visual

O passo crítico do planejamento. Cada lição vira imagem assim:

| Lição (abstrato) | Metáfora visual (concreto/filmável) |
|---|---|
| Gancho "13 anos" | empreendedor de costas no skyline ao amanhecer |
| 01 Oferta âncora | relógio de luxo em veludo preto (ancoragem) |
| 02 Anuncie mais | outdoor acendendo na cidade à noite |
| 03 Comece de graça | mão estendida oferecendo uma luz |
| 04 Prova > promessa | gráfico real subindo, mão apontando números |
| 05 Suba os preços | etiqueta virando para um valor maior |
| 06 Vendas+Marketing | duas engrenagens se encaixando |
| 07 Fale com clientes | conversa próxima, escuta, luz de janela |
| 08 Só marketing | foguete decolando (acelerar a venda) |
| 09 10× no que funciona | uma chama virando muitas |
| 10 Foco radical | flecha no centro do alvo sob feixe único |
| 11 Enfrente o difícil | alpinista escalando na hora dourada |
| 12 Lembrar > ensinar | mãos revisando um caderno de anotações |
| CTA | partículas douradas + glow, espaço negativo |

## 4. Prompts EXATOS enviados ao inemaimg (5 cenas-hero geradas)

Modelo: `flux2-klein` · 9:16 high (1024×1536) · 4 steps. Rodados via
`mkvideos/pipeline/generate-image-inemaimg.js`.

**s1 — Gancho**
> Cinematic photograph of a businessman in a dark suit seen from behind, standing on a rooftop overlooking a vast city skyline at golden sunrise, low urban haze, silhouette rim-lit by warm light, 85mm anamorphic lens, shallow depth of field, film grain, teal and orange color grading, epic moody atmosphere

**s2 — Oferta âncora**
> Cinematic close-up product photograph of a luxury golden wristwatch resting on black velvet, dramatic warm rim lighting, soft reflections, macro 100mm lens, shallow depth of field, film grain, warm high-contrast color grading, premium desirable mood, dark background

**s10 — 10× no que funciona**
> Cinematic photograph of a single golden flame multiplying into many aligned identical flames on a deep black background, intense warm glowing light, floating embers, macro lens, shallow depth of field, film grain, saturated warm color grading, powerful mood

**s12 — Enfrente o difícil**
> Cinematic photograph of a lone mountain climber silhouette scaling a steep rock cliff at golden hour, dramatic backlight, mist below, 35mm lens, film grain, warm high-contrast color grading, mood of struggle and triumph

**s14 — CTA INEMA.CLUB**
> Cinematic abstract background of floating golden particles and soft amber glow over a dark premium textured backdrop, bokeh, large empty negative space in the center, film grain, elegant warm color grading, luxury brand mood

> Conjunto completo das 14 cenas (incl. as não-geradas): `prompts-kairoboost.md`.

## 5. Como a imagem entra no vídeo

Cada still vira fundo full-bleed da cena com:
- overlay escuro (`linear + radial`, ~0.6) para legibilidade do texto;
- **Ken Burns** (scale 1.06→1.16 ao longo da cena) para dar vida;
- fade junto da cena. Implementado em `video/build-index.mjs` (`BG{}` + `.scene-bg`).
