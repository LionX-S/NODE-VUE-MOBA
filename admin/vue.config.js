module.exports={
    // 设置打包后存放的路径，以及js与css文件引用时的路径
    outputDir:__dirname+'/../server/admin',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}