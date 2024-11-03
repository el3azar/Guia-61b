var fila = "<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
var productos = null;
var orden = 0;

function codigoCat(catstr) {
  switch (catstr) {
    case "electronics": return "c1";
    case "jewelery": return "c2";
    case "men's clothing": return "c3";
    case "women's clothing": return "c4";
    default: return "null";
  }
}

function listarProductos(productos) {
  var precio = document.getElementById("price");
  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
  const productosFiltrados = productos.filter(producto => categoriasSeleccionadas.includes(codigoCat(producto.category)));

  if (orden === 1) ordenarAsc(productosFiltrados, "price");
  else if (orden === -1) ordenarDesc(productosFiltrados, "price");

  productosFiltrados.forEach((producto, index) => {
    tbody.innerHTML += fila;
    tbody.querySelectorAll(".id")[index].textContent = producto.id;
    tbody.querySelectorAll(".title")[index].textContent = producto.title;
    tbody.querySelectorAll(".description")[index].textContent = producto.description;
    tbody.querySelectorAll(".category")[index].textContent = producto.category;
    tbody.querySelectorAll(".price")[index].textContent = "$" + producto.price;
    tbody.querySelectorAll(".foto")[index].innerHTML = `<img src="${producto.image}" onclick="window.open('${producto.image}');">`;
  });

  document.getElementById("listado").style.display = "block";
  precio.textContent = orden === 1 ? "Precio Asc" : "Precio Desc";

  // Agregar datos "Guía #61b" y "RN22001" al listado
  document.querySelector(".container").insertAdjacentHTML('beforeend', `
    <p>Guía #61b</p>
    <p>RN22001</p>
  `);
}

function obtenerProductos() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      productos = data;
      listarProductos(data);
    });
}

function ordenarDesc(arr, key) {
  arr.sort((a, b) => b[key] - a[key]);
}

function ordenarAsc(arr, key) {
  arr.sort((a, b) => a[key] - b[key]);
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener("change", () => listarProductos(productos));
});
