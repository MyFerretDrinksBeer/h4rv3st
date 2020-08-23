# h4rv3st
Simple and effective email harvester written in JavaScript/node.js.  With 3 commands you can get a list of thousands of URL's, from only a single URL (script will spider to all URL's and save them), and then begin checking each URL for any email addresses. Once the harvest is complete it will save all results in a .txt file.



<h1>Install & Setup</h1>

<ol> 
   <li>This application runs in Node.js so if you do not have node installed then install it <a href="https://nodejs.org/en/">here</a></li>
   <li>Download or <span style="background-color: grey">git clone</span> this repository, once downloaded <b>cd</b> into the repository</li>
   <li>Install all nessessary node modules by running <b>npm install jsdom got chalk fs figlet inquirer --save</b></li>
   <li>Once node modules are downloaded you can now start h4rv3st by running <b>node harvester.js</b></li>
</ol>
