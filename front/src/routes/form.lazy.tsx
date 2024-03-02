import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute('/form')({
  component: Form,
})

function Form() {
  return <div className="p-2">Hello from Form!</div>
}
