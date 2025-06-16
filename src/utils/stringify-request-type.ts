export function stringifyRequestType(type: string) {
  return type
    .replace(/_/g, " ")
    .replace(/-/g, "–")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
