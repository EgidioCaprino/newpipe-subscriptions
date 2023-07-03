import { parseChannels } from "./invidious";

describe("parseChannels", () => {
  it("provides the channels IDs and titles", async () => {
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
    const expected = [
      { title: "foo", id: "foo" },
      { title: "bar", id: "bar" },
    ];
    const actual = await parseChannels(invidiousXml);
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
      return parseChannels(invidiousXml);
    }).rejects.toThrowError();
  });
});
