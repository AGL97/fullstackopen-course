import { useMemo, useState } from "react"

interface ContentWithTitle {
  name:string
  course:ContentType[]
}

export const useContent = () => {
    const [content] = useState<ContentWithTitle>(
    {
      name: 'Half Stack application development',
      course:
        [
          {
            part:'Fundamentals of React',
            exercises: 10,   
          },
          {
            part:'Using props to pass data',
          exercises: 7
          },  
          {    
          part: 'State of a component',
          exercises:14
          }
        ]
    }
  )

  const exercises = useMemo(() => content.course.map(content => content.exercises), [content]) 

  return {content, exercises}
}