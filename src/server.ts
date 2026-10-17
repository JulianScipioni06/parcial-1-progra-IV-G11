import { makeApp } from './app';

const PORT = process.env.PORT || 3000;

// Llamamos a la fábrica de la app y la ponemos a escuchar
makeApp().listen(PORT, () => {
    console.log(`Cafetería Origen escuchando en http://localhost:${PORT}`);
});