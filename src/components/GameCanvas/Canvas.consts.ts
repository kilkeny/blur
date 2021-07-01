import { mapLevel } from './resources/level';

export const CONFIG = {
  EPS: 0.1,
  CANVAS: {
    width: 1440,
    height: 1024,
    color: 'white',
  },
  // TODO: цвета пока взяты для отладки механики
  BARRIER: {
    lineColor: 'rgb(44, 0, 255)',
    fillColor: 'white',
  },
  // TODO: цвета пока взяты для отладки механики
  LEVELS: {
    lineColor: '#fafafa',
    fillColor: '#fafafa',
    width: 1440,
    height: 1024,
    LEVEL1: mapLevel,
  },
  BALL: {
    speed: 7,
    radius: 7,
    // С каждым ударом а борт шарик уменьшается в размере на 0.5
    deltaRadius: 0.5,
    color: 'rgb(44, 0, 255)',
    // Цвет направления движения шарика
    normalColor: 'red',
    // Величина шлефа, количество шариков после первого
    length: 10,
  },
  FINISH: {
    x: 196,
    y: 982,
    length: 10,
    step: 15,
    radius: 5,
    color: 'green',
  },
};
