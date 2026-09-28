/** Cheap check the client can use to decide whether to show address autocomplete or the manual LGA fallback — no upstream call, no cost. */
export async function GET() {
  return Response.json({ configured: Boolean(process.env.GOOGLE_MAPS_SERVER_API_KEY) });
}
