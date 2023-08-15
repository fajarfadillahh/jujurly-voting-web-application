import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";

export default function Voting({ rooms }) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [cookie, setCookie] = useCookies();
  const token = cookie.token;
  const router = useRouter();

  const handleSubmitVoting = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/votes`,
        {
          room_id: rooms.data.id,
          code: rooms.data.code,
          candidate: {
            id: selectedCandidate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        return router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }
  return (
    <>
      <Head>
        <title>Ayo, Tentukan pilihan kamu sekarang!</title>
      </Head>

      <Layout>
        {/* ===== voting section ===== */}
        <section className="pb-16 pt-32">
          <div className="container grid justify-items-center gap-8">
            <div className="text-center">
              <h1 className="section-title mx-auto w-[820px]">
                {rooms.data.name}
              </h1>

              {/* countdown components */}
              <CountDown end={rooms.data.end} />
            </div>

            {/* candidate components */}
            <div className="grid justify-items-center gap-6">
              {rooms.data.candidates.map((candidate, index) => {
                return (
                  <CandidateItem
                    key={candidate.id}
                    index={index}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    onClick={() => {
                      setSelectedCandidate(candidate.id);
                    }}
                  />
                );
              })}
            </div>

            <div className="grid justify-items-center gap-4">
              <Button
                text="Kirim Voting 🚀"
                variant="fill"
                className="mt-8"
                onClick={handleSubmitVoting}
              />

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
              >
                Kembali
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const token = req.cookies.token;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms?code=${params.code}`,
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
