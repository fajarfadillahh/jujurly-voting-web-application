import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// import components
import Button from "@/components/Button";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
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
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white">
      <div className="container flex h-24 items-center justify-between">
        <Link href="/" className="text-[24px] font-bold text-black">
          Jujurly.
        </Link>

        <div className="inline-flex items-center gap-4">
          <span className="block font-semibold text-black">
            {fullname ? fullname : null}
          </span>
          {!token ? (
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
                Cookies.remove("token");
                Cookies.remove("fullname");
                return (window.location.href = "/");
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
