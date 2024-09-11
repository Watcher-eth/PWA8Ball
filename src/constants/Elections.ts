export const SECTION_DATA_MAP = {
  Presidency: {
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/1200px-Kamala_Harris_Vice_Presidential_Portrait.jpg",
      "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2024-03/240325-donald-trump-se-348p-48d6a0.jpg",
    ],
    names: ["Kamala", "Trump"],
    odds: [52, 48],
    marketId: 2,
  },
  Senate: {
    images: [
      "https://polymarket.com/_next/image?url=%2Fimages%2Felections%2Fdemocrat-icon.png&w=256&q=75",
      "https://polymarket.com/_next/image?url=%2Fimages%2Felections%2Frepublican-icon.png&w=256&q=75",
    ],
    names: ["Democrats", "Republicans"],
    odds: [30, 70],
    marketId: 0,
  },
  House: {
    images: [
      "https://polymarket.com/_next/image?url=%2Fimages%2Felections%2Fdemocrat-icon.png&w=256&q=75",
      "https://polymarket.com/_next/image?url=%2Fimages%2Felections%2Frepublican-icon.png&w=256&q=75",
    ],
    names: ["Democrats", "Republicans"],
    odds: [36, 64],
    marketId: 6,
  },
} as const

export const SwingStates = [
  {
    name: "Georgia",
    flag: "https://media.istockphoto.com/id/1133085196/de/vektor/georgien-waving-flagge.jpg?s=612x612&w=0&k=20&c=ZxGKkKm-SAsOU2R7Py3elV20vwE5uPqRjY4PqlMLAfQ=",
    odds: [46, 54],
    votes: 16,
    marketId: 18,
  },
  {
    name: "Arizona",
    flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1RJrPDgJDFp-keMKgtgYQvWdiQPHy1ziPw&sn",
    odds: [47, 53],
    votes: 11,

    marketId: 11,
  },
  {
    name: "Nevada",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Nevada.svg/640px-Flag_of_Nevada.svg.png",
    odds: [46, 54],
    votes: 6,
    marketId: 20,
  },
  {
    name: "Pennsylvania",
    flag: "https://cdn.britannica.com/29/3429-050-0A641390/Pennsylvania-state-flag-William-Penn-blue-coat-1777.jpg",
    odds: [56, 44],
    votes: 19,
    marketId: 12,
  },
  {
    name: "Wisconsin",
    flag: "https://www.eekwi.org/sites/default/files/2019-12/wiflag.png",
    odds: [56, 44],
    votes: 10,
    marketId: 13,
  },
  {
    name: "Michigan",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Michigan.svg/640px-Flag_of_Michigan.svg.png",
    odds: [64, 36],
    votes: 15,
    marketId: 14,
  },
]
