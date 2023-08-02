// import components
import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 mx-auto max-w-[1440px] bg-white">
      <div className="container flex h-24 items-center justify-between">
        <a href="#" className="text-[24px] font-bold text-black">
          Jujurly.
        </a>

        <div className="inline-flex items-center gap-4">
          <span className="hidden font-semibold text-black">
            Fajar Fadillah A
          </span>
          <Button text="Masuk" variant="fill" />
        </div>
      </div>
    </nav>
  );
}
