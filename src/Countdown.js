import React, { useState, useEffect } from 'react'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const targetDate = new Date('2026-12-31T23:59:59').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(
          2,
          '0',
        ),
        hours: String(
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        ).padStart(2, '0'),
        minutes: String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        ).padStart(2, '0'),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
          2,
          '0',
        ),
      })
    }

    const interval = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="time-boxes">
      <div className="box">
        <span>{timeLeft.days}</span>
        <p>DAYS</p>
      </div>
      <div className="box">
        <span>{timeLeft.hours}</span>
        <p>HOURS</p>
      </div>
      <div className="box">
        <span>{timeLeft.minutes}</span>
        <p>MINUTES</p>
      </div>
      <div className="box">
        <span>{timeLeft.seconds}</span>
        <p>SECONDS</p>
      </div>
    </div>
  )
}

export default Countdown
