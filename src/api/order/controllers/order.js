"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const result = await super.create(ctx);

    const { default: axios } = require("axios");
    const { xenditHeaders } = require("../helpers/header.js");

    const payload = {
      external_id: result.data?.id.toString(),
      payer_email: "adi.wawan90@gmail.com",
      description: "payment for product",
      amount: result.data?.attributes?.totalPrice,
    };

    // const response = await axios({
    //   method: "POST",
    //   url: "https://api.xendit.co/v2/invoices",
    //   header: xenditHeaders,
    //   data: JSON.stringify(payload),
    // });

    // console.log("response------", response.data);

    // return JSON.stringify(response.data);

    try {
      const response = await axios.post(
        "https://api.xendit.co/v2/invoices",
        payload,
        {
          headers: xenditHeaders,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Xendit API error:", error.response.data);
      throw new Error("Failed to create Xendit invoice");
    }
  },
}));
