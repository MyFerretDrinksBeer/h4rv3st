const chalk = require('chalk');
const mainColor = '#9e0000';
const mainColor2 = '#4cc248';




const options = {

	url: '',
	filter: [],
	show: () => {
		console.log('\n\n',
				
				chalk.hex(mainColor)(
					
					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_OPTIONS_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`, 
					'\n\n\n',
					'*URL [' + chalk.hex(mainColor2)(options.url) + ']',
					'\n',
					'Filters [' + chalk.hex(mainColor2)(options.filter) + ']',
					'\n\n\n',

					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`,
   			
				),
				
			'\n\n'
						
		);
	},
	help: () => {
		console.log('\n\n',
				
				chalk.hex(mainColor)(
					
					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_HELP_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`, 
					'\n\n\n',
					'[',chalk.hex(mainColor2)('-url <desired URL>'), '] Set desired url to collect a URL list to harvest from',
					'\n',
					'[',chalk.hex(mainColor2)('-filter <desired filter>'), "] Set a filter to only collect URL's that include your filter",
					'\n',
					'[',chalk.hex(mainColor2)('collect'), "] Collect a URL list from set URL",
					'\n',
					'[',chalk.hex(mainColor2)('harvest'), "] Start harvesting emails from URL list",
					'\n\n\n',
					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`,
   			
				),
				
			'\n\n'
						
		);
	},
	about: () => {
		console.log('\n\n',
				
				chalk.hex(mainColor)(
					
					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ABOUT_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`, 
					'\n\n\n',
					"h4rv3st is a simple, fast and effective email harvester. You can collect a list of ten's of thousands of URL's from just a single URL. Then run the harvester to check each URL for any emails. All results (URL's and emails) will be saved in the 'saved' folder in this directory, in the form of a .txt file. ",
					'\n\n\n',
					`-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-`,
   			
				),
				
			'\n\n'
						
		);
	}



}


module.exports = options;