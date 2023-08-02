import Head from "next/head";
import { useRouter } from "next/router";

// import components
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ooppss.. Halaman yang kamu cari tidak ditemuka.</title>
      </Head>

      {/* ===== navbar section ===== */}
      <Navbar />

      <main className="main 2xl:flex 2xl:items-center 2xl:justify-center">
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32 2xl:pt-0">
          <div className="container grid justify-items-center gap-8 2xl:min-w-[1024px]">
            <img
              src="/assets/img-2.svg"
              alt="hero img"
              className="w-[400px] 2xl:w-[500px]"
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
              onClick={() => router.push("/")}
            />
          </div>
        </section>
      </main>
    </>
  );
}
