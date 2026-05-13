import { createFileRoute, redirect } from "@tanstack/react-router";

// Spec alias: /holding/:id → /dossiers/:id (holding dashboard).
export const Route = createFileRoute("/holding/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/dossiers/$id", params: { id: params.id } });
  },
});
