const { Worker } = require("worker_threads");

const companies = [
  "Google",
  "Facebook",
  "Instagram",
  "Spotify",
  "Dropbox",
  "Reddit",
  "Netflix",
  "Pinterest",
  "Quora",
  "YouTube",
  "Lyft",
  "Uber",
  "LinkedIn",
  "Slack",
  "Etsy",
  "Mozilla",
  "NASA",
  "IBM",
  "Intel",
  "Microsoft",
];

function startWorkers() {
  console.log("Starting workers for all companies...");

  companies.forEach((company) => {
    const worker = new Worker("./workers/order_worker.js", {
      workerData: { company },
    });

    worker.on("message", (msg) => {
      console.log(`[${company} Worker]:`, msg);
    });

    worker.on("error", (err) => {
      console.error(`[${company} Worker Error]:`, err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`[${company} Worker]: Worker stopped with exit code ${code}`);
      } else {
        console.log(`[${company} Worker]: Worker exited successfully.`);
      }
    });
  });
}

startWorkers();
