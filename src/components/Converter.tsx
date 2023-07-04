"use client";

import { ChangeEvent, Fragment, useState } from "react";
import { parseChannels } from "@/invidious";
import { createNewPipeSubscriptions } from "@/newpipe";
import DownloadableFile from "./DownloadableFile";

const Converter = () => {
  const [error, setError] = useState<Error | null>(null);
  const [newPipeSubscriptions, setNewPipeSubscriptions] = useState<
    object | null
  >(null);

  const processFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.length) {
      throw new Error("No file loaded");
    }
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (typeof fileReader.result === "string") {
        try {
          const channels = await parseChannels(fileReader.result);
          const newPipeSubscriptions = createNewPipeSubscriptions(channels);
          setNewPipeSubscriptions(newPipeSubscriptions);
          setError(null);
          return;
        } catch (error) {
          console.error(error);
        }
      }
      setError(new Error("Invalid file loaded"));
    };
    fileReader.onerror = () => {
      const error = new Error("Unable to read file");
      error.cause = fileReader.error;
      setError(error);
    };
    fileReader.readAsText(files[0]);
  };

  const blob = new Blob([JSON.stringify(newPipeSubscriptions)], {
    type: "text/plain",
  });

  return (
    <Fragment>
      {error && <p className="text-center text-red-700">{error.message}</p>}
      {!newPipeSubscriptions && (
        <Fragment>
          <p className="text-center">
            Load the subscriptions file you exported from Invidious
          </p>
          <input
            type="file"
            onChange={processFile}
            className="file:border file:border-solid"
          />
        </Fragment>
      )}
      {newPipeSubscriptions && (
        <Fragment>
          <p className="text-center">
            Download and import this file in NewPipe
          </p>
          <DownloadableFile content={blob} />
          <textarea
            readOnly
            value={JSON.stringify(newPipeSubscriptions, null, 2)}
            className="border-4 rounded-xl p-4 font-mono h-60"
          ></textarea>
          <DownloadableFile content={blob} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Converter;
