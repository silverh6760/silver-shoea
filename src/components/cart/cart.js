import { El } from "../../utils/el";
import { getUserObject } from "../../utils/userObject";

const GET_CART_ITEMS_API_URL = `${BASE_URL}/cart`;
let cartItems = [];
let userObject = getUserObject();

const cartItemsEl = El({
  element: "div",
  className:
    "mt-22 pl-6 bg-[#f9f9fa] flex flex-col h-175 gap-6 pb-10 pr-6 overflow-auto hide-scrollbar",
  children: [],
});

const totalPriceEl = El({
  element: "p",
  className: "font-semibold text-2xl",
  innerText: "$0.00",
});

export function Cart() {
  getCartItems();
  return El({
    element: "div",
    className: "flex flex-col w-full h-232",
    children: [
      createHeaderEl(),
      createCartItemsEl(),
      createTotalPriceAndCheckoutEl(),
    ],
  });
}

function createTotalPriceAndCheckoutEl() {
  return El({
    element: "div",
    className:
      "fixed bottom-17 bg-[#ffffff] rounded-t-4xl h-25 w-full items-center flex mt-11 pl-6 gap-12",
    children: [
      createTotalPriceEl(),
      createCheckoutEl(),
      createTurnRightArrowEl(),
    ],
  });
}

function createTurnRightArrowEl() {
  return El({
    element: "img",
    className: "absolute right-23 bottom-10.5 w-4",
    src: "../../../public/assets/svg/cart/turn-right-arrow.svg",
  });
}

function createCheckoutEl() {
  El({
    element: "button",
    className: "bg-[#101010] w-60 h-14 rounded-4xl pr-7 text-white shadow-",
    innerText: "Checkout",
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate("/checkout");
        },
      },
    ],
  });
}

function createTotalPriceEl() {
  return El({
    element: "div",
    className: "flex flex-col w-25",
    children: [
      El({
        element: "p",
        className: "text-[12px] text-[#717171]",
        innerText: "Total price",
      }),
      totalPriceEl,
    ],
  });
}

function createCartItemsEl() {
  renderCart();
  return cartItemsEl;
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  cartItems.forEach((item, index) => {
    cartItemsEl.appendChild(createCartCard(item, index));
  });
  updateTotal();
}

function updateTotal() {
  const total = cartItems.reduce((sum, item) => {
    const price = item.price || 0;
    const qty = item.quantity || 0;
    return sum + price * qty;
  }, 0);

  totalPriceEl.innerText = "$" + total.toFixed(2);
}

function createCartCard(item, index) {
  return El({
    element: "div",
    className:
      "shrink-0 h-42 flex gap-4 pl-5 pr-5 rounded-3xl bg-[#ffffff] items-center",
    children: [
      createItemImageEl(item.sneaker.imageURL),
      createItemActionsAndDetailsEl(item, index),
    ],
  });
}

function createItemActionsAndDetailsEl(item, index) {
  return El({
    element: "div",
    className: "flex flex-col gap-4 w-50",
    children: [
      createNameAndTrashbinEl(item, index),
      createSizeAndColorEl(item),
      createPlusMinusQuantityEl(item),
    ],
  });
}

function createPlusMinusQuantityEl(item) {
  const price = item.sneaker.price;
  const quantity = item.quantity;
  return El({
    element: "div",
    className: "flex justify-between",
    children: [
      createTotalPriceForEachItemEl(price, quantity),
      createPlusMinusDetailEl(item),
    ],
  });
}

function createPlusMinusDetailEl(item) {
  return El({
    element: "div",
    className:
      "flex bg-[#f3f3f3] justify-center gap-4 items-center w-25 h-9 rounded-3xl",
    children: [
      createMinusItemEl(item),
      createQuantityEl(item),
      createPlusItemEl(item),
    ],
  });
}

function createMinusItemEl(item) {
  return El({
    element: "div",
    className: "font-semibold mb-3",
    innerText: "_",
    eventListener: [
      {
        event: "click",
        callback: () => {
          if (quantity > 1) {
            item.quantity--;
            updateCart(item);
            getCartItems();
            renderCart();
          }
        },
      },
    ],
  });
}
function createPlusItemEl(item) {
  return El({
    element: "div",
    className: "font-semibold",
    innerText: "+",
    eventListener: [
      {
        event: "click",
        callback: () => {
          item.quantity++;
          updateCart(item);
          getCartItems();
          renderCart();
        },
      },
    ],
  });
}

function createQuantityEl(item) {
  return El({
    element: "div",
    className: "font-semibold",
    innerText: String(item.quantity),
  });
}

function createTotalPriceForEachItemEl(price, quantity) {
  return El({
    element: "div",
    innerText: "$" + (price * quantity).toFixed(2),
  });
}

function createSizeAndColorEl(item) {
  const color = item.sneaker.colors.split("|")[0];
  const size = item.sneaker.sizes.split("|")[0];
  return El({
    element: "div",
    className: "flex items-center gap-2",
    children: [
      El({
        element: "div",
        className: "bg-black mt-1 w-4 h-4 rounded-full",
        style: `background:${color};`,
      }),
      El({
        element: "p",
        className: "text-[#646360] text-sm",
        innerText: color,
      }),
      El({
        element: "div",
        className: "w-px ml-1 h-4 bg-[#646360] ",
      }),
      El({
        element: "p",
        className: "text-[#646360] text-sm",
        innerText: "size = " + size,
      }),
    ],
  });
}

function createNameAndTrashbinEl(item, index) {
  return El({
    element: "div",
    className: "flex gap-4",
    children: [createItemNameEl(item.sneaker.name), createTrashbinEl(index)],
  });
}

function createTrashbinEl(index) {
  return El({
    element: "img",
    className: "w-6",
    src: "../../../public/assets/svg/cart/cart-trashbin.svg",
    eventListener: [
      {
        event: "click",
        callback: () => {
          store.setState("isModalOpen", true);
          store.setState("deleteIndex", index);
        },
      },
    ],
  });
}

function createItemNameEl(name) {
  return El({
    element: "p",
    className: "text-[18px] font-bold text-[#152536] truncate",
    innerText: name,
  });
}

function createItemImageEl(url) {
  return El({
    element: "div",
    className: "w-40 rounded-3xl flex justify-center items-center",
    children: [
      El({
        element: "img",
        src: url,
        className: "w-full rounded-3xl",
      }),
    ],
  });
}

function createHeaderEl() {
  return El({
    element: "div",
    className:
      "fixed w-full bg-[#f9f9fa] flex justify-between h-22 pl-6 pr-6 items-center ",
    children: [createLogoAndTitleEl(), createSearchIconEl()],
  });
}

function createSearchIconEl() {
  return El({
    element: "img",
    className: "w-7 ",
    src: "../../../public/assets/svg/cart/cart-search.svg",
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate("/search");
        },
      },
    ],
  });
}

function createLogoAndTitleEl() {
  return El({
    element: "div",
    className: "flex gap-5 items-center",
    children: [createLogoIconEl(), createCartTitleEl()],
  });
}

function createLogoIconEl() {
  return El({
    element: "img",
    className: "w-4",
    src: "../../../public/assets/svg/cart/cart-logo.svg",
  });
}

function createCartTitleEl() {
  return El({
    element: "p",
    className: "font-bold text-2xl",
    innerText: "My Cart",
  });
}

async function getCartItems() {
  try {
    const res = await fetch(GET_CART_ITEMS_API_URL, {
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
    cartItems = await res.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateCart(item) {
  //patch cart
}
