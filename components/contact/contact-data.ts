import type { IconType } from "react-icons";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

/** Editable contact details — update when official info is confirmed. */
export const CONTACT_INFO = {
  office: {
    title: "Office Location",
    lines: [
      "Leaf Publisher Office",
      "Your Business Address",
      "City, State, Country",
    ],
    icon: HiOutlineLocationMarker,
  },
  email: {
    title: "Email Us",
    address: "support@leafpublisher.com",
    icon: HiOutlineMail,
  },
  phone: {
    title: "Call Us",
    display: "+1 000 000 0000",
    href: "tel:+10000000000",
    icon: HiOutlinePhone,
  },
} as const;

export type ContactInfoCard = {
  title: string;
  icon: IconType;
};

export const CONTACT_FORM_ID = "contact-form";
