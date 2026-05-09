import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    id: 1,
    question: "How long does the delivery take?",
    answer: "Speed is our priority. All orders are processed and delivered within <span class='pulse-text'>20 minutes</span> or less once the payment is confirmed. ⚡"
  },
  {
    id: 2,
    question: "Which payment methods are accepted?",
    answer: "We support the most convenient local and global methods: D17, Sobflous, and Crypto (USDT/BTC)."
  },
  {
    id: 3,
    question: "Is my purchase secure?",
    answer: "Absolutely. Every transaction is 100% official and secured. Our dedicated support team is available 24/7 on Discord to assist you."
  },
  {
    id: 4,
    question: "How do I receive my order?",
    answer: "Digital codes and top-ups are sent instantly to your registered email or via WhatsApp, depending on your choice during checkout."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>FAQ & Trust Center</h2>
          <div className={styles.subtitle}>Your questions answered. Secure, fast, and reliable.</div>
        </motion.div>

        <div className={styles.accordionContainer}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div 
                key={faq.id} 
                className={`${styles.accordionItem} ${isOpen ? styles.active : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className={styles.questionHeader}>
                  <h3 className={styles.question}>{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.iconWrapper}
                  >
                    <Plus size={24} className={isOpen ? styles.iconActive : styles.icon} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={styles.answerWrapper}
                    >
                      <div 
                        className={styles.answer}
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
