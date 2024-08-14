import React, { useEffect, useState } from "react";
import { loadStripeOnramp } from "@stripe/crypto";
import axios from "axios";

const stripeOnrampPromise = loadStripeOnramp(
  "pk_test_f3duw0VsAEM2TJFMtWQ90QAT"
);

const Onramp: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/create-onramp-session`,
          {
            walletAddress: "0xB00F0759DbeeF5E543Cc3E3B07A6442F5f3928a2",
          }
        );

        setClientSecret(response.data.client_secret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    }

    fetchClientSecret();
  }, []);

  useEffect(() => {
    async function initializeOnramp() {
      if (clientSecret) {
        const stripeOnramp = await stripeOnrampPromise;
        const onrampSession = stripeOnramp.createSession({ clientSecret });
        onrampSession.mount("#onramp-element");
      }
    }

    initializeOnramp();
  }, [clientSecret]);

  return <div id="onramp-element"></div>;
};

export default Onramp;
