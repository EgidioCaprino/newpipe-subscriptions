import { parseStringPromise } from "xml2js";
import { Channel } from "./newpipe";

interface InvidiousSubscriptions {
  opml: {
    body: [
      {
        outline: [
          {
            outline: {
              $: {
                title: string;
                xmlUrl: string;
              };
            }[];
          }
        ];
      }
    ];
  };
}

const channelIdRegExp = /\/channel\/(.+)/;

const getChannelId = (url: string) => {
  const match = url.match(channelIdRegExp);
  if (!match || match.length < 2) {
    throw new Error(`Invalid channel URL: ${url}`);
  }
  return match[1];
};

export const parseChannels = async (xml: string): Promise<Channel[]> => {
  const parsedXml: InvidiousSubscriptions = await parseStringPromise(xml);
  return parsedXml.opml.body[0].outline[0].outline.map(
    ({ $: { title, xmlUrl } }) => ({
      id: getChannelId(xmlUrl),
      title,
    })
  );
};
