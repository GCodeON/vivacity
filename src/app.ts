import express , { Application } from 'express';
import 'dotenv/config'
import apiRoutes from './api/routes';

const app : Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', apiRoutes);

const serverError = (error: unknown) => {
    if( error instanceof Error) {
        return error.message;
    }
    return String(error);
}

try {
    app.listen(PORT, (): void => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
} catch (error: any) {
    console.error(serverError(error));
}

export default app;