const request = require('request-promise')
const dotenv = require('dotenv').config()
const express  = require('express')
const app = express()
const hook = process.env.HOOK

 async function getData() {
    const json = await request({
        url: 'http://next.json-generator.com/api/json/get/NJmmhK3pV',
        json: true
    })
    
    return json.map(person => ({
        age: person.age,
        email: person.email,
        firstName: person.name.first,
        lastName: person.name.last
    }))
}

(async function() {

    try {
        // get the data 
        const people = await getData()
        console.log(people)

        const slackBody = {
            mkdwn: true,
            text: `This is a really great slack message!`,
            attachments: people.map(person => ({
                color: 'good',
                text: `*${person.email}* and their name is ${person.firstName} ${person.lastName}, and they are ${person.age}}`
            }))
        }

        // post to slack
        const res = await request({
            url: `https://hooks.slack.com/services/${hook}`,
            method: 'post',
            body: slackBody,
            json: true
        })

    } catch (e) {
        console.log('our error', e)
    }
    debugger
}());

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})