const request = require('request-promise')

const hook = 'https://hooks.slack.com/services/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'

const getData = async function() {
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
(async function () {

    try {
        // get the data 
        const people = await getData()
        console.log(people)

        const slackBody= {
            text: `This is a really great slack message!`,
        }

        // post to slack
        request({
            metho: 'post'
        })
    } catch (e) {
        console.log('our error', e)
    }
    debugger
})