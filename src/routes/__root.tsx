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
      { title: "1202 Request — Section 1202 Evidence Packets" },
      { name: "description", content: "Organize startup stock facts, request issuer evidence, and export a CPA-ready dossier for Section 1202 review. Not tax advice." },
      { property: "og:site_name", content: "1202 Request" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/ire59F4wn0ee7GMDws9rL9LsjxP2/social-images/social-1778649867252-1202_Request_social_preview_showing_a_minimal_CPA-ready_evidence_dossier_for_Section_1202_review..webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/ire59F4wn0ee7GMDws9rL9LsjxP2/social-images/social-1778649867252-1202_Request_social_preview_showing_a_minimal_CPA-ready_evidence_dossier_for_Section_1202_review..webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "1202 Request",
              url: "https://1202request.com",
              description: "Shareholder-side tool to organize startup stock facts and request issuer evidence for Section 1202 review.",
            },
            {
              "@type": "Organization",
              name: "1202 Request",
              url: "https://1202request.com",
              description: "Evidence-first dossier builder for Section 1202 review preparation. Not a tax, legal, or investment advisor.",
            },
          ],
        }),
      },
    ],
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
