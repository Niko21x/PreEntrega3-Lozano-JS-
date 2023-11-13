document.addEventListener('DOMContentLoaded', function () {
    const guitarrasElectricas = [
      { id: 1, marca: "Fender", modelo: "Stratocaster", precio: 1000, imagen: "./img/fender.png" },
      { id: 2, marca: "Gibson", modelo: "Les Paul", precio: 1500, imagen: "./img/gibson.png" },
      { id: 3, marca: "Ibanez", modelo: "RG550", precio: 800, imagen:"./img/ibanez.png" },
      { id: 4, marca: "ESP", modelo: "EC-1000", precio: 1200, imagen:"./img/esp.png" },

    ];
  
    const carrito = [];

    const guitarrasLista = document.getElementById('guitarras-lista');
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    const carritoBtn = document.getElementById('carrito-btn');
    const carritoDiv = document.getElementById('carrito');
    const cerrarCarritoBtn = document.getElementById('cerrar-carrito-btn');
    const cantidadCarritoSpan = document.getElementById('cantidad-carrito');
  
    function mostrarGuitarras() {
      guitarrasLista.innerHTML = "";
      guitarrasElectricas.forEach(guitarra => {
        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al Carrito';
        botonAgregar.addEventListener('click', () => agregarAlCarrito(guitarra));
  
        const divGuitarra = document.createElement('div');
        divGuitarra.classList.add('guitarra');
  
        const imagenGuitarra = document.createElement('img');
        imagenGuitarra.src = guitarra.imagen;
        divGuitarra.appendChild(imagenGuitarra);
  
        divGuitarra.innerHTML += `<p>${guitarra.marca} ${guitarra.modelo} - $${guitarra.precio}</p>`;
        divGuitarra.appendChild(botonAgregar);
  
        guitarrasLista.appendChild(divGuitarra);
      });
    }
  
    function agregarAlCarrito(guitarra) {
      carrito.push(guitarra);
      actualizarCarrito();
    }
  
    function actualizarCarrito() {
      carritoLista.innerHTML = "";
      let total = 0;
      carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.marca} ${item.modelo} - $${item.precio}`;
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
  
        listItem.appendChild(botonEliminar);
        carritoLista.appendChild(listItem);
        total += item.precio;
      });
      carritoTotal.textContent = total;
      cantidadCarritoSpan.textContent = carrito.length;
      guardarEnLocalStorage();
    }
  
    function eliminarDelCarrito(index) {
      const productoEliminado = carrito.splice(index, 1)[0];
      alert(`Has eliminado ${productoEliminado.marca} ${productoEliminado.modelo} del carrito.`);
      actualizarCarrito();
    }
  
    function guardarEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  
    function cargarDesdeLocalStorage() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito();
      }
    }
  
    mostrarGuitarras();
    cargarDesdeLocalStorage();
  
    carritoBtn.addEventListener('click', () => {
      carritoDiv.classList.toggle('oculto');
    });
  
    cerrarCarritoBtn.addEventListener('click', () => {
        console.log('Cerrando carrito...');
      carritoDiv.classList.add('oculto');
    });
  });
