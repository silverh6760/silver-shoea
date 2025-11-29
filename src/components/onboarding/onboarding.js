import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Onboarding() {
  const firstPage = El({
    element: "div",
    className: "w-full h-screen grid place-items-center",
    children: [
      El({
        element: "img",
        src: "../../../public/assets/svg/onboarding/logo.svg",
      }),
      El({
        element: "img",
        src: "../../../public/assets/svg/onboarding/spin.svg",
        className: "animate-spin",
      }),
    ],
  });
  setTimeout(() => router.navigate("/onboarding2"), 5000);
  return firstPage;
}
