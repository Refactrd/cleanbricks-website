import type { NextRequest } from "next/server";
import { resolveZoneFromAddress, type AddressComponent } from "@/lib/pricing-engine/zones";
import type { ResolvedAddress, ZoneResolution } from "@/lib/pricing-engine/types";

function componentByType(components: AddressComponent[], type: string): string | undefined {
  return components.find((c) => c.types?.includes(type))?.longText;
}

/**
 * Resolves a Google place id to a full address and, from that, the
 * CleanBricks pricing zone. This is the only place zone resolution happens
 * server-side for a real address — the client never determines its own zone.
 */
export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId")?.trim().slice(0, 200) ?? "";
  const key = process.env.GOOGLE_MAPS_SERVER_API_KEY;

  if (!key) return Response.json({ configured: false }, { status: 200 });
  if (!placeId) return Response.json({ error: "missing_place_id" }, { status: 400 });

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "id,formattedAddress,location,addressComponents",
      },
    });
    if (!res.ok) throw new Error(`Place details responded ${res.status}`);
    const data = await res.json();

    const components: AddressComponent[] = data.addressComponents ?? [];
    const formattedAddress: string = data.formattedAddress ?? "";

    const address: ResolvedAddress = {
      formattedAddress,
      placeId,
      lat: data.location?.latitude,
      lng: data.location?.longitude,
      state: componentByType(components, "administrative_area_level_1"),
      city: componentByType(components, "locality") ?? componentByType(components, "administrative_area_level_2"),
      locality: componentByType(components, "sublocality") ?? componentByType(components, "neighborhood") ?? componentByType(components, "locality"),
      street: componentByType(components, "route"),
      postalCode: componentByType(components, "postal_code"),
    };

    const zoneResolution: ZoneResolution = resolveZoneFromAddress(components, formattedAddress);

    return Response.json({ configured: true, address, zoneResolution });
  } catch (err) {
    console.error("Place details failed", err);
    return Response.json({ error: "upstream_error" }, { status: 502 });
  }
}
