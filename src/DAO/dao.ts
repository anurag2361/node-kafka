import { Posts } from "./../models/posts.model";
import { Types } from "mongoose"

export class DAOManager {
    public async deletePosts(data) {
        try {
            const object = JSON.parse(data);
            console.log(object);
            const deleteUser = await Posts.findOneAndDelete({ '_id': new Types.ObjectId(object.postId) });
            console.log("Post deleted");
        } catch (error) {
            throw new Error(`DAO Error ${error}`);
        }
    }
}
