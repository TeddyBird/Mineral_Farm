module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/Mineral_Farm/' : '/',
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].title= '礦石牧場'
            return args
          })
    }
    
};
