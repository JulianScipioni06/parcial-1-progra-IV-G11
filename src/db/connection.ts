import Database from 'better-sqlite3';

export function createDb(path: string = ':memory:'): Database.Database {
    const db = new Database(path);

    db.pragma('foreign_keys = ON');

    // Creamos las 3 tablas clave para resolver el parcial
    db.exec(`
        CREATE TABLE IF NOT EXISTS productos (
        id TEXT PRIMARY KEY,
        tipo TEXT NOT NULL,      -- 'Expreso', 'Filtrado' o 'Pasteleria'
        nombre TEXT NOT NULL,
        precioBase REAL NOT NULL,
        tamanio TEXT,            -- 'Pocillo', 'Mediano', 'Taza grande' (NULL para pastelería)
        gramos INTEGER,          -- 18, 27, 36, etc. (NULL para pastelería)
        variedad TEXT            -- 'Brasil', 'Colombia', 'Etiopía' (NULL para pastelería)
        );

        CREATE TABLE IF NOT EXISTS pedidos (
        id TEXT PRIMARY KEY,
        estado TEXT NOT NULL DEFAULT 'Pendiente'
        );

        CREATE TABLE IF NOT EXISTS pedido_items (
        pedido_id TEXT NOT NULL,
        producto_id TEXT NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY(pedido_id) REFERENCES pedidos(id),
        FOREIGN KEY(producto_id) REFERENCES productos(id)
        );
    `);

    return db;
}

export function seedDb(db: Database.Database) {
    // Verificamos si la base ya tiene productos para no duplicarlos si el server se reinicia
    const stmt = db.prepare('SELECT count(*) as count FROM productos');
    const row = stmt.get() as { count: number };
    if (row.count > 0) return;

    const insert = db.prepare(`
        INSERT INTO productos (id, tipo, nombre, precioBase, tamanio, gramos, variedad)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Usamos una transacción para insertar todo de una y que sea seguro
    const transaction = db.transaction(() => {
        // ---------------- PASTELERÍA ----------------
        // El precio base es 2500 y 4200 respectivamente
        insert.run('1', 'Pasteleria', 'Muffin de chocolate', 2500, null, null, null);
        insert.run('2', 'Pasteleria', 'Torta selva negra', 4200, null, null, null);

        // ---------------- EXPRESOS ----------------
        // Todos los expresos tienen precioBase de 2500
        insert.run('3', 'Expreso', 'Expreso Pocillo Brasil', 2500, 'Pocillo', 18, 'Brasil');
        insert.run('4', 'Expreso', 'Expreso Pocillo Colombia', 2500, 'Pocillo', 18, 'Colombia');
        insert.run('5', 'Expreso', 'Expreso Pocillo Etiopía', 2500, 'Pocillo', 18, 'Etiopía');
        insert.run('6', 'Expreso', 'Expreso Mediano Brasil', 2500, 'Mediano', 27, 'Brasil');

        // ---------------- FILTRADOS ----------------
        // Todos los filtrados tienen precioBase de 3200
        insert.run('7', 'Filtrado', 'Filtrado Pocillo Brasil', 3200, 'Pocillo', 6, 'Brasil');
        insert.run('8', 'Filtrado', 'Filtrado Mediano Colombia', 3200, 'Mediano', 15, 'Colombia');
        insert.run('9', 'Filtrado', 'Filtrado Taza grande Etiopía', 3200, 'Taza grande', 25, 'Etiopía');
    });

    transaction();
}