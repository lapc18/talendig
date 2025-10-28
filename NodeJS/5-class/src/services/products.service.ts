import { Product } from "../models/products.model";

export const createProduct = async (data: Partial<Product>) => {
    const product = await Product.create(data);
    console.log('Product created: ', JSON.stringify(product.toJSON()))
    return product;
}

export const getAllProducts = async () => {
    const products = await Product.findAll();
    console.log('Products fetched: ', JSON.stringify(products))
    return products;
}

export const getProductById = async (id: string): Promise<Product | null> => {
    const product = await Product.findByPk(id);
    console.log('Product fetched: ', JSON.stringify(product?.toJSON()))
    return product;
}

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product | null> => {
    const [affectedRows] = await Product.update(data, { where: { id } });
    if (affectedRows === 0) return null;
    const product = await Product.findByPk(id);
    console.log('Product updated: ', JSON.stringify(product?.toJSON()))
    return product;
}

export const deleteProduct = async (id: string): Promise<boolean> => {
    const deletedRows = await Product.destroy({ where: { id } });
    console.log('Product deleted: ', id)
    return deletedRows > 0;
}
