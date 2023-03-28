// import { ApiEntity } from './models/api-entity';

import { environment } from "src/environments/environment";

const API_URL = environment.API_URL;

export const _API_ENDPOINTS: any = {
    host: API_URL + 'v2' ,
    login: {
        start: '/login.php',
    },
    dashboard: {
        start: '/not2icias.php',
    },
};
