import { El } from "../../utils/el";
import { BASE_URL, router } from "../../utils/router";
import { getUserObject } from "../../utils/userObject";

let userObject = getUserObject();
let product = {};
const params = router.getCurrentParams();
const sneakerId = params.id;
const PRODUCT_API_URL = `${BASE_URL}/sneaker/item/${sneakerId}`;
let selectedSize = null;
let selectedColor = null;
let quantity = 0;
let quantityValueEl;
let totalPriceValueEl;

export function Product() {
  product = getProduct();
  return El({
    element: "div",
    className: "",
    children: [
      createProductImageAndBackBtnEl(),
      createProductDetailForAddingToCartEl(),
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
      createSizeAndColorButtonsEl(),
      createQuantityEl(),
      createBottomLineEl(),
      createAddToCartEl(),
    ],
  });
}

function createBottomLineEl() {
  return El({
    element: "div",
    className: "absolute bottom-24 right-5 w-95 mx-auto h-px bg-[#eeefef] my-4",
  });
}

function updateTotalPrice() {
  const total = (product?.price || 0) * quantity;
  totalPriceValueEl.innerText = "$ " + total.toFixed(2);
}

function createQuantityEl() {
  return El({
    element: "div",
    className: "flex gap-5 items-center pl-6",
    children: [
      El({
        element: "p",
        className: "font-semibold",
        innerText: "Quantity",
      }),
      quantityRowEl,
    ],
  });
}

quantityValueEl = El({
  element: "span",
  className: "w-6 text-center",
  innerText: String(quantity),
});

totalPriceValueEl = El({
  element: "p",
  className: "font-bold text-2xl",
  innerText: "$ 0.00",
});

const minusBtnEl = El({
  element: "button",
  className: "flex items-center justify-center text-xl",
  innerText: "−",
  eventListener: [
    {
      event: "click",
      callback: () => {
        if (quantity > 0) {
          quantity--;
          quantityValueEl.innerText = String(quantity);
          updateTotalPrice();
        }
      },
    },
  ],
});

const plusBtn = El({
  element: "button",
  className: "flex items-center justify-center text-xl",
  innerText: "+",
  eventListener: [
    {
      event: "click",
      callback: () => {
        quantity++;
        quantityValueEl.innerText = String(quantity);
        updateTotalPrice();
      },
    },
  ],
});

const quantityRowEl = El({
  element: "div",
  className:
    "flex items-center justify-center gap-4 bg-[#f0f0f0] w-30 h-12 rounded-4xl",
  children: [minusBtnEl, quantityValueEl, plusBtn],
});

function createSizeAndColorButtonsEl() {
  return El({
    element: "div",
    className: "flex mt-24 p-6 gap-13",
    children: [createSizeGroupButtonsEl(), createColorGroupButtonsEl()],
  });
}

function createColorGroupButtonsEl() {
  return El({
    element: "div",
    className: "flex  flex-col gap-2 w-50",
    children: [createColorTitleEl(), createColorButtonsEl()],
  });
}

function createColorTitleEl() {
  return El({
    element: "p",
    className: "font-semibold text-[18px] text-[#212121]",
    innerText: "Size",
  });
}

function createColorButtonsEl() {
  let colorsEl = El({
    element: "div",
    className: "flex gap-3 overflow-x-auto hide-scrollbar",
  });

  const colors = product.colors.split("|");

  colors.forEach((color) => {
    const colorClass = getColorClass(color);
    colorsEl.appendChild(createColorButton(colorClass, color));
  });
  return colorsEl;
}

function getColorClass(color) {
  switch (color) {
    case "black":
      return "bg-black";
    case "orange":
      return "bg-orange-500";
    case "blue":
      return "bg-blue-600";
    case "red":
      return "bg-red-600";
    case "yellow":
      return "bg-amber-400";
  }
}

function updateColorStyles() {
  colorButtons.forEach((btn) => {
    if (btn.dataset.color === selectedColor) {
      btn.className =
        "shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative " +
        btn.dataset.baseClass;
      btn._check.classList.remove("hidden");
    } else {
      btn.className =
        "shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative " +
        btn.dataset.baseClass;
      btn._check.classList.add("hidden");
    }
  });
}

function createColorButton(colorClass, colorName) {
  const check = El({
    element: "span",
    innerText: "✓",
    className: "text-white font-bold hidden ",
  });

  const btn = El({
    element: "button",
    className:
      "shrink-0 w-10 h-10 rounded-full flex items-center justify-center " +
      colorClass,
    children: [check],
    eventListener: [
      {
        event: "click",
        callback: () => {
          selectedColor = colorName;
          updateColorStyles();
        },
      },
    ],
  });
  btn.dataset.color = colorName;
  btn.dataset.baseClass = colorClass;
  btn._check = check;
  colorButtons.push(btn);
  return btn;
}

function createSizeGroupButtonsEl() {
  return El({
    element: "div",
    className: "flex flex-col gap-2 w-40",
    children: [createSizeTitleEl(), createSizeButtonsEl()],
  });
}

function createSizeButtonsEl() {
  let sizesEl = El({
    element: "div",
    className: "flex gap-3",
  });

  const sizes = product.sizes.split("|");
  sizes.forEach((size) => {
    sizesEl.appendChild(createSizeButton(size));
  });

  return sizesEl;
}

function updateSizeStyles() {
  sizeButtons.forEach((btn) => {
    if (btn.dataset.size === String(selectedSize)) {
      btn.className =
        "w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-semibold bg-black text-white";
    } else {
      btn.className =
        "w-10 h-10 rounded-full border border-[#c4c4c4] flex items-center justify-center font-semibold text-[#212121]";
    }
  });
}

function createSizeButton(size) {
  const btn = El({
    element: "button",
    innerText: size,
    className:
      "w-10 h-10 rounded-full border border-[#c4c4c4] flex items-center justify-center font-semibold text-[#212121]",
    eventListener: [
      {
        event: "click",
        callback: () => {
          selectedSize = size;
          updateSizeStyles();
        },
      },
    ],
  });
  btn.dataset.size = String(size);
  sizeButtons.push(btn);
  return btn;
}

function createSizeTitleEl() {
  return El({
    element: "p",
    className: "font-semibold text-[18px] text-[#212121]",
    innerText: "Size",
  });
}

function createColorGroupButtonsEl() {}

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

function createProductImageAndBackBtnEl() {
  return El({
    element: "div",
    className: "h-99 flex flex-col items-center",
    children: [createBackBtnEl(), createProductImageEl()],
  });
}

function createProductImageEl() {
  const productImage = product?.imageURL;
  return El({
    element: "div",
    className: " w-full h-95 flex  justify-center items-center",
    children: [
      El({
        element: "img",
        src: productImage,
      }),
    ],
  });
}

function createBackBtnEl() {
  return El({
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
  });
}

function createAddToCartTitleEl() {
  return El({
    element: "span",
    className: "pl-4",
    innerText: "Add to Cart",
  });
}

const addToCartBtnEl = El({
  element: "button",
  className:
    "w-full h-15 rounded-full bg-black text-white font-semibold flex items-center justify-center gap-2 shadow-md mr-6",
  children: [createAddToCartTitleEl()],
  eventListener: [
    {
      event: "click",
      callback: () => {
        if (!selectedSize && !selectedColor) {
          alert("لطفاً قبل از ادامه، سایز و رنگ را انتخاب کنید.");
          return;
        }
        if (!selectedSize) {
          alert("لطفاً ابتدا سایز را انتخاب کنید.");
          return;
        }
        if (!selectedColor) {
          alert("لطفاً ابتدا رنگ را انتخاب کنید.");
          return;
        }
        if (quantity <= 0) {
          alert("لطفاً حداقل یک عدد از محصول را انتخاب کنید.");
          return;
        }

        const price = product?.price || 0;
        const cartItem = {
          productId: product?._id || product?.id || productName, // یه شناسه برای محصول
          name: productName,
          imageURL: productImage,
          price: price,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          totalPrice: price * quantity,
        };
        saveToCart(cartItem);
        alert("محصول با موفقیت به سبد خرید اضافه شد ");
        // router.navigate("/home");
      },
    },
  ],
});

function saveToCart(cartItem) {
  //fetch post cart
}

function createAddToCartEl() {
  return El({
    element: "div",
    className: "flex mt-11 pl-6 gap-12",
    children: [createTotalPriceEl(), addToCartBtnEl, createBagImageEl()],
  });
}

function createBagImageEl() {
  return El({
    element: "img",
    className: "absolute right-47 bottom-12.5 w-5",
    src: "../../../public/assets/svg/product/bag.svg",
  });
}

function createTotalPriceEl() {
  return El({
    element: "div",
    className: "flex flex-col w-45",
    children: [createTotalPriceTitleEl(), totalPriceValueEl],
  });
}

function createTotalPriceTitleEl() {
  return El({
    element: "p",
    className: "text-[12px] text-[#717171]",
    innerText: "Total price",
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

// {
//     "id": 1,
//     "pid": 1,
//     "name": "Nike React Infinity Run Flyknit",
//     "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
//     "colors": "black|brown|white|blue|red",
//     "sizes": "41|43|45",
//     "price": 160,
//     "category": "RUNNING",
//     "gender": "MEN",
//     "brand": "NIKE"
// }
