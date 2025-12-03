export function getUserObject() {
  const cookies = document.cookie.split(";").reduce((acc, item) => {
    const [key, value] = item.split("=").map((v) => v.trim());
    if (key === "username" || key === "token") {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
  return cookies;
}
