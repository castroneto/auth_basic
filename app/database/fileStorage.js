const { readFile, writeFile } = require('fs/promises')

class FileStorage {
    constructor({ file }) {
        this.filePath = file
    }

    async _getFileContent() {
        return JSON.parse(await readFile(this.filePath))
    }
    
    async find({...data}) {
        const fileContent = await this._getFileContent();
        //  filtra comparando objetos
        return fileContent.filter((content) => {
            for (var key in data) {
                if (content[key] != data[key])
                  return false;
            }
            return true
        })
    }

    async findById(userId) {
        const fileContent = await this._getFileContent();
        if (!userId) return fileContent

        return fileContent.find(({ id }) => userId === id)
    }

    async create(data) {
        const fileContent = await this._getFileContent()
        fileContent.push({...data, id: fileContent.length + 1})

        await writeFile(this.filePath, JSON.stringify(fileContent))
        return data.id
    }

}

module.exports = FileStorage

/*
;
(async () => {
    var teste = new UserRepository({file: "../database/users.json"});
    await teste.create({nome: "raimundo"})

})()

*/