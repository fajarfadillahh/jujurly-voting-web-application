import Head from "next/head";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function Voting() {
  return (
    <>
      <Head>
        <title>Ayo, Tentukan pilihan kamu sekarang!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <div className="text-center">
              <h1 className="section-title">Pemilihan Ketua Osis</h1>

              <div className="grid gap-2">
                <p className="section-text">Voting akan berakhir pada :</p>
                <div className="inline-flex items-center justify-center gap-5">
                  <div className="grid justify-items-center">
                    <span className="-mb-2 text-[48px] font-bold text-black">
                      26
                    </span>
                    <span className="text-[14px] font-medium text-black">
                      Jam
                    </span>
                  </div>
                  <span className="text-[32px] font-medium">:</span>
                  <div className="grid justify-items-center">
                    <span className="-mb-2 text-[48px] font-bold text-black">
                      42
                    </span>
                    <span className="text-[14px] font-medium text-black">
                      Menit
                    </span>
                  </div>
                  <span className="text-[32px] font-medium">:</span>
                  <div className="grid justify-items-center">
                    <span className="-mb-2 text-[48px] font-bold text-black">
                      26
                    </span>
                    <span className="text-[14px] font-medium text-black">
                      Detik
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>candidate</div>

            <Button text="Kirim Voting 🚀" variant="fill" className="mt-8" />
          </div>
        </section>
      </Layout>
    </>
  );
}
