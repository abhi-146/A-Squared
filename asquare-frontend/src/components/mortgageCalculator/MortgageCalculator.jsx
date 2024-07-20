
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

import './MortgageCalculator.css';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const MortgageCalculator = () => {
    const [totalAmount, setTotalAmount] = useState(1790000); 
    const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
    const [loanTerm, setLoanTerm] = useState(30); 
    const [interestRate, setInterestRate] = useState(4.5); 
    const [propertyTaxPercentage, setPropertyTaxPercentage] = useState(0.4); 
    const [homeInsurance, setHomeInsurance] = useState(1500);
    const [pmiPercentage, setPmiPercentage] = useState(100); 
    const [monthlyHoaFees, setMonthlyHoaFees] = useState(500); 
  
  const calculateMortgage = () => {
    const downPayment = (downPaymentPercentage / 100) * totalAmount;
    const loanAmount = totalAmount - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgagePayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const propertyTax = (propertyTaxPercentage / 100) * totalAmount / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const pmi = (pmiPercentage / 100) * loanAmount / 12;

    const totalMonthlyPayment = monthlyMortgagePayment + propertyTax + monthlyHomeInsurance + pmi + monthlyHoaFees;

    return {
      totalMonthlyPayment,
      downPayment,
      loanAmount,
      monthlyMortgagePayment,
      propertyTax,
      monthlyHomeInsurance,
      pmi
    };
  };

  const {
    totalMonthlyPayment,
    downPayment,
    loanAmount,
    monthlyMortgagePayment,
    propertyTax,
    monthlyHomeInsurance,
    pmi,
  } = calculateMortgage();

  const data = {
    labels: [
      'Down Payment',
      'Loan Amount',
      'Mortgage Payment (Total)', 
      'Property Tax (Monthly)',
      'Home Insurance (Monthly)',
      'PMI (Monthly)',
      'HOA Fees (Monthly)'
    ],
    datasets: [
      {
        data: [downPayment, loanAmount, monthlyMortgagePayment * (loanTerm * 12), propertyTax * 12, monthlyHomeInsurance * 12, pmi * 12, monthlyHoaFees * 12],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6930C3', '#F7464A', '#46BFBD', '#FDB45C']
      }
    ]
  };
  return (
    <div className="mort-calculator">
      <h1 className="mort-title">Mortgage Calculator</h1>
      <div className="mort-content">
        <div className="mort-chart">
          <Pie data={data} />
          <div className="mort-result">AED {totalMonthlyPayment.toFixed(2)} Monthly</div>
        </div>
        <div className="mort-details">
          <div className="mort-detail">
            <span className="mort-label">Down Payment:</span> AED {downPayment.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">Loan Amount:</span> AED {loanAmount.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">Monthly Mortgage Payment:</span> AED {monthlyMortgagePayment.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">Property Tax:</span> AED {propertyTax.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">Home Insurance:</span> AED {monthlyHomeInsurance.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">PMI:</span> AED {pmi.toFixed(2)}
          </div>
          <div className="mort-detail">
            <span className="mort-label">Monthly HOA Fees:</span> AED {monthlyHoaFees.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="mort-inputs">
  <div className="mort-input-group">
    <label>Total Amount: $</label>
    <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Down Payment (%):</label>
    <input type="number" value={downPaymentPercentage} onChange={(e) => setDownPaymentPercentage(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Loan Term (Years):</label>
    <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Interest Rate (%):</label>
    <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Property Tax (%):</label>
    <input type="number" value={propertyTaxPercentage} onChange={(e) => setPropertyTaxPercentage(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Home Insurance: $</label>
    <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>PMI (%):</label>
    <input type="number" value={pmiPercentage} onChange={(e) => setPmiPercentage(parseFloat(e.target.value))} />
  </div>
  <div className="mort-input-group">
    <label>Monthly HOA Fees: $</label>
    <input type="number" value={monthlyHoaFees} onChange={(e) => setMonthlyHoaFees(parseFloat(e.target.value))} />
  </div>
</div>

    </div>
  );
};

export default MortgageCalculator;
