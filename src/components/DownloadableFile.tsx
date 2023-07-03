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
    <a href={url} download={filename}>
      Download
    </a>
  );
};

export default DownloadableFile;
