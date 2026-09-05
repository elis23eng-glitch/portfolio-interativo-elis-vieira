const speeches={
  intro:"Olá! Que bom ter você aqui. Eu sou Elis. Minha trajetória conecta engenharia, gestão de processos, projetos, indicadores e tecnologia. Gosto de organizar desafios complexos e transformá-los em decisões claras, soluções úteis e entregas consistentes.",
  profile:"Meu perfil predominante é Analista Planejador. Isso significa que trabalho com organização, exatidão, prudência e muito cuidado com a qualidade. Na avaliação SVA, alcancei 94 de 100, com nota máxima em aprendizado contínuo e em resiliência e crescimento.",
  journey:"Minha experiência foi construída em ambientes industriais, obras, infraestrutura, auditoria, expansão corporativa e também no meu próprio negócio. Em cada etapa, aprendi a estruturar controles, melhorar processos e apoiar boas decisões com dados.",
  tech:"A tecnologia representa uma evolução natural da minha trajetória. Hoje, conecto Excel, Power BI, inteligência artificial e automação para criar soluções como aplicativos de controle financeiro pessoal, dashboards de vendas com indicadores, ferramentas de gestão de obras e o MatchCV."
};
const stages=[
  ["O DESAFIO","Tornar materiais e informações rastreáveis","Análise técnica, composição de custos e auditoria interna para identificar falhas em fluxos de materiais e fortalecer os controles.","Auditoria concluída com sucesso","Correções implementadas e reconhecimento formal pela contribuição ao resultado."],
  ["O DESAFIO","Criar método em uma operação complexa","Estruturação de papéis, aprovações, registros, rotinas e evidências para integrar obras, logística, materiais e equipes.","Conformidade transformada em prática","Processos implantados apoiaram a aprovação em auditoria e a certificação ISO 9001."],
  ["O DESAFIO","Dar visibilidade à capacidade do time","Implantação de controles de produtividade, indicadores de desempenho, avaliação objetiva e saneamento de bases.","Prioridades mais claras","Informações mais confiáveis para distribuir atividades, acompanhar desvios e orientar planos de ação."],
  ["O DESAFIO","Padronizar demandas distribuídas","Consolidação de escopos, custos unitários, indicadores e acompanhamento de entregas para operações em diferentes localidades.","Governança e previsibilidade","Uma referência única para análises consistentes, validação executiva e acompanhamento por unidade."],
  ["O DESAFIO","Conectar execução e inovação","Gestão completa de obras com responsabilidade técnica, liderança de equipes e controle físico-financeiro, somada à criação de produtos digitais.","Trajetória integrada","Engenharia, gestão, dados e IA reunidos para resolver problemas reais com qualidade e propósito."]
];
const speechEl=document.querySelector('#avatarSpeech');
function typeSpeech(text){speechEl.textContent='';let i=0;const timer=setInterval(()=>{speechEl.textContent+=text[i++]||'';if(i>=text.length)clearInterval(timer)},12)}
let assistantVoice=null;
function selectAssistantVoice(){
  if(!('speechSynthesis' in window))return;
  const voices=speechSynthesis.getVoices();
  const brazilian=voices.filter(v=>/^pt[-_]BR$/i.test(v.lang));
  const portuguese=voices.filter(v=>/^pt([-_]|$)/i.test(v.lang));
  const candidates=brazilian.length?brazilian:portuguese;
  const score=v=>{
    const name=(v.name+' '+v.voiceURI).toLowerCase();
    let points=0;
    if(/natural|neural/.test(name))points+=30;
    if(/premium|enhanced/.test(name))points+=20;
    if(/francisca|thalita|luciana|maria|vit[oó]ria|female/.test(name))points+=18;
    if(/^pt[-_]BR$/i.test(v.lang))points+=12;
    if(/microsoft|google|apple/.test(name))points+=5;
    return points;
  };
  assistantVoice=[...candidates].sort((a,b)=>score(b)-score(a))[0]||null;
}
selectAssistantVoice();
if('speechSynthesis' in window)speechSynthesis.addEventListener('voiceschanged',selectAssistantVoice);
function speak(text){
  if(!('speechSynthesis' in window)){
    speechEl.textContent='A narração não está disponível neste navegador. Você pode acompanhar o conteúdo pelo texto da página.';
    return;
  }
  speechSynthesis.cancel();
  const expressiveText=text
    .replace(/\. /g,'… ')
    .replace(/: /g,': … ')
    .replace(/ — /g,', ');
  const u=new SpeechSynthesisUtterance(expressiveText);
  u.lang='pt-BR';
  u.rate=.89;
  u.pitch=1.04;
  u.volume=.90;
  if(assistantVoice)u.voice=assistantVoice;
  speechSynthesis.speak(u);
}
document.querySelectorAll('[data-speech]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-speech]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');const text=speeches[btn.dataset.speech];typeSpeech(text);speak(text)}));
document.querySelector('#presentBtn').addEventListener('click',()=>speak(speeches.intro));
document.querySelector('#finalSpeech').addEventListener('click',()=>speak('Obrigada por conhecer minha trajetória. Estou pronta para contribuir em projetos que valorizem método, dados, colaboração e resultados consistentes.'));
document.querySelectorAll('.trait').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.trait').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');document.querySelector('#traitTitle').textContent=btn.dataset.trait;document.querySelector('#traitCopy').textContent=btn.dataset.copy}));
document.querySelectorAll('.timeline-item').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.timeline-item').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const s=stages[+btn.dataset.stage];['stageKicker','stageTitle','stageText','stageImpact','stageResult'].forEach((id,i)=>document.querySelector('#'+id).textContent=s[i])}));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');e.target.querySelectorAll('[data-count]').forEach(el=>{if(el.dataset.animated)return;el.dataset.animated='true';let n=0;const target=+el.dataset.count;const t=setInterval(()=>{n+=3;el.textContent=Math.min(n,target);if(n>=target)clearInterval(t)},30)});reveal.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
window.addEventListener('scroll',()=>{const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;document.querySelector('#progressBar').style.width=p+'%'});
