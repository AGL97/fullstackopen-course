
import { Content, Header, Total } from "./components"
import { useContent } from "./hooks"


const App = () => { 
  const {content, exercises,} = useContent()  

  return (
    <div>      
      <Header course={content.name} />
      <Content content={content.course} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App