function calculateSIP() {
  const P = parseFloat(document.getElementById('monthlyInvestment').value);
  const annualRate = parseFloat(document.getElementById('expectedReturnRate').value);
  const years = parseFloat(document.getElementById('investmentYears').value);
  const curr = document.getElementById('sipCurrencySymbol').value;

  if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
    document.getElementById('totalValue').innerText = curr + ' 0';
    document.getElementById('investedAmount').innerText = curr + ' 0';
    document.getElementById('estReturns').innerText = curr + ' 0';
    return;
  }

  const i = annualRate / 12 / 100; // Monthly interest rate
  const n = Math.round(years * 12); // Exact total months rounded to avoid float errors

  // Future Value Formula for SIP: P × ({[1 + i]^n – 1} / i) × (1 + i)
  const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalInvested = P * n;
  const estimatedReturns = futureValue - totalInvested;

  const formatCurrency = (num) => {
    return curr + ' ' + Math.round(num).toLocaleString('en-IN');
  };

  document.getElementById('totalValue').innerText = formatCurrency(futureValue);
  document.getElementById('investedAmount').innerText = formatCurrency(totalInvested);
  document.getElementById('estReturns').innerText = formatCurrency(estimatedReturns);
}

// Calculate automatically on page load
window.onload = calculateSIP;
