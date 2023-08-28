// import utility
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import { launchAlert } from "@/utils/sweetalert";

// reactflatpicr css
import "flatpickr/dist/flatpickr.css";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Form from "@/components/Form";
import CandidateForm from "@/components/Candidate/CandidateForm";
import LoadingButton from "@/components/LoadingButton";
import Head from "next/head";
import Flatpickr from "react-flatpickr";
import Image from "next/image";

export default function CreateVoting() {
  const token = Cookies.get("token");
  const router = useRouter();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState([]);
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

  const handleCreateVoting = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetcher(
        "/rooms",
        "POST",
        {
          name: title,
          start: startDate,
          end: endDate,
          candidates: candidates,
        },
        token,
      );

      if (data.success) {
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
        <title>Buat voting kamu sekarang!</title>
      </Head>

      <Layout>
        <section className="pb-16 pt-32">
          <div className="container grid gap-16">
            <div className="grid gap-4">
              <Image
                src="/assets/img-2.svg"
                alt="img"
                className="w-[430px]"
                width={430}
                height={430}
              />

              <div>
                <h1 className="section-title">Buat Voting Baru 👷</h1>
                <p className="section-text">
                  Masukan data yang dibutuhkan sebelum membuat vote online.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <h1 className="text-[24px] font-bold text-black">
                Detail Voting
              </h1>

              <div className="grid max-w-[600px] gap-4">
                <div className="grid gap-2">
                  <label className="font-semibold text-black">Judul</label>
                  <Form
                    type="text"
                    placeholder="Contoh: Pemilihan Ketua Osis"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu Mulai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{ time_24hr: true, minDate: Date.now() }}
                      onClose={(date) => {
                        if (date.length == 0) {
                          return launchAlert(
                            "ups",
                            "Isi dulu waktu mulai votingnya ya 😄",
                            "warning",
                          );
                        }
                        setStartDate(date[0].getTime());
                      }}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60"
                      placeholder="Pilih Waktu Mulai"
                    />
                  </div>
                  <span className="font-semibold text-black sm:pt-6">s/d</span>
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu Selesai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{ time_24hr: true, minDate: startDate }}
                      onClose={(date) => {
                        if (date.length == 0) {
                          return launchAlert(
                            "ups",
                            "Isi dulu waktu selesai votingnya ya 😄",
                            "warning",
                          );
                        }
                      }}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60"
                      placeholder="Pilih Waktu Selesai"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <h1 className="text-[24px] font-bold text-black">Kandidat</h1>

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
                  className="flex aspect-square h-[64px] w-[64px] cursor-pointer items-center justify-center bg-black/10 text-[2rem] text-black/40 hover:bg-black/20"
                  onClick={() => addCandidateForm()}
                >
                  <HiOutlinePlus />
                </div>
              </div>
            </div>

            <div className="justify-self-end">
              {isLoading ? (
                <LoadingButton className="w-[197px]" />
              ) : (
                <Button
                  text="Buat Voting 🚀"
                  variant="fill"
                  onClick={handleCreateVoting}
                />
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
