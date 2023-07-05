"use client";

import { ChangeEvent, Fragment, useState } from "react";
import { parseChannels } from "@/invidious";
import { createNewPipeSubscriptions } from "@/newpipe";
import { logError } from "@/logs";
import DownloadableFile from "./DownloadableFile";

const Converter = () => {
  const [error, setError] = useState<Error | null>(null);
  const [newPipeSubscriptions, setNewPipeSubscriptions] = useState<
    object | null
  >(null);

  const processFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files?.length) {
      const error = new Error("No file loaded");
      logError(error);
      setError(error);
      return;
    }
    const fileReader = new FileReader();
    fileReader.addEventListener("load", async () => {
      if (typeof fileReader.result === "string") {
        try {
          const channels = await parseChannels(fileReader.result);
          const newPipeSubscriptions = createNewPipeSubscriptions(channels);
          setNewPipeSubscriptions(newPipeSubscriptions);
          setError(null);
          return;
        } catch (error) {
          logError(error);
        }
      }
      setError(new Error("Invalid file loaded"));
    });
    fileReader.addEventListener("error", () => {
      const error = new Error("Unable to read file");
      error.cause = fileReader.error;
      logError(error);
      setError(error);
    });
    fileReader.readAsText(files[0]);
  };

  const blob = new Blob([JSON.stringify(newPipeSubscriptions)], {
    type: "text/plain",
  });

  return (
    <Fragment>
      {error && (
        <p data-test="error-message" className="text-center text-red-700">
          {error.message}
        </p>
      )}
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
