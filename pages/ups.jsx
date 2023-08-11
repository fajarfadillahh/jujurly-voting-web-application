import Head from "next/head";

// import components
import Layout from "@/components/Layout";

export default function SomethingWrong() {
  return (
    <>
      <Head>
        <title>Sepertinya telah terjadi kesalahan!</title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <img src="/assets/img-6.svg" alt="hero img" className="w-[400px]" />

            <div className="text-center">
              <h1 className="section-title">Kayanya ada yang salah deh 😱</h1>
              <p className="section-text">
                Sepertinya terjadi kesalahan, silakan refresh halaman
                <br />
                ini atau kembali ke halaman utama.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
