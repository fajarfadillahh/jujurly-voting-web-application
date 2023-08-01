import Head from "next/head";

// import components
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Welcome to Jujurly - The best web voting application in the world!
        </title>
      </Head>

      <Navbar />

      <main className="main">
        <div>main section</div>
      </main>
    </>
  );
}
