const emochu = require('./app');

emochu.firstLoads(['config'], () => {
  emochu.load('models', { verbose: true })
    .then('routes', { verbose: true })
    .into(emochu.app, () => {
      emochu.start(3000);
    });
});

