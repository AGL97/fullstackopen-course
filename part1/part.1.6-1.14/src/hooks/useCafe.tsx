import { useState } from "react"


export const useCafe = () => {
    const [statistics, setStatistics] = useState<Record<StatisticType, number>>({
      good: 0,
      neutral: 0,
      bad: 0,
    })

    const sinthetizedStatistics = Object.entries(statistics)
    const total = Object.values(statistics).reduce((a, b) => a + b)
    const average = (statistics.good * 1 + statistics.bad * (-1) + statistics.neutral * 0)/ total
    const positives = Object.entries(statistics).reduce((acc, [type, value]) => {
      if(type === 'good') return acc + value
      return acc
    }, 0)
    const positiveAverage = (positives/total) * 100
        

    const incrementGoodBy = (value: number) => {
      setStatistics(prev => ({...prev, good: prev.good + value}))
    }

    const incrementBadBy = (value: number) => {
      setStatistics(prev => ({...prev, bad: prev.bad + value}))
    }

    const incrementNeutralBy = (value: number) => {
      setStatistics(prev => ({...prev, neutral: prev.neutral + value}))
    }

    const reset = () => {
      setStatistics({
        good: 0,
        bad: 0,
        neutral: 0
      })
    }

    const actions = [
      {label: 'good', fn: incrementGoodBy},
      {label: 'neutral', fn: incrementNeutralBy},
      {label: 'bad', fn: incrementBadBy},
      {label: 'reset', fn: reset}
    ]
    
  return { 
    statistics: sinthetizedStatistics ,
    isResults: statistics.good !== 0 || statistics.bad !== 0 || statistics.neutral !== 0,
    total,
    average: isNaN(average) ? 0 : average, 
    positiveAverage: isNaN(positiveAverage) ? 0 : positiveAverage, 
    actions 
  }
}