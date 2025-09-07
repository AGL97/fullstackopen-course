type StatisticType =  'good' | 'bad' | 'neutral'

interface IStatistic {
    type: StatisticType
    value: number
}
