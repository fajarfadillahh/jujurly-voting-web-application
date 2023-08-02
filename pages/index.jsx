import Head from "next/head";

// import components
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Selamat datang di Jujurly. - Aplikasi voting berbasis web terbaik di
          Indonesia!
        </title>
      </Head>

      {/* ===== navbar section ===== */}
      <Navbar />

      <main className="main 2xl:flex 2xl:items-center 2xl:justify-center">
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32 2xl:pt-0">
          <div className="container grid justify-items-center gap-8 2xl:min-w-[1024px]">
            <div className="text-center">
              <h1 className="section-title">Ayo, Mulai Voting Sekarang 🚀</h1>
              <p className="section-text">
                Aplikasi voting berbasis web terbaik di Indonesia.
              </p>
            </div>

            <img
              src="/assets/img-1.svg"
              alt="hero img"
              className="w-[400px] 2xl:w-[500px]"
            />

            <div className="inline-flex items-center gap-6">
              <Button text="Ikut Voting" variant="fill" />
              <Button text="Buat Voting" variant="stroke" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
