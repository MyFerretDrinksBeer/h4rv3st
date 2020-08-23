const got = require('got');
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const inquirer = require('inquirer');
const mainColor = '#9e0000';
const mainColor2 = '#4cc248';
const options = require('./options.js');

const sleep = (ms) => {return new Promise(resolve => {setTimeout(resolve, ms)})}

require('events').EventEmitter.defaultMaxListeners = 10000;

const randColor = async () => {

	var r;

	fs.readFile('./saved/colors.txt', 'utf8', (err, data) => {
		if(err){
			console.log(err);
		}else{
			let arr = data.split(',');
			

	
			r = arr;
			
		}
	});

	await sleep(1000);
	
	return await r;
}



const question = () => {
	let q = {
		name: 'base',
		type: 'input',
		message: 'harvester_>>'
	}
	return inquirer.prompt(q);
}


const ask = async () => {
	let base = await question();

	run(base.base);
}


const welcome = () => {
	console.log( '\n\n',
		chalk.hex(mainColor)(figlet.textSync('_/|h4rv3st|\\_', {horizontalLayout: 'full'}),
			'\n\n',
			'[',chalk.hex(mainColor2)('1'),'] Options',
			'\n',
			'[',chalk.hex(mainColor2)('2'),'] Help',
			'\n',
			'[',chalk.hex(mainColor2)('3'),'] About',
			'\n\n'
		)
	);
}


const run = (base) => {

	if(base.split(' ')[0] == 'collect'){
		if(options.url !== ''){
			go();
			return;
		}else{
			console.log(
				chalk.red(
					'\n', 
					'Error: You must set a URL first by running "-url <desired url>. Or run "help" for more info.', 
					'\n')
			);
		}
		
	}

	if(base.split(' ')[0] == 'harvest'){
		checkEmails();
	}	

	if(base == 'options' || base == '1'){
		options.show();
	}

	if(base.split(' ')[0] == '-url'){
		options.url = base.split(' ')[1];
	}

	if(base.split(' ')[0] == '-f'){
		options.filters = base.replace(base.split(' ')[0] + ' ', '')
	}

	if(base.split(' ')[0] == '2' || base.split(' ')[0] == 'help'){
		options.help();
	}

	if(base.split(' ')[0] == '3' || base.split(' ')[0] == 'about'){
		options.about();
	}

	ask();

}


const go = () => {
	
	//Get url list
	got(options.url)
		.then(res => {
			console.log('https://' + res.connection._host)

			const dom = new JSDOM(res.body);
			const links = dom.window.document.querySelectorAll('a');
			const arr = [];

			links.forEach(link => {
				
				//If link is local then add hostname to link
				if(!link.href.includes('https') && !link.href.includes('https')){
					arr.push('https://' + res.connection._host + link.href + '\n');
					console.log('https://' + res.connection._host + link.href);
				}else{
					arr.push(link.href +'\n')
					console.log(link.href);
				}
			});

			fs.writeFile('./saved/initial_scan.txt', arr, (err) => {
				if(err){
					console.log(err);
				}else{
					console.log(
						chalk.cyan('Results have been saved!')	
					);
				}
			});	

			setTimeout(() => {getMoreLinks()}, 100);
		})
		.catch(err => console.log(err));


}





const getMoreLinks = () => {

	fs.readFile('./saved/initial_scan.txt', 'utf8', (err, data) => {
		
		if(err){
			console.log(err)
		}else{
			let links = data.split(',');
			let finalArr = [];

			links.forEach((link, index) => {
				got(link)
					.then(res => {
						let dom = new JSDOM(res.body);
						let elm = dom.window.document.querySelectorAll('a');
						let arr = [];

						if(options.filter !== ''){
							elm.forEach(item => {
								console.log(item.href)
								if(!item.href.includes('github') && !item.href.includes('wikipedia') && item.href.includes(options.filter)){

									//If link is local then add hostname to link
									if(!item.href.includes('https') && !item.href.includes('https')){
										arr.push('https://' + res.connection._host + item.href + '\n');
										console.log('https://' + res.connection._host + item.href);
									}else{
										arr.push(item.href +'\n')
										console.log(item.href);
									}
								}
							});
						}else{
							elm.forEach(item => {
								console.log(item.href)
								if(!item.href.includes('github') && !item.href.includes('wikipedia')){

									//If link is local then add hostname to link
									if(!item.href.includes('https') && !item.href.includes('https')){
										arr.push('https://' + res.connection._host + item.href + '\n');
										console.log('https://' + res.connection._host + item.href);
									}else{
										arr.push(item.href +'\n')
										console.log(item.href);
									}

								}
								
							});
						}

						finalArr.push(arr);
					})
					.catch(err => console.log(err))
			});

			setTimeout(() => {

				fs.writeFile('./saved/linkList1.txt', finalArr, (err) => {
					if(err){
						console.log(err)
					}else{
						console.log(finalArr)
						console.log(chalk.cyan('Results saved!', '\n\n', 'You can now run "harvest" to begin harvesting emails from URL list.'))

						ask()
					}
				});

			}, links.length*100)

			
		}

	});


}






const checkEmails = () => {
	

	//Get initial url List
	fs.readFile('./saved/linkList1.txt', 'utf8', (err, data) => {
		if(err){
			console.log(err);
		}else{
			let arr = data.split(',');
			let finalArr = [];
			

			arr.forEach(async (url, index) => {

				setTimeout(async () => {
					let colors = await randColor();
					let color = colors[Math.round(Math.random()*colors.length)]


					const results = got(url)
						.then(res => {
							const dom = new JSDOM(res.body);
							const possibleEmail = dom.window.document.querySelectorAll('a');
							const arr = [];

							possibleEmail.forEach(item => {
								if(item.textContent.includes('@')){
									arr.push(item.textContent + '\n');
								}
							});

							if(arr.length == 0){
								console.log(chalk.hex('"' + color + '"')('no emails found :('))
							}else{
								console.log(arr);
								return arr;
							}
							
						})
						.catch(err => console.log(chalk.hex('"' + color + '"')('no emails found :(')));

					let r = await results;
					
					if(r !== undefined){
						finalArr.push(r)
					}
					
					
				}, index*100)

				

				
			})
		
			setTimeout(() => {

				fs.writeFile('./saved/EMAIL_RESULTS.txt', finalArr, (err) => {
					if(err){
						console.log(err)
					}else{
						console.log('\n\n', 'Email results saved at... saved/EMAIL_RESULTS.txt', '\n\n')
					}
				});

			}, arr.length*120);

		}
	});



}




//On load
(() => {
	welcome();
	ask();
})()
















