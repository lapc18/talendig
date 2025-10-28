import express, { Request, Response } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, UserData } from "../services/users.service";
import { ApiResponse, ErrorResponse } from "../types/response.types";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/create-user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/create-user',
    async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const user = await createUser(body);
            return res.status(201).json({
                success: true,
                timestamp: new Date().toISOString(),
                data: user,
            } as ApiResponse<UserData>)
        } catch (err) {
            console.error('[ERROR]: something went wrong creating a user: ', err);
            return res.status(500).json({
                message: `[ERROR]: something went wrong creating a user: ${err}`,
                error: err,
                timestamp: new Date().toISOString(),
            } as ErrorResponse)
        }
    }
);

/**
 * @swagger
 * /api/v1/users/get-all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/get-all-users',
    async (_: Request, res: Response) => {
        try {
            const users = await getAllUsers();
            return res.status(200).json({ 
                success: true,
                timestamp: new Date().toISOString(),
                data: users,
            } as ApiResponse<UserData[]>)
        } catch (err) {
            console.error('[ERROR]: something went wrong fetching all the users: ', err);
            return res.status(500).json({
                message: `[ERROR]: something went wrong fetching all the users: ${err}`,
                error: err,
                timestamp: new Date().toISOString(),
            } as ErrorResponse)
        }
    }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:id',
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            const user = await getUserById(id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            
            return res.status(200).json({
                success: true,
                timestamp: new Date().toISOString(),
                data: user,
            } as ApiResponse<UserData>)
        } catch (err) {
            console.error('[ERROR]: something went wrong fetching the user: ', err);
            return res.status(500).json({
                message: `[ERROR]: something went wrong fetching the user: ${err}`,
                error: err,
                timestamp: new Date().toISOString(),
            } as ErrorResponse)
        }
    }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/:id',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            const { body } = req;
            const user = await updateUser(id, body);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            
            return res.status(200).json({
                success: true,
                timestamp: new Date().toISOString(),
                data: user,
            } as ApiResponse<UserData>)
        } catch (err) {
            console.error('[ERROR]: something went wrong updating the user: ', err);
            return res.status(500).json({
                message: `[ERROR]: something went wrong updating the user: ${err}`,
                error: err,
                timestamp: new Date().toISOString(),
            } as ErrorResponse)
        }
    }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/:id',
    verifyToken,
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            const deleted = await deleteUser(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString(),
                } as ErrorResponse)
            }
            
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                timestamp: new Date().toISOString(),
            } as ApiResponse)
        } catch (err) {
            console.error('[ERROR]: something went wrong deleting the user: ', err);
            return res.status(500).json({
                message: `[ERROR]: something went wrong deleting the user: ${err}`,
                error: err,
                timestamp: new Date().toISOString(),
            } as ErrorResponse)
        }
    }
);

export default router;

