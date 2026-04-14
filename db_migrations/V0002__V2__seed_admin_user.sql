
INSERT INTO users (name, email, password_hash, city, is_admin)
VALUES (
  'Администратор',
  'admin@mamaclub.ru',
  md5('admin123'),
  'Москва',
  TRUE
);

INSERT INTO notification_settings (user_id)
SELECT id FROM users WHERE email = 'admin@mamaclub.ru';

INSERT INTO privacy_settings (user_id)
SELECT id FROM users WHERE email = 'admin@mamaclub.ru';
