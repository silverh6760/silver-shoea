import Swiper from "swiper";
import "swiper/css";
import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function OnboardingSwiper() {
  let swiperInstance;
  const nextBtnSlide1 = El({
    element: "div",
    className: "flex justify-center ",
    children: [
      El({
        element: "button",
        className:
          "mt-13 w-95 h-12 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center",
        innerText: "Next",
        eventListener: [
          {
            event: "click",
            callback: () => {
              if (swiperInstance) swiperInstance.slideNext();
            },
          },
        ],
      }),
    ],
  });

  const nextBtnSlide2 = El({
    element: "div",
    className: "flex justify-center ",
    children: [
      El({
        element: "button",
        className:
          "mt-13 w-95 h-12 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center",
        innerText: "Next",
        eventListener: [
          {
            event: "click",
            callback: () => {
              if (swiperInstance) swiperInstance.slideNext();
            },
          },
        ],
      }),
    ],
  });

  const getStartedBtn = El({
    element: "div",
    className: "flex justify-center ",
    children: [
      El({
        element: "button",
        className:
          "mt-13 w-95 h-12 rounded-full bg-black text-white text-sm font-medium flex items-center justify-center",
        innerText: "Get Start",
        eventListener: [
          {
            event: "click",
            callback: () => {
              router.navigate("/login");
            },
          },
        ],
      }),
    ],
  });

  const swiperContainer = El({
    element: "div",
    className: " swiper my-swiper",
    children: [
      El({
        element: "div",
        className: "swiper-wrapper ",
        children: [
          El({
            element: "div",
            className: "swiper-slide flex flex-col text-center",
            children: [
              El({
                element: "img",
                className: "h-150",
                src: "../../../public/assets/jpg/onboarding/W1.jpg",
              }),
              El({
                element: "h1",
                className: "font-bold text-[30px] pt-6",
                innerText: "We provide high quality products just for you",
              }),
              El({
                element: "div",
                className: "flex justify-center gap-2 mt-20",
                children: [
                  El({
                    element: "div",
                    className: "bg-[#000000] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                ],
              }),
              nextBtnSlide1,
            ],
          }),
          El({
            element: "div",
            className: "swiper-slide flex flex-col text-center",
            children: [
              El({
                element: "img",
                className: "h-150",
                src: "../../../public/assets/jpg/onboarding/W2.jpg",
              }),
              El({
                element: "h1",
                className: "font-bold text-[30px] pt-6",
                innerText: "Your satisfaction is our number one periority",
              }),
              El({
                element: "div",
                className: "flex justify-center gap-2 mt-20",
                children: [
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#000000] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                ],
              }),
              nextBtnSlide2,
            ],
          }),
          El({
            element: "div",
            className: "swiper-slide flex flex-col text-center",
            children: [
              El({
                element: "img",
                className: "h-150",
                src: "../../../public/assets/jpg/onboarding/W3.jpg",
              }),
              El({
                element: "h1",
                className: "font-bold text-[30px] pt-6 p-6 ",
                innerText:
                  "Let's fulfill your fashion needs with shoearight now!",
              }),
              El({
                element: "div",
                className: "flex justify-center gap-2 mt-3",
                children: [
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#7f7f7f] w-[30px] h-[3px]",
                  }),
                  El({
                    element: "div",
                    className: "bg-[#000000] w-[30px] h-[3px]",
                  }),
                ],
              }),
              getStartedBtn,
            ],
          }),
        ],
      }),
    ],
  });
  swiperInstance = new Swiper(swiperContainer, {
    slidesPerView: 1,
    allowTouchMove: false,
  });
  return swiperContainer;
}
