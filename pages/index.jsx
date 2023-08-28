// import utility
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTheme } from "next-themes";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();

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
          <div className="container grid gap-8">
            <div className="text-center">
              <h1 className="section-title">Ayo, Mulai Voting Sekarang 🚀</h1>
              <p className="section-text">
                Aplikasi voting berbasis web terbaik di Indonesia.
              </p>
            </div>

            <Image
              src={`/assets/${theme == "dark" ? "img-1-dark" : "img-1"}.svg`}
              alt="hero img"
              className="w-[400px] justify-self-center"
              width={400}
              height={400}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button
                text="Ikut Voting"
                variant="fill"
                className="w-full sm:w-auto"
                onClick={() => router.push("/rooms")}
              />
              <Button
                text="Buat Voting"
                variant="stroke"
                className="w-full sm:w-auto"
                onClick={() => router.push("/dashboard/create")}
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
