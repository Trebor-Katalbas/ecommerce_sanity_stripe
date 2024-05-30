import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const items = req.body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/vfxfwnaw/production/"
          )
          .replace("-webp", ".webp");

        return {
          name: item.name,
          images: [newImage],
          price: item.price,
          quantity: item.quantity,
        };
      });

      const referenceNumber = Math.floor(100000 + Math.random() * 900000);

      const lineItems = items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        currency: "PHP",
        amount: item.price * 100, // PayMongo expects amount in cents
      }));
      
      // Create Checkout Session
      const checkoutSessionResponse = await axios.post(
        "https://api.paymongo.com/v1/checkout_sessions",
        {
          data: {
            attributes: {
              billing: {
                address: {
                  line1: 'string',
                  line2: 'string',
                  city: 'string',
                  state: 'string',
                  postal_code: 'string'
                },
                name: 'string',
                email: 'string@sadfsdf.nj',
                phone: 'string'
              },
              description: 'asdasd',
              line_items: lineItems,
              reference_number: referenceNumber,
              payment_method_types: [
                "gcash",
                "paymaya",
                "card",
                "dob_ubp",
                "brankas_bdo",
                "brankas_landbank",
                "brankas_metrobank",
                "card",
                "billease",
              ],
              send_email_receipt: true,
              show_description: true,
              show_line_items: true,
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

      // Return success URL as a link
      res.status(200).json({ paymentIntent });
    } catch (err) {
      res.status(err.response?.status || 500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
