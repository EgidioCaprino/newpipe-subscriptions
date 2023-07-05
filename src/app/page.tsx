import Converter from "@/components/Converter";
import { Fragment } from "react";

const HomePage = () => (
  <Fragment>
    <header className="flex justify-end gap-8 p-8 text-slate-500">
      <a href="https://github.com/EgidioCaprino/newpipe-subscriptions/issues/new">
        Support
      </a>
      <a href="https://github.com/EgidioCaprino/newpipe-subscriptions">
        Github
      </a>
    </header>
    <main className="flex flex-col items-center content-center space-y-8 p-24 font-sans">
      <h1 className="text-xl">From Invidious to NewPipe</h1>
      <Converter />
    </main>
  </Fragment>
);

export default HomePage;
