import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PaymentHub.module.css';

const PaymentHub = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { type: "spring", duration: 1.5, bounce: 0 }, opacity: { duration: 0.1 } } 
    }
  };

  const nodes = [
    { id: 'd17', name: 'D17', color: '#0070f3', 
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    },
    { id: 'sobflous', name: 'Sobflous', color: '#ff007f', 
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
      )
    },
    { id: 'crypto', name: 'Crypto', color: '#00ff66', 
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}>
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
          <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">SEAMLESS LOCAL TRANSACTIONS</h2>
        
        <div className={styles.hubGrid}>
          {nodes.map((node) => (
            <div 
              key={node.id}
              className={styles.monolith}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ '--glow-color': node.color }}
            >
              <div className={styles.monolithInner}>
                <div className={styles.iconContainer}>
                  {hoveredNode === node.id ? (
                    <motion.svg 
                      viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.iconSvg}
                    >
                      {React.Children.map(node.svg.props.children, child => (
                        <motion.path 
                          variants={draw} 
                          initial="hidden" 
                          animate="visible" 
                          d={child.props.d}
                          x={child.props.x} y={child.props.y} width={child.props.width} height={child.props.height} rx={child.props.rx} ry={child.props.ry}
                          x1={child.props.x1} y1={child.props.y1} x2={child.props.x2} y2={child.props.y2}
                        />
                      ))}
                    </motion.svg>
                  ) : (
                    React.cloneElement(node.svg, { stroke: 'rgba(255, 255, 255, 0.1)' })
                  )}
                </div>
                <h3 className={styles.nodeName}>{node.name}</h3>
              </div>
              <div className={styles.bottomGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentHub;
