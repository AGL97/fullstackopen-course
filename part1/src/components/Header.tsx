interface HeaderProps {
  course: string
}

export default function Header(props: HeaderProps) {
    const {course} = props
  return (
    <h1>{course}</h1>
  )
}
