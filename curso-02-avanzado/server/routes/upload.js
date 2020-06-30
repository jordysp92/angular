var express = require('express');
var HttpStatus = require('http-status-codes');
var fileUpload = require('express-fileupload');

var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

// default options
app.use(fileUpload());

//Rutas
//Se actualizo por tipo y por id de usuario
app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    // tipos de colecciones validos
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            mensaje: ' Tipo de coleccion no es valida',
            errors: {
                message: 'Tipo de coleccion no es valida'
            }
        })
    }

    if (!req.files) {

        return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            mensaje: 'No selecciona ningun archivo',
            error: {
                message: 'Debe seleccionar una imagen'
            }
        })
    }

    //Obtener nombre archivo
    var archivo = req.files.imagen;
    var nombreCorto = archivo.name.split('.');
    var extensionArchivo = nombreCorto[nombreCorto.length - 1];

    // Extensiones validas
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            mensaje: 'Extension invalida',
            error: {
                message: 'Las extensiones validas son ' + extensionesValidas.join(',')
            }
        })
    }

    //Nombre archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    //Mover archivo del temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, error => {

        if (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                error
            })

        }

        subirPorTipo(tipo, id, nombreArchivo, res);

    })

});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {

            if(!usuario){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'No existe usuario',
                    errors: {
                        message: 'No existe usuario'
                    }
                });
            }

            var pathPrev = './uploads/usuarios/' + usuario.img;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathPrev)) {
                fs.unlinkSync(pathPrev);
            }
            usuario.img = nombreArchivo;

            usuario.save((error, usuarioActualizado) => {
                usuarioActualizado = usuarioActualizado.toObject();
                delete usuarioActualizado.password;
                if(error){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        mensaje: 'Error al actualizar imagen de usuario',
                        error
                    });
                }

                return res.status(HttpStatus.OK).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            });
        });
    }

    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {

            if(!medico){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'No existe medico',
                    errors: {
                        message: 'No existe medico'
                    }
                });
            }

            var pathPrev = './uploads/medicos/' + medico.img;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathPrev)) {
                fs.unlinkSync(pathPrev);
            }
            medico.img = nombreArchivo;
            medico.save((error, medicoActualizado) => {

                if(error){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        mensaje: 'Error al actualizar imagen de usuario',
                        error
                    });
                }

                return res.status(HttpStatus.OK).json({
                    ok: true,
                    mensaje: 'Imagen de medico actualizada',
                    medico: medicoActualizado
                });

            });
        });

    }

    if (tipo === 'hospitales') {
        Hospital.findById(id, (err, hospital) => {
            if(!hospital){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    mensaje: 'No existe hospital',
                    errors: {
                        message: 'No existe hospital'
                    }
                });
            }
            var pathPrev = './uploads/hospitales/' + hospital.img;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathPrev)) {
                fs.unlinkSync(pathPrev);
            }
            hospital.img = nombreArchivo;
            hospital.save((error, hospitalActualizado) => {

                if(error){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        mensaje: 'Error al actualizar imagen de usuario',
                        error
                    });
                }

                return res.status(HttpStatus.OK).json({
                    ok: true,
                    mensaje: 'Imagen de hospital actualizada',
                    hospital: hospitalActualizado
                });

            });
        });
    }
}

module.exports = app;