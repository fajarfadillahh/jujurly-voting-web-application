import Head from "next/head";
import { useRouter } from "next/router";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Selamat datang di Jujurly. - Aplikasi voting berbasis web terbaik di
          Indonesia!
        </title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
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
              <Button
                text="Ikut Voting"
                variant="fill"
                onClick={() => router.push("/auth/login")}
              />
              <Button
                text="Buat Voting"
                variant="stroke"
                onClick={() => router.push("/auth/login")}
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
