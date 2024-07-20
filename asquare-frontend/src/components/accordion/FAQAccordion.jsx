import React from 'react'
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { IoIosArrowDown } from "react-icons/io";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('Custom toggle clicked!')
    );
  
    return (
      <Card.Header type="button" onClick={decoratedOnClick}>
        {children}
      </Card.Header>
    );
  };

const FAQAccordion = ({ faqs }) => {
  return (
    <>
      <h1>Frequently Asked Questions</h1>
      <div className="mt-4">
        {faqs.map((faq, index) => (
          <Accordion key={index} className="mb-2">
            <Card>
              <CustomToggle eventKey={index.toString()}>
                <div className="d-flex justify-content-between">
                  <span>{faq.question}</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </CustomToggle>
              <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body>
                  {faq.answer}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </div>
    </>
  )
}

export default FAQAccordion
