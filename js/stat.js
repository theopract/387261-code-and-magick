'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#306090';
  // рисуем тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 720);
  ctx.fillRect(110, 20, 420, 720);
  // рисуем облако
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 720);
  ctx.fillRect(100, 10, 420, 720);
  // пишем текст сообщения
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  // определение максимального времени и индекса для него
  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }
  // отрисовка гистограммы
  var historamHeight = 150;
  var step = historamHeight / (max);
  // константы
  var barWeight = 40; // ширина столбцов
  var indent = 50; // отступ
  var initialX = 120; // стартовая позиция по оси X
  var initialY = 240; // стартовая позиция по оси Y

  ctx.textBaseline = 'top'; // рисуем текст от левого верхнего угла
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random();
    }
    ctx.fillRect(initialX + (indent + barWeight) * i, initialY, barWeight, -(times[i] * step));
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // цвет текста всегда чёрный
    ctx.fillText(names[i], initialX + (indent + barWeight) * i, initialY + 20); // записываем имя
    ctx.fillText(times[i].toFixed(0), initialX + (indent + barWeight) * i, initialY - (times[i] * step) - 20); // пишем результат
  }
};
