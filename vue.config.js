module.exports = {
    dev: {
        proxy: {
            '/proxy': {
                target: 'http://localhost:3000/users', // target host
                ws: true, // proxy websockets 
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^/proxy': '' // rewrite path
                }
            },
        }
    }
};
