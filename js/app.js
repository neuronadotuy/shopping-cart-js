/** @format */

// Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

eventListeners();
function eventListeners() {
  // Agregar curso cuando se de click en btn "agregar al carrito" de cada curso
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Se resetea el arreglo
    limpiarHTML();
  });
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
  }

  carritoHTML(); // Iterar sbre el carrito y mostrar su HTML
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement; // selecciona el div "card"
    leerDatosCurso(cursoSeleccionado);
  }
}
// Leer el contenido del HTML y extrae la info

function leerDatosCurso(curso) {
  //   console.log(curso);

  // Crear un Objetc con el contenido del curso seleccionado
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    autor: curso.querySelector("p").textContent,
    // precio: curso.querySelector("p.precio").textContent,
    preciodto: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // Actualiamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los objetos que no son duplicados
      }
    });

    articulosCarrito = [...cursos];
  } else {
    // Agregar celementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpia el HTML para que articulosCarrito NO triga duplicado los cursos anteriores // clase 177 //
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, preciodto, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `

    <td><img src="${imagen}" width="100px"</td>
    <td>${titulo}</td>
    <td>${preciodto}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}">x</a></td>

    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Limpiar el HTML para evitar cursos duplicados
function limpiarHTML() {
  //Forma lenta
  //   contenedorCarrito.innerHTML = "";

  // while se ejecuta mientras una condición sea evaluada como verdadera
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
