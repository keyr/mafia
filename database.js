import { db } from './config';

let createGame = props => {
    db.ref('/games').update({
        [props.roomName]: {
            password: props.password,
            admin: props.name,
            started: false,
            winner: '',
            mafiaKilled: false,
            policeChecked: false,
            day: true,
            users: {
                [props.name]: true
            }
        }
    });
}

let joinGame = props => {
    const newRef = db.ref('/games/' + props.roomName);
    newRef.once('value', function(snapshot) {
        const data = snapshot.val();
        if (props.password === data['password']) {
            db.ref('/games/' + props.roomName + '/users').update({
                [props.name]: true
            });
        }
    })
}

let getUsers = (roomName, callback) => {
    const newRef = db.ref('/games/' + roomName + '/users');
    newRef.on('value', users => {
        const data = [];
        users.forEach(function(s) {
            data.push(s.key);
        })
        if (data.length === 0) {
            callback('leave');
        }
        callback(data);
    })
}

let leaveGame = (roomName, name, callback) => {
    const newRef = db.ref('/games/' + roomName + '/users/' + name);
    newRef.remove();
    getUsers(roomName, callback);
}

let removeGame = roomName => {
    const newRef = db.ref('/games/' + roomName);
    newRef.remove();
}

let initializeGame = (roomName, callback) => {
    const newRef = db.ref('/games/' + roomName);
    const usersRef = db.ref('/games/' + roomName + '/users');
    db.ref('/games/' + roomName + '/users').once('value').then(function(users) {
        const data = [];
        users.forEach(function(s) {
            data.push(s.key);
        })
        let num = Math.floor(data.length / 4);
        for (let i = 0; i < num; ++i) {
            let rand = Math.floor(Math.random() * data.length);
            let user = data.splice(rand, 1)[0];
            usersRef.update({
                [user]: false
            })
        }
        let rand = Math.floor(Math.random() * data.length);
        let police = data.splice(rand, 1)[0];
        usersRef.update({
            [police]: 'police'
        })
        newRef.update({
            started: true
        })
        callback('done');
    })
}

let listenForInitialize = (roomName, name, callback) => {
    const listenRef = db.ref('/games/' + roomName + '/started');
    listenRef.on('value', sign => {
        if (sign.val() === true) {
            getRole (roomName, name, callback);
        }
    })
}

let listenForDay = (roomName, callback) => {
    const listenRef = db.ref('/games/' + roomName + '/day');
    listenRef.on('value', sign => {
        callback(sign.val());
    })
}

let changeDay = (roomName, day) => {
    if (day === false) {
        db.ref('/games/' + roomName).update({
            day: true,
            policeChecked: false,
            mafiaKilled: false,
        })
    } else {
        db.ref('/games/' + roomName).update({
            day: false
        })
    }
    
}

let getRole = (roomName, name, callback) => {
    db.ref('/games/' + roomName + '/users/' + name).once('value').then(function(role) {
        callback(role.val());
    });
}

let getMafia = (roomName, callback) => {
    db.ref('/games/' + roomName + '/users').once('value').then(function(users) {
        const data = [];
        users.forEach(function(s) {
            if (s.val() === false) {
                data.push(s.key);
            }
        })
        callback(data);
    });
}

let checkAlignment = (roomName, name, callback) => {
    db.ref('/games/' + roomName + '/policeChecked').once('value').then(function(checked) {
        if (checked.val() === false) {
            db.ref('/games/' + roomName).update({
                policeChecked: true
            })
            db.ref('/games/' + roomName + '/users/' + name).once('value').then(function(role) {
                callback(role.val());
            })
        }
    })
}

let killPlayer = (roomName, name) => {
    db.ref('/games/' + roomName + '/mafiaKilled').once('value').then(function(checked) {
        if (checked.val() === false) {
            db.ref('/games/' + roomName).update({
                mafiaKilled: true
            })
            db.ref('/games/' + roomName + '/users').update({
                [name]: null
            })
        }
    })
}

let executePlayer = (roomName, name) => {
    db.ref('/games/' + roomName + '/users').update({
        [name]: null
    })
}

let checkWinner = (roomName) => {
    db.ref('/games/' + roomName + '/users').once('value').then(function(users) {
        let mafia = 0;
        let town = 0;
        users.forEach(function(s) {
            if (s.val() === false) {
                ++mafia;
            } else {
                ++town;
            }
        })
        if (mafia === 0) {
            db.ref('/games/' + roomName).update({
                winner: 'Town has won!'
            })
        } else if (mafia >= town) {
            db.ref('/games/' + roomName).update({
                winner: 'Mafia has won!'
            })
        }
    })
}

let listenForWinner = (roomName, callback) => {
    db.ref('/games/' + roomName + '/winner').on('value', (s) => {
        callback(s.val());
    })
}

let listenForDeath = (roomName, name, callback) => {
    db.ref('/games/' + roomName + '/users/' + name).on('value', (s) => {
        if (s.val() == null) {
            callback(true);
        } else {
            callback(false);
        }
    })
}

export { createGame, joinGame, getUsers, leaveGame, removeGame, 
    initializeGame, listenForInitialize, listenForDay, changeDay, 
    getRole, getMafia, checkAlignment, killPlayer, executePlayer, 
    checkWinner, listenForWinner, listenForDeath };