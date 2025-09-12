import Part from "./Part";

interface ContentProps {
  content:{
    id: number;
    part: string;
    exercises: number;
  }[]
}

export default function Header(props: ContentProps) {
  const {content} = props
  return (
  <ul>
    {
      content.map((content) => (
        <Part key={content.id} part={content.part} exercises={content.exercises} />
      ))
    }      
  </ul>)  
}
