import express, { Request, Response } from "express";
import { createProduct } from "../services/products.service";
import { ApiResponse, ErrorResponse } from "../types/response.types";
import { Product } from "../models/products.model";

const router = express.Router();


router.post('/create-product', async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const product = await createProduct({...(body && body || {})})

        return res.status(201).json({
            success: true,
            timestamp: Date.now().toLocaleString(),
            data: product,
        } as ApiResponse<Product>)
    } catch (err) {
        console.error('[ERROR]: something went wrong creating a product: ', err);
        return res.status(500).json({
            message: `[ERROR]: something went wrong creating a product: ${err}`,
            error: err,
            timestamp: Date.now().toLocaleString(),
        } as ErrorResponse)
    }
});

router.get('/get-all-products', async (_: Request, res: Response)  => {
    try {
        return res.status(200).json({ 
            success: true,
            timestamp: Date.now().toLocaleString(),
            data: await Product.findAll(),
        } as ApiResponse<Product[]>)
    } catch (err) {
        console.error('[ERROR]: something went wrong fetching all the products: ', err);
        return res.status(500).json({
            message: `[ERROR]: something went wrong fetching all the products: ${err}`,
            error: err,
            timestamp: Date.now().toLocaleString(),
        } as ErrorResponse)
    }
})

export default router;