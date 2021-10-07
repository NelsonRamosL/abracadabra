const express = require('express')
const app = express()

// 1. Crear un servidor con Express en el puerto 3000.
app.listen(3000, () => {
console.log('El servidor está inicializado en el puerto 3000')
})
usuarios = ["Juan","Jocelyn","Astrid","Maria","Ignacia","Javier","Brian"];
// 2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));

app.get("/", (req, res) => {
res.sendFile(__dirname + '/index.html')
})

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
app.get("/abracadabra/usuarios", (req, res) => {
res.send({usuarios});
})

/** 
4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado
en el servidor.
En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
devolver la imagen “who.jpeg”.
*/

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const user = req.params.usuario;
    let validar = usuarios.includes(user);
    validar ? next() : res.send('<img src="/who.jpeg" />');
    });

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.send("pasamos positivo")
    })

/** 
 * 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
número generado de forma aleatoria.

En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
imagen de Voldemort
 */

app.get("/abracadabra/conejo/:numero", (req, res) => {
    const n = Math.floor(Math.random() * (4 - 1)) + 2;
    const numero = req.params.numero;
    console.log(n);
    numero == n
    ? res.send('<img src="/conejito.jpg" />')
    : res.send('<img src="/voldemort.jpg" />');
    
    })





// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
app.get("*", (req, res) => {
        res.send("<center><h1>“Esta página no existe... </h1> </center>");
        });