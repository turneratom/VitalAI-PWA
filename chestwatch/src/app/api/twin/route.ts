import { stubTwinReply, wait } from "@/lib/companion";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const question = String(form.get("question") ?? "");
  const hasImage =
    form.get("hasImage") === "1" ||
    typeof form.get("image") === "string" ||
    form.get("image") instanceof Blob;

  // MODEL HOOK NEXT
  // Replace stubTwinReply with the real vision + voice companion.
  // Incoming: `question` text and optional `image` (data URL or file).
  await wait(720 + Math.round(Math.random() * 480));
  return Response.json(stubTwinReply(question, hasImage));
}
