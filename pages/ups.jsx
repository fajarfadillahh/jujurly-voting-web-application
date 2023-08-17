import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function SomethingWrong() {
  const router = useRouter();

  const { code, message } = router.query;
  return (
    <>
      <Head>
        <title>Sepertinya telah terjadi kesalahan!</title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <Image
              src="/assets/img-6.svg"
              alt="hero img"
              className="w-[400px]"
              width={400}
              height={400}
            />

            <div className="text-center">
              <h1 className="section-title">Kayanya ada yang salah deh 😱</h1>
              <p className="section-text text-red-600">
                Kode Kesalahannya : {code}
                <br />
                Pesan Kesalahannya : {message}
              </p>
              <br />
              <br />
              <p className="section-text">
                Kamu bisa cek lagi apa yang kamu lakuin
                <br />
                atau
                <br />
                <Button
                  text="Kembali"
                  variant="fill"
                  onClick={() => router.push("/")}
                />
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
