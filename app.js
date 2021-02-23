// Requiring the module
const reader = require('xlsx')
const fs = require('fs');

// Reading our test file

const file      = reader.readFile('./xlsx/carrefour2021.xlsx');
const jsonFile  = require('./json/carrefour.json');

// Set data in object

let data = []

const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

temp.forEach((res) => {
    data.push(res)
})

// Printing data

if(data.length != 0 && typeof data === "object") {
    for (let i = 0; i < data.length; i++) {
        let elemSheet = data[i];

        let adresse     = elemSheet.Adresse;
        let commune     = elemSheet.Commune;
        let codeMagasin = elemSheet['Code magasin'];
        let typeMagasin = elemSheet['Type magasin'];
        let idBSA       = elemSheet['ID BSA'];

        // console.log(adresse + " " + commune + " " + codeMagasin + " " + typeMagasin + " " + idBSA);

        let findElem = jsonFile.find(elem => elem.id_bsa == idBSA);

        if(findElem === undefined) {
            jsonFile.push({
                adresse: adresse,
                commune: commune,
                code_magasin: codeMagasin,
                type_magasin: typeMagasin,
                id_bsa: idBSA
            })
        }
    }

    fs.writeFileSync('extract/carrefour-' + new Date().getTime() + '.json', JSON.stringify(jsonFile));

    console.log(jsonFile[jsonFile.length - 1]);
}

