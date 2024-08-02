import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: () => {
    const [changeTheme, setChangeTheme] = useState("dark");
    useEffect(() => {
      const old = localStorage.getItem("theme");

      setChangeTheme(old && old === "light" ? "dark" : "light");
      if (!old || old === "dark") {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      } else {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      }
    }, []);

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="p-2 flex gap-2 w-fit">
            <Link to="/" className="[&.active]:font-bold">
              Kalkulator
            </Link>{" "}
            <Link to="/licz" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <div>Brum v4.0</div>
          <button
            onClick={() => {
              const theme = localStorage.getItem("theme");
              if (!theme || theme === "dark") {
                localStorage.setItem("theme", "light");
                document.documentElement.classList.remove("dark");
                setChangeTheme("light");
              } else {
                localStorage.setItem("theme", "dark");
                document.documentElement.classList.add("dark");
                setChangeTheme("dark");
              }
            }}
          >
            {changeTheme === "light" ? "🌑" : "☀️"}
          </button>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});
