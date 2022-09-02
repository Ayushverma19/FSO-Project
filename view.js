// This module contains the Viewfn



//==========================================================

const fs = require('fs')
const path = require('path')

let viewFn = function(srcpath, ind) {
    if (fs.lstatSync(srcpath).isFile()) {
        // aur ye fun inp ko bhi check karega file h ya folder
        console.log(ind + "├──" + path.basename(srcpath))
    } else {
        console.log(ind + "└──" + path.basename(srcpath))
            // folder h to nam phele 
        let files = fs.readdirSync(srcpath)
        for (let i = 0; i < files.length; i++) {
            viewFn(path.join(srcpath, files[i]), ind + '\t') // bs yaha se recursion
                // bs yahi logic h ki recursion call pr indent chahe hoga
        }





    }









}



let treeFn = function(srcpath) {

    if (fs.existsSync(srcpath)) {

        viewFn(srcpath, ' ')
    } else {
        console.log('Invalid Input')
    }



}

// export
module.exports = {

    view: treeFn
}