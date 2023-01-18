import React from "react";
import PostList from "./components/postList/PostList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PostList />
        </QueryClientProvider>
    );
}

export default App;
