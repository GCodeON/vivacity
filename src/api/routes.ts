import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

router.get('/awesome/applicant', async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: {
            email: 'gcodeondev@gmail.com' 
        }
    })
    if(user) {
        return res.json(user)
    }
})

router.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.json(users)
})

router.post('/users', async (req: Request, res: Response) => {
    const userData = await req.body;

    const user = await prisma.user.create({
        data: userData
    })

    if(user) {
        return res.json(user)
    }
})

router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findMany({
        where: { id: parseInt(id) },
    })

    if(user) {
        return res.json(user)
    }
})

router.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const formData = await req.body;

    const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: formData,
    })
    
    if(user) {
        res.json(user)
    }
})
  
router.delete('/users/:id', async (req, res) => {
    
    const { id } = req.params
    const user = await prisma.user.delete({
        where: { id: parseInt(id) },
    })

    if(user) {
        res.json(user)
    }
})

export default router;