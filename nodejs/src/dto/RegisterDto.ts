import { ApiDto } from './ApiDto';

type RegisterData = {
    client_id: string;
    email: string;
    sl_token: string;
};

export type RegisterDto = ApiDto<RegisterData>;
