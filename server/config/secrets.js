module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://scrapswap:scrapswap@ds015710.mlab.com:15710/io-scrapswap',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  google: {
    clientID: process.env.GOOGLE_CLIENTID || '808748927391-ve2qs2nn6uam7m9md4foj3oh2dv8c05p.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'orLJPQ765LEb_58yZwD6TznB',
    callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  }
};
