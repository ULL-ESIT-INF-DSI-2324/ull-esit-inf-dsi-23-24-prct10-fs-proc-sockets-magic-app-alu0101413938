import fs from 'fs';
export class FileManager {
    static instance;
    constructor() {
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new FileManager();
        }
        return this.instance;
    }
    writeOnFile(filePath, card) {
        let refuse = false;
        // Permite crear el directorio si no existe
        const directory = `database/${filePath.toLocaleLowerCase()}`;
        const fullPath = `${directory}/${card.id}.json`;
        try {
            if (!fs.existsSync(directory))
                fs.mkdirSync(directory, { recursive: true });
            if (!fs.existsSync(fullPath)) {
                fs.writeFileSync(fullPath, JSON.stringify(card, null, 2));
            }
            else {
                refuse = true;
            }
        }
        catch (err) {
            refuse = true;
            console.error(`Error al escribir datos en el archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
        }
        return refuse;
    }
    removeFromFile(filePath, idToRemove, callback) {
        let refuse = false;
        const directory = `database/${filePath.toLocaleLowerCase()}`;
        const fullPath = `${directory}/${idToRemove}.json`;
        fs.unlink(fullPath, (err) => {
            if (err) {
                refuse = true;
                console.error(`Error al eliminar cartas coincidentes del archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
            }
            callback(refuse);
        });
    }
}
