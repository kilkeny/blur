import { mapLevel } from './resources/level';

export const tileSize = 25;

export const CONFIG = {
    EPS: 0.1,
    CANVAS: {
        width: 1440,
        height: 1024,
        line: 0,
        color: 'white',
    },
    // TODO: цвета пока взяты для отладки механики
    BARRIER: {
        lineColor: 'rgb(44, 0, 255)',
        fillColor: 'white',
    },
    // TODO: цвета пока взяты для отладки механики
    LEVELS: {
        lineColor: 'red',
        fillColor: '#fafafa',
        width: 1440,
        height: 1024,
        LEVEL1: mapLevel,
    },
};
