export type ApiDto<T> = {
    meta: {
        request_id: string;
    },
    data: T,
};

