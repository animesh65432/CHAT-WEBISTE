import jwt from "jsonwebtoken";

let secret = "animeshdutta";
export const createjwttokens = (obj: object) => {
  let token = jwt.sign(obj, secret);
  return token;
};

export const verifytokens = (token: string) => {
  let body = jwt.verify(token, secret);
  return body;
};
