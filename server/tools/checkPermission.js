module.exports = function(req, res, errMsg) {
    if (req.user) {
        return true;
    } else {
        res.status(400).send(errMsg || "No permission to execute action");
        return false;
    }
}
