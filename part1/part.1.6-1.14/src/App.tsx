
import { Actions, Header, Statistics } from "./components"
import { Anecdotes } from "./components/Anecdotes/Anecdotes"
import './components/UI/main.css'
import { useCafe } from "./hooks"


const App = () => { 
  const {isResults,statistics,average,positiveAverage,total,actions} = useCafe()  

  return (
    <div className="bodyTest">      
      <Header title={'Gife feedback'} />
      <Actions actions={actions}  />
      <Statistics 
        statistics={statistics} 
        average={average} 
        positiveAverage={positiveAverage} 
        total={total} 
        isResults={isResults} 
      />
      <Anecdotes/>
    </div>
  )
}

export default App