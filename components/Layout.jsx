import { useRouter } from "next/router";

// import components
import Navbar from "./Navbar";

export default function Layout({ children, className }) {
  const router = useRouter();
  const { pathname } = router;

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
      </main>
    </>
  );
}
