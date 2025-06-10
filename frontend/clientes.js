const API_URL = "http://localhost:5000/clientes";

// Cargar la lista de clientes al cargar la página
document.addEventListener("DOMContentLoaded", cargarClientes);

// Función para obtener y mostrar los clientes
function cargarClientes() {
    fetch("http://localhost:5000/clientes")
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("clientes-table");
            tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
            data.forEach(cliente => {
                const fila = `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefono}</td>
                        <td>${cliente.direccion}</td>
                        <td>
                            <button onclick="editarCliente(${cliente.id})">✏</button> <!-- ✅ Ahora sí llama la función -->
                            <button onclick="eliminarCliente(${cliente.id})">❌</button>
                        </td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error("❌ Error al cargar clientes:", error));
}



// Función para agregar un cliente
document.getElementById("cliente-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const id = document.getElementById("submit-button").getAttribute("data-id");
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    const clienteData = { nombre, apellido, email, telefono, direccion };

    if (id) {
        // Si hay un ID, se está actualizando el cliente
        console.log("🔄 Actualizando cliente:", clienteData);
        fetch(`http://localhost:5000/clientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(() => {
            console.log("✅ Cliente actualizado correctamente.");
            cargarClientes();
            limpiarFormulario();
        })
        .catch(error => console.error("❌ Error al actualizar cliente:", error));
    } else {
        // Si no hay ID, se está creando un nuevo cliente
        console.log("➕ Agregando nuevo cliente:", clienteData);
        fetch("http://localhost:5000/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(() => {
            console.log("✅ Cliente agregado correctamente.");
            cargarClientes();
            limpiarFormulario();
        })
        .catch(error => console.error("❌ Error al agregar cliente:", error));
    }
});


// Función para limpiar el formulario y resetear el botón
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = ""; // ✅ Limpiar apellido
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("submit-button").textContent = "Agregar Cliente";
    document.getElementById("submit-button").removeAttribute("data-id");
}


// Función para eliminar un cliente
function eliminarCliente(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        console.log("Cliente eliminado");
        cargarClientes(); // Recargar la lista después de eliminar
    })
    .catch(error => console.error("Error al eliminar cliente:", error));
}

function editarCliente(id) {
    console.log(`✏ Editando cliente con ID: ${id}`);

    // Obtener los datos del cliente seleccionado
    fetch(`http://localhost:5000/clientes/${id}`)
        .then(response => response.json())
        .then(cliente => {
            // Llenar el formulario con los datos actuales del cliente
            document.getElementById("nombre").value = cliente.nombre;
            document.getElementById("apellido").value = cliente.apellido;
            document.getElementById("email").value = cliente.email;
            document.getElementById("telefono").value = cliente.telefono;
            document.getElementById("direccion").value = cliente.direccion;

            // Cambiar el botón de agregar a "Actualizar"
            document.getElementById("submit-button").textContent = "Actualizar Cliente";
            document.getElementById("submit-button").setAttribute("data-id", id);
        })
        .catch(error => console.error("❌ Error al obtener cliente:", error));
}
