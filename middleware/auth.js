
function isLoggedIn(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  next();
}

function isRecruiter(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "recruiter") {
    return res.status(403).send("Access denied. Recruiters only.");
  }

  next();
}

module.exports = { isLoggedIn, isRecruiter };
