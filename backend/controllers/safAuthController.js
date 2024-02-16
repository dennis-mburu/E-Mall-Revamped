import fetch from "node-fetch";
import asyncHandler from "../middleware/asyncHandler.js";

const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

const headers = {
  Authorization:
    "Basic R0p4RnJLOXhZT1RIb0lkemRWSENIbHB5WXZjQnd4cVo4VU40em9zQmJJWXplU0xVOnJ2ckJZOHRDdHdMeHhKR0cwclRqeFJnbkxZcnFoQTN5MkxaeDF5SUN3dERWS0gxWnpQVnFlejJBdzNYQnN5UzY=",
};

const safAuthenticate = asyncHandler(async (req, res) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

export { safAuthenticate };
