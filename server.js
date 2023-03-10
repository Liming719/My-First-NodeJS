const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const greet = _.once(()=>{
    console.log("Hello Server！");
})
const server = http.createServer((req,res)=>{

    greet();

    let path = req.url;
    if(path=='/')
        path = '/index';
    else if(path == '/homepage'){
        res.statusCode = 301;
        res.setHeader('Location','/home');
        res.end()
        return;
    }
    else if(path == '/about-me'){
        res.statusCode = 301;
        res.setHeader('Location','/about');
        res.end()
        return;
    }

    // fs.readFile(`./views${path}.html`,(err,data)=>{
    //     if(err){
    //         PageNotFound(res);
    //     }
    //     else{
    //         res.setHeader('Content-Type','text/html');
    //         //res.write(data);
    //         res.end(data);
    //     }
    // })
    res.setHeader('Content-Type','text/html');
    var readStream = fs.createReadStream(`./views/html${path}.html`);
    readStream.pipe(res);
    readStream.on('error', ()=>{
        res.statusCode = 404;
        console.log('open Stream failed');
        PageNotFound(res);
    });
})

server.listen(8080,'localhost',() => {
    console.log("server start listen on localhost");
})

function PageNotFound(res){
    console.log('read 404 page');
    fs.readFile('./views/html/404.html',(err,data)=>{        
        if(err){
            PageNotFound(res);
        }
        else{
            console.log('read 404 page complete');
            //res.setHeader('Content-Type','text/html');
            res.write(data);
            res.end();
        }
    })
}

function OpenStramOnHtml(path,res){    
    var readStream = fs.createReadStream(`./views/html${path}.html`);
    readStream.pipe(res);
    readStream.on('error', ()=>{
        res.statusCode = 404;
        console.log('open Stream failed');
        PageNotFound(res);
    });
    // readStream.on('data', (data) => {
    //     console.log('open Stream success');
    //     res.write(data);
    // });
    // readStream.on('close', () =>{
    //     console.log('Stream closed');
    //     res.end();
    // } );
}
