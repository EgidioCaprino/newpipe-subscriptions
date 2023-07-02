import { getChannelsIds } from "./invidious";

describe("getChannelsIds", () => {
  it("provides an array of channel IDs", async () => {
    const invidiousXml = `<opml version="1.1">
        <body>
          <outline text="Invidious Subscriptions" title="Invidious Subscriptions">
            <outline text="foo" title="foo" type="rss"
              xmlUrl="https://www.youtube.com/channel/foo" />
            <outline text="bar" title="bar" type="rss"
              xmlUrl="https://www.youtube.com/channel/bar" />
          </outline>
        </body>
      </opml>`;
    const expected = ["foo", "bar"];
    const actual = await getChannelsIds(invidiousXml);
    expect(actual).toEqual(expected);
  });

  it("throws an error when channel URL is invalid", () => {
    expect(() => {
      const invidiousXml = `<opml version="1.1">
          <body>
            <outline text="Invidious Subscriptions" title="Invidious Subscriptions">
              <outline text="foo" title="foo" type="rss"
                xmlUrl="https://www.youtube.com/channel/foo" />
              <outline text="invalid" title="invalid" type="rss"
                xmlUrl="invalid" />
            </outline>
          </body>
        </opml>`;
      return getChannelsIds(invidiousXml);
    }).rejects.toThrowError();
  });
});
