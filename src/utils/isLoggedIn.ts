export const isLoggedIn = () => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken ? true : false;
};
