import { useMotionValue, useTransform } from 'framer-motion';

export const useHover3D = (ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation degrees (capped at +/- 15 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the element (-0.5 to 0.5)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};
