const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('view engine','ejs');

app.listen(8080);

app.use(express.static('public'));

app.use(morgan('dev'));

// app.use((req,res)=>{
//     console.log('New request :');
//     console.log('host :',req.hostname);
//     console.log('path :', req.path);
//     console.log('method :',req.method);
//     req.next();
// })

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/home',(req,res)=>{
    res.render('home');
})

app.use((req,res)=>{
    res.status(404).render('404');
})
// app.get('/',(req,res)=>{
//     res.sendFile('./views/index.html',{root: __dirname});
// })

// app.get('/about',(req,res)=>{
//     res.sendFile('./views/about.html',{root: __dirname});
// })

// app.get('/home',(req,res)=>{
//     res.sendFile('./views/home.html',{root: __dirname});
// })

// app.get('/homepage',(req,res)=>{
//     res.redirect('/home');
// })

// app.use((req,res)=>{
//     res.statusCode=404;
//     res.sendFile('./views/404.html',{root: __dirname});
// })

