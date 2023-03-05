import load from "load-script";

const loadScript = (url: string) => {
  return new Promise((resolve, reject) =>
    load(url, (err, script) => (err ? reject(err) : resolve(script)))
  );
};
