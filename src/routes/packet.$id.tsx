import { createFileRoute, redirect } from "@tanstack/react-router";

// Alias for /dossiers/:id — the spec uses /packet/:id terminology.
export const Route = createFileRoute("/packet/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id", params: { id: params.id } });
  },
});
