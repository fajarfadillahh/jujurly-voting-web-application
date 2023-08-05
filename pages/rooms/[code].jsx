import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountdownTimer from "@/components/CountdownTimer";

export default function Voting() {
  return (
    <>
      <Head>
        <title>Ayo, Tentukan pilihan kamu sekarang!</title>
      </Head>

      <Layout>
        {/* ===== voting section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <div className="text-center">
              <h1 className="section-title">Pemilihan Ketua Osis</h1>

              <CountdownTimer />
            </div>

            <div>candidate</div>

            <Button text="Kirim Voting 🚀" variant="fill" className="mt-8" />
          </div>
        </section>
      </Layout>
    </>
  );
}
