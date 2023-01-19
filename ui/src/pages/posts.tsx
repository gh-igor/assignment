import React, { memo, useCallback, useState } from "react";
import PostList from "../components/postList/PostList";
import Pagination from "../components/pagination/Pagination";
import useGetPosts from "../api/useGetPosts";
import Dashboard from "../components/dashboard/Dashboard";
import styles from "./posts.module.css";

const ITEMS_PER_PAGE = 100;

const PaginationMemo = memo(Pagination);

const Posts = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useGetPosts({ page });

    const onNextClick = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, []);

    const onPreviousClick = useCallback(() => {
        setPage(prevPage => prevPage - 1);
    }, []);

    return (
        <>
            <div className={styles.content}>
                <div className={styles.dashboardWrapper}>
                    <h3>Dashboard:</h3>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data && <Dashboard posts={data} />}
                </div>
                <div className={styles.postListWrapper}>
                    <h3>List:</h3>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && data && <PostList posts={data} />}
                </div>
            </div>
            <div className={styles.paginationWrapper}>
                <h3>Pagination:</h3>
                <PaginationMemo
                    currentPage={page}
                    itemsPerPageMax={ITEMS_PER_PAGE}
                    itemsLength={data?.length}
                    onPreviousClick={onPreviousClick}
                    onNextClick={onNextClick}
                />
            </div>
            {error && <div>{(error as Error).message}</div>}
        </>
    );
}

export default Posts;
