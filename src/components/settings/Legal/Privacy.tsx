import React from "react";
import { ContentPage } from "./LegalPage";

export const PrivacyPolicy = () => {
  const sections = [
    {
      title: "General Privacy Policy",
      lastModified: "Last modified: March 13, 2024",
      paragraphs: [
        'We care about your privacy and want to be upfront about how we treat your data when using the services ("Services") that Glimpse ("Glimpse") offers: what we collect, why we collect it, where it all goes, for how long, your rights, and what you can ask us to do with it. So we wrote this policy ("Privacy Policy") to explain it to you in the clearest and simplest way we know.',
        "We collect anonymized user data to help us provide a more context-rich experience and serve our users more relevant predictions and topics.",
      ],
    },
    {
      title: "Data Collection and Privacy",
      paragraphs: [
        "At Glimpse, we are committed to collecting and processing user data in a way that prioritizes your privacy. We use privacy-preserving methods to gather aggregate data, ensuring that individual user identities remain anonymous.",
        "This aggregate data helps us to analyze trends, understand user behavior, and improve the overall user experience. By analyzing this data, we can offer better recommendations and more personalized content that aligns with your interests and preferences.",
      ],
    },
    {
      title: "User Interaction Data",
      paragraphs: [
        "In addition to aggregate data, we also collect user data based on interactions within our platform. This data is used to tailor the content you see, ensuring that it is relevant and engaging. Our goal is to provide a more personalized experience that enhances your use of Glimpse, making it easier for you to discover content that matters most to you.",
      ],
    },
    {
      title: "Payment Data Security",
      paragraphs: [
        "We take the security of your payment data very seriously. All payment transactions on Glimpse are private and secure, utilizing industry-standard encryption and security protocols. It is important to note that users are fully in control of their own funds at all times.",
        "Glimpse does not have access to your private keys or funds, and as such, we are unable to return any lost funds. Please ensure that you take the necessary precautions to protect your assets.",
      ],
    },
    {
      title: "Third-Party Fiat Onramps",
      paragraphs: [
        "For those who use fiat onramps to purchase digital assets, please be aware that all such transactions are handled by third-party service providers. Glimpse does not share any private financial data with these third parties, and conversely, these third parties do not share any of your financial data with us.",
      ],
    },
  ];

  return (
    <ContentPage
      title="Glimpse Privacy Policy"
      subtitle="Legal Information & Notices"
      sections={sections}
    />
  );
};
