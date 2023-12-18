const asyncHandler = (action) => async (req, res, next) => {
    Promise.resolve(action(req,res,next)).catch(next);
}

module.exports = asyncHandler;