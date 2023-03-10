import Post from '../models/post.js';
import { cloudinaryV2 } from '../../config/cloudinary/index.js';

const PostController = {
    createPost: async (req, res) => {
        try {
            const { author, demo, banner } = req.body;
            const uploadRes = await cloudinaryV2.uploader.upload(banner, {
                upload_preset: 'mpc-web-design',
            });

            const post = await Post.create({
                author,
                url: demo,
                banner: uploadRes.url,
            });

            return res.status(200).json({
                status: 'success',
                data: post,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
    reactPost: async (req, res) => {
        try {
            const { idPost } = req.params;
            const mssv = req.mssv;
            const post = await Post.findById(idPost);

            if (!post) {
                return res.status(404).json({
                    status: 'error',
                    data: 'Post not found',
                });
            }

            const reacted = post?.react_list.find((r) => r === mssv);

            if (!reacted) {
                post.react_list.push(mssv);
            } else {
                post.react_list = post.react_list.filter((r) => r !== mssv);
            }
            await post.save();

            return res.status(200).json({
                status: 'success',
                data: {
                    id: post._id,
                    react: post.react_list.length,
                },
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
    getAllPost: async (req, res) => {
        try {
            const { userID } = req.params;
            const posts = await Post.find();

            const data = [];
            posts.forEach((post) => {
                const obj = {
                    id: post._id,
                    author: post.author,
                    url: post.url,
                    banner: post?.banner,
                    react: post.react_list.length,
                    isReacted: false,
                };

                if (userID !== 'anonymous') {
                    const reacted = post?.react_list.find((r) => r === userID);
                    if (reacted) {
                        obj.isReacted = true;
                    }
                }
                data.push(obj);
            });

            return res.status(200).json({
                status: 'success',
                data: data,
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
    exportPost: async (req, res) => {
        try {
            const { idPost } = req.params;
            const post = await Post.findById(idPost);
            if (!post) {
                return res.status(404).json({
                    status: 'error',
                    data: 'Post not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                data: {
                    author: post.author,
                    data: post.react_list,
                },
            });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                data: err,
            });
        }
    },
};

export default PostController;
