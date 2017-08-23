module.exports = () => ({
        'X-Client-Id': '123',
        'X-Client-Secret': '123',
        endpoint: '',
        db: {
          db: 'langschat',
          host: 'localhost',
          user: '',
          pass: '',
        },
        models: [
          'systemUser',
          'systemFile',
        ],
        admin: {
          _slug: 'admin@admin.com',
          mail: 'admin@admin.com',
          password: '12345',
          role: 'SuperAdmin',
        },
      });