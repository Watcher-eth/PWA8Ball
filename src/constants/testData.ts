
export const DEFAULT_USER_ID = "did:privy:clutganzs01rz2oqk4vvlwtih"
export const DEFAULT_PFP_PLACEHOLDER =
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQalRrZ3DhpviKTK_4Mn_uCvClxYNP5QntBI2GluPXMX77Ps3A6"

export const TEST_BET_MODAL_DATA = {
  question: "Will Oppenheimer win best picture at the 2024 Academy Awards",
  amount: "8,213.203",
  betId: "1234",
  title: "Oppenheimer",
  totalPot: 180.213,
  options: ["No", "Yes"],
  image:
    "https://imgs.search.brave.com/t1L4NG0G9uVXWT5F44Tp6reSnaW1mSMVd9thDo1mwyE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVsZWdyYXBoLmNv/LnVrL2NvbnRlbnQv/ZGFtL2ZpbG1zLzIw/MjQvMDEvMTgvVEVM/RU1NR0xQSUNUMDAw/MzQzMjcwMDY1XzE3/MDU1OTY4MDkzMDMw/X3RyYW5zX052QlF6/UU5qdjRCcUE3TjJD/eG5KV25ZSTN0Q2JW/Qmd1OVQwYWVzdXN2/TjFURTdhMGRkZF9l/c0kuanBlZz9pbXdp/ZHRoPTQ4MA",
}

export const TEST_ACTIVITY_DATA = [
  {
    question: "Will Oppenheimer win best picture at the 2024 Academy Awards",
    amount: "8,213",
    betId: "1234",
    name: "0xDesigner.eth",
    title: "Oppenheimer Best Picture",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    pfp: "https://pbs.twimg.com/profile_images/1762652874213834752/ohOpuC2T_400x400.jpg",
  },
  {
    question: "Will Taylor Swift get engaged with Travis Kelcee in 2024?",
    amount: "252",
    betId: "1234",
    name: "Madfes",
    title: "Taylor Swift Engaged EOY",
    image:
      "https://pyxis.nymag.com/v1/imgs/714/769/21baa9f9edb6ff5f9a7d91b88febedbadd-taylor-travis.1x.rsquare.w1400.jpg",
    pfp: "https://pbs.twimg.com/profile_images/1441542795466919936/u98SJU8u_400x400.jpg",
  },
  {
    question: "Will GTA 6 deluxe edition cost more than 80 Dollars?",
    amount: "45",
    betId: "1234",
    name: "0xChristina.eth",
    title: "GTA 6 in 2025?",
    pfp: "https://pbs.twimg.com/profile_images/1766590729730629632/TdA7IzIa_400x400.jpg",
    image:
      "https://phantom-marca.unidadeditorial.es/931e11306070eef2226fbf72e6452563/resize/828/f/jpg/assets/multimedia/imagenes/2023/12/04/17017052216381.jpg",
  },
]

export const TEST_FINISHED_ACTIVITY_DATA = [
  {
    index: 3,

    title: "Republican Nominee",
    topic: "GOP",
    image:
      "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A710dbed6-33c9-4ec9-bec0-82dfb0dfa17b?source=next-article&fit=scale-down&quality=highest&width=1440&dpr=1",
    question: "Who will be the Republican Nominee for the 2024 elections?",
  },
  {
    question: "Will AOMG get kicked out of Meenoi?",
    amount: "8,213",
    betId: "1234",
    name: "Ted (Not Lasso)",
    title: "AOMG Fallout",
    image:
      "https://www.allkpop.com/upload/2024/03/content/130003/1710302625-dj-pumpkin-01.jpg",
  },
]

export const TEST_FIND_FRIENDS_DATA = [
  {
    isFollowing: false,
    name: "Alec",
    handle: "@Alec.eth",
    pfp: "https://pbs.twimg.com/profile_images/1484766329798213634/pIfL_r6Y_400x400.jpg",
  },
  {
    isFollowing: false,

    name: "Ted (Not Lasso)",
    handle: "@Ted",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_168/https%3A%2F%2Fopenseauserdata.com%2Ffiles%2Ffd28c65d9b5192168fb259009a3afd36.png",
  },
  {
    isFollowing: true,

    name: "0xSmallbrain",
    handle: "@0xSmallbrain.eth",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_168/https%3A%2F%2Fi.imgur.com%2FVj7CdUX.jpg",
  },
]

export const TEST_ACTIVITY_CHART_DATA = [
  {
    amount: 3.7,
    image:
      "https://raw.githubusercontent.com/farcasterxyz/.github/master/farcaster.jpg",
  },
  {
    amount: 7.5,
    image:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
  },
  {
    amount: 1.8,
    image:
      "https://www.brides.com/thmb/AKCV9mWFEAgFRgRN9HnbePceqLk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1179298993-016de42ca11d4a25b911999cb8a7db1f.jpg",
  },
] as const

export const TEST_TOPICS = [
  "🔥 Trending",
  "🇺🇸 2024 US Elections",
  "🎤 Taylor Swift",
  "📱 TikTok",
  "🏜️ Dune",
  "📈 Gamestop",
  "🎬 Oscars 2024",
  "🥊 Jake Paul",
  "🎮 GTA 6",
  "⚽ UEFA European Cup",
  "🎮 Esports",
  "🕌 Middle East",
  "🇹🇼 Taiwan",
  "𝕏 Crypto Twitter",
  "💡 Elon Musk",
  "🏈 Superbowl 2025",
  "🚀 ISS",
  "🦠 Monkeypox",
  "💸 Crypto",
  "🏦 Federal Reserve",
  "🪖 Ukraine",
  "📹 Twitch",
  "🎤 KPop",
]

export const TEST_COMMENTS_DATA = [
  {
    id: "comment1",
    name: "0xSmallbrain.eth",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_jpg,w_168/https%3A%2F%2Fi.imgur.com%2FVj7CdUX.jpg",
    content: "This is a really insightful post! Thanks for sharing.",
    date: "2023-03-15T09:00:00Z",
    extraComments: [],
  },
  {
    id: "extraComment2-1",
    parentId: "comment2",
    name: "Clara Belle",
    pfp: "https://imgs.search.brave.com/ucHBM0HyYfKWRFpTUITjIPtCMmjjbqB8vdFd4WrgD3Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS9j/N2NjYjFfNzQxNzY5/YjliYmVkNDIwNDgx/YjRmZDRkODFjY2Jm/ZjR-bXYyLnBuZy92/MS9maWxsL3dfNDYx/LGhfNDYxLHFfOTAv/YzdjY2IxXzc0MTc2/OWI5YmJlZDQyMDQ4/MWI0ZmQ0ZDgxY2Ni/ZmY0fm12Mi5wbmc",
    content: "Could you elaborate on that, Bob? I'm curious to hear more.",
    date: "2023-03-15T10:15:00Z",
  },
  {
    id: "comment2",
    name: "Alec.eth",
    pfp: "https://pbs.twimg.com/profile_images/1484766329798213634/pIfL_r6Y_400x400.jpg",
    content: "Interesting perspective, but I think there's more to the story.",
    date: "2023-03-15T10:00:00Z",
    extraComments: [],
  },
  {
    id: "extraComment1-2",
    parentId: "comment1",
    name: "Ted (Not Lasso)",
    pfp: "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_168/https%3A%2F%2Fopenseauserdata.com%2Ffiles%2Ffd28c65d9b5192168fb259009a3afd36.png",
    content:
      "I think the score was one of the best parts of the movie. I think it has a good shot at winning best soundtrack!",
    date: "2023-03-15T09:10:00Z",
  },
]

export const TEST_VOTERS = [
  {
    name: "0xChristina.eth",
    address: "0xf62r7m...3567",
    amount: 13,
    option: "Yes",
    pfp: "https://pbs.twimg.com/profile_images/1766590729730629632/TdA7IzIa_400x400.jpg",
  },
  {
    name: "Winny.eth",
    address: "0xd443am...9165",
    amount: 3,
    option: "No",
    pfp: "https://pbs.twimg.com/profile_images/1716574480993071104/j58mjsfX_400x400.jpg",
  },
  {
    name: "Cobie",
    address: "0xf45s73...3r77",
    amount: 11,
    option: "Yes",
    pfp: "https://news.coincu.com/wp-content/uploads/2022/08/Crypto-Whale-Cobie-Donates-A-YouTuber-Being-Sued-By-BitBoy-100000-3.jpeg",
  },
  {
    name: "Dwr",
    address: "0x2td4s21e...uhr",
    amount: 5,
    option: "Yes",
    pfp: "https://pbs.twimg.com/profile_images/1518670972559130624/-G9gNsOp_400x400.png",
  },
]
