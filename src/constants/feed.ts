import { CardType } from "@/types/FeedTypes";

export const TEST_FEED_DATA: CardType[] = [
  {
    name: "100k MAUs",
    description: "Will Farcaster reach 100K MAU’s before the end of Q2 2024?",
    topic: "Farcaster",
    icon: "https://pbs.twimg.com/profile_images/1546487688601096192/QoG0ZVgH_400x400.jpg",
    image:
      "https://raw.githubusercontent.com/farcasterxyz/.github/master/farcaster.jpg",
    optionA: { multiplier: 1.65, name: "No", odds: 0.29 },
    optionB: { multiplier: 3, name: "Yes", odds: 0.71 },
  },
  {
    name: "Best Picture",
    description: "Will Oppenheimer win the 2024 Academy Awards: Best Picture?",
    topic: "2024 Oscars",
    icon: "https://media-prod.fangoria.com/images/Opp2.width-800.jpg",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    optionA: { multiplier: 3.5, name: "No", odds: 0.8 },
    optionB: { multiplier: 1.3, name: "Yes", odds: 0.2 },
  },
  {
    name: "Taylor new BF",
    description: "Is Taylor dating Robin Moore / is he her new boyfriend?",
    topic: "Taylor Swift",
    icon: "https://www.rollingstone.com/wp-content/uploads/2019/10/10372528mgW.jpg?w=1581&h=1054&crop=1",
    image:
      "https://www.brides.com/thmb/AKCV9mWFEAgFRgRN9HnbePceqLk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1179298993-016de42ca11d4a25b911999cb8a7db1f.jpg",
    optionA: { multiplier: 1.35, name: "No", odds: 0.38 },
    optionB: { multiplier: 3, name: "Yes", odds: 0.62 },
  },

  {
    description: "Will GTA 6 deluxe edition cost more than 80 Dollars?",
    topic: "GTA 6",
    icon: "https://imgs.search.brave.com/lUy0tf7-rGuwEXhtMLQAZgtdzq7RFpMfVUAWzgDNOBI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi81LzUzL1Jv/Y2tzdGFyX0dhbWVz/X0xvZ28uc3ZnLzIy/MHB4LVJvY2tzdGFy/X0dhbWVzX0xvZ28u/c3ZnLnBuZw",
    name: "Price",
    image:
      "https://phantom-marca.unidadeditorial.es/931e11306070eef2226fbf72e6452563/resize/828/f/jpg/assets/multimedia/imagenes/2023/12/04/17017052216381.jpg",
    optionA: { multiplier: 1.55, name: "No", odds: 0.45 },
    optionB: { multiplier: 2, name: "Yes", odds: 0.55 },
  },
  {
    description: "Will Dune by Dennis Villeneuv have a third part?",
    topic: "Dune",
    icon: "https://i.ytimg.com/vi/2pVT-5kFI18/maxresdefault.jpg",
    name: "Part 3",
    image:
      "https://www.joblo.com/wp-content/uploads/2023/05/dune_part_two_poster.jpg",
    optionA: { multiplier: 3.4, name: "No", odds: 0.66 },
    optionB: { multiplier: 1.15, name: "Yes", odds: 0.34 },
  },
] as const;

