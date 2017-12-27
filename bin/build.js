#! /usr/bin/env node

let fs = require('fs');

const GITIGNORE_FILE = '.gitignore';
const TERN_PROJECT_FILE = '.tern-project';
const DEFAULT_NODE_CONTENTS = {
    'plugins': {
        'node': {}
    }
}
const DOUBLE_NEWLINE = '\n\n';
const GITIGNORE_CONTENT = `${DOUBLE_NEWLINE}${TERN_PROJECT_FILE}`;

function main() {
    createDefaultTernProjectFile();
    updateGitignore();
}

function createDefaultTernProjectFile() {

    function verifyFileDoesNotExist() {
        if (fileExists(TERN_PROJECT_FILE)) {
            throw `${TERN_PROJECT_FILE} already exists`;
        }
    }

    function createFile() {
        let contents = prettyStringify(DEFAULT_NODE_CONTENTS);
        fs.writeFile(TERN_PROJECT_FILE, contents, handleCreateResult);
    }

    function handleCreateResult(err) {
        if (err) throw err;
        log(`${TERN_PROJECT_FILE} has been created!`);
    }

    try {
        verifyFileDoesNotExist();
        createFile();
    }
    catch(err) {
        log(err);
    }
} 

function updateGitignore() {

    function verifyFileExists() {
        if (!fileExists(GITIGNORE_FILE)) {
            throw `No ${GITIGNORE_FILE} to append to`;
        }
    }

    function appendDataToFile(data, file) {
        fs.appendFile(GITIGNORE_FILE, GITIGNORE_CONTENT, handleAppendResult);
    }

    function handleAppendResult(err) {
        if (err) throw err;
        log(`${TERN_PROJECT_FILE} was appended to the ${GITIGNORE_FILE}!`);
    }

    try {
        verifyFileExists();
        appendDataToFile();
    }
    catch(err) {
        log(err);
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

function log(message) {
    console.log(message);
}

main();
