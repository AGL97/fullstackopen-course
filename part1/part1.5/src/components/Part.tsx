export default function Part(content: ContentType) {
    const {part, exercises} = content
    return (
    <li>
        <p>
            {part} {exercises}
        </p>
    </li>
  )
}
