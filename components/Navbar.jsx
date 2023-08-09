import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// import components
import Button from "./Button";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();
  const fullname = cookie.fullname;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white">
      <div className="container flex h-24 items-center justify-between">
        <Link href="/" className="text-[24px] font-bold text-black">
          Jujurly.
        </Link>

        <div className="inline-flex items-center gap-4">
          <span className="block font-semibold text-black">
            {fullname ? fullname : null}
          </span>
          {!cookie.token ? (
            <Button
              text="Masuk"
              variant="fill"
              onClick={() => router.push("/auth/login")}
            />
          ) : (
            <Button
              text="Logout"
              variant="fill"
              onClick={() => {
                removeCookie("token");
                removeCookie("fullname");
                return router.push("/");
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
