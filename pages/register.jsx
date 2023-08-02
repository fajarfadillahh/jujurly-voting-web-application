import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

// import components
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Head>
        <title>
          Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
        </title>
      </Head>

      <main className="main flex items-center justify-center">
        <section className="container grid justify-items-center gap-8">
          <div className="text-center">
            <h1 className="section-title">Selamat datang di Jujurly 💃</h1>
            <p className="section-text">
              Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
            </p>
          </div>

          <div className="mx-auto grid min-w-[420px] gap-[30px]">
            <form action="" className="grid gap-2">
              <Form
                type="email"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form
                type="text"
                placeholder="Nama Lengkap"
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
              text="Daftar"
              variant="fill"
              className="w-full"
              onClick={() => {
                console.log("Email:", email);
                console.log("Name:", name);
                console.log("Password:", password);
              }}
            />
          </div>

          <div className="text-[14px] font-medium text-black/60">
            Sudah punya akun? Klik{" "}
            <Link href="/login" className="font-bold text-black">
              disini
            </Link>{" "}
            untuk masuk
          </div>
        </section>
      </main>
    </>
  );
}
