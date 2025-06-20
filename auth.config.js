export default NextAuth({
  // ...other config
  trustedHosts: [
    "main--web-homes.netlify.app",
    "685542f0819abf00084440aa--web-homes.netlify.app",
    // add any other preview or production URLs
  ],
});
