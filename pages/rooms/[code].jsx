// import utility
import { useState, useEffect } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "@/utils/fetcher";
import { launchAlert, launchToast } from "@/utils/sweetalert";
import swrfetch from "@/utils/swrfetch";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";
import LoadingScreen from "@/components/LoadingScreen";
import Head from "next/head";
import Link from "next/link";

export default function Voting(props) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR(`/rooms/?code=${props.code}`, swrfetch, {
    fallback: props.rooms,
    refreshInterval: Date.now() < props.rooms.data.end ? 10000 : false,
    revalidateOnFocus: false,
  });

  const handleSubmitVoting = async () => {
    setLoading(true);
    try {
      const { data } = await fetcher(
        "/rooms/votes",
        "POST",
        {
          room_id: rooms.data.id,
          code: rooms.data.code,
          candidate: {
            id: selectedCandidate,
          },
        },
        token,
      );

      if (data.success) {
        mutate();
        setLoading(false);

        const votes = JSON.parse(localStorage.getItem("votes"));

        votes.push({
          room_id: rooms.data.id,
        });

        localStorage.setItem("votes", JSON.stringify(votes));

        setIsAvailable(false);

        return launchToast("success", "Vote data nya berhasil 😄");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status == 409) {
        return launchAlert("Ups", "Kamu cuma boleh vote sekali 😄", "error");
      }

      launchAlert("Ups", error.message, "error");
    }
  };

  useEffect(() => {
    setIsClient(true);
    const votes = localStorage.getItem("votes");

    if (votes) {
      const parse = JSON.parse(votes);

      if (parse.find((vote) => vote.room_id == props.rooms.data.id)) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    }

    if (Date.now() > props.rooms.data.end) {
      setIsAvailable(false);
    }
  }, [setIsAvailable]);

  if (!isClient) {
    return;
  }

  if (isLoading || loading) {
    return <LoadingScreen isLoading={isLoading || loading} />;
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
              <h1 className="section-title mx-auto max-w-[920px]">
                {rooms.data.name}
              </h1>

              {/* countdown components */}
              <CountDown
                end={rooms.data.end}
                handleComplete={() => setIsAvailable(false)}
              />
            </div>

            {/* candidate components */}
            <div className="grid w-full justify-items-center gap-6 sm:max-w-[850px]">
              {rooms.data.candidates.map((candidate, index) => {
                return (
                  <CandidateItem
                    key={candidate.id}
                    index={index}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    isAvailable={isAvailable}
                    onClick={() => {
                      setSelectedCandidate(candidate.id);
                    }}
                  />
                );
              })}
            </div>

            <div className="grid justify-items-center gap-4">
              {isAvailable ? (
                <Button
                  text="Kirim Voting 🚀"
                  variant="fill"
                  className="mt-8"
                  onClick={handleSubmitVoting}
                />
              ) : (
                <span className="text-[20px] font-medium text-red-500">
                  Kesempatan buat vote cuma 1 kali yaaa 😁
                </span>
              )}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 font-semibold text-black hover:underline dark:text-white"
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
    const { data, status } = await fetcher(
      `/rooms?code=${params.code}`,
      "GET",
      null,
      token,
    );

    if (data.success) {
      return {
        props: {
          rooms: data,
          code: params.code,
        },
      };
    }

    return {
      redirect: {
        destination: `/ups?code=${status}&message=${data.errors[0].message}`,
      },
    };
  } catch (error) {
    if (error.response.status == 404) {
      return {
        redirect: {
          destination: "/rooms?code=404",
        },
      };
    }

    return {
      redirect: {
        destination: `/ups?code=${error.response.status}&message=${error.response.statusText}`,
      },
    };
  }
}
