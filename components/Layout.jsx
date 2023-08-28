import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { HiMoon, HiSun } from "react-icons/hi";

// import components
import Navbar from "@/components/Navbar";

export default function Layout({ children, className }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // hide Navbar components
  const hideNavbarOnPages = ["/auth/login", "/auth/register"];

  // current user page
  const showNavbar = !hideNavbarOnPages.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main
        className={`mx-auto min-h-screen max-w-[1440px] overflow-hidden ${className}`}
      >
        {children}

        <div
          className="fixed bottom-12 left-12 cursor-pointer rounded-full bg-white p-2 text-[1.5rem] text-black shadow-[2px_2px_10px_rgba(0,0,0,0.1)] hover:bg-black/5"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme == "light" ? <HiMoon /> : <HiSun />}
        </div>
      </main>
    </>
  );
}
