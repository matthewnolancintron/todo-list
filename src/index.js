//npx webpack or npx webpack --watch


import './styles.css'
import {CreateTodo} from './createTodo.js';
console.log('testing');

/**
 * todos are objects that are created
 * dynamically
 * 
 * use function factory 
 * or constructors/classes to genreate them
 * 
 * create module for todos and import to main
 */
CreateTodo();