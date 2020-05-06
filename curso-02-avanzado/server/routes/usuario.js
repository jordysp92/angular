var express = require('express');
var HttpStatus = require('http-status-codes');
var bcrypt = require('bcryptjs');

var mdAuth = require('../middlewares/autenticacion');


var Usuario = require('../models/usuario');


var app = express();

//Obtener todos los usuarios
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al obtener usuarios',
                error: err
            })
        }
        return res.status(HttpStatus.OK).json({
            ok: true,
            usuarios
        })
    })

});


//Actualizar usuario
app.put('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    var body = req.body;


    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                error: err
            })
        }
        if (!usuario) {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'El usuario de id ' + id + ' no existe',
                    errors: {
                        message: 'No existe un usuario con ese id'
                    }
                })
            }
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    error: err
                })
            }
            usuarioGuardado = usuarioGuardado.toObject();
            delete usuarioGuardado.password;

            return res.status(HttpStatus.OK).json({
                ok: true,
                usuarioGuardado
            })
        })


    })


})

//Crear nuevo usuario
app.post('/', mdAuth.verificaToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    })

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                error: err
            })
        }
        return res.status(HttpStatus.CREATED).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        })
    })


})

//Borrar usuario
app.delete('/:id', mdAuth.verificaToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                error: err
            })
        }
        if (!usuarioBorrado) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                ok: false,
                mensaje: 'No existe usuario con ese id',
                error: { message: 'No existe usuario con ese id' }
            })
        }

        usuarioBorrado = usuarioBorrado.toObject();
        delete usuarioBorrado.password;

        return res.status(HttpStatus.OK).json({
            ok: true,
            usuarioBorrado
        })
    })
})

module.exports = app;