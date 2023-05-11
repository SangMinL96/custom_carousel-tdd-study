async function fetcher<T>(
  url: string,
  option?: RequestInit
): Promise<T | undefined> {
  const domain = "http://localhost:8080";
  const res = await fetch(`${domain}${url}`, option);
  if (!res.ok) {
    throw new Error(String("Fetcher Error"));
  }
  const data = await res.json();
  return data as T;
}

export default fetcher;
export { fetcher };
