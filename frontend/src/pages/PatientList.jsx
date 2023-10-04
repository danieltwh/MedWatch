// Settings.js
import React from 'react';
import styles from './patientlist.module.css';
import arrow_left from 'static/images/arrow_left.svg';
import arrow_right from 'static/images/arrow_right.svg';
import arrow_down from 'static/images/arrow_down.svg';
import logo_black from 'static/images/logo_black.png';
import search from 'static/images/search.svg';

import { useState, useEffect  } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


let isInitial = true;

function PatientList() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    let [page, setPage] = useState(0);
    let [patientList, setPatientList] = useState([]);
    let [curPatient, setCurPatient] = useState(null);
    
    const startIdx = page * 12;
    const endIdx = Math.min((page+1)*12, patientList.length);
    const curPatientList = patientList.slice(startIdx, endIdx);

    //patient info related API, use dummy variables for now
    // const patients = async () => {
    //     let patientList = fetchPatientList().catch(error => {
    //         console.log('Get patient list error', error);
    //     });
        
    //     dispatch(patientListActions.set(patienList));
    // }
    const fetchPatientData = () => {
        let patientData = [{
            avatar: 'https://i.imgur.com/oflMA1gb.jpg',
            name: 'fake1',
            age: 90,
            height: 1.88,
            weight: 80,
            blood_type: 'A',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }, {
            avatar: 'https://i.imgur.com/e2jhDsIb.jpg',
            name: 'fake2',
            age: 50,
            height: 1.78,
            weight: 80,
            blood_type: 'A',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }, {
            avatar: 'https://i.imgur.com/KwrDil8b.jpg',
            name: 'fake3',
            age: 63,
            height: 1.43,
            weight: 93,
            blood_type: 'A',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }, {
            avatar: 'https://i.imgur.com/Wdhjfmnb.jpg',
            name: 'fake4',
            age: 78,
            height: 1.94,
            weight: 90,
            blood_type: 'O',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }, {
            avatar: 'https://i.imgur.com/GuAB8OEb.jpg',
            name: 'fake5',
            age: 82,
            height: 1.67,
            weight: 60,
            blood_type: 'AB',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }, {
            avatar: 'https://i.imgur.com/crWLssFb.jpg',
            name: 'fake6',
            age: 73,
            height: 1.54,
            weight: 56,
            blood_type: 'O',
            medication: [ { name: 'Prinivil', count: '20mg', freq: 'once a day' }, { name: 'Metformin', count: '500mg', freq: 'twice a day' } ],
            medical_condition: ['High Blood Pressure','Type II Diabetes','Allergic to Ibuprofen'],
            nok_contact: { name: 'Chiu Tien Le', relationship: 'Son', phone_number: '+6591234567' }
        }];
        // 拿取假資料的過程
        let pl = [];
        for (let i = 0; i < 56; i++) {
            pl.push(JSON.parse(JSON.stringify(patientData[i%6])));
            pl[i].index = i;
            pl[i].name += '-'+pl[i].index;
        }
        setPatientList(pl)
        console.log('setPatientList', patientList);
    }
    useEffect(() => {
        if(isInitial) {
          // console.log(heartrate.status);
          isInitial = false;
          fetchPatientData();
        }
      }, [dispatch])
    

    function selectPatient(patient) {
        setCurPatient(patient);
        // console.log(curPatient)
    }

    const goto = () => {
        nav("/dashboard", {replace: true});
    }
    
    const curPatientCode = () => {
        if (!curPatient) return [];
        return (<div className={styles.pannelWrapper}>
            <div className={styles.topPanel}>
                <img className={styles.avatar} src={curPatient.avatar} alt="avatar"></img>
                <div className={styles.callContainer}>
                    <span>{curPatient.name}</span>
                    <span>{curPatient.age} years old</span>
                </div>
                <span className={styles.goto} onClick={() => goto('/dashboard')}>Go to Dashboard</span>
                <div className={styles.info}>
                    <div className={styles.infoCard}>
                        <img src="./logo.png" alt="icon"></img>
                        <span>Height</span>
                        <span className={styles.number}>{curPatient.height} m</span>
                    </div>
                    <div className={styles.infoCard}>
                        <img src="./logo.png" alt="icon"></img>
                        <span>Weight</span>
                        <span className={styles.number}>{curPatient.weight} kg</span>
                    </div>
                    <div className={styles.infoCard}>
                        <img src="./logo.png" alt="icon"></img>
                        <span>Blood Type</span>
                        <span className={styles.number}>{curPatient.blood_type}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottomPanel}>
                <div className={styles.objectPanel}>
                    <div className={styles.objectTitle}>
                        <img src="./logo.png" alt="icon"></img>
                        <span className={styles.objectName}>Medication</span>
                    </div>
                    <div className={styles.whiteBoard}>
                        {
                            curPatient.medication.map(medi =>
                                <li key={medi.name}>{medi.name}<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{medi.count} {medi.freq}</li>
                            )
                        }
                    </div>
                </div>
                <div className={styles.objectPanel}>
                    <div className={styles.objectTitle}>
                        <img src="./logo.png" alt="icon"></img>
                        <span className={styles.objectName}>Medical Condition</span>
                    </div>
                    <div className={styles.whiteBoard}>
                        {
                            curPatient.medical_condition.map(medi => <li key={medi}>{medi}</li>)
                        }
                    </div>
                </div>
                <div className={styles.objectPanel}>
                    <div className={styles.objectTitle}>
                        <img src="./logo.png" alt="icon"></img>
                        <span className={styles.objectName}>NOK Condition</span>
                    </div>
                    <div className={styles.whiteBoard}>
                        <li>Name: {curPatient.nok_contact.name}</li>
                        <li>Relationships: {curPatient.nok_contact.relationship}</li>
                        <li>Phone Number: {curPatient.nok_contact.phone_number}</li>
                    </div>
                </div>
            </div>
        </div>)
    }
    
    const pageTo = (id) => {
        console.log('pageTo', id);
        if (id < 0 || id * 12 >= patientList.length) return;
        setPage(id);
    }
    
    function pagesCode() {
        const pageCount = patientList.length / 12;
        let code = [];
        for (let i = 0; i < pageCount; i++) {
            if (i === page) code.push(styles.pageDotSelected);
            else code.push(styles.pageDot);
        }
        return code.map((c,idx) => (<div className={c} onClick={() => pageTo(idx)}></div>));
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.iconWrapper}>
                    <img src={search}  alt="icon"></img>
                </div>
                <div className={styles.iconWrapperBig}>
                    <img src={search}  alt="icon"></img>
                    <img src={search}  alt="icon"></img>
                    <img src={search}  alt="icon"></img>
                    <img src={search}  alt="icon"></img>
                </div>
                <div className={styles.iconWrapper}>
                    <img src={search}  alt="icon"></img>
                </div>
            </div>
            <div className={styles.mainPanel}>
                <div className={styles.topLine}>
                    <div className={styles.icon}>
                        <img src={logo_black} alt="icon" />
                        <span className={styles.title}>MedWatch</span>
                    </div>
                    <div className={styles.functions}>
                        <img className={styles.notification} src="./logo.png" alt="icon" />
                        <div className={styles.dateDropdown}>
                            <span>Today</span>
                            <img src={arrow_down} alt="arrow" />
                        </div>
                    </div>
                </div>
                <div className={styles.search}>
                    <img src={search} alt="icon" />
                    <input className={styles.noDecInput}></input>
                </div>
                <div className={styles.patienList}>
                    <span className={styles.cardsTitle}>Patient List</span>
                    <div className={styles.cardStacks}>
                        {
                            curPatientList.map(patient => !curPatient || curPatient.index !== patient.index ?
                                <div className={styles.card} onClick={() => selectPatient(patient)} key={patient.index}>
                                    <img className={styles.avatar} src={patient.avatar} alt="avatar"></img>
                                    <span className={styles.name}>{patient.name}</span>
                                </div> :
                                <div className={styles.cardSelected} onClick={() => selectPatient(patient)} key={patient.index}>
                                    <img className={styles.avatar} src={patient.avatar} alt="avatar"></img>
                                    <span className={styles.name}>{patient.name}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.pageLine}>
                        <img src={arrow_left} onClick={() => pageTo(page-1)} alt="arrow"></img>
                        {pagesCode()}
                        <img src={arrow_right} onClick={() => pageTo(page+1)} alt="arrow"></img>
                    </div>
                </div>
            </div>
            <div className={styles.detailPanel}>{curPatientCode()}</div>
        </div>
    );
}

export default PatientList;
