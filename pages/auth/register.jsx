import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

// import components
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies();

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
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        { email, fullname, password },
      );

      if (data.success) {
        setCookie("token", data.data.token, { path: "/" });
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

            <Button
              text="Daftar"
              variant="fill"
              className="w-full"
              onClick={handleRegister}
            />
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
