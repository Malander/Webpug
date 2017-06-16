// Importing all the pug files in app/pug/views.
function requireAll (r) { r.keys().forEach(r); }
requireAll(require.context('../pug/views/', true, /\.pug$/));

// Importing custom scripts.
import "./scripts";

// Importing main.scss
import '../scss/main.scss';