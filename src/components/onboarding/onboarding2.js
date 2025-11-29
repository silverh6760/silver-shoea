import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Onboarding2() {
  const onboarding2 = El({
    element: "div",
    className:
      "bg-[url('../../../public/assets/svg/onboarding/black-bg.svg'),url('../../../public/assets/png//onboarding/onboarding2.png')] h-232 w-full absolute inset-0 bg-cover bg-center flex flex-col gap-6 text-white px-6 py-14 justify-end",
    children: [createWelcomeEl(), createShoeaEl(), createDescriptionEl()],
  });
  setTimeout(() => router.navigate("/onboarding3"), 5000);
  return onboarding2;
}

function createWelcomeEl() {
  return El({
    element: "div",
    className: "flex gap-1",
    children: [
      El({
        element: "div",
        className: "font-semibold text-[40px] leading-[100%]",
        innerText: "Welcome to",
      }),
      El({
        element: "img",
        className: "w-9 h-9",
        src: "../../../public/assets/png/onboarding/hand.png",
      }),
    ],
  });
}

function createShoeaEl() {
  return El({
    element: "div",
    className: "font-bold text-[72px] leading-[100%]",
    innerText: "Shoea",
  });
}

function createDescriptionEl() {
  return El({
    element: "div",
    className: "font-semibold text-[16px] leading-[22px]",
    innerText:
      "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
  });
}
