import Head from "next/head";
import Link from "next/link";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Register() {
  return (
    <>
      <Head>
        <title>
          Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
        </title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid justify-items-center gap-8">
          <div className="text-center">
            <h1 className="section-title">Selamat datang di Jujurly 💃</h1>
            <p className="section-text">
              Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
            </p>
          </div>

          <div className="mx-auto grid min-w-[420px] gap-[30px]">
            <form action="" className="grid gap-2">
              <Form type="email" placeholder="Alamat Email" />
              <Form type="text" placeholder="Nama Lengkap" />
              <Form type="password" placeholder="Kata Sandi" />
            </form>

            <Button text="Daftar" variant="fill" className="w-full" />
          </div>

          <div className="text-[14px] font-medium text-black/60">
            Sudah punya akun? Klik{" "}
            <Link href="/auth/login" className="font-bold text-black">
              disini
            </Link>{" "}
            untuk masuk
          </div>
        </section>
      </Layout>
    </>
  );
}
