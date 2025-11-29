import { El } from "../../utils/el";
import { BASE_URL, router } from "../../utils/router.js";
import { router } from "../../utils/router.js";

let userObject = getUserObject();

export function Home() {
  return El({
    element: "div",
    className: "flex flex-col justify-between",
    children: [
      createHeaderEl(),
      createSearchBarEl(),
      createMostPopularEl(),
      // createInfinityText(),
      // createActionBarEl(),
    ],
  });
}

function createMostPopularEl() {
  return El({
    element: "div",
    className: "flex flex-col absolute top-[155px] w-full",
    children: [
      createMostPopularAndSeeAllTextEl(),
      createBrandButtonGroupsEl(),
      // createAllSneakersEl(),
    ],
  });
}

function createBrandButtonGroupsEl() {
  const API_URL = `${BASE_URL}/sneaker/brands`;
  const token = userObject.token;
  const brandButtonGroupsEl = El({
    element: "div",
    className: "flex gap-2 w-full",
    id: "brandDiv",
  });

  async function getBrands() {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 403) {
        console.warn("Forbidden: Invalid token");
        router.navigate("/login");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Request failed");
      }
      const data = await res.json();
      data.forEach((item) => {
        const brandsButtons = createBrandsButtons(item);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

function createBrandsButtons(item) {
  return El({});
}

function createMostPopularAndSeeAllTextEl() {
  return El({
    element: "div",
    className: "flex justify-between items-end  px-5",
    children: [
      El({
        element: "div",
        className: "font-semibold text-[20px] leading-none tracking-normal",
        innerText: "Most Popular",
      }),
      El({
        element: "div",
        className: "font-semibold text-[16px] leading-none tracking-normal",
        innerText: "See All",
      }),
    ],
  });
}

function createSearchBarEl() {
  return El({
    element: "div",
    className:
      "box-border px-3 py-1 flex items-center  absolute top-[88px] left-6 w-[380px] h-[37px] gap-4 rounded bg-gray-50 border border-gray-50 focus-within:border-2 focus-within:border-black",
    children: [
      El({
        element: "img",
        src: "../../../public/assets/svg/home/searchIcon.svg",
        id: "searchIcon",
      }),
      El({
        element: "input",
        id: "search",
        type: "text",
        placeholder: "Search",
        className:
          "w-full bg-transparent outline-none placeholder:font-inter placeholder:text-[14px] placeholder:leading-[21px] ",
        eventListener: [],
      }),
    ],
  });
}

function createHeaderEl() {
  return El({
    element: "div",
    className: "flex justify-between p-5",
    children: [createMorningBox(), createBellHeart()],
  });
}

function createBellHeart() {
  return El({
    element: "div",
    className: "flex justify-between gap-2",
    children: [
      El({
        element: "img",
        className: "w-6 h-[22.07px]",
        src: "../../../public/assets/svg/home/bell.svg",
      }),
      El({
        element: "img",
        className: "w-6 h-6",
        src: "../../../public/assets/svg/home/heart.svg",
      }),
    ],
  });
}

function createMorningBox() {
  return El({
    element: "div",
    className: "flex flex-col gap-3",
    children: [
      createGoodMorningEl(),
      El({
        element: "div",
        className: "font-bold text-base leading-none",
        innerText: `${userObject.username}`,
      }),
    ],
  });
}

function createGoodMorningEl() {
  return El({
    element: "div",
    className: "flex justify-center gap-1",
    children: [
      El({
        element: "div",
        className: "font-medium text-[16px] text-[#757475] leading-[100%]",
        innerText: "Good Morning",
      }),
      El({
        element: "img",
        className: "w-4 h-4",
        src: "../../../public/assets/png/onboarding/hand.png",
      }),
    ],
  });
}

function getUserObject() {
  const cookies = document.cookie.split(";").reduce((acc, item) => {
    const [key, value] = item.split("=").map((v) => v.trim());
    if (key === "username" || key === "token") {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
  return cookies;
}

// {
//     "user": {
//         "id": 6,
//         "username": "testuser",
//         "cart": [],
//         "sessions": [
//             {
//                 "id": 14,
//                 "token": "0efb32ce-1298-4d94-8bd8-cfa5385f20b1",
//                 "expiration": 1764283684
//             }
//         ]
//     },
//     "token": "f64d827d-5702-435b-9397-d9fe38ba21d8"
// }
