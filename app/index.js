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
            }
        ];
        return this.prompt(prompts)
            .then((answers) => {
                this.name = answers.name;
                this.log(`Dope! ${answers.name} is created. Go code!`);
                this.log('🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳');
            });
    },

    install() {
        this.spawnCommand('yarn');
    },

    writing() {
        this.fs.copy(this.templatePath('**'), path.join(this.destinationPath()));
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { name: this.name }
        );
    }
});
