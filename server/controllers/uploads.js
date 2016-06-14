var fs = require('fs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.avatar = function(req, res) {
    console.log(req.file);
    fs.readFile(req.file.path, function(err, image) {
        var newPath = __dirname + "/../../public/img/avatars/" + req.params.id +'.'+ req.file.mimetype.substring(6);;
        fs.writeFile(newPath, image, function(err) {
            if (!err) {
            User.update({_id: req.params.id}, {'profile.picture': newPath}, function(err, succ){});
            res.send("Avatar uploaded");
        } else {
            res.status(400).send("Can not upload avatar");
        }
        });
    });
};
