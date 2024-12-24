import { useState,useEffect } from 'react'
import axios from 'axios'

import phonebookService from './services/persons.jsx'
import components from './components/com.jsx'

import './index.css'

const { PersonForm, Persons, Filter,Notification } = components;


const App = () => {
    const [persons, setPersons] = useState([]);


    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialData => {
                console.log(initialData); // 检查返回的数据
                setPersons(initialData);
            })
            .catch(error => console.error("Error fetching data:", error)); // 捕获错误
    }, []);


    const [newName, setNewName] = useState('');
    const [newNum, setNewNum] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [newMessage, setNewMessage] = useState('some message happened...')


    const addStuff = (event,id) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNum
        };

        let exist = persons.some(person => person.name === newName)

        let person =persons.find(person => person.name === newName)


        if (exist) {
            const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
            if(confirm){
                phonebookService
                    .update(person.id, newPerson)
                    .then(returnedData => {
                        setPersons(persons.map(person =>
                            person.id === id ? returnedData: person))
                        setNewMessage(`number is changed`)
                        setTimeout(() => {
                            setNewMessage(null)
                        }, 5000)
                    })

            }
        } else {
            phonebookService
                .create(newPerson)
                .then(returnedData => {
                    setPersons(persons.concat(returnedData));
                    setNewName('');
                    setNewNum('');
                    setNewMessage(`Added ${returnedData.name}`)
                    setTimeout(() => {
                        setNewMessage(null)
                    }, 5000)
                })

        }
    }






    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumChange = (event) => {
        setNewNum(event.target.value);
    };

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    };

    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    );

    const handleDelete = id =>{
        const person = persons.find(n => n.id === id);

        phonebookService
            .deleteData(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(
                error => {
                    console.log(`Information of ${person.name} has been removed from server`)
                    setNewMessage(`Information of ${person.name} has been removed from server`)
                }
            )




    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={newMessage}  />

            <Filter value={newFilter} onChange={handleFilterChange}/>

            <h2>add a new</h2>

            <PersonForm onSubmit={addStuff} onChange1={handleNameChange} onChange2={handleNumChange} value1={newName}
                        value2={newNum}/>

            <h2>Numbers</h2>


            <Persons persons={filteredPersons} handleDelete={handleDelete}/>


        </div>
    )
}




export default App;
