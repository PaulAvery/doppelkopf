//Require our router so we can use it later
var page = require('./view/page');

//Attach our views.
//We only need to attach views with parameterized routes, the other ones are caught and created at runtime
page.attach('/dates/:id');
page.attach('/users/:id');

//Run our router
page.init();
