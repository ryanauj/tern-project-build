exports.TERN_PROJECT_FILE = '.tern-project',
exports.TERN_PROJECT_CONTENTS = {
    'plugins': {
        'node': {},
        'es_modules': {}
    },
    'libs': [
        'ecma5',
        'ecma6'
    ],
    'ecmaVersion': 6
},
exports.GITIGNORE_FILE = '.gitignore',
exports.GITIGNORE_CONTENT = `\n\n${this.TERN_PROJECT_FILE}`
