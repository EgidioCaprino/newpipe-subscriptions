"use client";

import { format } from "date-fns";

interface Props {
  content: Blob;
}

const DownloadableFile = ({ content }: Props) => {
  const url = URL.createObjectURL(content);
  const formattedDate = format(new Date(), "yyyyMMddHHmm");
  const filename = `newpipe_subscriptions_${formattedDate}.json`;
  return (
    <a
      href={url}
      download={filename}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center"
    >
      Download
    </a>
  );
};

export default DownloadableFile;
