import Header from "./components/Header";

declare global {
  interface Window {
    xfi: any;
  }
}

export default function Home() {
  return (
    <div className="body bg-[#111524] flex flex-col relative">
      <main>
        <Header />
        home
      </main>
    </div>
  );
}
