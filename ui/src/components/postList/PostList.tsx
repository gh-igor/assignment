import React from "react";
import { Post } from "../../dto/Post";

type Props = {
    posts: Post[];
};

const PostList = ({ posts }: Props) => (
    <ul>
        {posts?.map(({ id, from_id, from_name, message, type, created_time }) => (
            <li key={id}>
                <h3>{from_name} ({from_id})</h3>
                <div>{message}</div>
                <strong>{type}</strong>
                <div>{created_time}</div>
            </li>
        ))}
    </ul>
)

export default PostList;
