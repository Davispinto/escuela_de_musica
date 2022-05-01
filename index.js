const { Pool } = require('pg');
const argumento = process.argv.slice(2);
const opcion = argumento[0];
const arg1 = argumento[1];
const arg2 = argumento[2];
const arg3 = argumento[3];
const arg4 = argumento[4];

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'music',
  password: 'graficas014',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};
const pool = new Pool(config);

// create database music;
// \c music;

// CREATE TABLE estudiante (

//     nombre varchar(20) NOT NULL,
//     rut varchar(20) PRIMARY KEY,
//     curso varchar(20) NOT NULL,
//     nivel varchar(20) NOT NULL
//     );

//req 2
if (opcion == 'nuevo') {
  async function nuevoEstudiante() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) {
        return console.log(error_conexion.code);
      }
      try {
        const objJSON_SQLQUERY = {
          name: 'nuevo',
          rowMode: 'array',
          text: 'insert into estudiante (nombre, rut, curso, nivel) values ($1,$2,$3,$4) RETURNING *;',
          values: [arg1, arg2, arg3, arg4],
        };
        const res = await client.query(objJSON_SQLQUERY);
        console.log(res.rows);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }
      release();
      pool.end();
    });
  }
  nuevoEstudiante();
}

if (opcion == 'rut') {
  async function consultaRut() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) {
        return console.log(error_conexion.code);
      }
      try {
        const objJSON_SQLQUERY = {
          name: 'consultaRut',
          rowMode: 'array',
          text: 'select * from estudiante where rut = $1;',
          values: [arg1],
        };
        const res = await client.query(objJSON_SQLQUERY);
        console.log(res.rows);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }
      release();
      pool.end();
    });
  }
  consultaRut();
}

if (opcion == 'consulta') {
  async function consultaTotal() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) {
        return console.log(error_conexion.code);
      }
      try {
        const objJSON_SQLQUERY = {
          name: 'consulta',
          rowMode: 'array',
          text: 'select * from estudiante',
        };
        const res = await client.query(objJSON_SQLQUERY);
        console.log(res.rows);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }
      const objJSON_SQLQUERY = {
        name: 'consulta',
        rowMode: 'array',
        text: 'select * from estudiante',
      };
      release();
      pool.end();
    });
  }
  consultaTotal();
}

if (opcion == 'editar') {
  async function editarDatos() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) {
        return console.log(error_conexion.code);
      }
      try {
        const objJSON_SQLQUERY = {
          name: 'editar',
          rowMode: 'array',
          text: 'update estudiante set rut = $2, curso = $3, nivel = $4 where nombre = $1  RETURNING *;',
          values: [arg1, arg2, arg3, arg4],
        };
        const res = await client.query(objJSON_SQLQUERY);
        console.log(`estudiante ${arg1} editado con exito`);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }
      release();
      pool.end();
    });
  }
  editarDatos();
}

if (opcion == 'eliminar') {
  async function eliminarDatos() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) {
        return console.log(error_conexion.code);
      }
      try {
        const objJSON_SQLQUERY = {
          name: 'eliminar',
          rowMode: 'array',
          text: 'delete from estudiante where rut = $1',
          values: [arg1],
        };
        const res = await client.query(objJSON_SQLQUERY);
        console.log(`estudiante ${arg1} eliminado con exito`);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }
      release();
      pool.end();
    });
  }
  eliminarDatos();
}