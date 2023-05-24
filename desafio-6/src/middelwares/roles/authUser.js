const authUser = (req, res, next) => {
  if (req.session?.user?.email) {
    return next();
  }

  return res.status(401).send({ message: "ERROR DE AUTORIZACIÓN!" });
};

export default authUser;
