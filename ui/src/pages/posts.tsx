import React, { useState } from "react";
import PostList from "../components/postList/PostList";
import Pagination from "../components/pagination/Pagination";
import useGetPosts from "../api/useGetPosts";
import styles from "./posts.module.css";

const ITEMS_PER_PAGE = 100;

const Posts = () => {
    const [page, setPage] = useState(1);
    const { data } = useGetPosts({ page });

    const onNextClick = () => {
        setPage(page + 1);
    };

    const onPreviousClick = () => {
        setPage(page - 1);
    }

    return (
        <>
            <div className={styles.postListWrapper}>
                <PostList page={page} />
            </div>
            <div className={styles.paginationWrapper}>
                <Pagination
                    currentPage={page}
                    itemsPerPageMax={ITEMS_PER_PAGE}
                    itemsLength={data?.length}
                    onPreviousClick={onPreviousClick}
                    onNextClick={onNextClick}
                />
            </div>
        </>
    );
}

export default Posts;
