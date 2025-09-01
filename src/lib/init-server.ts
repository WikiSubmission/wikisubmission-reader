export const runtime = "nodejs";

let initialized = false;

export async function initServer() {
  if (initialized) return;
  initialized = true;

  const { startCronJobs, initializeData } = await import("./cron-scheduler");

  try {
    console.log("Initializing server-side data and cron jobs...");
    await initializeData();
    startCronJobs();
    console.log("Server initialization complete");
  } catch (err) {
    console.error("Server initialization failed:", err);
  }
}
