const fs = require("fs");
const readline = require("readline");
const http = require("http");
const url = require('url')
const replaceHtml = require('./Modules/replaceHtml')

const html = fs.readFileSync('./Template/index.html', 'utf-8');
const products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'));
const productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');
const productDeatailstHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');

const server = http.createServer()

server.on('request', (req, res) => {
    const { query, pathname: path } = url.parse(req.url, true)

    // Home Page
    if (path === "/" || path.toLowerCase() === '/home') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'Header Name'
        })
        res.end(html.replace('{{%CONTENT%}}', 'You are on the Home Page'));
    }
    // About Page
    else if (path.toLowerCase() === '/about') {
        res.writeHead(200)
        res.end(html.replace('{{%CONTENT%}}', 'You are on the About Page'));
    }
    // Conatct Page
    else if (path.toLowerCase() === '/contact') {
        res.writeHead(200)
        res.end(html.replace('{{%CONTENT%}}', 'You are on the Contact Page'));
    }
    // Products Page
    else if (path.toLowerCase() === '/products') {
        if (!query.id) {
            const productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod)
            })
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            res.end(html.replace('{{%CONTENT%}}', productHtmlArray.join(',')));
        } else {
            const prod = products[query.id]
            const productDetailsResponseHtml = replaceHtml(productDeatailstHtml, prod)
            res.end(html.replace('{{%CONTENT%}}', productDetailsResponseHtml))
        }
    }
    // 404 Page
    else {
        res.writeHead(404)
        res.end(html.replace('{{%CONTENT%}}', '404! Page not found'));
    }
});

server.listen(8000, () => {
    console.log('Server Running');
});