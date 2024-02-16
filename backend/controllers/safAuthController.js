import fetch from "node-fetch";
import asyncHandler from "../middleware/asyncHandler.js";

const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";


const safAuthenticate = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${process.env.DARAJA_BASIC_AUTH_KEY}`,
      },
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

export { safAuthenticate };
