const fs = require('mz/fs');

function addMapping(router, mapping) {
    for (let key in mapping) {
        let [method, path] = key.split(':');
        router[method](path, mapping[key]);
        console.log(`Register url mapping: ${key}`);
    }
};

async function addControllers(router, dir) {
    const files = await fs.readdir(`${__dirname}/dir`);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    for (let file of jsFiles) {
        console.log(`process controller: ${file}...`);
        const mapping = require(`${__dirname}/dir/${files}`);
        addMapping(router, mapping);
    }
};

module.exports = dir => {
    let controllersDir = dir || 'controllers';
    const router = require('koa-router')();
    addControllers(router, controllersDir);
    return router.routes();
}