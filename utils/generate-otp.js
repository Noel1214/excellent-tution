export const generateOtp = () => {
  const digits = 4;
  let otp = "";
  for (let i = 0; i < digits; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
