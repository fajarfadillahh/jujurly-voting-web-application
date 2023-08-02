import Head from "next/head";
import { useState } from "react";

// import components
import Navbar from "@/components/Navbar";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Participant() {
  const [code, setCode] = useState("");

  return (
    <>
      <Head>
        <title>Ayo Ikutan Voting!</title>
      </Head>

      {/* ===== navbar section ===== */}
      <Navbar />

      <main className="main">
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

              <form action="" className="grid min-w-[420px] gap-2">
                <Form
                  type="text"
                  placeholder="Masukan Kode Voting"
                  className="text-center uppercase placeholder:capitalize"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button
                  text="Lanjutkan"
                  variant="fill"
                  onClick={() => console.log("Kode Voting:", code)}
                />
              </form>

              <a href="/" className="inline-flex font-semibold text-black">
                Kembali
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
