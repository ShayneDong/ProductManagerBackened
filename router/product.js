let productService = require('../service/product');
let router = require('express').Router();

router.get('/', async (req, res) => {
    let products = await productService.getProductsByPage(req.query.page);
    res.success(products);
});

router.post('/', async (req, res) => {
    let product = await productService.addProduct(req.body)
    res.success(product)
});

router.put('/:id', async (req, res)=>{
    await productService.updateProduct(req.params.id, req.body)
    res.success()
});

router.delete('/:id', async (req, res)=>{
    await productService.deleteProduct(req.params.id)
    res.success()
});

module.exports = router;