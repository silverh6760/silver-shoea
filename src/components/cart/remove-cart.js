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
        children: [createRemoveFromCartTextEl(), createLineBreakerEl()],
      });
      modalEl.append(modalBox);
    } else {
      modalEl.classList.add("hidden");
    }
  });
  return El({});
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
