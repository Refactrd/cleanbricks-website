import type { NextRequest } from "next/server";
import type { PlaceSuggestion } from "@/lib/pricing-engine/types";

/** Lagos, as a loose location bias for Places Autocomplete — not a hard filter. */
const LAGOS_BIAS = { circle: { center: { latitude: 6.5244, longitude: 3.3792 }, radius: 60_000 } };

/**
 * Proxies Google Places Autocomplete (New) so the API key never reaches the
 * browser. Returns `{ configured: false }` (not an error) when no key is
 * set, so the client can fall back to the manual LGA picker.
 */
export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("input")?.trim().slice(0, 200) ?? "";
  const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!key) return Response.json({ configured: false, suggestions: [] });
  if (input.length < 3) return Response.json({ configured: true, suggestions: [] });

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: { "content-type": "application/json", "X-Goog-Api-Key": key },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["ng"],
        locationBias: LAGOS_BIAS,
        languageCode: "en",
      }),
    });
    if (!res.ok) throw new Error(`Places autocomplete responded ${res.status}`);
    const data = await res.json();

    type RawSuggestion = {
      placePrediction?: {
        placeId?: string;
        structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
        text?: { text?: string };
      };
    };
    const suggestions: PlaceSuggestion[] = ((data.suggestions ?? []) as RawSuggestion[])
      .map((s): PlaceSuggestion | null => {
        const p = s.placePrediction;
        if (!p?.placeId) return null;
        return {
          placeId: p.placeId,
          mainText: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
          secondaryText: p.structuredFormat?.secondaryText?.text ?? "",
        };
      })
      .filter((s): s is PlaceSuggestion => s !== null);

    return Response.json({ configured: true, suggestions });
  } catch (err) {
    console.error("Places autocomplete failed", err);
    return Response.json({ configured: true, suggestions: [], error: "upstream_error" }, { status: 502 });
  }
}
