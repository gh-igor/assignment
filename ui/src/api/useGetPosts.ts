import { useQuery } from "react-query";
import { Post } from "../dto/Post";
import { apiClient } from "../network/apiClient";

export const queryKey = "get-posts";

type Params = {
    page?: number,
};

export default function useGetPosts(params?: Params) {
    return useQuery([queryKey, params?.page], async () => {
        const { data } = await apiClient.get<Post[]>("posts", {
            params,
        });

        return data;
    });
}
