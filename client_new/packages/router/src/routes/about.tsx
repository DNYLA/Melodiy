import { createFileRoute } from '@tanstack/react-router'

function About() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}

// @ts-ignore: Route Not defined
export const Route = createFileRoute('/about')({
  component: About,
})
