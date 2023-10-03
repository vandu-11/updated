import React from 'react';
import Header from '../../components/Header';
import styles from './October.module.css';
import OctoberCalendar from '../../components/OctoberCalendar';


function October() {
    return (
        <div>
            <Header />
            
            <OctoberCalendar />
            
        </div>
    );
}

export default October;