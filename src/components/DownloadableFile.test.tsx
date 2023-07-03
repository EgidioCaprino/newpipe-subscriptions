import { render } from "@testing-library/react";
import DownloadableFile from "./DownloadableFile";

describe("DownloadableFile", () => {
  it("renders a download link", () => {
    const blob = new Blob(["foo"], { type: "plain/text" });
    const url = "blob:http://localhost:3000/foo";
    global.URL.createObjectURL = jest.fn(() => url);
    const { container } = render(<DownloadableFile content={blob} />);
    const anchor = container.querySelector("a");
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute("href")).toBe(url);
    expect(anchor?.getAttribute("download")).toMatch(
      /^newpipe_subscriptions_[0-9]{12}\.json$/
    );
  });
});
