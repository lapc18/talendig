import { Product } from "../models/products.model";

export const createProduct = async (data: Partial<Product>) => {
    const product = await Product.create(data);

    console.log('Product created: ', JSON.stringify(product.toJSON()))

    return product;
}


export const getAllProducts = async () => {
    const products = await Product.findAll();

    console.log('Product created: ', JSON.stringify(products))

    return products;
}
