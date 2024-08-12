import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const TAILWIND_DARK_THEME_SELECTOR = "dark";

export const Route = createRootRoute({
  component: () => {
    const [changeTheme, setChangeTheme] = useState(Theme.DARK);

    useEffect(() => {
      const old = localStorage.getItem("theme") as Theme | null;

      setChangeTheme(old && old === Theme.LIGHT ? Theme.LIGHT : Theme.DARK);

      if (!old || old === Theme.DARK) {
        localStorage.setItem("theme", Theme.DARK);
        document.documentElement.classList.add(TAILWIND_DARK_THEME_SELECTOR);
      } else {
        localStorage.setItem("theme", Theme.LIGHT);
        document.documentElement.classList.remove(TAILWIND_DARK_THEME_SELECTOR);
      }
    }, []);

    return (
      <>
        <div className="grid grid-cols-3 items-center p-4 w-full">
          <div className="p-2 flex gap-2 w-fit">
            <Link to="/" className="[&.active]:font-bold">
              Kalkulator
            </Link>{" "}
            <Link to="/zapisy" className="[&.active]:font-bold">
              Zapisy
            </Link>
          </div>
          <div className="w-full text-center font-bold text-xl">Brum v4.5</div>
          <button
            className="ml-auto"
            onClick={() => {
              const theme = localStorage.getItem("theme") as Theme | null;
              if (!theme || theme === Theme.DARK) {
                localStorage.setItem("theme", Theme.LIGHT);
                document.documentElement.classList.remove(
                  TAILWIND_DARK_THEME_SELECTOR
                );
                setChangeTheme(Theme.LIGHT);
              } else {
                localStorage.setItem("theme", Theme.DARK);
                document.documentElement.classList.add(
                  TAILWIND_DARK_THEME_SELECTOR
                );
                setChangeTheme(Theme.DARK);
              }
            }}
          >
            {changeTheme === Theme.LIGHT ? "🌑" : "☀️"}
          </button>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
