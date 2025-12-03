import { El } from "../../utils/el";
import { BASE_URL, router } from "../../utils/router";
import { getUserObject } from "../../utils/userObject";

let userObject = getUserObject();
let product = {};
const params = router.getCurrentParams();
const sneakerId = params.id;
const PRODUCT_API_URL = `${BASE_URL}/sneaker/item/${sneakerId}`;

export function Product() {
  product = getProduct();
  return El({
    element: "div",
    className: "",
    children: [
      createProductImageEl(),
      createProductDetailForAddingToCartEl(),
      // createProductNameAndHeartEl(),
      // createReviewBarEl(),
      // createLineEl(),
      // createDescriptionEl(),
      // createSizeAndColorEl(),
      // createQuantityEl(),
      // createLineEl(),
      // createTotalPriceAndAddToCartEl(),
    ],
  });
}

function createProductDetailForAddingToCartEl() {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [
      createProductDetail(),
      createLineEl(),
      createDescriptionDetailEl(),
    ],
  });
}

function createDescriptionDetailEl() {
  return El({
    element: "div",
    className: "absolute bottom-68 flex flex-col p-6 gap-2",
    children: [
      El({
        element: "h1",
        innerText: "Description",
        className: "text-[#202020] font-bold text-xl",
      }),
      El({
        element: "div",
        className: "flex",
        children: [
          El({
            element: "p",
            className: "text-[#717171]",
            innerText:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore nostrum harum fuga ",
          }),
          El({
            element: "p",
            className:
              "font-semibold text-[#414142] absolute bottom-6 right-17",
            innerText: "view more...",
          }),
        ],
      }),
    ],
  });
}

function createLineEl() {
  return El({
    element: "div",
    className: "absolute bottom-95 right-5 w-95 mx-auto h-px bg-[#eeefef] my-4",
  });
}

function createProductDetail() {
  return El({
    element: "div",
    className: "flex justify-between p-6",
    children: [
      El({
        element: "div",
        className: "flex flex-col gap-4 w-85",
        children: [createProductNameEl(), createProductReviewDetailEl()],
      }),
      El({
        element: "img",
        className: "w-6 pb-11",
        src: "../../../public/assets/svg/product/heart-product.svg",
      }),
    ],
  });
}

function createProductReviewDetailEl() {
  return El({
    element: "div",
    className: "flex gap-3",
    children: [
      El({
        element: "p",
        className:
          "w-22 h-8 text-center text-[13px] rounded-xl pt-1.5 bg-[#f3f3f3] text-[#38363b]",
        innerText: "5,371sold",
      }),
      El({
        element: "img",
        className: "w-5 pb-1 ",
        src: "../../../public/assets/svg/product/star.svg",
      }),
      El({
        element: "p",
        className: "text-[#434344] text-sm pt-1",
        innerText: "4.3(5.389 reviews)",
      }),
    ],
  });
}

function createProductNameEl() {
  const productName = product?.name;
  return El({
    element: "h1",
    className: "font-bold text-3xl text-[#212121] truncate",
    innerText: productName,
  });
}

function createProductImageEl() {
  const productImage = product?.imageURL;
  return El({
    element: "div",
    className: "h-99 flex flex-col items-center",
    children: [
      El({
        element: "div",
        className: "absolute h-12 pt-4 mr-90",
        children: [
          El({
            element: "img",
            className: "w-6",
            src: "../../../public/assets/svg/login/back-btn.svg",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  router.navigate("/home");
                },
              },
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: " w-full h-95 flex  justify-center items-center",
        children: [
          El({
            element: "img",
            src: productImage,
          }),
        ],
      }),
    ],
  });
}

async function getProduct() {
  try {
    const res = await fetch(PRODUCT_API_URL, {
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
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
