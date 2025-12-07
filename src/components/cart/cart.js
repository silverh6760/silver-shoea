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
  cartItems = getCartItems();
  return El({
    element: "div",
    className: "flex flex-col w-full h-232",
    children: [createHeaderEl(), createCartItemsEl()],
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

function createCartCard(item, index) {}

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
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
