import { BetOption } from "./BetTypes"

export type CardType = {
  name: string
  description: string
  topic: string
  image: string
  icon: string
  optionA: OptionType
  optionB: OptionType
}

export type OptionType = {
  multiplier: number
  name: string
  odds: number
}

export type BetType = {
  name: string
  description: string
  topic: string
  image: string
  icon: string
  id: string
  type: string
  members: number
}

export type ShareBetType = {
  topic: string
  question: string
  image: string
  title: string
  options: OptionType[]
}

export type ShareTopicType = {
  topic: string
  question: string
  image: string
  title: string
  members: number
  markets: number
}
