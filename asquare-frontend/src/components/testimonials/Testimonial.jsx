import React, { useEffect, useRef } from 'react';
import "./Testimonial.css";
import aliImage from "../../assets/ali.jpg";
import nourImage from "../../assets/nour.jpg";
import linaImage from "../../assets/lina.jpg";

const Testimonial = () => {
  const testimonialSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    if (testimonialSectionRef.current) {
      observer.observe(testimonialSectionRef.current);
    }

    return () => {
      if (testimonialSectionRef.current) {
        observer.unobserve(testimonialSectionRef.current);
      }
    };
  }, []);

  return (
    <section className="testimonials" ref={testimonialSectionRef}>
      <h2>Customer Testimonials</h2>
      <p className="testimonials-subheading">Discover what our clients say about Asquared Real Estate. Read their stories and experiences with us.</p>
      
      <div className="testimonials-container">
        <div className="testimonial">
          <p className="testimonial-description">"Asquared Real Estate helped me find the perfect villa in Dubai. Their team was professional, responsive, and knowledgeable. I highly recommend their services."</p>
          <div className="customer-info">
            <img src={aliImage} alt="Ali Bin Saleh" />
            <div>
              <h3>Ali Bin Saleh</h3>
              <p>Client</p>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p className="testimonial-description">"I had a fantastic experience working with Asquared Real Estate. They understood my needs and found me a beautiful apartment in a great location."</p>
          <div className="customer-info">
            <img src={nourImage} alt="Nour Mohamed" />
            <div>
              <h3>Nour Mohamed</h3>
              <p>Client</p>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p className="testimonial-description">"My agent at Asquared Real Estate was incredibly helpful throughout the entire buying process. They made everything smooth and stress-free for me."</p>
          <div className="customer-info">
            <img src={linaImage} alt="Lina Kamal-Eddin" />
            <div>
              <h3>Lina Kamal-Eddin</h3>
              <p>Client</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
