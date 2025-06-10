const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

router.post('/', vehiculoController.crearVehiculo);
router.get('/', vehiculoController.obtenerVehiculos);
router.get('/:id', vehiculoController.obtenerVehiculoPorId);
router.put('/:id', vehiculoController.actualizarVehiculo);
router.delete('/:id', vehiculoController.eliminarVehiculo);

module.exports = router;
