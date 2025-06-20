const baseUrl = process.env.NEXTAUTH_URL || "https://wh.y4.gg";
const secret = process.env.AUTH_SECRET;

export async function sendVerificationRequest({
  identifier: email,
  url,
}: {
  identifier: string;
  url: string;
}) {
  await fetch(`${baseUrl}/api/send-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email,
      url,
      secret,
    }),
  });
}
