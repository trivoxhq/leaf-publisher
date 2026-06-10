import { permanentRedirect } from "next/navigation";

export default function HelpRedirect() {
  permanentRedirect("/help-centre");
}
