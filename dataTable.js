let dataTable;
let dataTableIsInitilized = false;


const dataTableOptions = {
    scrollX: "2000px",
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [5, 6] },
        //{ width: "50%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar MENU registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de START a END de un total de TOTAL registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde MAX registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};







const initDataTable = async() =>{

    if(dataTableIsInitilized) {
        dataTable.destroy(); //destroy destruye una tabla si fue ya inicializada


    }
await listarUsuarios();


dataTable =$("#datatable_users").DataTable(dataTableOptions);
dataTableIsInitilized =true;

};





const listarUsuarios = async () => {


try{
const respuesta =await fetch (
    "https://jsonplaceholder.typicode.com/users"
);
const users =await respuesta.json();
//console.log(users);


let content = ""; //acumulara el html de cada fila

users.forEach((user, index) => {
content +=`

    <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
        <td><i class="bi bi-check-lg" style="color: green;"></i></td>
        <td><i class="bi bi-pencil-square" style="color: blue;"></i><i class="bi bi-trash-fill" style="color: red;"></i></td>
    </tr>`
     
});

tableBody_users.innerHTML = content;

} catch (error){
alert("error al cargar los datos");
}

};

window.addEventListener("load",initDataTable);