"use client";

import { useState } from "react";
import { AddressAutocomplete } from "@/components/pricing/AddressAutocomplete";
import { SelectField, TextField } from "@/components/forms/Field";
import { lagosLgas } from "@/lib/forms";
import { resolveZoneFromLga } from "@/lib/pricing-engine/zones";
import type { ResolvedAddress, ZoneResolution } from "@/lib/pricing-engine/types";
import type { WizardValues } from "../wizard-types";

type Props = { values: WizardValues; update: (patch: Partial<WizardValues>) => void; streetError?: string };

export function LocationStep({ values, update, streetError }: Props) {
  const [placesConfigured, setPlacesConfigured] = useState(true);

  const handleResolved = (address: ResolvedAddress, zr: ZoneResolution) => {
    update({
      addressLabel: address.formattedAddress,
      zoneId: zr.available ? zr.zone.id : undefined,
      addressUnavailable: !zr.available,
    });
  };

  const handleLgaChange = (nextLga: string) => {
    const zr = nextLga ? resolveZoneFromLga(nextLga) : null;
    update({
      addressLabel: nextLga ? `${nextLga}, Lagos` : "",
      zoneId: zr?.available ? zr.zone.id : undefined,
      addressUnavailable: zr ? !zr.available : undefined,
    });
  };

  return (
    <div className="space-y-6">
      <TextField
        id="wizard-street"
        label="House or flat number and street"
        required
        placeholder="e.g. 6 Salem Akin Street"
        hint="So we can find your exact address."
        value={values.street}
        error={streetError}
        onChange={(e) => update({ street: e.target.value })}
      />

      <div>
        <p className="mb-3 text-sm font-medium">Confirm your area</p>
        {placesConfigured ? (
          <AddressAutocomplete
            label="Area, estate or neighbourhood"
            initialLabel={values.addressLabel}
            onResolved={handleResolved}
            onNotConfigured={() => setPlacesConfigured(false)}
          />
        ) : (
          <SelectField
            id="wizard-lga"
            label="Local government area"
            options={lagosLgas}
            hint="Lagos State"
            onChange={(e) => handleLgaChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
