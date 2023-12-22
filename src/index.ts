import express , { Application, Request, Response } from 'express';
import 'dotenv/config'
import { PrismaClient } from '@prisma/client';

const app : Application = express();
const PORT = process.env.PORT || 8080;

const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const serverError = (error: unknown) => {
    if( error instanceof Error) {
        return error.message;
    }
    return String(error);
}

app.get('/awesome/applicant', async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: {
            email: 'gcodeondev@gmail.com' 
        }
    })
    if(user) {
        return res.json(user)
    }
})

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.json(users)
})

app.post('/users', async (req: Request, res: Response) => {
    const userData = await req.body;

    const user = await prisma.user.create({
        data: userData
    })

    if(user) {
        return res.json(user)
    }
})

app.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findMany({
        where: { id: parseInt(id) },
    })

    if(user) {
        return res.json(user)
    }
})

app.put('/users/:id', async (req: Request, res: Response) => {
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
  
app.delete('/users/:id', async (req, res) => {
    
    const { id } = req.params
    const user = await prisma.user.delete({
        where: { id: parseInt(id) },
    })

    if(user) {
        res.json(user)
    }
})

try {
    app.listen(PORT, (): void => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
} catch (error: any) {
    console.error(serverError(error));
}