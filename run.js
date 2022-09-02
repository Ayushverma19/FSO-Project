// to ye project h file system organizer ek command line project 
// iska kam h ek script jisko run krke hmare file manage aur organize ho jaye
// to hum isme anhi tk ki pari hui node modules ko implement karege
// iski functionalities :  tree(mtlb view ) , organize(fn) , help , about(me)

// lets start :============================================>
// importing modules
const { fstat } = require('fs')
const fileSystem = require('./fileSystem')
const viewSystem = require('./view')

//inputs
let input = process.argv.slice(2) //ye input string lekr nodecode.js tk hta dega
let command = input[0] // isse hum siced array ke ele uta skte 
let srcpath = input[1] // ye input dir ka path input lega


//==============================================================================

// switch case sare functionalities ko handel karega
switch (command) {
    case 'tree':
        console.log('it views the files structure')
        viewSystem.view(srcpath)
        break;
    case 'organise':
        console.log('it will manage the files')
        fileSystem.manage(srcpath)
        break;
    case 'help':
        console.log('Commands ')
        fileSystem.help()
        break;
    case 'about':
        console.log('Specifications')
        fileSystem.about()
        break;

}