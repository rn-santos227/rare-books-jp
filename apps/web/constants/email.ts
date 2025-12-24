type OrderTrackingEmailParams = {
  buyerName: string;
  trackingCode: string;
};

export function buildOrderTrackingEmail({ buyerName, trackingCode }: OrderTrackingEmailParams) {
  const greeting = buyerName ? `Hi ${buyerName},` : "Hello,";

  return {
    subject: "Your Rare Books JP order tracking code",
    text: [
      greeting,
      "",
      "Thanks for your order inquiry with Rare Books JP.",
      `Your tracking code is: ${trackingCode}`,
      "",
      "You can use this code on the order tracker page to check updates.",
      "",
      "If you have any questions, reply to this email.",
    ].join("\n"),
  };
}
