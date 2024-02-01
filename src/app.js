const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send("hola");
})

const productsRouter = require("../routes/productRouter");
app.use("/productos", productsRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});