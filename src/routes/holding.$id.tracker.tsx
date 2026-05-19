import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/holding/$id/tracker")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id/tracker", params: { id: params.id } });
  },
});
