const path = require('path');
const generators = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    prompting: function() {
        const prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What\'s your project name?',
                default: this.appname,
            }
        ];
        return this.prompt(prompts)
            .then((answers) => {
                this.name = answers.name;
            });
    },

    install: function() {
        this.log(
            `Dope! ${answers.name} is created. Now it's time to install
            dependencies!`
        );
        this.spawnCommand('yarn');
    },

    writing: function() {
        mkdirp(this.name);
        this.fs.copy(
            this.templatePath('**'),
            path.join(this.destinationPath(), this.name)
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(path.join(this.name, 'package.json')),
            { name: this.name }
        );
    }
});
