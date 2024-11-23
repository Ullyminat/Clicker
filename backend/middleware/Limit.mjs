import rateLimit from 'express-rate-limit';

export const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Слишком много запросов',
});

export const limitCLicks = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 300,
    message: 'Подозрительно быстро кликаешь...',
  });