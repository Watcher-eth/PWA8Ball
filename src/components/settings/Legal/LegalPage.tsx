import React from "react";

const PageTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center z-10 relative flex flex-col items-center mb-5 pt-7">
      <img className="w-20 h-20 mb-5" src="/images/OrbLogo.png" />
      <h1 className="text-4xl text-white font-bold mb-2">{title}</h1>
      <h2 className="text-lg text-[lightgray] mb-6">{subtitle}</h2>
    </div>
  );
};

const Section = ({ title, lastModified, paragraphs }) => {
  return (
    <div className="mb-10 z-10 relative">
      <h3 className="text-2xl text-white font-[600] mb-1">{title}</h3>
      {lastModified && (
        <p className="italic text-[lightgray] text-md mb-4">{lastModified}</p>
      )}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg text-[lightgray] mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export const ContentPage = ({ title, subtitle, sections }) => {
  return (
    <div className="relative px-6 py-10 max-w-4xl mx-auto bg-[#080808]">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-[#080808] text-white/10">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
            <defs>
              <pattern
                id="grid-pattern"
                width="128"
                height="128"
                patternUnits="userSpaceOnUse"
                x="100%"
                y="100%"
                patternTransform="translate(112 64)"
              >
                <path
                  d="M0 128V.5H128"
                  fill="none"
                  stroke="currentColor"
                ></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <PageTitle title={title} subtitle={subtitle} />

        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            lastModified={section.lastModified}
            paragraphs={section.paragraphs}
          />
        ))}
      </div>
    </div>
  );
};
