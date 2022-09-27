const { SignJWT, jwtVerify } = require("jose");

async function sign(payload, secret) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}
async function getToken() {
  const jwt = await new SignJWT({ id: "632197b29a793e8051799301" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode("YouGuessIt"));
  return jwt;
}
getToken().then(res => console.log(res));

async function verify(token, secret) {
  const { payload, protectedHeader } = await jwtVerify(token, secret);
  console.log(payload, protectedHeader);
  return payload;
}

module.exports = {
  sign,
  verify,
};
