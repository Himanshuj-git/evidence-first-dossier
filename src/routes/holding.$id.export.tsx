import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/holding/$id/export")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id/export", params: { id: params.id } });
  },
});
