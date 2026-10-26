/**
 * MJCK - Auto Finance Calculator (PHP Currency)
 */

export function calculateMonthlyPayment(principal, annualRatePercent, months) {
  if (principal <= 0 || months <= 0) return 0;
  
  const monthlyRate = (annualRatePercent / 100) / 12;
  
  if (monthlyRate === 0) {
    return Math.round(principal / months);
  }
  
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
                  
  return Math.round(payment);
}

export function formatPHP(amount) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function initFinanceCalculator({
  priceInputId = 'calc-price',
  depositInputId = 'calc-deposit',
  termInputId = 'calc-term',
  rateInputId = 'calc-rate',
  priceDisplayId = 'calc-price-val',
  depositDisplayId = 'calc-deposit-val',
  termDisplayId = 'calc-term-val',
  resultDisplayId = 'calc-result',
  totalDisplayId = 'calc-total'
} = {}) {
  const priceInput = document.getElementById(priceInputId);
  const depositInput = document.getElementById(depositInputId);
  const termInput = document.getElementById(termInputId);
  const rateInput = document.getElementById(rateInputId);

  const priceDisplay = document.getElementById(priceDisplayId);
  const depositDisplay = document.getElementById(depositDisplayId);
  const termDisplay = document.getElementById(termDisplayId);
  const resultDisplay = document.getElementById(resultDisplayId);
  const totalDisplay = document.getElementById(totalDisplayId);

  if (!priceInput || !resultDisplay) return;

  function update() {
    const price = parseFloat(priceInput.value) || 1250000;
    const depositPercent = depositInput ? parseFloat(depositInput.value) : 20;
    const termMonths = termInput ? parseInt(termInput.value, 10) : 48;
    const interestRate = rateInput ? parseFloat(rateInput.value) : 5.5;

    const depositAmount = Math.round(price * (depositPercent / 100));
    const loanPrincipal = Math.max(0, price - depositAmount);

    const monthlyPayment = calculateMonthlyPayment(loanPrincipal, interestRate, termMonths);
    const totalCost = (monthlyPayment * termMonths) + depositAmount;

    if (priceDisplay) priceDisplay.textContent = formatPHP(price);
    if (depositDisplay) depositDisplay.textContent = `${depositPercent}% (${formatPHP(depositAmount)})`;
    if (termDisplay) termDisplay.textContent = `${termMonths} months`;

    resultDisplay.textContent = formatPHP(monthlyPayment);
    if (totalDisplay) totalDisplay.textContent = formatPHP(totalCost);
  }

  [priceInput, depositInput, termInput, rateInput].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', update);
      elem.addEventListener('change', update);
    }
  });

  update();
}
