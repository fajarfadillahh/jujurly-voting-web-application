import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        { email, password },
      );

      if (data.success) {
        setCookie("token", data.data.token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        });
        return router.push("/dashboard");
      }
    } catch (error) {
      error.response.data.errors.map((error) => {
        alert(error.message);
      });
    }
  }

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
              <Form
                type="email"
                placeholder="Alamat Email"
                onChange={handleEmail}
                value={email}
              />
              <Form
                type="password"
                placeholder="Kata Sandi"
                onChange={handlePassword}
                value={password}
              />
            </form>

            <Button
              text="Masuk"
              variant="fill"
              className="w-full"
              onClick={handleLogin}
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
