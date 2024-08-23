export const myFetch = async (url, method, body) => {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { user } = await res.json();
  return user;
};
