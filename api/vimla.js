export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.vimla.se/api/v1/subscriptions/student", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Kunde inte hämta data från Vimla API." });
    }

    const data = await response.json();

    const result = data.map((item) => ({
      data_amount: item.dataAmount + " GB",
      price: item.price + " kr/mån",
      promo_price: "20 kr/mån",
      promo_duration: "3 mån",
    }));

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
