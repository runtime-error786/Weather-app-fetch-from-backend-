let http = require('http');
let fs = require("fs");
var requests = require('requests');
let home = fs.readFileSync("index.html","utf-8");

let pop =(city,coun,temp,min,max)=>{
    home = home.replace("{%city%}",city);
    home = home.replace("{%temp%}",temp);
    home = home.replace("{%coun%}",coun);
    home = home.replace("{%max%}",max);
    home = home.replace("{%min%}",min);
}
let server = http.createServer((req,res)=>{
   if(req.url=="/")
   {
        requests('https://api.openweathermap.org/data/2.5/weather?q=lahore&units=metric&appid=cf2c348512586c45e376b52d471c845d')
        .on('data', function (chunk) {
        let r1 = JSON.parse(chunk);
        pop(r1.name,r1.sys.country,r1.main.temp,r1.main.temp_min,r1.main.temp_max);
        res.write(home);
        console.log(home);
    })
        .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
    });
   }
});
server.listen(9000,"127.0.0.1");

