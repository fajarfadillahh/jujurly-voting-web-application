// import utility
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>Ooppss.. Halaman yang kamu cari tidak ditemuka.</title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <Image
              src={`/assets/${theme == "dark" ? "img-4-dark" : "img-4"}.svg`}
              alt="hero img"
              width={350}
              height={350}
            />

            <div className="text-center">
              <h1 className="section-title">Ooppss... Halaman gak ada 😱</h1>
              <p className="section-text">
                Halaman yang kamu cari gak ada nih. Pastikan URL yang <br />
                kamu masukin sudah bener ya.
              </p>
            </div>

            <Button
              text="Kembali ke halaman utama"
              variant="fill"
              onClick={() => router.push("/dashboard")}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}
