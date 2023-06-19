import React, { useEffect, useRef } from 'react';
import { TimelineMax, TweenMax, Power4, Power2, Linear,gsap } from 'gsap';

const MailSendingAnimation = () => {
    const animationRef = useRef(null);

    useEffect(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  
      gsap.to("#wind", { duration: 0.5, strokeDashoffset: -60, repeat: -1, ease: "none" });
  
      tl.set("#lid", { transformOrigin: "center top" })
        .fromTo("#envelope, #negative-mask", { opacity: 0 }, { opacity: 1 }, 0)
        .fromTo("#envelope, #negative-mask", { y: 200 }, { y: 0, ease: Power2.easeOut }, 0)
        .fromTo("#lid", { scaleY: -1 }, { scaleY: 1 }, "-=0.4")
        .to("#wind, #envelope", { duration: 0.6, x: 40, ease: Power2.easeInOut }, "-=0.2")
        .fromTo("#wind", { opacity: 0 }, { opacity: 1 }, "-=0.4")
        .to("#wind, #envelope", { duration: 0.3, x: 60, opacity: 0, ease: Power2.easeIn }, "+=2");
  
      animationRef.current = tl;
  
      return () => {
        animationRef.current.kill();
      };
    }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="400px" height="500px" viewBox="0 0 400 500"  style={{ fill: 'white', stroke: 'green', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
<g id="wind">
	<line x1="119" y1="215.37" x2="49" y2="215.37" strokeDasharray="17,15,15,13"/>
	<line x1="119" y1="231.34" x2="18" y2="231.34" strokeDasharray="19,15,15,11"/>
	<line x1="119" y1="247.3" x2="26" y2="247.3" strokeDasharray="13,19,15,13"/>
	<line x1="119" y1="263.26" x2="2" y2="263.26" strokeDasharray="20,14,10,16"/>
	<line x1="119" y1="279.23" x2="65" y2="279.23" strokeDasharray="13,15,11,21"/>
</g>
<g id="envelope">
	<path d="M262.09,288.8H144.12c-4.43,0-8.02-3.59-8.02-8.02v-66.97c0-4.43,3.59-8.02,8.02-8.02h58.98h58.98
		c4.43,0,8.02,3.59,8.02,8.02v66.97C270.11,285.21,266.52,288.8,262.09,288.8z"/>
	<path d="M136.02,275.14l36.27-24.58c3.61-2.45,7.88-3.76,12.24-3.76h37.16c4.37,0,8.63,1.31,12.24,3.76l36.27,24.58"/>
	<path d="M247.55,237.27"/>
	<line x1="270.2" y1="225.65" x2="233.93" y2="250.6"/>
	<line x1="172.28" y1="250.6" x2="136.02" y2="225.65"/>
	<path id="lid" vectorEffect="non-scaling-stroke" d="M270.2,213.39v7.01c0,3.36-1.76,6.56-4.82,8.71l-53.87,38.12c-4.86,3.44-11.95,3.44-16.82,0
		l-53.87-38.12c-3.05-2.16-4.82-5.35-4.82-8.71v-7.01"/>
</g>

    </svg>
  );
};

export default MailSendingAnimation;