// import utility
import { useState } from "react";
import Cookies from "js-cookie";
import fetcher from "@/utils/fetcher";
import { launchAlert } from "@/utils/sweetalert";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";
import LoadingButton from "@/components/LoadingButton";
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/users/register",
        "POST",
        { email, fullname, password },
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
        launchAlert("Ups", error.message, "error");
      });
    }
  }

  return (
    <>
      <Head>
        <title>
          Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
        </title>
      </Head>

      <Layout className="flex items-center justify-center">
        <section className="container grid gap-8">
          <div className="text-center">
            <h1 className="section-title">Selamat datang di Jujurly 💃</h1>
            <p className="section-text">
              Silakan buat akun terlebih dahulu, sebelum kamu mulai voting.
            </p>
          </div>

          <div className="mx-auto grid w-full gap-8 sm:max-w-[420px]">
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
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Form
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                text="Daftar"
                variant="fill"
                className="w-full"
                onClick={handleRegister}
              />
            )}
          </div>

          <div className="justify-self-center text-[14px] font-medium text-black/60 dark:text-white">
            Sudah punya akun? Klik{" "}
            <Link
              href="/auth/login"
              className="font-bold text-black hover:underline dark:text-white"
            >
              disini
            </Link>{" "}
            untuk masuk
          </div>
        </section>
      </Layout>
    </>
  );
}
