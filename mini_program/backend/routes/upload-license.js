
let { prevRouter } = require('../config/router');
let pool = require('../config/mysql');
let uploadType = require('../config/CONSTANT').LICENSE;
let upload = require('../utils/upload')(uploadType);
let checkRequireParams = require('../utils/checkRequireParams');
let { extname } = require('path');
prevRouter.post('/upload/license', upload.any() ,async (ctx, next) => {
    let {body, files} = ctx.req;
    let id = body.id,
        file = files && files.length && files[0] || {},
        ext = extname(file.originalname);
    let requireParams = ['id', 'picture'];
    let query = {
        id: id,
        picture: file.fieldname
    };
    console.log("body", body, "files",files);
    let ret = checkRequireParams(requireParams, query);
    if (!ret.errcode) {
        let searchDatabase = () => {
            return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                    let sql = `UPDATE checklist SET license_img='images/license/license-${id}${ext}' where id=${id}`;
                    connection.query(sql, (err, result) => {
                        connection.release();
                        if (err) {
                            ret.errcode = 5000;
                            ret.errMsg = err;
                            reject(err);
                        } else {
                            ret.errcode = 0;
                            ret.errMsg = '成功';
                        }
                        resolve(ret);
                    });
                });
            })
        };
        ctx.body = await searchDatabase();
    } else {
        ctx.body = ret;
    }
});