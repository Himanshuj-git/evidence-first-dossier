import { createFileRoute, redirect } from "@tanstack/react-router";

// Spec alias: /start → free evidence-request flow.
export const Route = createFileRoute("/start")({
  beforeLoad: () => { throw redirect({ to: "/scan" }); },
});
