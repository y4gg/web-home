export async function sendVerificationRequest({
  identifier: email1,
  url,
}: {
  identifier: string;
  url: string;
}) {
  await fetch("/api/send-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email1,
      url,
    }),
  });
}
