import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { QsbsProvider } from "@/lib/qsbs/store";
import { PageShell } from "@/components/qsbs/Layout";

function NotFoundComponent() {
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">404</div>
        <h1 className="mt-2 text-3xl font-medium">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-flex qsbs-btn qsbs-btn-primary">Return home</Link>
      </div>
    </PageShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-2xl font-medium">This page didn't load</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button className="qsbs-btn qsbs-btn-primary" onClick={() => { router.invalidate(); reset(); }}>Try again</button>
          <a href="/" className="qsbs-btn qsbs-btn-ghost">Go home</a>
        </div>
      </div>
    </PageShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QSBS Packet — The evidence file for your startup stock" },
      { name: "description", content: "Build an audit-ready Section 1202 QSBS evidence packet for review by a qualified tax professional." },
      { property: "og:title", content: "QSBS Packet — The evidence file for your startup stock" },
      { property: "og:description", content: "Organize the evidence a tax professional needs to review Section 1202 startup stock positions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <QsbsProvider>
        <Outlet />
      </QsbsProvider>
    </QueryClientProvider>
  );
}
