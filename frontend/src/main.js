import { mount } from 'svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import App from './App.svelte';

mount(App, {
    target: document.getElementById('app')
});