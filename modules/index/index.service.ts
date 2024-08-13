export function indexService() {
  return {
    title: "Hello World",
    description: "A journey of a thousand miles begins with a single step",
    youtube: "https://www.youtube.com/embed/cZc4Jn5nK3k",
    image:
      "https://avatars.githubusercontent.com/u/84224795?s=400&u=a53076f3dac46609e2837bef9980ae22ecd86e62&v=4",
    start: Deno.env.get("ENV") === "DEVELOPMENT"
      ? "http://localhost:8000/readme"
      : "https://fastro.dev/docs/start",
  };
}
