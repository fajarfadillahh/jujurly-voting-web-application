// import utility
import Head from "next/head";
import Image from "next/image";
import Cookies from "js-cookie";
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useRouter } from "next/router";
import { launchAlert, launchToast } from "@/utils/sweetalert";
import { useTheme } from "next-themes";

// reactflatpicr css
import "flatpickr/dist/flatpickr.css";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Form from "@/components/Form";
import CandidateForm from "@/components/Candidate/CandidateForm";
import LoadingButton from "@/components/LoadingButton";

// import utils
import fetcher from "@/utils/fetcher";

export default function EditVoting({ rooms }) {
  const token = Cookies.get("token");
  const router = useRouter();
  const { theme } = useTheme();

  const [title, setTitle] = useState(rooms.data.name);
  const [startFromInput, setStartFromInput] = useState(null);
  const [endFromInput, setEndFromInput] = useState(null);
  const [startFromData, setStartFromData] = useState(rooms.data.start);
  const [endFromData, setEndFromData] = useState(rooms.data.end);
  const [candidates, setCandidates] = useState(rooms.data.candidates);
  const [isLoading, setIsLoading] = useState(false);

  const addCandidateForm = () => {
    const newCandidate = {
      name: "",
      id: candidates.length + 1,
    };
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidateForm = (id) => {
    const newCandidates = candidates.filter((candidate) => candidate.id !== id);

    setCandidates(newCandidates);
  };

  const handleCandidateName = (value, id) => {
    const indexOfCandidate = candidates.findIndex(
      (candidate) => candidate.id == id,
    );

    candidates[indexOfCandidate] = {
      id,
      name: value,
    };

    setCandidates([...candidates]);
  };

  const handleUpdateVoting = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/rooms",
        "PATCH",
        {
          room_id: rooms.data.id,
          name: title,
          start: startFromInput ? startFromInput : startFromData,
          end: endFromInput ? endFromInput : endFromData,
          candidates: candidates,
        },
        token,
      );

      if (data.success) {
        launchToast("success", "Edit data nya berhasil 😄");
        return router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      error.response.data.errors.map((error) => {
        launchAlert("Ups", error.message, "error");
      });
    }
  };

  return (
    <>
      <Head>
        <title>Edit voting yang sudah dibuat!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-32">
          <div className="container grid gap-16">
            <div className="grid gap-4">
              <Image
                src={`/assets/${theme == "dark" ? "img-2-dark" : "img-2"}.svg`}
                alt="img"
                className="w-[430px]"
                width={430}
                height={430}
              />

              <div>
                <h1 className="section-title">Edit Voting 🐳</h1>
                <p className="section-text">
                  Edit data yang dibutuhkan dan pastikan semua bener yaa.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <h1 className="text-[24px] font-bold text-black dark:text-white">
                Detail Voting
              </h1>

              <div className="grid max-w-[600px] gap-4">
                <div className="grid gap-2">
                  <label className="font-semibold text-black dark:text-white">
                    Judul
                  </label>
                  <Form
                    type="text"
                    placeholder="Contoh: Pemilihan Ketua Osis"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    setTitle={setTitle}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <div className="grid gap-2">
                    <label className="font-semibold text-black dark:text-white">
                      Waktu Mulai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{
                        time_24hr: true,
                        minDate: Date.now(),
                      }}
                      value={
                        startFromData > Date.now() ? startFromData : Date.now()
                      }
                      onClose={(date) => {
                        if (date.length == 0) {
                          return launchAlert(
                            "Ups",
                            "Isi dulu waktu mulai votingnya ya 😄",
                            "warning",
                          );
                        }
                        setStartFromInput(date[0].getTime());
                      }}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
                      placeholder="Pilih Waktu Mulai"
                    />
                  </div>
                  <span className="font-semibold text-black dark:text-white sm:pt-[24px]">
                    s/d
                  </span>
                  <div className="grid gap-2">
                    <label className="font-semibold text-black dark:text-white">
                      Waktu Selesai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{ time_24hr: true, minDate: startFromInput }}
                      value={endFromInput ? endFromInput : endFromData}
                      onClose={(date) => {
                        if (date.length == 0) {
                          return launchAlert(
                            "Ups",
                            "Isi dulu waktu selesai votingnya ya 😄",
                            "warning",
                          );
                        }
                        setEndFromInput(date[0].getTime());
                      }}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
                      placeholder="Pilih Waktu Selesai"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <h1 className="text-[24px] font-bold text-black dark:text-white">
                Kandidat
              </h1>

              <div className="flex flex-wrap gap-5">
                {candidates.map((candidate, index) => (
                  <CandidateForm
                    key={index}
                    candidate={candidate}
                    removeCandidateForm={removeCandidateForm}
                    index={index}
                    handleCandidateName={handleCandidateName}
                  />
                ))}

                <div
                  className="flex aspect-square h-[64px] w-[64px] cursor-pointer items-center justify-center bg-black/10 text-[2rem] text-black/40 hover:bg-black/20 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-500"
                  onClick={() => addCandidateForm()}
                >
                  <HiOutlinePlus />
                </div>
              </div>
            </div>

            <div className="justify-self-end">
              {isLoading ? (
                <LoadingButton className="w-[227px]" />
              ) : (
                <Button
                  text="Perbarui Voting 🚀"
                  variant="fill"
                  onClick={handleUpdateVoting}
                />
              )}
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
    const { data } = await fetcher(
      `/rooms?id=${params.id}`,
      "GET",
      null,
      token,
    );

    if (data.success) {
      return {
        props: {
          rooms: data,
        },
      };
    }
  } catch (error) {
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
