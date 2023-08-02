import Head from "next/head";
import { useState } from "react";

// import components
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>Ayo masuk dulu, biar ketahuan kamu milih siapa.</title>
      </Head>

      <main className="main flex items-center justify-center">
        <section className="container grid justify-items-center gap-8">
          <div className="text-center">
            <h1 className="section-title">Hi, Selamat datang kembali 👏</h1>
            <p className="section-text">
              Ayo masuk dulu, biar ketahuan kamu milih siapa.
            </p>
          </div>

          <div className="mx-auto grid min-w-[420px] gap-[30px]">
            <form action="" className="grid gap-2">
              <Form
                type="email"
                placeholder="Alamat Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <Button
              text="Masuk"
              variant="fill"
              className="w-full"
              onClick={() => {
                console.log("Name:", name);
                console.log("Password:", password);
              }}
            />
          </div>

          <div className="text-[14px] font-medium text-black/60">
            Belum punya akun? Klik{" "}
            <a href="#" className="font-bold text-black">
              disini
            </a>{" "}
            untuk daftar
          </div>
        </section>
      </main>
    </>
  );
}
