import React, { useEffect, useRef } from 'react';
import bodymovin from 'bodymovin';

const SvgContainer = () => {
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const svgContainer = svgContainerRef.current;
    const animItem = bodymovin.loadAnimation({
      wrapper: svgContainer,
      animType: 'svg',
      loop: false, // Animasyonu yalnızca bir kez çalışacak şekilde ayarlayın
      path: 'https://dev.anthonyfessy.com/check.json',
    });
  
    animItem.addEventListener('complete', () => {
      // Animasyon tamamlandığında son kareye atla ve döngüyü devre dışı bırak
      animItem.goToAndStop(animItem.totalFrames - 1, true);
      animItem.loop = false;
    });
  
    return () => {
      // Animasyonu temizle
      animItem.destroy();
    };
  }, []);

  return <div ref={svgContainerRef} />;
};

export default SvgContainer;