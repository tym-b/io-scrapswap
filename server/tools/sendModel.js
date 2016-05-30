module.exports = function(res, model, errMsg) {
    if (model) {
        res.json(model);
        return true;
    } else {
        res.status(404).send(errMsg || "Returned model is NULL");
        return false;
    }
}
