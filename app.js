"use strict"

/* -----------------------------------------------------
EXPRESSJS
--------------------------------------------------------*/

//! DOSYA OLUSTURMA 

// npm init -y
// npm i express dotenv

const express = require("express")      // express frameworku express degiskenine atadik - FRAMEWORK
const app = express()                   // nodejs de ki creeateServer yazmak komutu gibi dusunulebilir - run application on express --SERVER


/*  ENV dosyasini okumak icin; */

require("dotenv").config()    //.env dosyasina eristik       
// console.log(process.env);     // .env verilerini yazdirdik 

const PORT = process.env?.PORT ?? 8000      // Buyuk harfle yazma sebebimiz benden sonra gelecek yazilimciya buna dokunma demek
// console.log(PORT);

const HOST =  process.env?.HOST ?? '127.0.0.1' 
// console.log(HOST);


/* -----------------------------------------------------*

! EXPRESSJS CRUD KOMUTLARINI KULLANMA

app.get('/', (request, response)=>{       // ilk parametre hangi url ye geldigini gosterir ve ikinci parametre o url e gelindiginde uygulanacak parametreyi gosterir = getm etodu ile bu url ye istek gelirse akabindeki callback func calissin
response.send('Welcome to Express')  // -- header => content type "string-text"
response.send({message:'Called in "get" method'})   // -- header => content type "JSON"    
} )  

app.post('/', (request, response) => response.send({ message: "called in 'post' method."}))
app.put('/', (request, response) => response.send({ message: "called in 'put' method."}))
app.delete('/', (request, response) => response.send({ message: "called in 'delete' method."}))

? To allow all methods simultaneously

 app.all('/', (request, response) => response.send({ message: "'all' option allows to all methods."}))  //! Mumkun mertebe kullanmayin


/* -----------------------------------------------------*

! app.route('url') KULLANIMI  // ustteki kullanimin daha yaygin yolu / once route tanimlanir sonra istedigin kadar method yazilabilir
app.route('/')
.get((req, res)=>res.send('get methoduna cevaben- route yapisi'))
.post((req, res)=>res.send('post methoduna cevaben- route yapisi'))
.put((req, res)=>res.send('put methoduna cevaben- route yapisi'))
.delete((req, res)=>res.send('delete methoduna cevaben- route yapisi'))

/* -----------------------------------------------------*/
//! URL(Path) Options
// app.get('/', (req, res)=>res.send('in "root" path'))
// app.get('/path', (req, res)=>res.send('in "path"'))

/* -----------------------------------------------------*

! express-urls supported JokerChar;
app.get('/abc(x?)123', (req, res)=>res.send('in abc(x?)123')) // ? isareti saysesidne url de ki x olsada olmasada calisir/x olacak ya da olmayacak /parantezi yazmasanda olur, sadece anlasilabilir olmasi icin yazdik

app.get('/abc(*)123', (req, res)=>res.send('in abc(*)123'))  // * sayesinde araya kac karakter girerse girsin cikti aliriz
app.get('/abc(x+)123', (req, res) => res.send("in 'abc(x+)123'")) // abcx123 or abcxx..xx123 // en az bir tane x ya da istedigin kadar x yazabilirsin
app.get('/abc*123', (req, res) => res.send("in 'abc*123'")) // abc123 or abc...123 // abc(ANY)123
/* -----------------------------------------------------*

! express-urls supported regexp:

app.get(/xyz/, (req, res) => res.send("regexp /xyz/")) // url contains = 'xyz' (no limit for subPaths)
app.get(/^\/xyz/, (req, res) => res.send("regexp /^\/xyz/")) // url startswith = 'xyz'
app.get(/xyz$/, (req, res) => res.send("regexp /xyz$/")) // url endswith = 'xyz'

/* -----------------------------------------------------*

//! URL Parameters (req.params)

//* Ornek 1

/user/98/config/update/any/any
paramsda hangi isimle yakalayacaksan o ismi dinamik kisma verdik - ikinic path de userI ve 4. parametrede configParam gelecek
app.get('/user/:userId/config/:configParam/*', (req, res)=>{    
    res.send({
                userId: req.params.userId,
                configParam: req.params.configParam,
                url: {
                    protocol: req.protocol,
                    subdomains: req.subdomains,
                    hostname: req.hostname,
                    baseUrl: req.baseUrl,
                    params: req.params,
                    query: req.query,
                    path: req.path,
                    originalUrls: req.originalUrl
                }
            })
        })

//* Ornek 2

 //? '\d' means only-digit-chars in regexp:
 //? '\w' means only-chars in regexp:
//  app.get('/user/:userId([0-9]+)', (req, res) => {   //0 dan 9 a kadar olan sayilardan kac hane olursa olsun
app.get('/user/:userId(\\d+)', (req, res) => {   // sadece sayi-istedigi kadar hane girebilir
    res.send({
        params: req.params
    })
})

//* Ornek 3

app.get('/command/:userId-:profileId', (req, res) => {  // yani : isaretini kulanmamiz icin oncesinde / koymamiza gerek yok
    res.send({
        params: req.params
    })
})

/* -----------------------------------------------------*/





/* -----------------------------------------------------*
        ! Response Methods */
/* -----------------------------------------------------*/


// ? SendStatus:
// app.get('/', (req, res) => res.sendStatus(404))
// ? Status:
// app.get('/', (req, res) => res.status(200).send({ message: 'OK' }))
// app.post('/', (req, res) => res.status(201).send({ message: 'Created' }))
// app.put('/', (req, res) => res.status(202).send({ message: 'Accepted' }))
// app.delete('/', (req, res) => res.status(204).send({ message: 'No Content' }))
// ? JSON (.send() method already does this converting.)
// app.get('/', (req, res) => res.json([{ key: 'value' }]))
// ? Download File (Download at browser):
// app.get('/download', (req, res) => res.download('./app.js', 'changedName.js'))  //! Sayfa ya da dosyayi download ettirir
// ? SendFile Content:
// console.log( __dirname )
// app.get('/file', (req, res) => res.sendFile(__dirname + '/app.js')) // FilePath must be realPath  //! dirname dosyanin fiziksel yolunu gosteren ozel bir komuttur
// ? Redirect:
// app.get('/google', (req, res) => res.redirect(301, 'https://www.google.com')) // 301 or 302
// app.get('/redirect', (req, res) => res.redirect(302, '/thisPath')) // 301 or 302



/* -----------------------------------------------------*/

//!app.listener()
// app.listen(PORT, ()=>console.log(`Running on http://127.0.0.1:${PORT}`))     //Ousturdugumuz serveri acmamiza yarar
app.listen(PORT, HOST, ()=>console.log(`Running on http:''${HOST}:${PORT}`))     //Ousturdugumuz serveri acmamiza yarar

