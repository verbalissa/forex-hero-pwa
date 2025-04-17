document.getElementById('app').innerHTML = `
  <h1>匯率英雄</h1>
  <p>輸入金額，自動換算：</p>
  <input type="number" id="amount" placeholder="輸入金額 TWD" />
  <div id="results"></div>
`;

const rates = {
  USD: 0.032,
  JPY: 4.5,
  CNY: 0.23
};

document.getElementById('amount').addEventListener('input', (e) => {
  const val = parseFloat(e.target.value);
  if (!isNaN(val)) {
    document.getElementById('results').innerHTML = `
      <p>USD: ${(val * rates.USD).toFixed(2)}</p>
      <p>JPY: ${(val * rates.JPY).toFixed(2)}</p>
      <p>CNY: ${(val * rates.CNY).toFixed(2)}</p>
    `;
  } else {
    document.getElementById('results').innerHTML = "";
  }
});
