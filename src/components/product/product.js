//route.getCurrentParams() to get id of product

import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Product() {
  const params = router.getCurrentParams();
  console.log(params);

  return El({
    element: "div",
  });
}
