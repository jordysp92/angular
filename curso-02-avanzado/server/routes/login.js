var express = require('express');
var HttpStatus = require('http-status-codes');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var Usuario = require('../models/usuario');

var app = express();

//Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/*************************************
**********Autenticacion google*********
*********************************** */
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
    }
}

app.post('/google', async (req, res) => {

    var token = req.body.token;
    var googleUser = await verify(token).catch(e => {
        return res.status(HttpStatus.FORBIDDEN).json({
            ok: false,
            mensaje: 'Token invalido'
        })
    });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error buscar usuario',
                errors: err
            })
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'Debe usar la autenticacion normal'
                });
            } else {
                //Crear token aca
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 })

                usuarioDB = usuarioDB.toObject();
                delete usuarioDB.password;

                return res.status(HttpStatus.OK).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            }
        }else{
            //El usuario no existe, se crea
            var usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)'

            usuario.save( (err, usuarioDB) =>{

                if(err){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        mensaje: 'No se pudo guardar el usuario',
                        error: err
                    });
                }

                console.log("Usuario db: ", usuarioDB);

                //Crear token aca
                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 })

                usuarioDB = usuarioDB.toObject();
                delete usuarioDB.password;

                return res.status(HttpStatus.OK).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            });

        }
    })

})

/*************************************
**********Autenticacion normal*********
*********************************** */
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error buscar usuario',
                errors: err
            })
        }

        if (!usuarioDB) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -email',
                errors: err
            })

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -password',
                errors: err
            })

        }

        //Crear token aca
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 })

        usuarioDB = usuarioDB.toObject();
        delete usuarioDB.password;

        return res.status(HttpStatus.OK).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        })
    })

})

module.exports = app;