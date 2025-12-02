import { OnboardingPage } from "./pages/onboarding/onboarding";
import { Onboarding2 } from "./components/onboarding/onboarding2";
import "./style/style.css";
import { router } from "./utils/router";
import { OnboardingSwiper } from "./components/onboarding/onboarding-swiper";
import { LoginPage } from "./pages/login/login";
import { Signup } from "./components/login/signup";
import { HomePage } from "./pages/home/home";
import { ProductPage } from "./pages/product/product";
import { CartPage } from "./pages/cart/cart";

const app = document.getElementById("app");
router.addRoute("/", OnboardingPage);
router.addRoute("/onboarding2", Onboarding2);
router.addRoute("/onboarding3", OnboardingSwiper);
router.addRoute("/login", LoginPage);
router.addRoute("/signup", Signup);
router.addRoute("/home", HomePage);
router.addRoute("/product", ProductPage);
router.addRoute("/cart", CartPage);

// router.addRoute("/onboarding/page", onboardingPageTwo);
// router.navigate("/onboarding");
router.init(app);
