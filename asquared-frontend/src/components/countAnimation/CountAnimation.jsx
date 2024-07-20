import React, { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import './CountAnimation.css';

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);

  return <span ref={ref}></span>;
};

const CountAnimation = () => {
  const data = [
    { value: 30, label: 'Nationalities in the Sales Team' },
    { value: 100, label: 'Buyer Nationalities' },
    { value: 38, label: 'Years of Industry Experience' },
    { value: 800, label: 'Transactions Every Year' },
    { value: 20, label: 'Worth of Property Sold (in B)' },
  ];

  return (
    <section className='animation-section'>
    <div className="count-animation-container">
      {data.map((item, index) => (
        <div className="count-animation-item" key={index}>
          <span className="count-animation-number">
            <AnimatedNumbers value={item.value} />{item.value === 20 ? 'B+' : '+'}
          </span>
          <h2 className="count-animation-label">{item.label}</h2>
        </div>
      ))}
    </div>
    </section>
  );
};

export default CountAnimation;
