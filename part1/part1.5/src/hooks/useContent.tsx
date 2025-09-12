import { useMemo, useState } from "react";

interface ContentWithTitle {
  name:string
  course: {
    id: number;
    part: string;
    exercises: number;
  }[]
}

export const useContent = () => {
    const [content] = useState<ContentWithTitle>(
    {
      name: 'Half Stack application development',
      course:
        [
          {
            id:1,
            part:'Fundamentals of React',
            exercises: 10,   
          },
          {
            id:2,
            part:'Using props to pass data',
            exercises: 7
          },  
          {  
            id:3, 
            part: 'State of a component',
            exercises:14
          }
        ]
    }
  )

  const exercises = useMemo(() => content.course.map(content => content.exercises), [content]) 

  return {content, exercises,exercisesCount: exercises.reduce((a, b) => a + b)}
}