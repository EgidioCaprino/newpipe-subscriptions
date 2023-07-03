export interface Channel {
  id: string;
  title: string;
}

export const createNewPipeSubscriptions = (channels: Channel[]) => {
  const subscriptions = channels.map(({ id, title }) => ({
    service_id: 0,
    url: `https://www.youtube.com/channel/${id}`,
    name: title,
  }));
  return {
    app_version: "0.25.1",
    app_version_int: 993,
    subscriptions,
  };
};
