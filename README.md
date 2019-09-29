
# **Front End Testing Scenario**
UI Test Framework Example in Javascript using Puppeteer and Cucumber-Js.

# Table of Contents

* [Overview](#overview)
* [How to setup](#howtosetup)
* [How to run tests and generate JSON and HTML reports](#howtoruntests)
* [Where to find JSON and HTML reports](#htmlreport)
* [Examples of Test Execution and HTML report](#outputexamples)
* [Jenkins (CI/CD) Integration setup guideline](#jenkins)
* [Potential Improvements](#potentialimprovements)

<a name="overview"></a>
## 1. Overview 

* This UI test framework uses Javascript as a main language under Puppeteer (node.js) with cucumber. Test will run according to feature files - which can be stored under ./features folder. 

* Outputs (Json and html) will be produced under ./reports folder.

* Browser supported: Chromium - default with Puppeteer

* Run mode: either Headless or Headful (current) - mode setting in .\features\step_definitions\world.js 

* Dependencies and versions used (as in package.json)
    *  "puppeteer": "^1.20.0"
    * "cucumber": "^5.1.0"
    * "cucumber-html-reporter": "^5.0.2"

<a name="howtosetup"></a>
## 2. How to setup
___

Pull (clone) souce code from Git and install 'node.js packages' as below commands: 

```batch
git clone git@github.com:pichai-t/homeloancal-puppeteer.git
npm i
```

> Note: Git client and node.js are required to run above commands
> * [Git Installation](https://www.atlassian.com/git/tutorials/install-git)
> * [Node.Js Installation](https://nodejs.org/en/download/)  (version 11 recommended)
--- 

<a name="howtoruntests"></a>

## 3. How to run tests and generate JSON and HTML reports

Run CLI "<code>npm test</code>" to execute tests: 
```node
npm test
```
> Note: Basically, features files under ./features folder will be picked up and run

Then these two scripts (test and posttest) will be executed respectively as stated in "package.json":
```json
"scripts": {
    "test": "cucumber-js -f json:./reports/cucumber_report.json",
    "posttest": "node genHTML.js"
},    
```

Once finished, there will be two reports 'cucumber_report.json' and 'cucumber_report.html' under ./reports folder.   

> Note: JSON file will be produced every time "test" step finished and this JSON file (./reports/cucumber_report.json) will be required for "posttest" step to generation of HTML
---

<a name="htmlreport"></a>
## 4. Where to find JSON and HTML reports

JSON and HTML reports can be found under ./reports folder as "cucumer_report.json" and "cucumer_report.html" respectively.


---
<a name="jenkins"></a>
## 5. Jenkins (CI/CD) Integration setup guideline
In your new Jenkins Job:

5.1. Under Git Integration: pull source code from github:

<code>git clone git@github.com:pichai-t/homeloancal-puppeteer.git) </code>

5.2. Add step: to run command: "<code>npm i</code>"

5.3. Add step: to run command: "<code>npm test</code>"

5.4. If needed, JUnit and HTML reports can be used for further integration (Jenkins build itself or other integrations; such as Jira, qTest.

* JUnit file: ./target/cucumber-reports/Cucumber.xml 
* HTML file: ./target/cucumber-reports/html/index.html

---
<a name="outputexamples"></a>
## 6. Examples of Test Execution and HTML report

![Image](./screenshots/npmtest.JPG)

![Image](./screenshots/report.html.JPG)

<a name="potentialimprovements"></a>
## 7. Potential Improvements

* Page Object Model implementation
* Multi Browsers support (such as firefox (beta) or Chrome, Edge (coming), or mobile)
* Test parallel execution (maybe to use npm: puppeteeer-cluster)

--- 
