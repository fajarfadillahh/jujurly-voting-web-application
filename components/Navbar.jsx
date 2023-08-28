import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiOutlineMenu } from "react-icons/hi";

// import components
import Button from "@/components/Button";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const token = Cookies.get("token");
  const fullname = Cookies.get("fullname");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white dark:bg-zinc-900">
      <div className="container flex h-24 items-center justify-between">
        <Link
          href="/"
          className="text-[24px] font-bold text-black dark:text-white"
        >
          Jujurly.
        </Link>

        <div
          className={`fixed left-0 top-24 flex w-full origin-top flex-col items-center justify-center gap-4 bg-white px-6 py-8 shadow-[0_3px_6px_rgba(0,0,0,0.1)] transition dark:bg-zinc-900 sm:static sm:w-auto sm:scale-y-100 sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
          <Link
            href="/dashboard"
            className="block font-semibold text-black hover:underline dark:text-white"
          >
            {fullname ? fullname : null}
          </Link>
          {!token ? (
            <Button
              text="Masuk"
              variant="fill"
              className="w-full sm:w-auto"
              onClick={() => router.push("/auth/login")}
            />
          ) : (
            <Button
              text="Logout"
              variant="fill"
              className="w-full sm:w-auto"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("fullname");
                return (window.location.href = "/");
              }}
            />
          )}
        </div>

        <div
          className="cursor-pointer p-1 text-[22px] text-black hover:bg-black/10 dark:text-white sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiOutlineMenu />
        </div>
      </div>
    </nav>
  );
}
