interface TotalProps {
  exercises: number[]
}

export default function Total(props: TotalProps) {
    const {exercises} = props
    const total = Array.isArray(exercises) ? exercises.reduce((acc, curr) => acc + curr, 0) : 0
  return (
    <p>Number of exercises {total}</p>
  )
}
