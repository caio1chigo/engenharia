(()=>{
function init(){
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const carousel=document.querySelector('.carousel');
if(carousel){
 const oldPages=[...carousel.querySelectorAll('.rev-page')];
 const reviews=[...carousel.querySelectorAll('.rev')];
 if(reviews.length){
  const track=document.createElement('div');track.className='review-track';track.tabIndex=0;track.setAttribute('role','region');track.setAttribute('aria-label','Avaliações: deslize ou use as setas');
  reviews.forEach((r,i)=>{r.classList.remove('rv');r.setAttribute('role','group');r.setAttribute('aria-label',`Avaliação ${i+1} de ${reviews.length}`);track.append(r)});
  const viewport=carousel.querySelector('.rev-viewport');if(viewport){viewport.removeAttribute('aria-live');viewport.replaceChildren(track)}else carousel.prepend(track);
  const ctrl=carousel.querySelector('.car-ctrl');
  if(ctrl){ctrl.innerHTML='<button class="arrow" id="reviews-prev" type="button" aria-label="Ver avaliação anterior">←</button><span class="review-position" role="status" aria-live="polite"></span><button class="arrow" id="reviews-next" type="button" aria-label="Ver próxima avaliação">→</button>';
  const prev=ctrl.querySelector('#reviews-prev'),next=ctrl.querySelector('#reviews-next'),status=ctrl.querySelector('.review-position');
  const visible=()=>matchMedia('(max-width:760px)').matches?1:3;
  const step=()=>reviews[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0);
  function update(){const n=visible();const first=Math.max(0,Math.min(reviews.length-n,Math.round(track.scrollLeft/step())));status.textContent=n===1?`${first+1} / ${reviews.length}`:`${first+1}–${Math.min(first+n,reviews.length)} / ${reviews.length}`;prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-3;}
  function move(dir){track.scrollBy({left:dir*step()*visible(),behavior:reduced?'auto':'smooth'})}
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
  window.addEventListener('resize',update);requestAnimationFrame(update);
  }
 }
}
const contact=document.querySelector('.cta#contato');
if(contact){contact.className='contact-split';contact.innerHTML=`<div class="contact-copy"><p class="eyebrow">VAMOS CONSTRUIR JUNTOS</p><h2>PRONTO PARA COMEÇAR SEU PROJETO?</h2><p>Conte sobre a sua obra, reforma ou imóvel. Vamos conversar sobre a solução técnica adequada ao seu momento.</p></div><form class="fecon-form" id="fecon-contact"><label>Nome<input name="nome" placeholder="Seu nome" autocomplete="name" required></label><label>Empresa<input name="empresa" placeholder="Nome da empresa (opcional)" autocomplete="organization"></label><label>E-mail<input name="email" type="email" placeholder="Seu e-mail" autocomplete="email" required></label><label>Telefone<input name="telefone" type="tel" placeholder="Telefone com DDD" autocomplete="tel" required></label><label class="full">Seu projeto<textarea name="mensagem" placeholder="Conte um pouco sobre o que você precisa" required></textarea></label><p class="form-note full">Demonstração: o envio ainda não está conectado. Não preencha dados sensíveis.</p><button class="btn solid" type="submit">Enviar mensagem <span>→</span></button><p class="full" role="status"></p></form>`;
contact.querySelector('form').addEventListener('submit',e=>{e.preventDefault();contact.querySelector('[role=status]').textContent='Este formulário é demonstrativo. Nenhum dado foi enviado ou armazenado. O canal de envio será configurado após aprovação.'});}
const footer=document.querySelector('footer.footer');if(footer){const brand=footer.querySelector('.brand')?.outerHTML||'<a class="brand" href="#topo">FECON ENGENHARIA</a>';footer.classList.add('footer-complete');footer.innerHTML=`<div class="wrap footer-columns"><div>${brand}<p>Engenharia civil para construir, reformar e comprar com segurança. Orientação técnica do planejamento à entrega.</p></div><div><h3>NAVEGAÇÃO</h3><nav aria-label="Navegação do rodapé"><a href="#topo">Início</a><a href="#sobre">Sobre</a><a href="#atuacao">Atuação</a><a href="#servicos">Serviços</a><a href="#avaliacoes">Avaliações</a><a href="#como-funciona">Como funciona</a><a href="#contato">Contato</a></nav></div><div><h3>SERVIÇOS</h3><nav aria-label="Serviços no rodapé"><a href="#servicos">Laudos e vistorias</a><a href="#servicos">Consultorias</a><a href="#servicos">Obras e reformas</a><a href="#atuacao">Fiscalização técnica</a><a href="#atuacao">Planejamento e custos</a></nav></div><div><h3>CONTATO</h3><ul class="footer-contacts"><li><a href="#contato">Solicite um atendimento →</a></li><li>Telefone: a confirmar</li><li>E-mail: a confirmar</li><li>Local e horário: a confirmar</li></ul></div></div><div class="wrap footer-legal"><span>© ${new Date().getFullYear()} Fecon Engenharia e Construções.</span><span>Protótipo · Dados de contato e envio pendentes</span></div>`;}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();