module.exports = (myErr) => (req, res, next) => {
    Promise.resolve(myErr(req, res, next))
    .catch(next);
};