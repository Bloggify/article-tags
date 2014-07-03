// Define success
Debug._config.success = {
    color: "#00CF06"
  , text: "SUCCESS"
};

// Some output
Debug.log("Plugin inited", "success");

// Add the new field to be validated
Bloggify.form["new-post"].validate["tags"] = "string,non-empty"

// Listen for new posts
Bloggify.emitter.on("new-post", function (data) {

    // Get form data and post
    var formData = data.formData
      , post = data.newPost
      ;

    // Attach tags field
    post.tags = formData.tags.split(/[ ,]+/);
});

// Enable post tags
Config.options = Config.options || {};
Config.options.postTags = true;
