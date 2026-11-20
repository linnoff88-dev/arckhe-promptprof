// ============================================================================
// 13 ANOS EM 47 SEGUNDOS — 12 lições de negócios (Hormozi)
// Rapid-fire short: hook (s1) + 12 lessons (s2..s13) + CTA INEMA.CLUB (s14).
// Lessons geradas por array (LESSONS) numa cena-modelo única.
// Uso: node build-index.mjs --vertical  (9:16 Shorts)  | node build-index.mjs (16:9)
// ============================================================================
import { writeFileSync, readFileSync } from "node:fs";

const FONT_CSS = readFileSync(new URL("./assets/fonts/fonts.css", import.meta.url), "utf8")
  .replace(/\.\/fonts\//g, "assets/fonts/");

const VERT = process.argv.includes("--vertical");
const W = VERT ? 1080 : 1920;
const H = VERT ? 1920 : 1080;
const OUT = "index.html";

// Durações REAIS dos WAVs (ffprobe), na ordem s1..s14
const AUDIO = [4.117333, 4.224, 4.416, 4.352, 4.138667, 3.477333, 2.538667, 4.074667, 3.456, 2.730667, 3.136, 3.754667, 3.84, 3.712];
const LEAD = 0.18;  // visual estabelece antes da voz (curto = punchy)
const TAIL = 0.30;  // segura depois da voz
const FADE = 0.28;

let t = 0;
const S = AUDIO.map((a, i) => {
  const dur = LEAD + a + TAIL;
  const o = { i: i + 1, start: round(t), dur: round(dur), audioStart: round(t + LEAD), audioDur: round(a), end: round(t + dur) };
  t += dur;
  return o;
});
const TOTAL = round(t);
function round(n) { return Math.round(n * 1000) / 1000; }

// ---------- DADOS DAS 12 LIÇÕES ----------
const LESSONS = [
  { n: "01", title: "Oferta âncora",        sub: "Um preço absurdo faz o resto parecer barato." },
  { n: "02", title: "Anuncie mais",         sub: "Ninguém sabe que você existe." },
  { n: "03", title: "Comece de graça",      sub: "Derrube a barreira de entrada." },
  { n: "04", title: "Prova &gt; promessa",  sub: "Mostre resultado, não copy bonita." },
  { n: "05", title: "Suba os preços",       sub: "Cada “sim” passa a valer mais." },
  { n: "06", title: "Vendas + Marketing",   sub: "Um funil só, sem vazar dinheiro." },
  { n: "07", title: "Fale com clientes",    sub: "Eles já te dizem o que querem comprar." },
  { n: "08", title: "Só marketing",         sub: "Até R$500 mil/mês: foque em vender." },
  { n: "09", title: "10× no que funciona",  sub: "Mais verba no que já dá resultado." },
  { n: "10", title: "Foco radical",         sub: "Um canal, um avatar, um produto." },
  { n: "11", title: "Enfrente o difícil",   sub: "O crescimento mora no desconforto." },
  { n: "12", title: "Lembrar &gt; ensinar", sub: "Revise toda semana até virar hábito." },
];

// Fundo cinematográfico ilustrativo em TODAS as cenas (still inemaimg + blur + overlay + Ken Burns)
const BG = {}; S.forEach((s) => { BG[s.i] = true; });
const isLesson = (i) => i !== 1 && i !== S.length;

// Movimento de câmera dirigido por cena (MDD) — emulado nas stills via transform
const MOVE = {
  1:  { from: { scale: 1.06 },              to: { scale: 1.18 },             ease: "sine.inOut" }, // push-in
  2:  { from: { scale: 1.08, xPercent: -3 }, to: { scale: 1.14, xPercent: 3 }, ease: "sine.inOut" }, // parallax
  3:  { from: { scale: 1.12, yPercent: 4 },  to: { scale: 1.15, yPercent: -4 }, ease: "sine.inOut" }, // tilt-up
  4:  { from: { scale: 1.05 },              to: { scale: 1.18 },             ease: "sine.inOut" }, // push-in
  5:  { from: { scale: 1.10, yPercent: 4 },  to: { scale: 1.15, yPercent: -4 }, ease: "sine.inOut" }, // pan-up
  6:  { from: { scale: 1.06 },              to: { scale: 1.18 },             ease: "power1.out" },  // push-in
  7:  { from: { scale: 1.08, xPercent: 3 },  to: { scale: 1.14, xPercent: -3 }, ease: "sine.inOut" }, // orbit
  8:  { from: { scale: 1.08, xPercent: 3 },  to: { scale: 1.13, xPercent: -3 }, ease: "sine.inOut" }, // dolly lateral
  9:  { from: { scale: 1.10, yPercent: 5 },  to: { scale: 1.16, yPercent: -5 }, ease: "sine.inOut" }, // crane up
  10: { from: { scale: 1.06 },              to: { scale: 1.18 },             ease: "sine.inOut" }, // push-in
  11: { from: { scale: 1.04 },              to: { scale: 1.20 },             ease: "power3.out" },  // snap push-in
  12: { from: { scale: 1.10, yPercent: 5 },  to: { scale: 1.15, yPercent: -5 }, ease: "sine.inOut" }, // tilt-up
  13: { from: { scale: 1.05 },              to: { scale: 1.18 },             ease: "sine.inOut" }, // push-in
  14: { from: { scale: 1.18 },              to: { scale: 1.05 },             ease: "sine.inOut" }, // pull-out
};

const CAPTIONS = [
  "13 anos de negócios em 47 segundos",
  "Oferta âncora — ancore o preço",
  "Anuncie mais — te falta alcance, não produto",
  "Comece de graça — tire o atrito",
  "Prova vence promessa",
  "Suba os preços — menos sins, melhores clientes",
  "Vendas + Marketing = um funil só",
  "Fale com seus clientes",
  "Até R$500 mil/mês: só venda",
  "10× no que já funciona",
  "Foco radical: 1 canal, 1 avatar, 1 produto",
  "Enfrente o difícil",
  "Lembrar > ensinar — revise toda semana",
  "Continua em inema.club",
];

// ---------- CENAS ----------
function sceneHook() {
  return `
    <div class="eyebrow" id="s1-eyebrow"><span class="dot"></span>ALEX HORMOZI · 12 LIÇÕES</div>
    <h1 class="title">
      <span class="word" id="s1-w1">13 anos</span>
      <span class="word accent" id="s1-w2">em 47s</span>
    </h1>
    <div class="rule" id="s1-rule"></div>
    <p class="subhead" id="s1-sub">12 lições que dão dinheiro<span class="cursor" id="s1-cur"></span></p>
    <div class="reg tl" id="s1-r1"></div><div class="reg br" id="s1-r2"></div>`;
}

function lessonScene(i, L) {
  return `
    <div class="lcount mono" id="s${i}-count">${L.n} <span class="dim">/ 12</span></div>
    <div class="lwrap">
      <div class="lnum" id="s${i}-num">${L.n}</div>
      <h2 class="ltitle" id="s${i}-title">${L.title}</h2>
      <div class="lrule" id="s${i}-rule"></div>
      <p class="lsub" id="s${i}-sub">${L.sub}</p>
    </div>`;
}

function sceneCTA(i) {
  return `
    <div class="cta-eyebrow" id="s${i}-eye">CONTINUA EM</div>
    <div class="cta-brand" id="s${i}-brand"><span class="b1">INEMA</span><span class="bdotsep">.</span><span class="b2">CLUB</span></div>
    <div class="rule center" id="s${i}-rule"></div>
    <div class="cta-url mono" id="s${i}-url"><span class="cta-globe">🌐</span>inema.club</div>
    <div class="reg tl" id="s${i}-r1"></div><div class="reg br" id="s${i}-r2"></div>`;
}

// BODIES na ordem das cenas: 1 hook, 2..13 lições, 14 CTA
const BODIES = S.map((s) => {
  if (s.i === 1) return sceneHook();
  if (s.i === S.length) return sceneCTA(s.i);
  return lessonScene(s.i, LESSONS[s.i - 2]);
});

// ---------- ANIMAÇÃO ----------
function anim(i, t) {
  const L = [];
  const P = (s) => L.push(s);
  P(`tl.fromTo("#scene-inner-${i}",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},${t});`);
  P(`tl.to("#scene-inner-${i}",{opacity:0,duration:${FADE},ease:"power2.in"},${round(S[i - 1].end - FADE)});`);
  P(`tl.set("#scene-inner-${i}",{opacity:0},${round(S[i - 1].end)});`);
  // fundo cinematográfico: fade junto + Ken Burns lento
  if (BG[i]) {
    P(`tl.fromTo("#s${i}-bg",{opacity:0},{opacity:1,duration:${FADE},ease:"power2.out"},${t});`);
    P(`tl.to("#s${i}-bg",{opacity:0,duration:${FADE},ease:"power2.in"},${round(S[i - 1].end - FADE)});`);
    P(`tl.set("#s${i}-bg",{opacity:0},${round(S[i - 1].end)});`);
    const mv = MOVE[i] || { from: { scale: 1.06 }, to: { scale: 1.16 }, ease: "none" };
    const mvTo = Object.assign({}, mv.to, { duration: round(S[i - 1].dur), ease: mv.ease, transformOrigin: "50% 50%" });
    P(`tl.fromTo("#s${i}-bgimg",${JSON.stringify(mv.from)},${JSON.stringify(mvTo)},${t});`);
  }
  const at = (d) => round(t + d);

  if (i === 1) {
    P(`tl.from("#s1-eyebrow",{y:-24,opacity:0,duration:.45,ease:"power3.out"},${at(0.05)});`);
    P(`tl.from("#s1-w1",{y:80,opacity:0,duration:.55,ease:"power4.out"},${at(0.2)});`);
    P(`tl.from("#s1-w2",{y:80,opacity:0,duration:.55,ease:"power4.out"},${at(0.38)});`);
    P(`tl.fromTo("#s1-rule",{scaleX:0},{scaleX:1,duration:.55,ease:"expo.out",transformOrigin:"left center"},${at(0.7)});`);
    P(`tl.from("#s1-sub",{y:18,opacity:0,duration:.45,ease:"power2.out"},${at(0.85)});`);
    P(`tl.fromTo("#s1-cur",{opacity:1},{opacity:0,duration:.5,repeat:8,yoyo:true,ease:"none"},${at(1.2)});`);
    P(`tl.from(["#s1-r1","#s1-r2"],{opacity:0,scale:.5,duration:.5,stagger:.1,ease:"back.out(2)"},${at(0.4)});`);
  } else if (i === S.length) {
    P(`tl.from("#s${i}-eye",{y:-18,opacity:0,duration:.45,ease:"power2.out"},${at(0.1)});`);
    P(`tl.from("#s${i}-brand",{scale:.7,opacity:0,duration:.6,ease:"back.out(1.7)"},${at(0.3)});`);
    P(`tl.fromTo("#s${i}-rule",{scaleX:0},{scaleX:1,duration:.55,ease:"expo.out"},${at(0.85)});`);
    P(`tl.from("#s${i}-url",{y:20,opacity:0,duration:.5,ease:"power2.out"},${at(1.0)});`);
    P(`tl.fromTo("#s${i}-brand",{filter:"drop-shadow(0 0 0px rgba(255,195,0,0))"},{filter:"drop-shadow(0 0 26px rgba(255,195,0,.55))",duration:1.0,repeat:3,yoyo:true,ease:"sine.inOut"},${at(1.1)});`);
    P(`tl.from(["#s${i}-r1","#s${i}-r2"],{opacity:0,scale:.5,duration:.5,stagger:.1,ease:"back.out(2)"},${at(0.4)});`);
  } else {
    // cena-modelo de lição (rápida)
    P(`tl.from("#s${i}-count",{y:-14,opacity:0,duration:.35,ease:"power2.out"},${at(0.02)});`);
    P(`tl.from("#s${i}-num",{scale:.4,opacity:0,rotate:-8,duration:.5,ease:"back.out(2)"},${at(0.06)});`);
    P(`tl.from("#s${i}-title",{y:42,opacity:0,duration:.45,ease:"power3.out"},${at(0.26)});`);
    P(`tl.fromTo("#s${i}-rule",{scaleX:0},{scaleX:1,duration:.4,ease:"expo.out",transformOrigin:"left center"},${at(0.42)});`);
    P(`tl.from("#s${i}-sub",{y:18,opacity:0,duration:.4,ease:"power2.out"},${at(0.52)});`);
  }
  // caption
  P(`tl.fromTo("#cap-${i}",{opacity:0,y:14},{opacity:1,y:0,duration:.4,ease:"power2.out"},${at(0.2)});`);
  P(`tl.to("#cap-${i}",{opacity:0,duration:.3,ease:"power2.in"},${round(S[i - 1].end - 0.4)});`);
  return L.join("\n      ");
}

// ---------- MONTAGEM ----------
const scenesHTML = S.map((s, idx) => {
  const bg = BG[s.i]
    ? `<div class="scene-bg" id="s${s.i}-bg" data-layout-ignore><img class="scene-bgimg" id="s${s.i}-bgimg" src="assets/img/s${s.i}.png"/><div class="scene-bg-ov"></div></div>`
    : "";
  return `
    <section id="s${s.i}" class="scene clip${BG[s.i] ? " has-bg" : ""}${isLesson(s.i) ? " lesson" : ""}" data-start="${s.start}" data-duration="${s.dur}" data-track-index="${s.i % 2 === 1 ? 1 : 3}">
      ${bg}<div class="scene-inner" id="scene-inner-${s.i}">${BODIES[idx]}</div>
    </section>`;
}).join("");

const captionsHTML = S.map((s, idx) => `
    <div class="caption clip" id="cap-${s.i}" data-start="${s.start}" data-duration="${s.dur}" data-track-index="${s.i % 2 === 1 ? 2 : 4}">${CAPTIONS[idx]}</div>`).join("");

const audioHTML = S.map((s) => `
    <audio id="a${s.i}" data-start="${s.audioStart}" data-duration="${s.audioDur}" data-track-index="20" src="assets/audio/s${s.i}.wav"></audio>`).join("");

const animJS = S.map((s) => anim(s.i, s.start)).join("\n      ");

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      ${FONT_CSS}
      :root{
        --bg:#0D1321; --bg2:#1D2D44; --bg3:#3E5C76;
        --fg:#F0EBD8; --muted:#748CAB; --accent:#FFC300; --accent2:#FCA311; --code:#2EC4B6;
      }
      *{margin:0;padding:0;box-sizing:border-box}
      html,body{width:${W}px;height:${H}px;overflow:hidden;background:var(--bg);color:var(--fg);
        font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
      .mono{font-family:"JetBrains Mono",ui-monospace,monospace}
      #root{position:relative;width:${W}px;height:${H}px;overflow:hidden}

      /* ---- background persistente ---- */
      .bg-layer{position:absolute;inset:0;z-index:0;pointer-events:none}
      #glow{position:absolute;top:-260px;left:-180px;width:1100px;height:1100px;border-radius:50%;
        background:radial-gradient(circle,rgba(255,195,0,.20),rgba(255,195,0,0) 62%);filter:blur(8px)}
      #glow2{position:absolute;bottom:-360px;right:-240px;width:1200px;height:1200px;border-radius:50%;
        background:radial-gradient(circle,rgba(46,196,182,.10),rgba(46,196,182,0) 62%)}
      #grid{position:absolute;inset:-2px;opacity:.5;
        background-image:linear-gradient(rgba(116,140,171,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(116,140,171,.07) 1px,transparent 1px);
        background-size:64px 64px}
      .ghost{position:absolute;font-family:Sora,sans-serif;font-weight:800;color:rgba(255,195,0,.04);
        font-size:520px;line-height:.8;letter-spacing:-.03em;top:240px;left:-40px;white-space:nowrap;user-select:none}
      #grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
      #progress{position:absolute;left:0;bottom:0;height:6px;width:100%;transform:scaleX(0);transform-origin:left center;
        background:linear-gradient(90deg,var(--accent),var(--accent2));z-index:40;box-shadow:0 0 18px rgba(255,195,0,.5)}

      /* ---- cena base ---- */
      .scene{position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;justify-content:center;
        padding:120px 150px 150px}
      .scene-inner{position:relative;z-index:2;width:100%;height:100%;display:flex;flex-direction:column;justify-content:center}
      .accent{color:var(--accent)}.accent2{color:var(--accent2)}.dim{color:var(--muted)}

      /* ---- fundo cinematográfico ilustrativo (todas as cenas) ---- */
      .scene-bg{position:absolute;inset:0;z-index:0;overflow:hidden}
      .scene-bgimg{position:absolute;inset:-7%;width:114%;height:114%;object-fit:cover;
        filter:blur(5px) saturate(1.06) brightness(.92);will-change:transform}
      .scene-bg-ov{position:absolute;inset:0;
        background:linear-gradient(180deg,rgba(13,19,33,.34) 0%,rgba(13,19,33,.20) 30%,rgba(13,19,33,.68) 66%,rgba(13,19,33,.95) 100%)}
      .scene.has-bg .ltitle,.scene.has-bg .title,.scene.has-bg .cta-brand{text-shadow:0 3px 22px rgba(0,0,0,.75)}
      .scene.has-bg .lsub,.scene.has-bg .subhead{color:#E0E7F2;text-shadow:0 2px 16px rgba(0,0,0,.9)}
      .scene.has-bg .lcount{text-shadow:0 2px 10px rgba(0,0,0,.8)}

      /* lição com fundo: texto ancorado embaixo, imagem respira no topo */
      .scene.lesson .scene-inner{justify-content:flex-end;padding-bottom:24px}
      .scene.lesson .lnum{font-size:150px;margin-bottom:4px}
      .scene.lesson .lwrap{height:auto;flex:none}

      /* HOOK (cena 1) */
      .eyebrow{display:inline-flex;align-items:center;gap:14px;font-family:"JetBrains Mono",monospace;
        font-size:26px;letter-spacing:.3em;color:var(--muted);font-weight:600}
      .eyebrow .dot{width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 16px var(--accent)}
      .title{font-family:Sora,sans-serif;font-weight:800;font-size:184px;line-height:.92;letter-spacing:-.03em;margin:24px 0}
      .title .word{display:block}
      .rule{height:7px;width:520px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:10px 0 30px}
      .rule.center{margin:34px auto}
      .subhead{font-size:42px;color:var(--muted)}
      .cursor{display:inline-block;width:18px;height:40px;background:var(--accent);margin-left:10px;vertical-align:-6px;border-radius:2px}
      .reg{position:absolute;width:48px;height:48px;border:3px solid var(--bg3)}
      .reg.tl{top:0;left:0;border-right:none;border-bottom:none}
      .reg.br{bottom:0;right:0;border-left:none;border-top:none}

      /* LIÇÃO (cenas 2..13) */
      .lcount{position:absolute;top:0;right:0;font-size:30px;letter-spacing:.12em;color:var(--accent);font-weight:700}
      .lwrap{display:flex;flex-direction:column;justify-content:center;height:100%}
      .lnum{font-family:Sora,sans-serif;font-weight:800;font-size:300px;line-height:.8;letter-spacing:-.04em;
        color:var(--accent);text-shadow:0 0 60px rgba(255,195,0,.25);margin-bottom:10px}
      .ltitle{font-family:Sora,sans-serif;font-weight:800;font-size:104px;line-height:1.0;letter-spacing:-.02em;color:var(--fg)}
      .lrule{height:7px;width:200px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:6px;margin:30px 0 28px}
      .lsub{font-size:46px;color:var(--muted);max-width:90%;line-height:1.25}

      /* CTA (cena 14) */
      .cta-eyebrow{text-align:center;font-family:"JetBrains Mono",monospace;font-size:26px;letter-spacing:.36em;
        color:var(--muted);text-transform:uppercase;margin-bottom:30px}
      .cta-brand{text-align:center;font-family:Sora;font-weight:800;font-size:150px;line-height:.95;letter-spacing:-.02em}
      .cta-brand .b1{color:var(--fg)}.cta-brand .b2{color:var(--accent)}.cta-brand .bdotsep{color:var(--accent)}
      .cta-url{display:flex;align-items:center;justify-content:center;gap:16px;font-size:46px;color:var(--muted);margin-top:32px}
      .cta-globe{font-size:38px;filter:grayscale(.2)}

      /* caption */
      .caption{position:absolute;left:50%;transform:translateX(-50%);bottom:64px;z-index:30;
        max-width:1500px;text-align:center;font-size:36px;font-weight:600;color:var(--fg);
        background:rgba(10,18,30,.72);border:1px solid var(--bg3);border-radius:14px;padding:18px 40px;
        backdrop-filter:blur(6px);text-shadow:0 2px 10px rgba(0,0,0,.6)}

      /* =================== OVERRIDES 9:16 (Shorts) =================== */
      body.v .scene{padding:200px 90px 280px}
      body.v .eyebrow{font-size:24px}
      body.v .title{font-size:150px;margin:22px 0}
      body.v .rule{width:380px;margin-bottom:26px}
      body.v .subhead{font-size:40px}
      body.v .lcount{font-size:32px}
      body.v .lnum{font-size:330px}
      body.v .scene.lesson .lnum{font-size:172px}
      body.v .ltitle{font-size:96px}
      body.v .lrule{width:200px;margin:32px 0 30px}
      body.v .lsub{font-size:48px;max-width:100%}
      body.v .cta-brand{font-size:122px}
      body.v .cta-url{font-size:44px}
      body.v .caption{bottom:160px;max-width:920px;font-size:36px;padding:18px 34px}
      body.v #glow{top:-200px;left:-160px;width:900px;height:900px}
      body.v #glow2{bottom:-300px;right:-200px;width:1000px;height:1000px}
      body.v .ghost{font-size:420px;top:560px}
    </style>
  </head>
  <body class="${VERT ? "v" : ""}">
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
      <div class="bg-layer" data-layout-ignore>
        <div id="glow"></div><div id="glow2"></div><div id="grid"></div>
        <div class="ghost" id="ghost" data-layout-ignore>$$$</div><div id="grain"></div>
      </div>
${scenesHTML}
${captionsHTML}
      <div id="progress"></div>
${audioHTML}
      <script>
        window.__timelines = window.__timelines || {};
        const tl = gsap.timeline({ paused: true });
        const TOTAL = ${TOTAL};
        tl.to("#glow",{scale:1.22,opacity:.55,duration:4.5,yoyo:true,repeat:Math.ceil(TOTAL/4.5)+1,ease:"sine.inOut"},0);
        tl.to("#glow2",{scale:1.18,duration:6,yoyo:true,repeat:Math.ceil(TOTAL/6)+1,ease:"sine.inOut"},0);
        tl.to("#ghost",{x:120,duration:TOTAL,ease:"none"},0);
        tl.to("#grid",{backgroundPositionX:"+=128",backgroundPositionY:"+=128",duration:18,repeat:Math.ceil(TOTAL/18)+1,ease:"none"},0);
        tl.fromTo("#progress",{scaleX:0},{scaleX:1,duration:TOTAL,ease:"none"},0);
      ${animJS}
        tl.set({}, {}, TOTAL);
        window.__timelines["main"] = tl;
      </script>
    </div>
  </body>
</html>
`;

writeFileSync(new URL("./" + OUT, import.meta.url), html);
console.log(`${OUT} gerado · ${W}x${H} · TOTAL = ${TOTAL}s · ${S.length} cenas`);
S.forEach(s => console.log(`  s${s.i}: start=${s.start} dur=${s.dur} audio@${s.audioStart} (${s.audioDur}s)`));
