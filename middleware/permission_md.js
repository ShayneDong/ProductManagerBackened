let role_permissions = [
    {
        role: 0,
        permissions: [
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    {
        role: 100,
        permissions: [
            /.*/
        ]
    }
];
module.exports = (req, res, next) => {
    if (req.user) {
        let isLetGo = false;
        role_permissions.forEach(obj => {
            if (req.user.role === obj.role) {
                obj.permissions.forEach(p => {
                    if (p.test(req.url)) {
                        isLetGo = true;
                    }
                });
            }
        });
        if (!isLetGo) {
            throw Error("当前用户权限不足")
        };
    }
    next();
};