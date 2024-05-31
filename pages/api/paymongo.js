import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const items = req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/wukgfk58/production/"
          )
          .replace("-webp", ".webp");

        return {
          name: item.name,
          // images: [newImage],
          amount: item.price * 100, // Amount in cents
          quantity: item.quantity,
          currency: "PHP",
        };
      });

      const totalAmount = items.reduce((sum, item) => sum + item.amount * item.quantity, 0);

      const description = items
        .map(item => `${item.quantity} x ${item.name} @ PHP ${item.amount / 100}`)
        .join(" | ");

      const referenceNumber = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const checkoutSessionResponse = await axios.post(
        "https://api.paymongo.com/v1/links",
        {
          data: {
            attributes: {
              amount: totalAmount,
              description: description,
              remarks: `Reference Number: ${referenceNumber}`,
            },
          },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY
            ).toString("base64")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const paymentIntent = checkoutSessionResponse.data.data;

      // Return the checkout session data
      res.status(200).json({ paymentIntent });
    } catch (err) {
      console.error("Error creating checkout session:", err.response?.data || err.message);
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
