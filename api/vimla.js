export default async function handler(req, res) {
  try {
    const html = await fetch("https://vimla.se/bestall/student/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    }).then((r) => r.text());

    const match = html.match(/window\.__INITIAL_STATE__\s*=\s*(\{.*?\});/s);

    if (!match) {
      return res.status(500).json({
        error: "Ingen abonnemangsdata hittades i Vimlas HTML.",
      });
    }

    const state = JSON.parse(match[1]);

    const items = state?.subscriptions?.student || [];

    const result = items.map((item) => ({
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
