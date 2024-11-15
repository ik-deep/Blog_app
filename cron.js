const cron = require("node-cron");
const blogSchema = require("./schemas/blogSchema");


function cleanUpBin() {

    cron.schedule("* * 0 * * *", async () => {
        try {
            const deletedBlogs = await blogSchema.find({ isDeleted: true });
            const deletedBlogsIds = [];
            deletedBlogs.length > 0 && deletedBlogs.map((blog) => {
                const diff = (Date.now() - blog.deletionDateTime) / 10000 * 60 * 60 * 24;
                if (diff > 30) {
                    deletedBlogsIds.push(blog._id);
                }

            })

            if (deletedBlogsIds.length > 0) {
                try {
                    const deletedBlog = await blogSchema.findOneAndDelete({ _id: { $in: deletedBlogsIds }, })
                    console.log(`Blog has been deleted successfully : ${deletedBlog._id}`)
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    })


}

module.exports = cleanUpBin;