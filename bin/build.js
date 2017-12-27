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
    printSuccessMessage();

    function verifyFileDoesNotExist() {
        if (fileExists(constants.TERN_PROJECT_FILE)) {
            throw `${constants.TERN_PROJECT_FILE} already exists`;
        }
    }

    function createFile() {
        let contents = prettyStringify(constants.TERN_PROJECT_CONTENTS);
        fs.writeFileSync(constants.TERN_PROJECT_FILE, contents);
    }

    function printSuccessMessage() {
        print(`${constants.TERN_PROJECT_FILE} has been created!`);
    }
} 

function updateGitignore() {

    verifyFileExists();
    verifyStringDoesNotExistInFile();
    appendDataToFile();
    printSuccessMessage();

    function verifyFileExists() {
        if (!fileExists(constants.GITIGNORE_FILE)) {
            throw `No ${constants.GITIGNORE_FILE} to append to`;
        }
    }

    function verifyStringDoesNotExistInFile() {
        let current_content = fs.readFileSync(constants.GITIGNORE_FILE);
        if (current_content.includes(constants.TERN_PROJECT_FILE)) {
            let already_exists_in_file_error = constants.TERN_PROJECT_FILE
                                               + " already exists in "
                                               + constants.GITIGNORE_FILE
            throw already_exists_in_file_error;
        }
    }

    function appendDataToFile() {
        let gitignore_content =
            '\n# YouCompleteMe javascript autocomplete file\n' 
            + constants.TERN_PROJECT_FILE;
        fs.appendFileSync(constants.GITIGNORE_FILE, gitignore_content);
    }

    function printSuccessMessage() {
        print(
            constants.TERN_PROJECT_FILE + 
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
