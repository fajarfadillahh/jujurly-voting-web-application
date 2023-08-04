import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Participant() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ayo Ikutan Voting!</title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center">
            <img src="/assets/img-3.svg" alt="hero img" className="w-[400px]" />

            <div className="grid justify-items-center gap-8">
              <div className="text-center">
                <h1 className="section-title">Ayo, Ikut Voting 🚀</h1>
                <p className="section-text">
                  Masukan kode voting yang telah diberikan oleh
                  panitia/penyelenggara.
                </p>
              </div>

              <div className="grid min-w-[420px] gap-2">
                <Form
                  type="text"
                  placeholder="Masukan Kode Voting"
                  className="text-center uppercase placeholder:capitalize"
                />
                <Button
                  text="Lanjutkan"
                  variant="fill"
                  onClick={() => router.push("/rooms/MJSFLWNS")}
                />
              </div>

              <Link href="/" className="inline-flex font-semibold text-black">
                Kembali
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
