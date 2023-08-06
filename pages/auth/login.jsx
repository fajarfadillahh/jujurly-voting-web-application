import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ayo masuk dulu, biar ketahuan kamu milih siapa.</title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid justify-items-center gap-8">
          <div className="text-center">
            <h1 className="section-title">Hi, Selamat datang kembali 👏</h1>
            <p className="section-text">
              Ayo masuk dulu, biar ketahuan kamu milih siapa.
            </p>
          </div>

          <div className="mx-auto grid min-w-[420px] gap-[30px]">
            <form action="" className="grid gap-2">
              <Form type="email" placeholder="Alamat Email" />
              <Form type="password" placeholder="Kata Sandi" />
            </form>

            <Button
              text="Masuk"
              variant="fill"
              className="w-full"
              onClick={() => router.push("/dashboard")}
            />
          </div>

          <div className="text-[14px] font-medium text-black/60">
            Belum punya akun? Klik{" "}
            <Link href="/auth/register" className="font-bold text-black">
              disini
            </Link>{" "}
            untuk daftar
          </div>
        </section>
      </Layout>
    </>
  );
}
