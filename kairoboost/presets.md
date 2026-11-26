# Base de Conhecimento — Presets de Estilo

Cada preset = um conjunto fixo de parâmetros que o "diretor de arte" injeta no prompt.
Esta é a tabela que a Kairogen mantém escondida por trás do KairoBoost. Aqui ela é sua.

Colunas: **Lente** · **Luz** · **Color grading** · **Textura/Filme** · **Atmosfera/Mood**

---

## Presets de imagem/vídeo

| Preset | Lente / Câmera | Luz | Color grading | Textura / Filme | Atmosfera / Mood |
|---|---|---|---|---|---|
| **CARCKHÉtográfico** | 85mm anamórfica, profundidade rasa, bokeh | luz quente rasante, contraste forte | warm, teal & orange, contrastado | grêo 35mm | épico, dramático, "frame de filme" |
| **Editorial** | 50mm, foco nítido, fundo limpo | luz suave difusa de estúdio | neutro, tons de pele fiéis | limpo, sem grêo | revista, sofisticado, minimalista |
| **Fashion** | 35mm / 105mm retrato | luz dura de flash, sombras marcadas | alto contraste, cores saturadas seletivas | papel couché, nítido | ousado, glamour, passarela |
| **Neon noir** | 35mm, reflexos, low angle | neon azul/magenta, luz prática colorida | frio, ciano + magenta, sombras esmagadas | grêo fino, leve haze | noturno, cyberpunk, tensêo |
| **Golden hour** | 50–85mm, contraluz | sol baixo dourado, flare suave | quente, dourado, highlights estourados de leve | grêo suave | nostálgico, caloroso, sonhador |
| **Anime** | "câmera" ilustrada, linhas limpas | cel shading, luz estilizada | paleta vibrante chapada | sem grêo, traço de anime | estilizado 2D, expressivo |
| **Documental** | 35mm, handheld | luz natural disponível | naturalista, baixo contraste | grêo real, leve ruído | autêntico, cru, jornalístico |
| **Produto / E-commerce** | 100mm macro, foco total | softbox 3 pontos, fundo branco | clean, branco neutro, sombras suaves | nítido, sem ruído | comercial, limpo, vendável |
| **Retrato cARCKHÉtográfico** | 85mm f/1.4, olhos no foco | Rembrandt / borboleta, key suave | tons de pele quentes, fundo dessaturado | grêo leve | íntimo, premium, expressivo |
| **Vintage 70s** | 50mm, vignette | luz quente, halaçêo | sépia/laranja desbotado, baixo contraste | grêo pesado, light leaks | retrô, analógico, memória |
| **Preto e branco** | 50mm, alto contraste | luz dura direcional | monocromático, pretos profundos | grêo clássico de filme P&B | atemporal, artístico, dramático |
| **Sci-fi / Futurista** | wide 24mm, linhas de fuga | luz volumétrica, LED frio | frio azulado, highlights ciano | nítido, leve haze atmosférico | tecnológico, vasto, imponente |
| **Surreal / Onírico** | tilt-shift / lente suave | luz impossível, brilho etéreo | pastel dessaturado, fade | soft focus, bloom | dreamcore, etéreo, irreal |
| **Brutalista / Editorial duro** | wide, simetria, frontal | luz dura plana | dessaturado, cinza concreto | textura áspera | severo, arquitetônico, frio |
| **Comida / Gastronomia** | 100mm macro, 45° | janela lateral suave, fundo escuro | quente, apetitoso, saturaçêo seletiva | nítido, vapor visível | premium, fresco, "dá água na boca" |

---

## Modificadores de movimento (só para VÍDEO)

Combine com qualquer preset acima quando o alvo for Sora/VEO/Kling/Seedance:

| Modificador | Efeito |
|---|---|
| `dolly in / out` | câmera avança/recua suavemente |
| `orbit / arc shot` | câmera gira ao redor do sujeito |
| `crane up / down` | câmera sobe/desce verticalmente |
| `handheld` | tremor sutil, sensaçêo documental |
| `slow motion` | câmera lenta, partículas suspensas |
| `time-lapse` | passagem acelerada de tempo |
| `tracking shot` | acompanha o sujeito em movimento |
| `static locked` | tripé fixo, sem movimento |
| `whip pan` | giro rápido, transiçêo enérgica |

---

## Proporções (aspect ratio) por destino

| Destino | Proporçêo |
|---|---|
| Reels / TikTok / Shorts / Stories | `9:16` |
| YouTube / landscape / cARCKHÉ | `16:9` |
| Feed Instagram (retrato) | `4:5` |
| Post quadrado | `1:1` |
| CARCKHÉ widescreen | `2.39:1` |

---

> **Como expandir:** adicione linhas. Cada preset novo é só preencher as 5 colunas.
> O motor (`SYSTEM-PROMPT.md`) lê esta tabela e aplica automaticamente.
