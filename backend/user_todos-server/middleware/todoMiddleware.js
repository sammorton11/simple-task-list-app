// Middleware to check if the user is authorized
function checkAuthorization(req, res, next) {
  const userIdFromToken = req.user.id; // Assuming you have the user's ID in the token
  const requestedUserId = req.params.id; // Extract the user ID from the URL

  if (userIdFromToken !== requestedUserId) {
    return res.status(403).json({ message: "You are not authorized to access this resource" });
  }

  // User is authorized, continue to the next middleware or route handler
  next();
}

module.exports = {
   checkAuthorization,
}
