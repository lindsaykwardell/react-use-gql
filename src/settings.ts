const settings: {
  url: string;
  subUrl: string;
  options: { [key: string]: string };
  fetch: {
    method: string;
    headers: {
      [key: string]: string;
    };
  };
} = {
  url: "",
  subUrl: "",
  options: {},
  fetch: {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }
};

export default settings;
