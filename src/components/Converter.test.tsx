import { fireEvent, render, waitFor } from "@testing-library/react";
import Converter from "./Converter";

it("renders an <input> element", () => {
  const { container } = render(<Converter />);
  const inputElement = container.querySelector("input");
  expect(inputElement).toBeTruthy();
  expect(inputElement?.getAttribute("type")).toBe("file");
});

it("converts an Invidious subscriptions file to a NewPipe subscriptions file", async () => {
  const invidiousSubscriptions = `<opml version="1.1">
    <body>
      <outline text="Invidious Subscriptions" title="Invidious Subscriptions">
        <outline text="foo" title="foo" type="rss"
          xmlUrl="https://www.youtube.com/channel/foo" />
      </outline>
    </body>
    </opml>`;
  const invidiousSubscriptionsFile = new File(
    [invidiousSubscriptions],
    "invidious.xml",
    { type: "application/xml" }
  );

  const url = "blob:http://localhost:3000/foo";
  global.URL.createObjectURL = jest.fn(() => url);

  const { container } = render(<Converter />);
  const input = container.querySelector("input") as HTMLInputElement;
  fireEvent.change(input, {
    target: {
      files: [invidiousSubscriptionsFile],
    },
  });
  await waitFor(() => expect(container.querySelector("textarea")).toBeTruthy());
  const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
  const expected = {
    app_version: "0.25.1",
    app_version_int: 993,
    subscriptions: [
      {
        service_id: 0,
        url: "https://www.youtube.com/channel/foo",
        name: "foo",
      },
    ],
  };
  expect(textarea?.value).toBe(JSON.stringify(expected, null, 2));
});
