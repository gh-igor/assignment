import { ApiDto } from './ApiDto';

type Post = {
    id: string;
    from_name: string;
    from_id: string;
    message: string;
    type: string;
    created_time: string;
};

export type PostsDto = ApiDto<{
    page: number;
    posts: Post[];
}>;
