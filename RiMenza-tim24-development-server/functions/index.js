//stvari koje su uvijek tu
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var models = require('./models.js')

var admin = require("firebase-admin");
var serviceAccount = require("C:/RiMenza-tim24-development/RiMenza-tim24-development-server/functions/rimenza-tim24-firebase-adminsdk-m9807-eeb45d1446");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//sortiranje desert silazno
app.get('/desert', (request, response) => {
    let res = []
    if (typeof request.query.id === 'undefined') {
        var cRef = db.collection('desert').orderBy('kalorije')
        cRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    res.push(document)
                })
                return response.send(res)
            })
            .catch(function (error) {
                return response.send(
                    "Error getting documents: " + error
                )
            })
    } else {
        var docRef =
            db.collection('desert').doc(request.query.id)
        docRef.get()
            .then((doc) => {
                if (typeof doc.data() !== 'undefined') {
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    return response.send(document)
                } else {
                    return response.send(
                        "Error getting document " +
                        request.query.id +
                        ": The document is undefined"
                    )
                }
            })
            .catch(function (error) {
                return response.send(
                    "Error getting document " +
                    request.query.id +
                    ": " + error
                )
            })
    }
})

//filtriranje glavnih jela po imenu "Pileći file"
app.get('/glavnoJelo', (request, response) => {
    let res = []
    if (typeof request.query.id === 'undefined') {
        var cRef = db.collection('glavnoJelo').where('ime', '==', 'Pileći file')
        cRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    res.push(document)
                })
                return response.send(res)
            })
            .catch(function (error) {
                return response.send(
                    "Error getting documents: " + error
                )
            })
    } else {
        var docRef =
            db.collection('glavnoJelo').doc(request.query.id)
        docRef.get()
            .then((doc) => {
                if (typeof doc.data() !== 'undefined') {
                    let document = {
                        id: doc.id,
                        data: doc.data()
                    }
                    return response.send(document)
                } else {
                    return response.send(
                        "Error getting document " +
                        request.query.id +
                        ": The document is undefined"
                    )
                }
            })
            .catch(function (error) {
                return response.send(
                    "Error getting document " +
                    request.query.id +
                    ": " + error
                )
            })
    }
})

//dodavanje
app.post('/pice', (request, response) => {
    const { ime, kalorije, proteini, ugljikohidrati, masti } = request.query;
    db.collection('pice').doc().set({
        ime: ime,
        kalorije: kalorije,
        proteini: proteini,
        ugljikohidrati: ugljikohidrati,
        masti: masti
    })
        .then(function () {
            return response.send('Pice uspjesno dodano.');
        })
        .catch(function (error) {
            return response.status(500).send("Error writing document: " + error);
        })
});

//brisanje
app.delete('/pice', (request, response) => {
    if (typeof request.query.id !== 'undefined') {
        db.collection('pice').doc(request.query.id).delete()
            .then(function () {
                return response.send('Pice uspjesno uklonjeno.');
            })
            .catch(function (error) {
                return response.status(500).send("Error deleting document: " + error);
            })
    } else {
        return response.send(
            "A parameter id is not set. " +
            "A document is not deleted!"
        )
    }

});

//update
app.put('/pice', (request, response) => {
    const { ime, kalorije, proteini, ugljikohidrati, masti } = request.query;
    db.collection('pice').doc().update({
        ime: ime,
        kalorije: kalorije,
        proteini: proteini,
        ugljikohidrati: ugljikohidrati,
        masti: masti
    })
        .then(function () {
            return response.send('Pice uspjesno promijenjeno.');
        })
        .catch(function (error) {
            return response.status(500).send("Error writing document: " + error);
        })
});


//stvari koje su uvijek tu
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
