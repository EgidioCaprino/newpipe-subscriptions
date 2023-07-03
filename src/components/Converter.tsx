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
        const channels = await parseChannels(fileReader.result);
        const newPipeSubscriptions = createNewPipeSubscriptions(channels);
        setNewPipeSubscriptions(newPipeSubscriptions);
      } else {
        setError(new Error("Invalid file loaded"));
      }
    };
    fileReader.onerror = () => {
      const error = new Error("Unable to read file");
      error.cause = fileReader.error;
      setError(error);
    };
    fileReader.readAsText(files[0]);
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  const blob = new Blob([JSON.stringify(newPipeSubscriptions)], {
    type: "text/plain",
  });

  return (
    <div>
      <input type="file" onChange={processFile} />
      {newPipeSubscriptions && (
        <Fragment>
          <textarea
            readOnly
            value={JSON.stringify(newPipeSubscriptions, null, 2)}
          ></textarea>
          <DownloadableFile content={blob} />
        </Fragment>
      )}
    </div>
  );
};

export default Converter;
