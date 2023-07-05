const enabled = !["production", "test"].includes(process.env.NODE_ENV);

export const logError: typeof console.error = (...parameters) => {
  if (enabled) {
    console.error(...parameters);
  }
};
