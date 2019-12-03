import { db } from './config';

let createGame = (props, callback) => {
    db.ref('/games/' + props.roomName).once('value', (snapshot) => {
        if (snapshot.val() == null) {
            db.ref('/games').update({
                [props.roomName]: {
                    password: props.password,
                    admin: props.name,
                    started: false,
                    winner: '',
                    mafiaKilled: false,
                    policeChecked: false,
                    doctorSaved: false,
                    killed: '',
                    saved: '',
                    day: true,
                    users: {
                        [props.name]: true
                    }
                }
            });
            callback(true);
        } else {
            callback(false);
        }
    })
    
}

let joinGame = (props, callback) => {
    const newRef = db.ref('/games/' + props.roomName);
    newRef.once('value', function(snapshot) {
        const data = snapshot.val();
        if (data == null) {
            callback('The room does not exist!');
        } else if (data['started'] === true) {
            callback('Sorry, this game is already in session.');
        } else if (props.password === data['password']) {
            db.ref('/games/' + props.roomName + '/users/' + props.name).once('value').then(function(s) {
                if (s.val() == null) {
                    db.ref('/games/' + props.roomName + '/users').update({
                        [props.name]: true
                    });
                    callback(true);
                } else {
                    callback('This username has been taken!');
                }
            })
        } else {
            callback('This password is incorrect!')
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
        let doctor = data.splice(rand, 1)[0];
        usersRef.update({
            [police]: 'police',
            [doctor]: 'doctor'
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
        db.ref('/games/' + roomName + '/saved').once('value').then(function(saved) {
            db.ref('/games/' + roomName + '/killed').once('value').then(function(killed) {
                if (saved.val() !== killed.val() && killed.val() !== '') {
                    db.ref('/games/' + roomName + '/users').update({
                        [killed.val()]: null
                    })
                }
                console.log('smh');
                db.ref('/games/' + roomName).update({
                    day: true,
                    policeChecked: false,
                    mafiaKilled: false,
                    doctorSaved: false,
                    saved: '',
                    killed: ''
                })
            })
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
                mafiaKilled: true,
                killed: name
            })
        }
    })
}

let savePlayer = (roomName, name) => {
    db.ref('/games/' + roomName + '/doctorSaved').once('value').then(function(saved) {
        if (saved.val() === false) {
            db.ref('/games/' + roomName).update({
                doctorSaved: true,
                saved: name
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
    getRole, getMafia, checkAlignment, killPlayer, savePlayer, executePlayer, 
    checkWinner, listenForWinner, listenForDeath };