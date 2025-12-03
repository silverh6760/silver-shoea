import { El } from "../../utils/el";
import { BASE_URL, router } from "../../utils/router.js";
import { getUserObject } from "../../utils/userObject.js";

let userObject = getUserObject();

export function Home() {
  return El({
    element: "div",
    className: "flex flex-col h-screen w-full overflow-hidden",
    children: [
      createHeaderEl(),
      createSearchBarEl(),
      createMostPopularEl(),
      // createInfinityText(),
      createActionBarEl(),
    ],
  });
}

function createActionBarEl() {
  return El({
    element: "div",
    className:
      "flex w-full h-[66px] fixed bottom-0 bg-white px-12 py-10 items-center justify-between",
    children: [
      createActionButton("../../../public/assets/svg/home/home.svg", "Home"),
      createActionButton("../../../public/assets/svg/home/cart.svg", "Cart", {
        event: "click",
        callback: () => router.navigate("/cart"),
      }),
      createActionButton(
        "../../../public/assets/svg/home/orders.svg",
        "Orders"
      ),
      createActionButton(
        "../../../public/assets/svg/home/wallet.svg",
        "Wallet"
      ),
      createActionButton(
        "../../../public/assets/svg/home/profile.svg",
        "Profile"
      ),
    ],
  });
}

function createActionButton(url, btnName, callback = {}) {
  return El({
    element: "div",
    className: "flex flex-col w-[29px] h-[38px] gap-1 items-center",
    children: [
      El({
        element: "img",
        src: url,
        className: "flex-1",
      }),
      El({
        element: "div",
        className:
          "font-semibold text-[10px] leading-none tracking-[-4%] align-middle",
        innerText: btnName,
      }),
    ],
    eventListener: [callback],
  });
}

function createMostPopularEl() {
  getBrandsAndProducts();
  return El({
    element: "div",
    className: "flex flex-col absolute top-[155px] w-full gap-5",
    children: [
      createMostPopularAndSeeAllTextEl(),
      brandButtonGroupsEl,
      productsEl,
    ],
  });
}

const brandButtonGroupsEl = El({
  element: "div",
  className:
    "flex pl-5 items-center gap-3 overflow-x-auto hide-scrollbar bg-white w-full h-[39px]",
  id: "brandsDiv",
  children: [createBrandsButton("All")],
});

const productsEl = El({
  element: "div",
  className:
    "pl-5 pr-5 h-auto grid grid-cols-2 gap-5 overflow-auto hide-scrollbar flex-1",
  id: "productsDiv",
});

let activeBrand = "All";
let allProducts = [];
const BRAND_API_URL = `${BASE_URL}/sneaker/brands`;
const PRODUCTS_API_URL = `${BASE_URL}/sneaker?page=1&limit=100`;

function getBrandsAndProducts() {
  getBrands();
  getProducts();
}

async function getProducts() {
  try {
    const res = await fetch(PRODUCTS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userObject.token}`,
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
    let data = await res.json();
    allProducts = data.data || [];
    updateProducts();
  } catch (error) {
    console.error(error);
  }
}

function createProductCard(product) {
  return El({
    element: "div",
    className: "shrink-0 h-61 w-46 flex flex-col gap-2",
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate(`/product/${product.id}`);
        },
      },
    ],
    children: [
      El({
        element: "div",
        className:
          "w-[182px] h-[182px] rounded-3xl flex justify-center items-center",
        children: [
          El({
            element: "img",
            src: product.imageURL,
            className: "w-full h-full object-cover rounded-3xl",
          }),
        ],
      }),
      El({
        element: "p",
        className: "text-[18px] font-bold text-[#152536] truncate",
        innerText: product.name,
      }),
      El({
        element: "p",
        className: "text-[16px] font-semibold text-[#152536]",
        innerText: "$ " + product.price,
      }),
    ],
  });
}

async function getBrands() {
  try {
    const res = await fetch(BRAND_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userObject.token}`,
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
    let data = await res.json();
    data.forEach((brand) => {
      brandButtonGroupsEl.appendChild(createBrandsButton(brand));
    });
    updateBrandStyles();
  } catch (error) {
    console.error(error);
  }
}

function createBrandsButton(brand) {
  const btn = El({
    element: "button",
    innerText: brand,
    eventListener: [
      {
        event: "click",
        callback: () => {
          activeBrand = brand;
          updateBrandStyles();
          updateProducts();
        },
      },
    ],
  });
  btn.dataset.brand = brand;
  return btn;
}

function updateProducts() {
  productsEl.innerHTML = "";
  let filtered = allProducts;

  if (activeBrand !== "All") {
    //do not filter. send request based on brand
    filtered = allProducts.filter((item) => {
      return (
        item.brand && item.brand.toUpperCase() === activeBrand.toUpperCase()
      );
    });
  }
  filtered.forEach((item) => {
    productsEl.appendChild(createProductCard(item));
  });
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
  //todo check time
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

// function getUserObject() {
//   const cookies = document.cookie.split(";").reduce((acc, item) => {
//     const [key, value] = item.split("=").map((v) => v.trim());
//     if (key === "username" || key === "token") {
//       acc[key] = decodeURIComponent(value);
//     }
//     return acc;
//   }, {});
//   return cookies;
// }

function updateBrandStyles() {
  const buttons = brandButtonGroupsEl.children;
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    if ((btn.dataset.brand || "").toUpperCase() === activeBrand.toUpperCase()) {
      btn.className =
        "shrink-0 border-2 border-[#343a40] h-10 px-4 text-white text-center font-bold rounded-3xl bg-[#343a40]";
    } else {
      btn.className =
        "shrink-0 border-2 border-[#343a40] h-10 px-4 text-[#343a40] text-center font-bold rounded-3xl bg-white";
    }
  }
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
