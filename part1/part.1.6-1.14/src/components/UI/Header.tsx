interface HeaderProps {
  title: string
}

export default function Header(props: HeaderProps) {
  const {title} = props
  return (
    <h1>{title}</h1>
  )
}
