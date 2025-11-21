import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CemeteryApp from './CemeteryApp';
import '../css/app.css';

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(<CemeteryApp />);
}