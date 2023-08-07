import Head from "next/head";
import { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
registerLocale("id", id);

// reactdatepicker css
import "react-datepicker/dist/react-datepicker.css";

// import components
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Form from "@/components/Form";

export default function CreateVoting() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu mulai
                    </label>
                    <ReactDatePicker
                      dateFormat="d MMMM yyyy, HH:mm"
                      minDate={new Date()}
                      locale={"id"}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60"
                      placeholderText="Pilih waktu kapan dimulai"
                    />
                  </div>
                  <span className="pt-[24px] font-semibold text-black">
                    s/d
                  </span>
                  <div className="grid gap-2">
                    <label className="font-semibold text-black">
                      Waktu selesai
                    </label>
                    <ReactDatePicker
                      dateFormat="dd MMMM yyyy, HH:mm"
                      minDate={new Date()}
                      locale={"id"}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60"
                      placeholderText="Pilih waktu kapan selesai"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <h1 className="text-[24px] font-bold text-black">Kandidat</h1>

              <div>kandidat form</div>
            </div>

            <div className="justify-self-end">
              <Button text="Buat Voting 🚀" variant="fill" />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
