const asyncHandler = (fn) => (req, res, next) => {
  console.log("Async Handler")
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
