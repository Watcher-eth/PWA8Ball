export interface NewMarket {
  title: string
  question: string
  image: string
  options: MarketOptions[]
  pair: string // Assuming you're storing the contract pair address.
  id: string
  // Include other fields as per your requirements
}

interface MarketOptions {
  name: string
  address: string
}
