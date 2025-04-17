let rates = {
  usdTwd: 32,
  usdJpy: 150,
  usdCny: 7
};

const getRate = (from, to) => {
  if (from === to) return 1;
  if (from === "TWD" && to === "CNY") return rates.usdCny / rates.usdTwd;
  if (from === "CNY" && to === "TWD") return rates.usdTwd / rates.usdCny;
  if (from === "USD") return 1 / rates["usd" + to];
  if (to === "USD") return rates["usd" + from];
  return getRate(from, "USD") * getRate("USD", to);
};

document.getElementById("update").onclick = async () => {
  try {
    const res = await fetch("https://tw.rter.info/capi.php");
    const json = await res.json();
    rates.usdTwd = json["USDTWD"].Exrate;
    rates.usdJpy = json["USDJPY"].Exrate;
    rates.usdCny = json["USDCNY"].Exrate;
    alert("已更新匯率");
  } catch (e) {
    alert("更新失敗");
  }
};

document.getElementById("amount").oninput = convert;
document.getElementById("from").onchange = convert;
document.getElementById("to").onchange = convert;

function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  if (!isNaN(amount)) {
    const rate = getRate(from, to);
    document.getElementById("result").innerText = `結果：${(amount * rate).toFixed(4)} ${to}`;
  } else {
    document.getElementById("result").innerText = "";
  }
}