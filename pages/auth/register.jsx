import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";
import LoadingButton from "@/components/LoadingButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleFullname = (e) => {
    setFullname(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function handleRegister() {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        { email, fullname, password },
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
              <Form
                type="email"
                placeholder="Alamat Email"
                value={email}
                onChange={handleEmail}
              />
              <Form
                type="text"
                placeholder="Nama Lengkap"
                value={fullname}
                onChange={handleFullname}
              />
              <Form
                type="password"
                placeholder="Kata Sandi"
                value={password}
                onChange={handlePassword}
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
