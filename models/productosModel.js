var pool = require ('./bd');

async function getProductos() {
    var query = 'select * from productos;';
    var rows = await pool.query(query);
    return rows;    
}

//Borrar productos

async function deleteProductosById(id) {
    var query = 'delete from productos where id = ?'
    var rows = await pool.query(query, [id]);
    return rows;
}

//Agregar productos

async function insertProductos(obj) {
    try {
        var query = 'insert into productos set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}

//Modificar productos

async function getProductosById(id) {
    var query = 'select * from productos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarProductosById(obj, id) {
try {
    var query = 'update productos set ? where id = ?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
} catch (error) {
    throw error;}
}

//Buscar Productos

async function buscarProductos(busqueda) {
    var query = "select * from productos where titulo like ? OR subtitulo like ? OR cuerpo like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%' , '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

module.exports = {getProductos, deleteProductosById, insertProductos, getProductosById, modificarProductosById, buscarProductos};