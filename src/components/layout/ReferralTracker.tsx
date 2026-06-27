import { useCallback } from "react";
import { useReferralUrl } from "@fullstackcraftllc/growthkit";
import type { ReferralEvent } from "@fullstackcraftllc/growthkit";

const PRODUCT_NAME = "codevideo.io";
const supabaseUrl = process.env.GATSBY_FSCF_SUPABASE_URL;
const supabaseAnonKey = process.env.GATSBY_FSCF_SUPABASE_ANON_KEY;
const isEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export default function ReferralTracker() {
  const onEvent = useCallback(async (event: ReferralEvent) => {
    if (!isEnabled || !supabaseUrl || !supabaseAnonKey) return;

    const response = await fetch(`${supabaseUrl}/rest/v1/growthkit_referral_events`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`Failed to insert GrowthKit referral event (${response.status}): ${responseBody}`);
    }
  }, []);

  useReferralUrl({
    productName: PRODUCT_NAME,
    enabled: isEnabled,
    onEvent,
  });

  return null;
}
