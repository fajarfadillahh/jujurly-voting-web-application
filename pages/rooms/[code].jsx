import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";

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

              {/* countdown components */}
              <CountDown />
            </div>

            {/* candidate components */}
            <div className="grid justify-items-center gap-6">
              <CandidateItem />
              <CandidateItem />
            </div>

            <Button text="Kirim Voting 🚀" variant="fill" className="mt-8" />
          </div>
        </section>
      </Layout>
    </>
  );
}
