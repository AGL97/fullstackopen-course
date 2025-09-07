import Part from "./Part"

interface ContentProps {
  content: ContentType []
}

export default function Header(props: ContentProps) {
  const {content} = props
  return (
  <ul>
    {
      content.map((content,index) => (
        <Part key={index} part={content.part} exercises={content.exercises} />
      ))
    }      
  </ul>)  
}
