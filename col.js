const { Collection, Item, Header } = require('postman-collection');
const fs = require('fs');


const postmanCollection = new Collection({
    info: {
        name: 'Dokumentasi Api Challenge Chapter 5 - Achmad Fadilla'
    },
    item: []
});

//tidak membutuhkan autentifikasi
const api = {
 apiEndpointDaftarUser: 'http://localhost:3000/auth/daftar',
 apiEndpointGetAllUser: 'http://localhost:3000/auth/user',
 apiEndpointHapusUser: 'http://localhost:3000/auth/hapus/:id',
 apiEndpointLoginUser: 'http://localhost:3000/auth/masuk',
 apiEndpointGetUserById: 'http://localhost:3000/auth/detil/:id',
 apiEndpointGetAllUserBiodata: 'http://localhost:3000/auth/tampilBiodataAll',
 apiEndpointGetAllUserGame: 'http://localhost:3000/auth/tampilSeluruhGame'
}

//membutuhkan autentifikasi
const auth = {
 apiEndpointAkunSaya: 'http://localhost:3000/auth/akun',
 apiEndpointGantiPassword: 'http://localhost:3000/auth/ganti-password',
 apiEndpointIsiBiodata: 'http://localhost:3000/auth/akun/isibiodata',
 apiEndpointHapusBiodata: 'http://localhost:3000/auth/akun/hapusBiodata',
 apiEndpointBiodataAkun: 'http://localhost:3000/auth/akun/tampilBiodata',
 apiEndpointUpdateBiodata: 'http://localhost:3000/auth/akun/ganti-biodata',
 apiEndpointIsiHistoriGameUser: 'http://localhost:3000/auth/akun/isiGame',
 apiEndpointHistoriGameUser: 'http://localhost:3000/auth/akun/tampilGameSaya',
 apiEndpointUpdateHistoriGameUser: 'http://localhost:3000/auth/akun/ganti-game/:id',
 apiEndpointDeleteHistoriGameUser: 'http://localhost:3000/auth/akun/hapusGame/:id'
}


//nama request
const requestName = 'request register user';
const requestName1 = 'request mendapatkan seluruh daftar user';
const requestName2 = 'request menghapus user berdasarkan id';
const requestName3 = 'request login user';
const requestName4 = 'request autentifikasi akun user';
const requestName5 = 'request ganti password';
const requestName6 = 'request mendapatkan user dengan id';
const requestName7 = 'request isi biodata user';
const requestName8 = 'request hapus biodata user';
const requestName9 = 'request menampilkan biodata user';
const requestName10 = 'request menampilkan seluruh biodata user';
const requestName11 = 'request update biodata user';
const requestName12 = 'request isi histori game user';
const requestName13 = 'request menampilkan histori game user';
const requestName14 = 'request update histori game user berdasarkam id game';
const requestName15 = 'request hapus histori game user berdasarkam id game';
const requestName16 = 'request menampilkan seluruh game user';

const requestPayloadDaftarUser = {
    username: "julian",
    email: "julian@gmail.com",
    password: "123julian"
};

const requestPayloadLoginUser = {
    email: "julian@gmail.com",
    password: "123julian"
};

const requestPayloadGantiPassword = {
    passwordLama: "123julian",
    passwordBaru: "julian123",
    passwordBaru2: "julian123"
};

const requestPayloadIsiBiodata = {
    umur: 29,
    kota: "Jakarta",
    nomor_telepon: "081234556678",
    jenis_kelamin: "laki-laki"
};

const requestPayloadUpdateBiodata = {
    nama: "andri",
	umur: 19,
	kota: "medan",
	nomor_telepon: "0800995432222",
	jenis_kelamin: "laki-laki"
};

const requestPayloadIsiGame = {
    nama_game: "left 4 dead 2",
	nilai: 100
};

const requestPayloadUpdateIsiGame = {
    nama_game: "mario kart",
	nilai: 76
};


const requestTest = `
pm.test('Sample test: Test berhasil', function(){
    pm.expect(pm.response.code).to.equal(200);
});
`
const rawHeaderString = 'Content-Type:application/json\ncache-control:no-cache\n';

const rawHeader = Header.parse(rawHeaderString);

const requestHeader = rawHeader.map(h => new Header(h));

const postmanRequest = new Item({
    name: requestName,
    request: {
        header: requestHeader,
        url: api.apiEndpointDaftarUser,
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadDaftarUser)
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest);

const rawHeaderString1 = 'Content-Type:application/json\ncache-control:no-cache\n';

const rawHeader1 = Header.parse(rawHeaderString1);

const requestHeader1 = rawHeader1.map(h => new Header(h));

const postmanRequest1 = new Item({
    name: requestName1,
    request: {
        header: requestHeader1,
        url: api.apiEndpointGetAllUser,
        method: 'GET',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest1);

const rawHeaderString2 = 'Content-Type:application/json\ncache-control:no-cache\n';

const rawHeader2 = Header.parse(rawHeaderString2);

const requestHeader2 = rawHeader2.map(h => new Header(h));

const postmanRequest2 = new Item({
    name: requestName2,
    request: {
        header: requestHeader2,
        url: api.apiEndpointHapusUser,
        method: 'DELETE',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest2);

const rawHeaderString3 = 'Content-Type:application/json\ncache-control:no-cache\n';

const rawHeader3 = Header.parse(rawHeaderString3);

const requestHeader3 = rawHeader3.map(h => new Header(h));

const postmanRequest3 = new Item({
    name: requestName3,
    request: {
        header: requestHeader3,
        url: api.apiEndpointLoginUser,
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadLoginUser)
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest3);

const rawHeaderString4 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader4 = Header.parse(rawHeaderString4);

const requestHeader4 = rawHeader4.map(h => new Header(h));

const postmanRequest4 = new Item({
    name: requestName4,
    request: {
        header: requestHeader4,
        url: auth.apiEndpointAkunSaya,
        method: 'GET',
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest4);

const rawHeaderString5 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader5 = Header.parse(rawHeaderString5);

const requestHeader5 = rawHeader5.map(h => new Header(h));

const postmanRequest5 = new Item({
    name: requestName5,
    request: {
        header: requestHeader5,
        url: auth.apiEndpointGantiPassword,
        method: 'PATCH',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadGantiPassword)
        },
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest5);

const rawHeaderString6 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader6 = Header.parse(rawHeaderString6);

const requestHeader6 = rawHeader6.map(h => new Header(h));

const postmanRequest6 = new Item({
    name: requestName6,
    request: {
        header: requestHeader6,
        url: api.apiEndpointGetUserById,
        method: 'GET',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest6);

const rawHeaderString7 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader7 = Header.parse(rawHeaderString7);

const requestHeader7 = rawHeader7.map(h => new Header(h));

const postmanRequest7 = new Item({
    name: requestName7,
    request: {
        header: requestHeader7,
        url: auth.apiEndpointIsiBiodata,
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadIsiBiodata)
        },
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest7);

const rawHeaderString8 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader8 = Header.parse(rawHeaderString8);

const requestHeader8 = rawHeader8.map(h => new Header(h));

const postmanRequest8 = new Item({
    name: requestName8,
    request: {
        header: requestHeader8,
        url: auth.apiEndpointHapusBiodata,
        method: 'DELETE',
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest8);

const rawHeaderString9 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader9 = Header.parse(rawHeaderString9);

const requestHeader9 = rawHeader9.map(h => new Header(h));

const postmanRequest9 = new Item({
    name: requestName9,
    request: {
        header: requestHeader9,
        url: auth.apiEndpointBiodataAkun,
        method: 'GET',
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest9);

const rawHeaderString10 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader10 = Header.parse(rawHeaderString10);

const requestHeader10 = rawHeader10.map(h => new Header(h));

const postmanRequest10 = new Item({
    name: requestName10,
    request: {
        header: requestHeader10,
        url: api.apiEndpointGetAllUserBiodata,
        method: 'GET',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest10);

const rawHeaderString11 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader11 = Header.parse(rawHeaderString11);

const requestHeader11 = rawHeader11.map(h => new Header(h));

const postmanRequest11 = new Item({
    name: requestName11,
    request: {
        header: requestHeader11,
        url: auth.apiEndpointUpdateBiodata,
        method: 'PATCH',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadUpdateBiodata)
        },
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest11);

const rawHeaderString12 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader12 = Header.parse(rawHeaderString12);

const requestHeader12 = rawHeader12.map(h => new Header(h));

const postmanRequest12 = new Item({
    name: requestName12,
    request: {
        header: requestHeader12,
        url: auth.apiEndpointIsiHistoriGameUser,
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadIsiGame)
        },
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest12);

const rawHeaderString13 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader13 = Header.parse(rawHeaderString13);

const requestHeader13 = rawHeader13.map(h => new Header(h));

const postmanRequest13 = new Item({
    name: requestName13,
    request: {
        header: requestHeader13,
        url: auth.apiEndpointHistoriGameUser,
        method: 'GET',
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest13);

const rawHeaderString14 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader14 = Header.parse(rawHeaderString14);

const requestHeader14 = rawHeader14.map(h => new Header(h));

const postmanRequest14 = new Item({
    name: requestName14,
    request: {
        header: requestHeader14,
        url: auth.apiEndpointUpdateHistoriGameUser,
        method: 'PATCH',
        body: {
            mode: 'raw',
            raw: JSON.stringify(requestPayloadUpdateIsiGame)
        },
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest14);

const rawHeaderString15 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader15 = Header.parse(rawHeaderString15);

const requestHeader15 = rawHeader15.map(h => new Header(h));

const postmanRequest15 = new Item({
    name: requestName15,
    request: {
        header: requestHeader15,
        url: auth.apiEndpointDeleteHistoriGameUser,
        method: 'DELETE',
        auth: true
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest15);

const rawHeaderString16 = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

const rawHeader16 = Header.parse(rawHeaderString16);

const requestHeader16 = rawHeader16.map(h => new Header(h));

const postmanRequest16 = new Item({
    name: requestName16,
    request: {
        header: requestHeader16,
        url: api.apiEndpointGetAllUserGame,
        method: 'GET',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: requestTest
            }
        }
    ]
});

postmanCollection.items.add(postmanRequest16);

const collectionJSON = postmanCollection.toJSON();

fs.writeFile('./collection.json', JSON.stringify(collectionJSON, null, 2), (err) => {
    if (err) {
        console.log(err);
    }
    console.log('file saved!');
});