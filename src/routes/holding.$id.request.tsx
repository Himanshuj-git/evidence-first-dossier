import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/holding/$id/request")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id/request-letter", params: { id: params.id } });
  },
});
