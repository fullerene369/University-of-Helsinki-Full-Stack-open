const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password and data as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://lixiangfang369:${password}@cluster0.4mcpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phoneBookSchema)

let name
let number

if (process.argv.length===5){
    name = process.argv[3]
    number = process.argv[4]

    const person = new Phonebook({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close()
    })

}
else {
    Phonebook.find({}).then(result => {
        result.forEach(info => {
            console.log(info)
        })
        mongoose.connection.close()
    })
}





