require(`./${process.env.NODE_ENV === 'development' ? 'dev' : 'pro'}`);
require('./common');