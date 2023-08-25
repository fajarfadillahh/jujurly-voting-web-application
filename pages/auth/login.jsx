// import utility
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import fetcher from "@/utils/fetcher";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";
import LoadingButton from "@/components/LoadingButton";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/users/login",
        "POST",
        {
          email,
          password,
        },
        null,
      );

      if (data.success) {
        Cookies.set("token", data.data.token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        });
        return (window.location.href = "/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      error.response.data.errors.map((error) => {
        Swal.fire({
          title: "Ups",
          text: error.message,
          icon: "error",
        });
      });
    }
  }

  return (
    <>
      <Head>
        <title>Ayo masuk dulu, biar ketahuan kamu milih siapa.</title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid gap-8">
          <div className="text-center">
            <h1 className="section-title">Hi, Selamat datang kembali 👏</h1>
            <p className="section-text">
              Ayo masuk dulu, biar ketahuan kamu milih siapa.
            </p>
          </div>

          <div className="mx-auto grid w-full gap-8 sm:max-w-[420px]">
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

            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                text="Masuk"
                variant="fill"
                className="w-full"
                onClick={handleLogin}
              />
            )}
          </div>

          <div className="justify-self-center text-[14px] font-medium text-black/60">
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
