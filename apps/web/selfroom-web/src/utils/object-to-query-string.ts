type Obj = {
  [key: string]: string;
};

export function objectToQueryString(obj: Obj) {
  const queryString = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
  return queryString;
}
