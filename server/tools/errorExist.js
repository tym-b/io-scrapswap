module.exports = function(err, res, code, errMsg) {
    if (err) {
        if (res)
            res.status(code || 500).send(errMsg || err);
        return true;
    } else {
        return false;
    }
}
