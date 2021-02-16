CREATE TABLE Avion(
    id_avion BIGINT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    salud INTEGER NOT NULL,
    danio INTEGER NOT NULL,
    velocidad INTEGER NOT NULL,
    combustible INTEGER NOT NULL,
    altitud VARCHAR(50) NOT NULL,
    posicionX INTEGER NOT NULL,
    posicionY INTEGER
);