const path = require('path');
const generators = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    prompting() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What\'s your project name?',
                default: this.appname,
            },
            {
                type: 'input',
                name: 'github',
                message: 'Sweet! What is your github username?',
                default: this.appname,
                store: true,
            }
        ];
        return this.prompt(prompts)
            .then((answers) => {
                this.name = answers.name;
                this.github = answers.github;
            });
    },

    install() {
        this.log(
            `Dope! Now we've created "${this.name}" for ya. Now it's time to ` +
            `install dependencies!`
        );
        process.chdir(path.join(process.cwd(), this.name));
        this.spawnCommand('yarn');
        this.spawnCommand('git', ['init']);
    },

    writing() {
        // Create the directory
        mkdirp(this.name);

        // Copy all of the files
        this.fs.copy(
            this.templatePath('**'),
            path.join(this.destinationPath(), this.name)
        );

        // Copy all of the dotfiles
        this.fs.copy(
            this.templatePath('.*'),
            path.join(this.destinationPath(), this.name)
        );

        // Copy the package.json file
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(path.join(this.name, 'package.json')),
            { name: this.name, github: this.github }
        );

        // Copy the readme file
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(path.join(this.name, 'README.md')),
            { name: this.name }
        );
    },
});
