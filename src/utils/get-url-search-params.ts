export async function getUrlSearchParams(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
): Promise<URLSearchParams> {
  // [Await the params]
  const resolvedSearchParams = await searchParams;

  // [Create a new URLSearchParams object]
  const urlSearchParams = new URLSearchParams();

  // [Append all search params, except query]
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => urlSearchParams.append(key, v));
    } else if (value !== undefined && key !== "q") {
      urlSearchParams.append(key, value);
    }
  });

  // [Return the URLSearchParams object]
  return urlSearchParams;
}
