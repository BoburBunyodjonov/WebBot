import { Buffer } from "buffer";

const base64 = {
  decode(str: string) {
    return typeof str === "string"
      ? Buffer.from(str, "base64").toString("utf8")
      : "null";
  },
  encode(str: string) {
    return typeof str === "string"
      ? Buffer.from(str, "utf8").toString("base64")
      : "null";
  },
};

export default base64;