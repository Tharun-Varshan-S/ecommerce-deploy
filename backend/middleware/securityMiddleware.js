const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

const applySecurity = (app) => {
  app.use(helmet());
  app.use("/api", apiLimiter);
};

module.exports = { applySecurity };