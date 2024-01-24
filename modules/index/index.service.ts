export function indexService() {
  return {
    title:
      "Don't settle for the status quo. Embrace the future of web development",
    description:
      "With the power of Deno and TypeScript, Fastro packages Preact JS and Tailwind CSS, providing a unified experience. It also gives you the modular structure necessary for building successful applications.",
    youtube: "https://www.youtube.com/embed/cZc4Jn5nK3k",
    image:
      "https://avatars.githubusercontent.com/u/84224795?s=400&u=a53076f3dac46609e2837bef9980ae22ecd86e62&v=4",
    start: Deno.env.get("ENV") === "DEVELOPMENT"
      ? "http://localhost:8000/readme"
      : "https://fastro.deno.dev/start",
  };
}
