import React from "react";
import { ContentPage } from "./LegalPage";

export const TermsOfServicePage = () => {
  const sections = [
    {
      title: "General Terms of Use",
      lastModified: "Last modified: March 13, 2024",
      paragraphs: [
        "All transactions on Glimpse are final. Users agree to our Privacy Policy, which can be found at /privacy. Please read it carefully to understand how we handle your data.",
        "By participating in our prediction markets, users acknowledge that all predictions carry a risk of total financial loss. Potential payouts are not guaranteed and should be considered speculative.",
      ],
    },
    {
      title: "Regional Restrictions",
      paragraphs: [
        "Users agree that they are not residents or citizens of the United States, Singapore, or any other jurisdiction where prediction markets are illegal. It is the user's responsibility to ensure they are in compliance with their local laws.",
        "Users who reside in or are citizens of these restricted regions acknowledge that they are assuming any and all potential liability, including the possibility of having their accounts locked from trading and further participation in Glimpse's services.",
      ],
    },
    {
      title: "Age Verification and Liability",
      paragraphs: [
        "By using Glimpse, users confirm that they are at least 18 years old. Furthermore, users acknowledge that all funds used on the platform are their own and that they are fully responsible for any losses incurred.",
        "Glimpse does not take any liability for funds lost during transactions or through participation in the platform's prediction markets.",
      ],
    },
    {
      title: "Rules and Conduct",
      paragraphs: [
        "Users agree to conduct themselves in a polite and respectful manner when interacting with other users in comments and other public interactions on the platform.",
        "Any form of serious misconduct, including but not limited to harassment, abuse, or spamming, can lead to temporary or permanent bans from the platform at Glimpse's discretion.",
      ],
    },
    {
      title: "Copyright and Intellectual Property",
      paragraphs: [
        "All logos, markets, and brand material associated with Glimpse are proprietary and protected by copyright. These materials can only be used with explicit permission from Glimpse.",
        "Having a partnership agreement or receiving vocal permission does not automatically qualify a third party for the use of Glimpse's logos, markets, or brand materials. Formal written consent must be obtained for such use.",
      ],
    },
  ];

  return (
    <ContentPage
      title="Glimpse Terms of Use"
      subtitle="Legal Information & Notices"
      sections={sections}
    />
  );
};
