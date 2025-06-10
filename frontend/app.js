const API_URL = "http://localhost:5000/vehiculos";

// Cargar la lista de vehículos al cargar la página
document.addEventListener("DOMContentLoaded", cargarVehiculos);

function cargarVehiculos() {
    fetch("http://localhost:5000/vehiculos")
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("vehiculos-table");
            tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
            data.forEach(vehiculo => {
                const fila = `
                    <tr>
                        <td>${vehiculo.id}</td>
                        <td>${vehiculo.marca}</td>
                        <td>${vehiculo.modelo}</td>
                        <td>${vehiculo.anio}</td>
                        <td>${vehiculo.kilometraje}</td>
                        <td>${vehiculo.precio} €</td>
                        <td>${vehiculo.tipo}</td>
                        <td>
                            <button onclick="editarVehiculo(${vehiculo.id})">✏</button>
                            <button onclick="eliminarVehiculo(${vehiculo.id})">❌</button>
                        </td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error("❌ Error al cargar vehículos:", error));
}


// Función para agregar o actualizar un vehículo
document.getElementById("vehiculo-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const id = document.getElementById("submit-button").getAttribute("data-id");
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const anio = document.getElementById("anio").value;
    const precio = document.getElementById("precio").value;
    const kilometraje = document.getElementById("kilometraje").value;
    const tipo = document.getElementById("tipo").value;

    const vehiculoData = {
        marca,
        modelo,
        anio: parseInt(anio),
        precio: parseFloat(precio),
        kilometraje: parseInt(kilometraje),
        tipo
    };

    if (id) {
        // Si hay un ID, se está actualizando el vehículo
        console.log("🔄 Actualizando vehículo:", vehiculoData);
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehiculoData)
        })
        .then(response => response.json())
        .then(() => {
            console.log("✅ Vehículo actualizado correctamente.");
            cargarVehiculos();
            limpiarFormulario();
        })
        .catch(error => console.error("❌ Error al actualizar vehículo:", error));
    } else {
        // Si no hay ID, se está creando un nuevo vehículo
        console.log("➕ Agregando nuevo vehículo:", vehiculoData);
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehiculoData)
        })
        .then(response => response.json())
        .then(() => {
            console.log("✅ Vehículo agregado correctamente.");
            cargarVehiculos();
            limpiarFormulario();
        })
        .catch(error => console.error("❌ Error al agregar vehículo:", error));
    }
});

// Función para eliminar un vehículo
function eliminarVehiculo(id) {
    console.log(`🗑 Eliminando vehículo con ID: ${id}`);

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("❌ Error al eliminar el vehículo");
        }
        return response.json();
    })
    .then(() => {
        console.log("✅ Vehículo eliminado correctamente.");
        cargarVehiculos(); // Recargar la tabla después de eliminar
    })
    .catch(error => console.error(error));
}

// Función para editar un vehículo
function editarVehiculo(id) {
    console.log(`✏ Editando vehículo con ID: ${id}`);

    // Obtener los datos del vehículo seleccionado
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(vehiculo => {
            // Llenar el formulario con los datos actuales del vehículo
            document.getElementById("marca").value = vehiculo.marca;
            document.getElementById("modelo").value = vehiculo.modelo;
            document.getElementById("anio").value = vehiculo.anio;
            document.getElementById("precio").value = vehiculo.precio;
            document.getElementById("kilometraje").value = vehiculo.kilometraje;
            document.getElementById("tipo").value = vehiculo.tipo;

            // Cambiar el botón de agregar a "Actualizar"
            document.getElementById("submit-button").textContent = "Actualizar Vehículo";
            document.getElementById("submit-button").setAttribute("data-id", id);
        })
        .catch(error => console.error("❌ Error al obtener vehículo:", error));
}

// Función para limpiar el formulario y resetear el botón
function limpiarFormulario() {
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("kilometraje").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("submit-button").textContent = "Agregar Vehículo";
    document.getElementById("submit-button").removeAttribute("data-id");
}
