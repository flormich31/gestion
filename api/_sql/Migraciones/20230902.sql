use gestion;
desc productos;

-- añadimos la columna Codigo
Alter table productos add column Codigo varchar (255);

-- modifica la columna Detalle permitiendo guardar hasta 255 caracteres
ALTER TABLE `gestion`.`productos` 
CHANGE COLUMN `Detalle` `Detalle` VARCHAR(255) NOT NULL ;


-- añadir la columna fecha creación
alter table gestion.productos add column FechaCreacion datetime null after Observacion;
-- añadir la columna fecha modificación
alter table gestion.productos add column FechaModificacion datetime null after FechaCreacion;
-- establecer como fecha de creación la fecha actual para todos los productos que no tengan fecha de creación
update gestion.productos set FechaCreacion=now() where FechaCreacion is null;

-- añade una nueva columna con los valores dinámicos de otras dos columnas, optimizado para búsquedas
alter table gestion.productos add column Busqueda TEXT AS (CONCAT( COALESCE(Codigo,''), ' ', COALESCE(Detalle,'') )) STORED;