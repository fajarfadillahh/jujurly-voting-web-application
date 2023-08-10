import Head from "next/head";
import { useState, useEffect } from "react";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import CountDown from "@/components/CountDown/CountDown";
import CandidateItem from "@/components/Candidate/CandidateItem";

export default function Voting({ rooms }) {
  const [isClient, setIsClient] = useState(false);

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
              <h1 className="section-title">{rooms.data.name}</h1>

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
                    name={candidate.name}
                    percentage={candidate.percentage}
                  />
                );
              })}
            </div>

            <Button text="Kirim Voting 🚀" variant="fill" className="mt-8" />
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const token = req.cookies.token;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms?code=${params.code}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status == 400 || response.status == 404) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  return {
    props: {
      rooms: await response.json(),
    },
  };
}