import Head from "next/head";

// import components
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Welcome to Jujurly - The best web voting application in the world!
        </title>
      </Head>

      <Navbar />

      <main className="main">
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <div className="text-center">
              <h1 className="section-title">Ayo, Mulai Voting Sekarang 🚀</h1>
              <p className="section-text">
                Aplikasi voting berbasis web terbaik di Indonesia.
              </p>
            </div>

            <img src="/assets/img-1.svg" alt="hero img" className="w-[400px]" />

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
