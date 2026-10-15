// Cached at build time; the year refreshes on each deploy.
export default async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
