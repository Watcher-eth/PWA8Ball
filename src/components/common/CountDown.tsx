import { useState, useEffect } from "react"

export const Countdown = ({ endDate }: { endDate: Date }) => {
  const calculateTimeLeft = () => {
    //@ts-ignore
    const difference = new Date(endDate) - new Date()

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex space-x-4 text-center md:border-0 border-[0.1rem] md:p-0 p-2.5 px-5 rounded-lg border-[#212121] text-white">
      {Object.keys(timeLeft).map((interval) => (
        <div key={interval} className="flex flex-col items-center">
          <span className="md:text-4xl text-3xl font-bold">
            {timeLeft[interval as keyof typeof timeLeft]}
          </span>
          <span className="uppercase ">{interval}</span>
        </div>
      ))}
    </div>
  )
}
