import { createNewPipeSubscriptions } from "./newpipe";

describe("createNewPipeSubscriptions", () => {
  it("provides a NewPipe subscriptions object", () => {
    const input = [
      { id: "foo", title: "foo" },
      { id: "bar", title: "bar" },
    ];
    const expected = {
      app_version: "0.25.1",
      app_version_int: 993,
      subscriptions: [
        {
          service_id: 0,
          url: "https://www.youtube.com/channel/foo",
          name: "foo",
        },
        {
          service_id: 0,
          url: "https://www.youtube.com/channel/bar",
          name: "bar",
        },
      ],
    };
    const actual = createNewPipeSubscriptions(input);
    expect(actual).toEqual(expected);
  });
});
