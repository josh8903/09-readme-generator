const fs = require("fs"),
    path = require("path"),
    inquirer = require("inquirer");

// array of questions for user
const questions = [{
        type: "input",
        name: "username",
        message: "GitHub username:"
    },
    {
        type: "input",
        name: "email",
        message: "E-mail address:"
    },
    {
        type: "input",
        name: "title",
        message: "Project title:"
    },
    {
        type: "input",
        name: "description",
        message: "Project description:"
    },
    {
        type: "list",
        name: "license",
        message: "Project license:",
        choices: ["MIT", "APACHE_2.0", "GPL_3.0", "BSD_3", "None"]
    },
    {
        type: "input",
        name: "install",
        message: "Installation instructions:"
    },
    {
        type: "input",
        name: "use",
        message: "Usage info:"
    },
    {
        type: "input",
        name: "contribution",
        message: "Contribution guidelines:"
    },
    {
        type: "input",
        name: "test",
        message: "Test instructions:"
    },
];

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then((inquirerResponses) => {
            console.log("Generating README...");
            writeToFile("generatedREADME.md", generateMarkdown({...inquirerResponses }));
        })
}

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to generate license info
function renderLicenseBadge(license) {
    if (license !== "None") {
        return `![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`
    }
    return ''
}

function renderLicenseLink(license) {
    if (license !== "None") {
        return (
            `\n* [License](#license)\n`
        )
    }
    return ''
}

function renderLicenseSection(license) {
    if (license !== "None") {
        return (
            `## License
  
  This project is licensed via ${license}`
        )
    }
    return ''
}

// function to generate markdown for README
function generateMarkdown(data) {
    return `
# ${data.title}
${renderLicenseBadge(data.license)}
## Description
${data.description}
## Table of Contents 
* [Installation](#installation)
* [Usage](#usage)
${renderLicenseLink(data.license)}        
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
${data.install}
## Usage
${data.use}
${renderLicenseSection(data.license)}
## Contributing
${data.contribution}
## Tests    
${data.test}
## Questions
If you have any questions, please feel free to [e-mail](mailto:${data.email}) me!        
Check out my [GitHub](https://github.com/${data.username}/) to see more of my work!
    `;
}

// function call to initialize program
init();