const emochu = require('./app');

emochu.firstLoads(['config'], () => {
  emochu.load('models', { verbose: true })
    .then('controllers', { verbose: true })
    .then('routes', { verbose: true })
    .into(emochu.app, () => {
      emochu.start(8000, emochu.app.config);
    });
});

