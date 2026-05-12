import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  beforeLoad: () => {
    throw redirect({ to: "/dossiers/$id", params: { id: "demo-northstar" } });
  },
});
