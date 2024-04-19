import express, { Express, Request, Response } from 'express'
import { config } from 'dotenv'
import auth_routes from './routes/auth_routes';
import { user_routes } from './routes/user_routes';
import { product_router } from './routes/product_routes';
import { variation_router } from './routes/variation_routes';
import { image_router } from './routes/images_route';
config();

const port = process.env.PORT || 3000

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth/', auth_routes)
app.use('/user/', user_routes)
app.use('/product/', product_router)
app.use('/variation/', variation_router)
app.use('/image/', image_router)

app.get('/', (request: Request, response: Response) => {
    return response.send('[SERVER]: Welcome to Ecommerce API')
})

app.listen(port, () => {
    console.log(`[SERVER]: Running http://localhost:${port}`);
})