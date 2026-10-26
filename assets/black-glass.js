/* Black Glass 2026 — campanha Black Friday San Glass (playbook da Carol).
   Entra sozinho em 03/11/2026 00:00 (horário de Brasília). Antes disso só aparece com ?blackglass=1.
   Para tirar do ar: mudar FIM ou remover o <script> das páginas. */
(function () {
  var INICIO = Date.parse('2026-11-03T00:00:00-03:00');
  var FIM = null; // ex.: Date.parse('2026-12-01T00:00:00-03:00')
  var q = location.search;
  var agora = Date.now();
  var ativo = /[?&]blackglass=1/.test(q) || (!/[?&]blackglass=0/.test(q) && agora >= INICIO && (!FIM || agora < FIM));
  if (!ativo) return;

  var fonte = document.createElement('link');
  fonte.rel = 'stylesheet';
  fonte.href = 'https://fonts.googleapis.com/css2?family=Exo+2:wght@600;800;900&display=swap';
  document.head.appendChild(fonte);

  var base = (document.currentScript && document.currentScript.src) || '/assets/black-glass.js';
  var foto = base.replace(/black-glass\.js.*$/, 'black-glass.jpg');

  var css = document.createElement('style');
  css.textContent = [
    '.bg26,.bg26 *{box-sizing:border-box;font-family:"Exo 2",system-ui,sans-serif;margin:0;padding:0}',
    '.bg26{position:relative;background:#000;color:#fff;overflow:hidden}',
    '.bg26-foto{position:absolute;inset:0 0 0 auto;width:58%;background:url("' + foto + '") center/cover no-repeat}',
    '.bg26-foto:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#000 0%,rgba(0,0,0,.55) 30%,rgba(0,0,0,0) 65%)}',
    '.bg26-in{position:relative;max-width:1200px;margin:0 auto;padding:56px 24px}',
    '.bg26-txt{max-width:560px}',
    '.bg26-logo{font-weight:900;font-size:clamp(52px,7vw,84px);line-height:.88;letter-spacing:-.01em;text-transform:uppercase}',
    '.bg26-logo span{display:block}.bg26-logo .az{color:#1FA0F0}',
    '.bg26-logo small{font-weight:600;font-size:.32em;color:#fff;letter-spacing:0;margin-left:.3em;vertical-align:baseline}',
    '.bg26-h{font-weight:800;font-size:clamp(20px,2.2vw,26px);line-height:1.2;margin-top:22px}',
    '.bg26-p{font-weight:600;font-size:16px;color:#A9BDD1;margin-top:10px}',
    '.bg26-cta{display:flex;flex-wrap:wrap;align-items:center;gap:18px 24px;margin-top:28px}',
    '.bg26-btn{appearance:none;border:0;border-radius:0;cursor:pointer;background:#1FA0F0;color:#000;font-weight:800;font-size:16px;padding:16px 28px;transition:filter .2s}',
    '.bg26-btn:hover{filter:brightness(1.1)}',
    '.bg26-selo{display:flex;align-items:baseline;gap:8px;font-weight:800;font-size:15px}',
    '.bg26-selo b{font-weight:900;font-size:40px;line-height:1}.bg26-selo .az{color:#1FA0F0}',
    '.bg26-faixa{background:#000;color:#fff;text-align:center;font:600 13px/1.3 "Exo 2",system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:9px 16px;border-bottom:1px solid #1FA0F0}',
    '.bg26-faixa b{font-weight:900}.bg26-faixa .az{color:#1FA0F0}',
    '@media (max-width:760px){',
    '.bg26-foto{width:100%;inset:auto 0 0 0;height:180px}',
    '.bg26-foto:after{background:linear-gradient(180deg,#000 0%,rgba(0,0,0,.2) 45%,rgba(0,0,0,0) 100%)}',
    '.bg26-in{padding:40px 16px 210px}',
    '.bg26-btn{width:100%}',
    '}'
  ].join('');
  document.head.appendChild(css);

  function ctaOriginal() {
    return document.querySelector('.hero .btn-primary, .js-quote, .js-open-quote, a[href="#orcamento"]') ||
      document.querySelector('main section a, main section button');
  }

  function montar() {
    var modoApp = document.querySelector('.chat-head, .stage');
    if (modoApp) {
      // chat e quiz: só a faixa no topo, sem mexer no layout da conversa
      var faixa = document.createElement('div');
      faixa.className = 'bg26-faixa';
      faixa.innerHTML = '<b>Black <span class="az">Glass</span></b> · até <b class="az">12%</b> de desconto · o menor preço do ano';
      document.body.insertBefore(faixa, document.body.firstChild);
      // no chat o body é flex centralizado: a faixa vira barra fixa no topo
      if (/flex|grid/.test(getComputedStyle(document.body).display)) {
        faixa.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999';
        document.body.style.paddingTop = faixa.offsetHeight + 'px';
      }
      return;
    }

    var sec = document.createElement('section');
    sec.className = 'bg26';
    sec.setAttribute('aria-label', 'Black Glass 2026');
    sec.innerHTML =
      '<div class="bg26-foto" role="img" aria-label="Sacada com envidraçamento San Glass"></div>' +
      '<div class="bg26-in"><div class="bg26-txt">' +
      '<p class="bg26-logo"><span>Black</span><span class="az">Glass<small>2026</small></span></p>' +
      '<h2 class="bg26-h">O melhor em vidro e alumínio. Pelo menor preço do ano.</h2>' +
      '<p class="bg26-p">Quanto maior o seu projeto, maior o seu desconto.</p>' +
      '<div class="bg26-cta"><button type="button" class="bg26-btn">Solicite seu orçamento</button>' +
      '<p class="bg26-selo">até <b>12%</b> <span class="az">de desconto</span></p></div>' +
      '</div></div>';

    sec.querySelector('.bg26-btn').addEventListener('click', function () {
      var alvo = ctaOriginal();
      if (alvo) alvo.click();
    });

    // entra logo abaixo do menu; se o menu for fixo/absoluto, reserva a altura dele
    var header = document.querySelector('body > header, header.site, main > header');
    var primeira = document.querySelector('section');
    if (header && header.parentNode && primeira) {
      header.parentNode.insertBefore(sec, header.nextSibling);
      var pos = getComputedStyle(header).position;
      if (pos === 'fixed' || pos === 'absolute') sec.style.paddingTop = header.offsetHeight + 'px';
      // hero que sobe por baixo do menu transparente (margin-top negativo): o banner herda isso
      var prox = sec.nextElementSibling;
      var mt = prox ? parseFloat(getComputedStyle(prox).marginTop) : 0;
      if (mt < 0) {
        sec.style.marginTop = mt + 'px';
        sec.style.paddingTop = -mt + 'px';
        prox.style.marginTop = '0';
        prox.style.paddingTop = Math.max(0, parseFloat(getComputedStyle(prox).paddingTop) + mt) + 'px';
      }
    } else if (primeira) {
      primeira.parentNode.insertBefore(sec, primeira);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
