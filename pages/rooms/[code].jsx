import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";
import LoadingScreen from "@/components/LoadingScreen";

export default function Voting(props) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const token = Cookies.get("token");

  const {
    data: rooms,
    mutate,
    isLoading,
  } = useSWR(`rooms/?code=${props.code}`, fetcher, {
    fallback: props.rooms,
    refreshInterval: Date.now() < props.rooms.data.end ? 10000 : false,
    revalidateOnFocus: false,
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
        mutate();

        const votes = JSON.parse(localStorage.getItem("votes"));

        votes.push({
          room_id: rooms.data.id,
        });

        localStorage.setItem("votes", JSON.stringify(votes));

        setIsAvailable(false);

        return Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          text: "Vote data nya berhasil 😄",
          timer: 2000,
          icon: "success",
          timerProgressBar: true,
        });
      }
    } catch (error) {
      if (error.response.status == 409) {
        return Swal.fire({
          title: "Ups",
          text: error.response.data.errors[0].message,
          icon: "error",
        });
      }

      Swal.fire({
        title: "Ups",
        text: error.message,
        icon: "error",
      });
    }
  };

  function handleComplete() {
    setIsAvailable(false);
  }

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

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
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
              <CountDown end={rooms.data.end} handleComplete={handleComplete} />
            </div>

            {/* candidate components */}
            <div className="grid w-[850px] justify-items-center gap-6">
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
                  "Kesempatan buat vote cuma 1 kali yaaa 😁"
                </span>
              )}
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
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms?code=${params.code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
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
    console.log(error);
    if (error.response.status == 404) {
      return {
        redirect: {
          destination: "/404",
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
