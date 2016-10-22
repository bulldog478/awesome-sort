var test = require("tape")
// test("IP Address", function(t) {
//     [

//     ]
// })

test("float", function(t) {
    t.deepEqual(
        ['1.2', '1.5', '1.30', '1.1'].sort(awesomeSort),
        ['1.1', '1.2', '1.30', '1.5']
    )
})