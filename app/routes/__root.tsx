import * as React from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";

import appCss from "@/styles/app.css?url";
import { AppLayout } from "@/components/AppLayout";
import { getThemeCookie, useThemeStore } from "@/components/ThemeToggle";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
  }),
  staleTime: Infinity,
  loader: async () => {
    return {
      themeCookie: await getThemeCookie(),
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { themeCookie } = Route.useLoaderData();

  React.useEffect(() => {
    useThemeStore.setState({ mode: themeCookie });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeClass = themeCookie === "dark" ? "dark" : "";

  return (
    <html lang="en" className={themeClass}>
      <head>
        {themeCookie === "auto" ? (
          <ScriptOnce
            children={`window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.add('dark') : null`}
          />
        ) : null}
        <HeadContent />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
        <Scripts />
      </body>
    </html>
  );
}
