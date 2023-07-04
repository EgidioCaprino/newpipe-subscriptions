import Converter from "@/components/Converter";

const HomePage = () => (
  <main className="flex flex-col items-center content-center space-y-8 p-24 font-sans">
    <h1 className="text-xl">From Invidious to NewPipe</h1>
    <Converter />
  </main>
);

export default HomePage;
