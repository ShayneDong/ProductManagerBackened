require('../db')
let categoryService = require('../service/category');

async function addCategoryTest() {
    let category =  [
        { name: "a" },
        { name: "b" },
        { name: "c" },
        { name: "d" },
        { name: "e" },
        { name: "f" },
    ]
    let res = await categoryService.addCategory(category);
    console.log(res);
}

async function getCategoryByPageTest() {
    page = 2;
    let res = await categoryService.getCategoryByPage(page);
    console.log(res);

}

async function updateCategoryTest() {
    let update = {
        name:'房产',
        created:Date.now()
    }
    await categoryService.updateCategory("5b4841bf7be9a813c4357548",update)
}

async function deleteCategoryTest() {
    let id =[
        "5b4844b62441621368dad554",
        "5b4844b62441621368dad553"

    ]
    await categoryService.deleteCategory(id);
}

getCategoryByPageTest();