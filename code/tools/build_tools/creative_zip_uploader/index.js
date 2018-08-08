const app = require('./app/app');

const routes = require('./routes/routes')(app);

const generator = require('./components/generator_html5/generator')(app);
const uploader = require('./components/uploader/uploader')(app);


