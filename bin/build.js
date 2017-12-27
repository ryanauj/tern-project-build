#! /usr/bin/env node

let fs = require('fs');
let constants = require('./constants.js');

function main() {
    try {
        createDefaultTernProjectFile();
        updateGitignore();
    }
    catch(err) {
        print(err);
    }
}

function createDefaultTernProjectFile() {

    verifyFileDoesNotExist();
    createFile();

    function verifyFileDoesNotExist() {
        if (fileExists(constants.TERN_PROJECT_FILE)) {
            throw `${constants.TERN_PROJECT_FILE} already exists`;
        }
    }

    function createFile() {
        let contents = prettyStringify(constants.DEFAULT_NODE_CONTENTS);
        fs.writeFileSync(constants.TERN_PROJECT_FILE, contents);
        print(`${constants.TERN_PROJECT_FILE} has been created!`);
    }
} 

function updateGitignore() {

    verifyFileExists();
    appendDataToFile();

    function verifyFileExists() {
        if (!fileExists(constants.GITIGNORE_FILE)) {
            throw `No ${constants.GITIGNORE_FILE} to append to`;
        }
    }

    function appendDataToFile() {
        fs.appendFileSync(
            constants.GITIGNORE_FILE, constants.GITIGNORE_CONTENT);
        print(constants.TERN_PROJECT_FILE + 
            ' was appended to the ' + 
            constants.GITIGNORE_FILE);
    }
}

function fileExists(file) {
    try {
        fs.accessSync(file);      
        return true;
    }
    catch(err) {
        return false;
    }
}

function prettyStringify(object) {
    return JSON.stringify(object, null, 4);
}

function print(message) {
    console.log(message);
}

main();
