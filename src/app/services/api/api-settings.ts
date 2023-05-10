// import { ApiEntity } from './models/api-entity';

import { environment } from "src/environments/environment";

const API_URL = environment.API_URL;

export const _API_ENDPOINTS: any = {
    host: API_URL + 'v2' ,
    login: {
        start: '/login',
    },
    noticias: {
        start: '/noticias',
    },
    dashboard: {
        start: '/dashboard',
    },
    miequipo: {
        start: '/miequipo',
    },
    mercado: {
        start: '/mercado',
    },
    agencialibre: {
        start: '/agencialibre',
    },
    liga: {
        start: '/liga',
    },
};
