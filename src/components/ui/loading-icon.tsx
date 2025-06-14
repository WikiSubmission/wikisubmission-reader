import { LoaderIcon } from "lucide-react";

export function LoadingIcon(props: { size?: number }) {
  return <LoaderIcon className="animate-spin" size={props.size} />;
}
