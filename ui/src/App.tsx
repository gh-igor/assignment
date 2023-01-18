import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Posts from "./pages/posts";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Posts />
        </QueryClientProvider>
    );
}

export default App;
