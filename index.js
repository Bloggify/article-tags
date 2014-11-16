Bloggify.on("article:save", function (lien, data, callback) {

    data.tags = data.tags || [];

    if (typeof data.tags !== "string") {
        return lien.end({
            error: "validate_error"
          , fields: ["tags"]
        }, 400);
    }

    data.tags = data.tags.split(/[ ,]+/);
    callback();
});
