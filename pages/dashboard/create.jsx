import Head from "next/head";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// reactflatpicr css
import "flatpickr/dist/flatpickr.css";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Form from "@/components/Form";
import CandidateForm from "@/components/Candidate/CandidateForm";

export default function CreateVoting() {
  const token = Cookies.get("token");
  const router = useRouter();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState([]);

  const addCandidateForm = () => {
    const newCandidate = {
      name: "",
      key: candidates.length + 1,
    };
    setCandidates([...candidates, newCandidate]);
  };

  const removeCandidateForm = (key) => {
    const newCandidates = candidates.filter(
      (candidate) => candidate.key !== key,
    );

    newCandidates.forEach((candidate, index) => {
      candidate.key = index + 1;
    });

    setCandidates(newCandidates);
  };

  const submitCandidate = (candidate) => {
    setCandidates(
      candidates.map((c) => (c.key === candidate.key ? candidate : c)),
    );
  };

  const handleCreateVoting = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
        {
          name: title,
          start: startDate,
          end: endDate,
          candidates: candidates,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        return router.push("/dashboard");
      }
    } catch (error) {
      error.response.data.errors.map((error) => {
        Swal.fire({
          title: "Ups",
          text: error.message,
          icon: "error",
        });
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
              <img src="/assets/img-2.svg" alt="img" className="w-[430px]" />

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

                <div className="flex items-center justify-between">
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu Mulai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{ time_24hr: true, minDate: Date.now() }}
                      onClose={(date) => {
                        if (date.length == 0) {
                          return Swal.fire({
                            title: "Ups",
                            text: "Isi dulu waktu mulai votingnya ya 😄",
                            icon: "warning",
                          });
                        }
                        setStartDate(date[0].getTime());
                      }}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60"
                      placeholder="Pilih Waktu Mulai"
                    />
                  </div>
                  <span className="pt-[24px] font-semibold text-black">
                    s/d
                  </span>
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu Selesai
                    </label>

                    <Flatpickr
                      data-enable-time
                      options={{ time_24hr: true, minDate: startDate }}
                      onClose={(date) => {
                        if (date.length == 0) {
                          return Swal.fire({
                            title: "Ups",
                            text: "Isi dulu waktu selesai votingnya ya 😄",
                            icon: "warning",
                          });
                        }
                        setEndDate(date[0].getTime());
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
                    submitCandidate={submitCandidate}
                    removeCandidateForm={removeCandidateForm}
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
              <Button
                text="Buat Voting 🚀"
                variant="fill"
                onClick={handleCreateVoting}
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
