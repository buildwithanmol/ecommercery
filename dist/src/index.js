"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const user_routes_1 = require("./routes/user_routes");
const product_routes_1 = require("./routes/product_routes");
const variation_routes_1 = require("./routes/variation_routes");
const images_route_1 = require("./routes/images_route");
const order_route_1 = require("./routes/order_route");
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/auth/', auth_routes_1.default);
app.use('/user/', user_routes_1.user_routes);
app.use('/product/', product_routes_1.product_router);
app.use('/variation/', variation_routes_1.variation_router);
app.use('/image/', images_route_1.image_router);
app.use('/order/', order_route_1.order_router);
app.get('/', (request, response) => {
    return response.send('[SERVER]: Welcome to Ecommerce API');
});
app.listen(port, () => {
    console.log(`[SERVER]: Running http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map