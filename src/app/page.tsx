import Header from "./components/Header";

declare global {
  interface Window {
    xfi: any; // Replace 'any' with the actual type of 'xfi' if you know it
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
