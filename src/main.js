import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { content as c } from './content';
import { cameraStory } from './camera-story';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelector('#app').innerHTML=`
<a class="skip" href="#explore">Skip to interactive explorer</a>
<div id="universe" aria-hidden="true"></div><div class="grain"></div>
<header><a class="wordmark" href="#top">O<span class="mark-ring">R</span>BIT</a><span class="header-caption">A STUDY BY ${c.author.toUpperCase()}</span><nav><a href="#story">The perspective</a><a href="#explore">Explore the world <span>↗</span></a></nav></header>
<main><section class="hero" id="top"><div class="hero-top"><span><i></i> ${c.subtitle.toUpperCase()}</span><span>EXPERIMENT 001 / 2026</span></div><div class="hero-copy"><p class="kicker">BEYOND THE FAMILIAR</p><h1>${c.headline[0]}<br><span>${c.headline[1]}</span></h1><div class="hero-foot"><p>${c.intro}</p><a class="round-link" href="#story" aria-label="Begin the journey"><span>↓</span></a></div></div><div class="hero-bottom"><span>SCROLL TO BEGIN THE JOURNEY</span><span>IMAGINED IN CODE. RENDERED LIVE.</span></div></section>
<div class="story" id="story">${c.chapters.map((s,i)=>`<section class="chapter chapter-${i}"><div class="chapter-copy"><p class="kicker">${s.number} / ${s.label}</p><h2>${s.title.replace('\n','<br>')}</h2><p>${s.text}</p><span class="coordinate">${i?'TRANSLATION / ROTATION / CONNECTION':'LIGHT / MATTER / PERSPECTIVE'}</span></div></section>`).join('')}</div>
<section class="explorer" id="explore"><div class="explore-head"><div><p class="kicker">03 / YOUR PERSPECTIVE</p><h2>Take the controls.</h2></div><p>Change the viewpoint.<br>Let curiosity do the rest.</p></div><div class="explorer-window"><div class="cross cross-one">+</div><div class="cross cross-two">+</div><span class="view-label">LIVE VIEW / <b id="view-label">OVERVIEW</b></span><span class="view-note">A PROCEDURAL WORLD · NOT A SCIENTIFIC MODEL</span></div><div class="controls"><div class="view-buttons" role="group" aria-label="Camera viewpoint"><button class="active" data-view="0" aria-pressed="true">01 Overview</button><button data-view="1" aria-pressed="false">02 Close orbit</button><button data-view="2" aria-pressed="false">03 Night side</button></div><button class="pause" aria-pressed="false">Ⅱ Pause rotation</button></div><div class="speed"><label for="speed">ORBIT SPEED</label><input id="speed" type="range" min="0" max="3" step="0.1" value="1"><output for="speed">1.0×</output></div></section>
<section class="closing"><p class="kicker">AN EXPERIMENT BY ${c.author.toUpperCase()}</p><h2>What lies<br><em>beyond?</em></h2><a href="${c.portfolio}" class="text-link">Explore my other work <span>↗</span></a><p class="disclaimer">A personal creative development study.<br>Built with Three.js and a little curiosity.</p></section></main>
<footer><a class="wordmark" href="#top">ORBIT</a><span>© 2026 ${c.author} / CONCEPT & DEVELOPMENT</span><div><a href="${c.source}" target="_blank" rel="noreferrer">Source ↗</a><a href="/credits.html">Credits</a><a href="#top">Back to top ↑</a></div></footer><div class="progress" aria-hidden="true"></div>`;
let scene,renderer,camera,world;
const cameraState={x:0,y:1.0,z:7.4},targetState={x:-.65,y:0,z:0};
let pause=reduced,speed=1,activeView=0;
try {
 scene=new THREE.Scene();
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
 renderer.setSize(innerWidth,innerHeight);document.querySelector('#universe').appendChild(renderer.domElement);
 camera=new THREE.PerspectiveCamera(40,innerWidth/innerHeight,.1,150);
 world=new THREE.Group();scene.add(world);world.rotation.z=-.23;
 const material=new THREE.ShaderMaterial({uniforms:{uTime:{value:0}},vertexShader:`varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`
 precision highp float;varying vec3 vN;varying vec3 vP;uniform float uTime;
 float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
 float noise(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
 float fbm(vec3 p){float f=0.;float a=.5;for(int i=0;i<6;i++){f+=a*noise(p);p=p*2.03+3.1;a*=.51;}return f;}
 void main(){float n=fbm(vP*4.5);float band=sin(vP.y*21.+n*9.)*.5+.5;vec3 base=mix(vec3(.10,.062,.041),vec3(.73,.45,.23),n);base=mix(base,vec3(.86,.66,.40),band*.19);float light=max(dot(normalize(vN+vec3(n*.06)),normalize(vec3(-1.4,.8,1.2))),0.);float rim=pow(1.-max(dot(normalize(vN),vec3(0,0,1)),0.),3.);gl_FragColor=vec4(base*(.045+1.8*light)+vec3(.55,.31,.13)*rim*.38,1.);}`});
 const planet=new THREE.Mesh(new THREE.SphereGeometry(1.55,96,64),material);world.add(planet);
 const rings=new THREE.Group();rings.rotation.x=1.14;world.add(rings);
 for(let j=0;j<65;j++){const r=2.05+j*.014;const geo=new THREE.RingGeometry(r,r+.007,192);const mat=new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(.095,.24,.30+Math.sin(j*3.5)*.12),transparent:true,opacity:.27+Math.random()*.25,side:THREE.DoubleSide,depthWrite:false});rings.add(new THREE.Mesh(geo,mat));}
 const dustPositions=new Float32Array(8000*3), dustColors=new Float32Array(8000*3);
 for(let i=0;i<8000;i++){const a=Math.random()*Math.PI*2,r=2.0+Math.random()*1.15;dustPositions.set([Math.cos(a)*r,Math.sin(a)*r,(Math.random()-.5)*.025],i*3);const k=.3+Math.random()*.35;dustColors.set([k*1.2,k,k*.68],i*3);}
 const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));dg.setAttribute('color',new THREE.BufferAttribute(dustColors,3));rings.add(new THREE.Points(dg,new THREE.PointsMaterial({size:.008,vertexColors:true,transparent:true,opacity:.9})));
 const stars=new Float32Array(1500*3);for(let i=0;i<stars.length;i++)stars[i]=(Math.random()-.5)*90;
 const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(stars,3));scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:'#cec4b7',size:.025,transparent:true,opacity:.65})));
 if(!reduced)cameraStory(cameraState,targetState);
 let mouse={x:0,y:0};window.addEventListener('pointermove',e=>{mouse.x=e.clientX/innerWidth-.5;mouse.y=e.clientY/innerHeight-.5},{passive:true});
 function size(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}addEventListener('resize',size);
 let last=0;function render(t){const dt=Math.min((t-last)/1000,.05);last=t;
  if(!pause&&!document.hidden)world.rotation.y+=dt*.035*speed;
  const mobile=innerWidth<700;
  camera.position.set(cameraState.x+(reduced?0:mouse.x*.12),cameraState.y+(reduced?0:mouse.y*.08),cameraState.z+(mobile?3.5:0));
  camera.lookAt(targetState.x,targetState.y,targetState.z);renderer.render(scene,camera);requestAnimationFrame(render);
 }requestAnimationFrame(render);
}catch(e){document.querySelector('#universe').classList.add('fallback');console.warn('Using static space fallback',e);}
const views=[{x:0,y:3,z:7},{x:2.3,y:.2,z:4.5},{x:-5,y:.1,z:2.8}];
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{activeView=Number(b.dataset.view);gsap.to(cameraState,{...views[activeView],duration:reduced?0:1.5});gsap.to(targetState,{x:0,y:0,z:0,duration:1});document.querySelectorAll('[data-view]').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',el===b)});document.querySelector('#view-label').textContent=['OVERVIEW','CLOSE ORBIT','NIGHT SIDE'][activeView]}));
function setPause(){document.querySelector('.pause').textContent=pause?'▷ Resume rotation':'Ⅱ Pause rotation';document.querySelector('.pause').setAttribute('aria-pressed',pause)}setPause();document.querySelector('.pause').onclick=()=>{pause=!pause;setPause()};
document.querySelector('#speed').oninput=e=>{speed=Number(e.target.value);document.querySelector('output').textContent=speed.toFixed(1)+'×'};
addEventListener('scroll',()=>{document.querySelector('.progress').style.transform=`scaleX(${scrollY/(document.documentElement.scrollHeight-innerHeight)})`},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.15});document.querySelectorAll('.chapter-copy,.closing,.explore-head').forEach(e=>io.observe(e));
