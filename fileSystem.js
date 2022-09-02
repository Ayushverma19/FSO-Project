// It is the module which contains :
// Organise fn
// about fn
// help fn

//==========================================================

//modules import
const fs = require('fs')
const path = require('path')

// necessarry objects
let matchInp = {
    Code: ['c', 'cpp', 'java', 'py', 'js'],
    Image: ['jpeg', 'png'],
    Docs: ['pdf', 'txt', 'rtf'],
    Media: ['mp3', 'mp4']
}


// cut and copy function
let moveFile = function(currentDest, finalDest) {
    let newpath = path.join(finalDest, path.basename(currentDest))
    fs.copyFileSync(currentDest, newpath)
        // copyfile ko dest add ke sth ie ka nam bho add krke dena parta h 
}

// match the inputs according to the extentions
let match = function(extn) {
    for (let k in matchInp) {
        let matcharr = matchInp[k]
        for (let i = 0; i < matcharr.length; i++) {
            if (matcharr[i] == extn) {
                return k
                    // ye match keke file ka key(folder name) dega
            }
        }

    }
    return null

}

// Organize function---------------------->
let organiseFn = function(srcpath) {
    if (fs.existsSync(srcpath)) {
        // file exist  : 1st check
        let destpath = path.join(srcpath, 'organised_files')
        if (fs.existsSync(destpath)) {
            console.log('Folder already Exists') // 2nd check : file name exists
        } else {
            // the work begins
            //console.log('valid File ')
            fs.mkdirSync(destpath)

            //we can also provide the path with basename for our location
            for (let foldername in matchInp) {
                fs.mkdirSync(path.join(destpath, foldername))
                    // sare folder inp obj ke accdn
            }
            fs.mkdirSync(path.join(destpath, 'Others'))
                // ye unkown ke liye

            //ab input folder read hoga 
            let inpData = fs.readdirSync(srcpath); // read hokr arr me

            //------------------------------------------------------------------------------
            // to dekh kafe doubs clear hue ->
            // 1) let stat = fs.lstatSync(inpData[0])
            // arr se uta tha bina '' iske
            // 2) split aur slice read basics 145
            // console.log(inpData[i].split('.').slice(1))
            // 3) lstat bs file se uttata internal folder bhi nhi krta
            // 4) isye ab path dena parega file ka stat ke liye
            //------------------------------------------------------------------------------

            for (let i = 0; i < inpData.length; i++) {

                let fileStat = fs.lstatSync(path.join(srcpath, inpData[i]))
                if (fileStat.isFile()) {
                    let extn = inpData[i].split('.').slice(1)
                    let currentDest = path.join(srcpath, inpData[i])
                        //ye file ke current dest rakhega 
                    let foldname = match(extn) // match hokr fold name
                    if (foldname != null) {
                        let finalDest = path.join(destpath, foldname)
                            // final dest fold path set krne ke liye
                        moveFile(currentDest, finalDest) // cut and copy
                        fs.unlinkSync(currentDest) // delete from old place

                    } else {
                        let defaultDest = path.join(destpath, 'Others')
                        moveFile(currentDest, defaultDest)
                        fs.unlinkSync(currentDest)
                            // agar extn na mile to usse others me dal do
                    }
                }

            }
        }
    } else {
        // invalid file
        console.log('Invalid File ')
    }
}

let helpMe = function() {
    console.log(` How to use :
    1) View     : This command is used for viewing the folders and files.
    2) Organize : This command will manage the files wrt their extinctions.
    3) About    : This command wil tell about the devloper.`)
}

let aboutIt = function() {
    console.log(` 
    Devloper : Ayush Verma 
    Version  : 0.19 
    Process  : Revived22.op
    Dated    : 2k22
  `)
}

module.exports = {
    manage: organiseFn,
    help: helpMe,
    about: aboutIt,


}