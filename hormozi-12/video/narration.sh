#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
mkdir -p assets/audio assets/txt

write() { printf '%s\n' "$2" > "assets/txt/$1.txt"; }

write s1  "Treze anos de negócios resumidos em quarenta e sete segundos. Bora."
write s2  "Um. Oferta âncora. Um preço absurdo faz todo o resto parecer barato."
write s3  "Dois. Anuncie mais. O problema não é o produto. Ninguém sabe que você existe."
write s4  "Três. Comece de graça. Entregue o primeiro resultado e derrube a barreira."
write s5  "Quatro. Prova, não promessa. Pare de se gabar e mostre resultado real."
write s6  "Cinco. Suba os preços. Cada sim passa a valer muito mais."
write s7  "Seis. Una vendas e marketing num funil só."
write s8  "Sete. Fale com seus clientes. Eles já dizem o que querem comprar."
write s9  "Oito. Até quinhentos mil por mês, foque em uma coisa: vender."
write s10 "Nove. Faça dez vezes mais do que já funciona."
write s11 "Dez. Foco radical. Um canal, um avatar, um produto."
write s12 "Onze. Enfrente o difícil. O crescimento mora no que você evita."
write s13 "Doze. Lembrar vale mais que aprender. Revise isto toda semana."
write s14 "Isso é conteúdo do INEMA ponto CLUB. Acesse: inema ponto club."

for i in $(seq 1 14); do
  echo "=== gerando s$i ==="
  npx -y hyperframes tts "assets/txt/s$i.txt" --voice pf_dora --speed 1.0 --output "assets/audio/s$i.wav" 2>&1 \
    | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g' | grep -aiE "saved|error|fail|wrote|->" | tail -2 || true
done

echo "=== DURACOES ==="
for i in $(seq 1 14); do
  d=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "assets/audio/s$i.wav" 2>/dev/null)
  printf 's%s: %s\n' "$i" "$d"
done
