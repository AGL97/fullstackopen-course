import Statistic from "./Statistic"
import './statistics.css'

interface Props {
  statistics: [string,number][]
  total?: number
  average?: number
  positiveAverage?: number  
  isResults?: boolean
}

export default function Statistics({statistics,average = 0,positiveAverage = 0,total = 0,isResults = false}: Props) {
  

  return (
    <section>
      <h2>Statistics</h2>
      {isResults ?
        <div>
          <table>
            <tbody>
              {
                statistics.map(([type, value], index) => (
                  <Statistic key={index} type={type as StatisticType} value={value} />
                ))
              }
            </tbody>
          </table>
          <h4>All: {total}</h4>
          <h4>Average : {average.toFixed(2)}</h4>
          <h4>Positive : {positiveAverage.toFixed(2)} %</h4>
        </div> :
        <h3>
            No given results
        </h3>
         }
    </section>)  
}
