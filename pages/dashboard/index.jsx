import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Cookies from "js-cookie";
import Image from "next/image";

// import utils
import { convertTime } from "@/utils/convert";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";

export default function Admin(props) {
  const router = useRouter();
  const token = Cookies.get("token");

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR("rooms", fetcher, {
    revalidateOnFocus: false,
    fallback: props.rooms,
  });

  async function fetcher(url) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      return error;
    }
  }

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
        try {
          const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                room_id: room_id,
                code,
              },
            },
          );

          if (data.success) {
            Swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              text: "Hapus data nya berhasil 😄",
              timer: 1500,
              icon: "success",
              timerProgressBar: true,
            });

            // do refetch
            mutate();
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Ups",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  }

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

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
          <div className="container grid justify-items-center gap-8">
            <div className="text-center">
              <h1 className="section-title">
                Hi, Senang bisa melihatmu lagi 👏
              </h1>
              <p className="section-text">
                Mulai sekarang kamu sudah bisa ikut atau membuat voting.
              </p>
            </div>

            <Image
              src="/assets/img-5.svg"
              alt="hero img"
              className="w-[400px]"
              width={400}
              height={400}
            />

            <div className="inline-flex items-center gap-6">
              <Button
                text="Ikut Voting"
                variant="fill"
                onClick={() => router.push("/rooms")}
              />
              <Button
                text="Buat Voting"
                variant="stroke"
                onClick={() => router.push("/dashboard/create")}
              />
            </div>
          </div>
        </section>

        {/* ===== table section ===== */}
        <section className="py-16">
          <div className="container grid gap-6">
            <h1 className="text-[24px] font-bold text-black">
              Voting yang sudah dibuat.
            </h1>

            <table className="w-full table-auto border-[2px] border-black/10">
              <thead className="border-b-[2px] border-black/10">
                <tr>
                  <th className="p-5 text-left font-bold text-black">No</th>
                  <th className="p-5 text-left font-bold text-black">Judul</th>
                  <th className="p-5 text-left font-bold text-black">Kode</th>
                  <th className="p-5 text-left font-bold text-black">Mulai</th>
                  <th className="p-5 text-left font-bold text-black">
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
                      className="p-5 text-center font-semibold text-black"
                    >
                      Waduh belum ada datanya nih 😀
                    </td>
                  </tr>
                ) : (
                  rooms.data.map((room, index) => {
                    return (
                      <tr key={room.id}>
                        <td className="p-5 text-left font-semibold text-black">
                          {index + 1}.
                        </td>
                        <td className="max-w-[420px] p-5 text-left">
                          <Link
                            href={`/rooms/${room.code}`}
                            className="font-semibold text-black hover:underline"
                          >
                            {room.name}
                          </Link>
                        </td>
                        <td className="p-5 text-left font-medium uppercase text-black">
                          {room.code}
                        </td>
                        <td className="p-5 text-left font-semibold text-black">
                          {convertTime(room.start)}
                        </td>
                        <td className="p-5 text-left font-semibold text-black">
                          {convertTime(room.end)}
                        </td>
                        <td className="p-5 text-left font-semibold text-black">
                          <div className="flex items-center justify-center gap-3">
                            <Link
                              href="#"
                              className="p-1 text-[22px] text-black hover:bg-black/10"
                            >
                              <HiOutlinePencilAlt />
                            </Link>
                            <button
                              className="p-1 text-[22px] text-black hover:bg-black/10"
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
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      props: {
        rooms: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: `/404?code=${error.response.status}`,
      },
    };
  }
}
