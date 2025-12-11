import { ESModulesEvaluator } from "vite/module-runner";
import { El } from "../../utils/el";

export function RemoveCart(cart) {
  const modalEl = El({
    element: "div",
    className:
      "fixed inset-0 z-40 hidden flex items-end justify-center bg-black/40 backdrop-blur-sm",
  });

  const isOpen = store.getState("isModalOpen");
  if (isOpen) {
    modalEl.classList.remove("hidden");
  }

  store.subscribe("isModalOpen", (isOpen) => {
    if (isOpen) {
      const modalChildrenEl = El({
        element: "div",
        className: "",
        children: [
          createRemoveFromCartTextEl(),
          createLineBreakerEl(),
          createRemovableCartCardEl(cart),
        ],
      });
      modalEl.append(modalChildrenEl);
    } else {
      modalEl.classList.add("hidden");
    }
  });
  return El({});
}

function createRemovableCartCardEl(cart) {
  const src = cart.sneaker.imageURL;
  return El({
    element: "div",
    className:
      "shrink-0 h-42 flex gap-4 pl-5 pr-5 rounded-3xl bg-[#ffffff] items-center",
    children: [
      createCartItemImageEl(src),
      createCartItemDetailEl(cart),
      createLineBreakerEl(),
      createCancelRemoveBtnEl(cart),
    ],
  });
}

function createCancelRemoveBtnEl(cart) {
  return El({
    element: "div",
    className: "flex items-center justify-between gap-4",
    children: [createCancelBtnEl(), createRemoveBtnEl(cart)],
  });
}

function createCancelBtnEl() {
  return El({
    element: "button",
    className:
      "flex-1 h-15 rounded-4xl bg-gray-200 text-gray-700 font-semibold",
    innerText: "Cancel",
    eventListener: [
      {
        event: "click",
        callback: () => store.setState("isModalOpen", false),
      },
    ],
  });
}

function createRemoveBtnEl(cart) {
  return El({
    element: "button",
    className: "flex-1 h-15 rounded-4xl bg-black text-white font-semibold",
    innerText: "Yes, Remove",
    eventListener: [
      {
        event: "click",
        callback: () => {
          deleteCart(cart.id);
          store.setState("cartChanged", true);
          store.setState("isModalOpen", false);
        },
      },
    ],
  });
}

function deleteCart(id) {
  //call remove cart api
}

function createCartItemDetailEl(cart) {
  const name = cart.sneaker.name;
  return El({
    element: "div",
    className: "flex flex-col gap-4",
    children: [
      createCartItemNameEl(name),
      createCartItemColorAndSize(cart),
      createCartItemPricePlusMinusQuantityEl(cart),
    ],
  });
}

function createCartItemPricePlusMinusQuantityEl(cart) {
  const price = cart.sneaker.price;
  return El({
    element: "div",
    className: "flex justify-between",
    children: [
      createCartItemPriceEl(price),
      createCartItemPlusMinusQuantityEl(cart),
    ],
  });
}

function createCartItemPlusMinusQuantityEl(cart) {
  return El({
    element: "div",
    className:
      "flex bg-[#f3f3f3] justify-center gap-4 items-center w-25 h-9 rounded-3xl",
    children: [
      El({
        element: "div",
        className: "font-semibold mb-3",
        innerText: "_",
      }),
      El({
        element: "div",
        className: "font-semibold",
        innerText: cart.quantity,
      }),
      El({
        element: "div",
        className: "font-semibold",
        innerText: "+",
      }),
    ],
  });
}

function createCartItemPriceEl(price) {
  return El({
    element: "div",
    className: "",
    innerText: "$" + price,
  });
}

function createCartItemColorAndSize(cart) {
  const color = cart.sneaker.colors.split("|")[0];
  const size = cart.sneaker.sizes.split("|")[0];
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

function createCartItemNameEl(name) {
  return El({
    element: "div",
    className: "flex gap-4",
    children: [
      El({
        element: "p",
        className: "text-[18px] font-bold text-[#152536] truncate",
        innerText: name,
      }),
    ],
  });
}

function createCartItemImageEl() {
  return El({
    element: "div",
    className:
      "w-42 h-32 rounded-3xl bg-[#f3f3f3] flex justify-center items-center",
    children: [
      El({
        element: "img",
        src: src,
        className: "w-27 h-27 object-contain rounded-3xl",
      }),
    ],
  });
}

function createRemoveFromCartTextEl() {
  return El({
    element: "h2",
    className: "text-center font-bold text-[20px] ",
    innerText: "Remove From Cart?",
  });
}

function createLineBreakerEl() {
  return El({
    element: "div",
    className: "w-95 mx-auto h-px bg-[#eeefef] my-4",
  });
}

// {
//         "id": 2,
//         "quantity": 5,
//         "sneaker": {
//             "id": 1,
//             "pid": 1,
//             "name": "Nike React Infinity Run Flyknit",
//             "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
//             "colors": "black|brown|white|blue|red",
//             "sizes": "41|43|45",
//             "price": 160,
//             "category": "RUNNING",
//             "gender": "MEN",
//             "brand": "NIKE"
//         }
