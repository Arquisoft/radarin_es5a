
export const buscarUsuario = (usuario, funcionCallback) =>{
    this.firebase.database().ref('users').get().then(function(snapshot) {
        if (err) {
            funcionCallback(null);
        } else {
            let collection = db.collection('users');
            collection.findOne(usuario, function(err, result) {
                if (err) {
                    funcionCallback(null);
                } else {
                    funcionCallback(result.ops[0]._id);
                }
                db.close();
            });
        }
    });
  }
  
  export const insertarUsuario = (usuario, funcionCallback) =>{
    this.firebase.database().ref('users').get().then(function(snapshot) {
        if (err) {
            funcionCallback(null);
        } else {
            let collection = db.collection('users');
            collection.insertOne(usuario, function(err, result) {
                if (err) {
                    funcionCallback(null);
                } else {
                    funcionCallback(result.ops[0]._id);
                }
                db.close();
            });
        }
    });
  }