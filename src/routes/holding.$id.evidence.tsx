import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/holding/$id/evidence")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id/evidence", params: { id: params.id } });
  },
});
