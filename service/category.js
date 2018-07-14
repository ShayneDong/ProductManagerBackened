let categoryService = require('../model/category');
let config = require('../config');

async function addCategory(category) {
    let res = await categoryService.create(category);
    return res;
}

async function getCategoryByPage(page = 1) {
    return await categoryService.find().skip(config.PageCount * (page - 1)).limit(config.PageCount)
        .sort('created').select('-__v');
}


async function isCategoryExist(id) {
    let res = await categoryService.findOne({_id: id});
    if (!res) {
        throw  Error('分类不存在');
    }
}

async function updateCategory(id, update) {
    await isCategoryExist(id);
    let res = await categoryService.updateOne({_id:id},update);
    if(res.n<1){
        throw Error('更新失败');
    }

}

async function deleteCategory(id) {
    await isCategoryExist(id);
    let res = await categoryService.deleteOne({_id:id});
    if(res.n<1){
        throw Error('删除失败');
    }
}

module.exports = {
    addCategory,
    getCategoryByPage,
    updateCategory,
    deleteCategory
}