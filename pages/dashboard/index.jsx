import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function Admin({ rooms }) {
  const router = useRouter();

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

            <img src="/assets/img-5.svg" alt="hero img" className="w-[400px]" />

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

              {rooms.data.map((room, index) => {
                return (
                  <tbody key={room.id}>
                    <tr>
                      <td className="p-5 text-left font-semibold text-black">
                        {index + 1}.
                      </td>
                      <td className="p-5 text-left">
                        <a
                          href={`http://localhost:3000/rooms/${room.code}`}
                          className="font-semibold text-black hover:underline"
                          target="_blank"
                        >
                          {room.name}
                        </a>
                      </td>
                      <td className="p-5 text-left font-medium uppercase text-black">
                        {room.code}
                      </td>
                      <td className="p-5 text-left font-semibold text-black">
                        {room.start}
                      </td>
                      <td className="p-5 text-left font-semibold text-black">
                        {room.end}
                      </td>
                      <td className="p-5 text-left font-semibold text-black">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            href="#"
                            className="p-1 text-[22px] text-black hover:bg-black/10"
                          >
                            <HiOutlinePencilAlt />
                          </Link>
                          <Link
                            href="#"
                            className="p-1 text-[22px] text-black hover:bg-black/10"
                          >
                            <HiOutlineTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    props: {
      rooms: await response.json(),
    },
  };
}
