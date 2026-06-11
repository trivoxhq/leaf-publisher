import { permanentRedirect } from "next/navigation";

export default function AuthorsRedirect() {
  permanentRedirect("/for-authors");
}
