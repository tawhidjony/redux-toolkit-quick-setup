#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log("npx create-my-boilerplate my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = `https://github.com/tawhidjony/tj.git`;
console.log("working...");
try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The file ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
  }
  process.exit(1);
}

async function main() {
  try {
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);
    process.chdir(projectPath);
    console.log("processing...");
    execSync("npx rimraf ./.git");
    execSync("npx rimraf index.html");
    execSync("npx rimraf package.json");
    execSync("npx rimraf package-lock.json");
    execSync("npx rimraf .gitignore");
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });
    console.log("Redux Toolkit is setup success!!");
  } catch (error) {
    console.log(error);
  }
}
main();



