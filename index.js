const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
//const pdf = require("pdf");
const generateHTML = require("./generateHTML");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github name?",
      name: "name"
    },
    {
      type: "list",
      message: "What is your favorite color? ",
      choices: ["Blue", "Red", "White", "Black"],
      name: "preferredComm"
    }
  ])
  .then(function(response) {
    axios
      .get("https://api.github.com/users/" + response.name)
      .then(function(axiosResponse) {

        const name = axiosResponse.data.name;
        const avatar = axiosResponse.data.avatar_url;
        const url = axiosResponse.data.html_url;
        const location = axiosResponse.data.location;
        const bio = axiosResponse.data.bio;
        const  publicRepos = axiosResponse.data.public_repos;
        const followers = axiosResponse.data.followers;
        const following = axiosResponse.data.following;

        const githubProfile = name + " \n" + avatar + " \n" + url + "\n" + location + "\n" + bio + "\n" + publicRepos + "\n" + followers + "\n" + following;
        
        // fs.writeFile(response.name + ".md");
        fs.writeFile("log.txt", githubProfile, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("Success!");
        });

        console.log(axiosResponse.data);
      });
  });