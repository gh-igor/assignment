import React from "react";
import useGetPosts from "../../api/useGetPosts";

type Props = {
    page: number;
};

const PostList = ({ page }: Props) => {
    const { data, isLoading, error } = useGetPosts({ page });

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>{(error as Error).message}</div>}
            <ul>
                {data?.map(({ id, from_id, from_name, message, type, created_time }) => (
                    <li key={id}>
                        <h3>{from_name} ({from_id})</h3>
                        <div>{message}</div>
                        <strong>{type}</strong>
                        <div>{created_time}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PostList;
