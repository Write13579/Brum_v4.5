import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/licz')({
  component: () => <div>Hello /spalanie!</div>
})