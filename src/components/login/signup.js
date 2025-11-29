import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Signup() {
  const signupEl = El({
    element: "div",
    // className: "min-h-screen flex flex-col gap-20 items-center",
    className: "relative grid place-items-center",
    children: [
      createBackButtonEl(),
      createLoginLogoEl(),
      createLoginTitleEl(),
      createUsernameEl(),
      createPasswordEl(),
      createLoginBtnEl(),
      createSignupBtnEl(),
    ],
  });
  setTimeout(() => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    username.addEventListener("input", checkInputs);
    password.addEventListener("input", checkInputs);
  });

  return signupEl;
}

function createBackButtonEl() {
  return El({
    element: "div",
    className: "w-full px-4 py-4 h-14",
    children: [
      El({
        element: "img",
        src: "../../../public/assets/svg/login/back-btn.svg",
        eventListener: [
          {
            event: "click",
            callback: () => {
              router.navigate("/onboarding3");
            },
          },
        ],
      }),
    ],
  });
}

function createLoginLogoEl() {
  return El({
    element: "img",
    src: "../../../public/assets/svg/login/login-logo.svg",
    className: "w-[54px] h-[81px] absolute top-[132px]",
  });
}

function createLoginTitleEl() {
  return El({
    element: "div",
    className: "font-semibold text-[32px] leading-[100%] absolute top-[331px]",
    innerText: "Signup to Your Account",
  });
}

function createUsernameEl() {
  return El({
    element: "div",
    className:
      "group box-border px-3 py-1 flex items-center absolute top-[418px] w-[380px] h-[37px] gap-1 rounded-sm bg-gray-50 border border-gray-50 focus-within:border-2 focus-within:border-black",
    children: [
      El({
        element: "img",
        src: "../../../public/assets/svg/login/letter-icon.svg",
        id: "letterIcon",
      }),
      El({
        element: "input",
        id: "username",
        type: "text",
        placeholder: "Username",
        className:
          "w-full bg-transparent outline-none placeholder:font-inter placeholder:text-[14px] placeholder:leading-[21px] ",
        eventListener: [
          {
            event: "focus",
            callback: () => focusLetterIconBlack(),
          },
          {
            event: "blur",
            callback: () => blurLetterIconGrey(),
          },
        ],
      }),
    ],
  });
}

function focusLetterIconBlack() {
  let letterIcon = document.getElementById("letterIcon");
  letterIcon.src =
    "../../../public/assets/svg/login/letter-icon-focus-black.svg";
}

function blurLetterIconGrey() {
  const username = document.getElementById("username");
  const filled = username.value.trim() !== "";
  if (!filled) {
    let letterIcon = document.getElementById("letterIcon");
    letterIcon.src = "../../../public/assets/svg/login/letter-icon.svg";
  }
}

function createPasswordEl() {
  return El({
    element: "div",
    className:
      "box-border px-3 py-1 flex items-center absolute top-[476px] w-[380px] h-[37px] gap-1 rounded-md bg-gray-50 border border-gray-50 focus-within:border-2 focus-within:border-black",
    children: [
      El({
        element: "img",
        src: "../../../public/assets/svg/login/lock-icon.svg",
        id: "lockIcon",
      }),
      El({
        element: "input",
        type: "password",
        id: "password",
        placeholder: "Password",
        className:
          "w-full bg-transparent outline-none placeholder:font-inter placeholder:text-[14px] placeholder:leading-[21px]",
        eventListener: [
          {
            event: "focus",
            callback: () => focusLockIconBlack(),
          },
          {
            event: "blur",
            callback: () => blurLockIconGrey(),
          },
          {
            event: "focus",
            callback: () => focusEyeIconBlack(),
          },
          {
            event: "blur",
            callback: () => blurEyeIconGrey(),
          },
        ],
      }),
      El({
        element: "img",
        src: "../../../public/assets/svg/login/eye-icon.svg",
        id: "eyeIcon",
        eventListener: [
          {
            event: "click",
            callback: () => togglePassword(),
          },
        ],
      }),
    ],
  });
}

function focusLockIconBlack() {
  let lockIcon = document.getElementById("lockIcon");
  lockIcon.src = "../../../public/assets/svg/login/lock-icon-focus-black.svg";
}

function blurLockIconGrey() {
  const password = document.getElementById("password");
  const filled = password.value.trim() !== "";
  if (!filled) {
    let lockIcon = document.getElementById("lockIcon");
    lockIcon.src = "../../../public/assets/svg/login/lock-icon.svg";
  }
}

function focusEyeIconBlack() {
  let eyeIcon = document.getElementById("eyeIcon");
  eyeIcon.src = "../../../public/assets/svg/login/eye-icon-focus-black.svg";
}

function blurEyeIconGrey() {
  const password = document.getElementById("password");
  const filled = password.value.trim() !== "";
  if (!filled) {
    let eyeIcon = document.getElementById("eyeIcon");
    eyeIcon.src = "../../../public/assets/svg/login/eye-icon.svg";
  }
}

function createLoginBtnEl() {
  return El({
    element: "div",
    className:
      "text-center text-sm mt-3 absolute top-[540px] hover:underline cursor-pointer transition-colors duration-150",
    innerText: "Login",
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate("/login");
        },
      },
    ],
  });
}

function createSignupBtnEl() {
  return El({
    element: "div",
    className: "flex justify-center absolute top-[847px]",
    children: [
      El({
        element: "button",
        className:
          "bg-[#6e7174]  w-95 h-12 rounded-full text-white text-sm font-medium flex items-center justify-center disabled:opacity-50",
        id: "signupBtn",
        innerText: "Signup",
        disabled: true,
        eventListener: [
          {
            event: "click",
            callback: async () => {
              const username = document.getElementById("username").value.trim();
              const password = document.getElementById("password").value.trim();

              const result = await signUpRequest(username, password);

              if (result.error) {
                alert(result.error);
                return;
              }
              router.navigate("/login");
            },
          },
        ],
      }),
    ],
  });
}

function checkInputs() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const signupBtn = document.getElementById("signupBtn");

  const filled = username.value.trim() !== "" && password.value.trim() !== "";

  if (filled) {
    signupBtn.disabled = false;
    signupBtn.classList.remove("bg-[#6e7174]");
    signupBtn.classList.add(
      "bg-black",
      "cursor-pointer",
      "transition-colors",
      "duration-150",
      "hover:bg-[#212529]"
    );
  } else {
    signupBtn.disabled = true;
    signupBtn.classList.remove(
      "bg-black",
      "cursor-pointer",
      "transition-colors",
      "duration-150",
      "hover:bg-[#212529]"
    );
    signupBtn.classList.add("bg-[#6e7174]");
  }
}

function togglePassword() {
  let password = document.getElementById("password");
  if (password.type === "password") {
    password.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
  }
}

async function signUpRequest(username, password) {
  try {
    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    document.cookie = `token=${data.token}; path=/; max-age=31536000; SameSite=Lax`;

    return data;
  } catch (err) {
    return { error: err.message };
  }
}
