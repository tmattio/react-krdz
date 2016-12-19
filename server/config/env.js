import path from 'path';

const configurations = {
  root: path.join(__dirname, '/..'),
  db: 'mongodb://heroku_3hm456b6:vsojenksd8oa1hmiupjq8meebf@ds141697.mlab.com:41697/heroku_3hm456b6',
  port: 3001
};

if(process.env.NODE_ENV !== 'production') {
  Object.assign(configurations, {
    env: 'development',
  });
} else {
  Object.assign(configurations, {
    env: 'production',
  });
}

export default configurations;
