// Camera/target timeline adapted from JosephASG's Cinematic 3D Scroll demo (MIT).
// Original: https://github.com/JosephASG/codrops-cinematic-scroll-animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function cameraStory(cameraState, targetState) {
 const tl=gsap.timeline({scrollTrigger:{trigger:'.story', start:'top bottom',end:'bottom top',scrub:1}});
 const perspectives=[
   {camera:{x:3.8,y:1.3,z:6},target:{x:-.8,y:0,z:0}},
   {camera:{x:-4,y:.6,z:5},target:{x:1,y:0,z:0}},
   {camera:{x:0,y:3,z:7},target:{x:0,y:0,z:0}}
 ];
 perspectives.forEach((p,i)=>{tl.to(cameraState,{...p.camera,duration:1,ease:'none'},i);tl.to(targetState,{...p.target,duration:1,ease:'none'},i)});
 return tl;
}
