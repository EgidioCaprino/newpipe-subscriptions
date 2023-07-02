import { parseStringPromise } from "xml2js";

interface InvidiousSubscriptions {
  opml: {
    body: [
      {
        outline: [
          {
            outline: {
              $: {
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

export const getChannelsIds = async (xml: string) => {
  const parsedXml: InvidiousSubscriptions = await parseStringPromise(xml);
  return parsedXml.opml.body[0].outline[0].outline.map(({ $: { xmlUrl } }) =>
    getChannelId(xmlUrl)
  );
};