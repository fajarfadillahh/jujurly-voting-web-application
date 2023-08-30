// import utility
import useSWR from "swr";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { convertTime } from "@/utils/convert";
import { launchAlert, launchToast } from "@/utils/sweetalert";
import { useTheme } from "next-themes";

import fetcher from "@/utils/fetcher";
import swrfetch from "@/utils/swrfetch";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Form from "@/components/Form";

export default function Admin(props) {
  const router = useRouter();
  const token = Cookies.get("token");
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR("/rooms", swrfetch, {
    revalidateOnFocus: false,
    fallback: props.rooms,
  });

  function handleDelete(room_id, code) {
    Swal.fire({
      title: "Yakin nih mau hapus room?😀",
      text: "Bakalan ke hapus beneran loh..",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Hapus aja",
      cancelButtonText: "Ga jadi",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const { data } = await fetcher(
            "/rooms",
            "DELETE",
            {
              room_id: room_id,
              code,
            },
            token,
          );

          if (data.success) {
            mutate();
            setLoading(false);
            launchToast("success", "Hapus data nya berhasil 😄");
          }
        } catch (error) {
          setLoading(false);
          launchAlert("Ups", error.message, "error");
        }
      }
    });
  }

  if (isLoading || loading) {
    return <LoadingScreen isLoading={isLoading || loading} />;
  }

  const filteredRooms = rooms.data.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Head>
        <title>
          Selamat datang di Jujurly. - Aplikasi voting berbasis web terbaik di
          Indonesia!
        </title>
      </Head>

      <Layout>
        {/* ===== hero section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid gap-8">
            <div className="text-center">
              <h1 className="section-title">
                Hi, Senang bisa melihatmu lagi 👏
              </h1>
              <p className="section-text">
                Mulai sekarang kamu sudah bisa ikut atau membuat voting.
              </p>
            </div>

            <Image
              src={`/assets/${theme == "dark" ? "img-5-dark" : "img-5"}.svg`}
              alt="hero img"
              className="w-[400px] justify-self-center"
              width={400}
              height={400}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button
                text="Ikut Voting"
                variant="fill"
                className="w-full sm:w-auto"
                onClick={() => router.push("/rooms")}
              />
              <Button
                text="Buat Voting"
                variant="stroke"
                className="w-full sm:w-auto"
                onClick={() => router.push("/dashboard/create")}
              />
            </div>
          </div>
        </section>

        {/* ===== table section ===== */}
        <section className="py-16">
          <div className="container grid gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-[24px] font-bold text-black dark:text-white">
                Voting yang sudah dibuat.😁
              </h1>

              <Form
                type="text"
                placeholder="Cari voting yang sudah dibuat.."
                className="max-w-[350px] px-5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-scroll sm:overflow-x-hidden">
              <table className="w-[1000px] table-auto border-[2px] border-black/10 dark:border-zinc-700 sm:w-[1280px]">
                <thead className="border-b-[2px] border-black/10 dark:border-zinc-700">
                  <tr>
                    <th className="p-5 text-left font-bold text-black dark:text-white">
                      No
                    </th>
                    <th className="p-5 text-left font-bold text-black dark:text-white">
                      Judul Voting
                    </th>
                    <th className="p-5 text-left font-bold text-black dark:text-white">
                      Kode
                    </th>
                    <th className="p-5 text-left font-bold text-black dark:text-white">
                      Mulai
                    </th>
                    <th className="p-5 text-left font-bold text-black dark:text-white">
                      Selesai
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.data.length == 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-5 text-center font-semibold text-black dark:text-white"
                      >
                        Waduh belum ada datanya nih 😀
                      </td>
                    </tr>
                  ) : (
                    filteredRooms?.map((room, index) => {
                      return (
                        <tr key={room.id}>
                          <td className="p-5 text-left font-semibold text-black dark:text-white">
                            {index + 1}.
                          </td>
                          <td className="max-w-[420px] p-5 text-left">
                            <Link
                              href={`/rooms/${room.code}`}
                              className="font-semibold text-black hover:underline dark:text-white"
                            >
                              {room.name}
                            </Link>
                          </td>
                          <td className="p-5 text-left font-medium uppercase text-black dark:text-white">
                            {room.code}
                          </td>
                          <td className="p-5 text-left font-semibold text-black dark:text-white">
                            {convertTime(room.start)}
                          </td>
                          <td className="p-5 text-left font-semibold text-black dark:text-white">
                            {convertTime(room.end)}
                          </td>
                          <td className="p-5 text-left font-semibold text-black dark:text-white">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={`/dashboard/edit/${room.id}`}
                                className="p-1 text-[22px] text-black hover:bg-black/10 dark:text-white dark:hover:bg-zinc-500"
                              >
                                <HiOutlinePencilAlt />
                              </Link>
                              <button
                                className="p-1 text-[22px] text-black hover:bg-black/10 dark:text-white dark:hover:bg-zinc-500"
                                onClick={() => handleDelete(room.id, room.code)}
                              >
                                <HiOutlineTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  try {
    const { data } = await fetcher("/rooms", "GET", null, token);

    return {
      props: {
        rooms: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/ups?code=${error.response.status}&message=${error.response.statusText}`,
      },
    };
  }
}
