// import utility
import { useRouter } from "next/router";
import { useEffect } from "react";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify([]));
  }, []);

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

            <Image
              src="/assets/img-1.svg"
              alt="hero img"
              className="w-[400px]"
              width={400}
              height={400}
            />

            <div className="inline-flex items-center gap-6">
              <Button
                text="Ikut Voting"
                variant="fill"
                onClick={() => router.push("/rooms")}
              />
              <Button
                text="Buat Voting"
                variant="stroke"
                onClick={() => router.push("/dashboard/create")}
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
