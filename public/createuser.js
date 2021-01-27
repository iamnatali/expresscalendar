//const User = require("..\\models\\user");

/*function EvaluateForm()
{
    let form = document
    .getElementsByClassName('form').item(0);
    let login = document
    .getElementsByClassName('login').item(0);
    let pass = document
    .getElementsByClassName('pass').item(0);
    alert("ok");
    try{
    const User = require("..\\models\\user.js");
    alert(JSON.stringify(User));
    let user = new User({name:login.value, password:pass.value});
    user.save(function (err) {
        if (err) return console.log(err);
    });
    }catch (e){
        alert(JSON.stringify(e.message));
    }
    form.action = 
    "/profile/" + login.value;
    form.submit();
    return false;
}*/