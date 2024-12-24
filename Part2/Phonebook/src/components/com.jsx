const Stuff = ({ person,handleDelete }) => {
    return (
        <div>
            <li>{person.name} {person.number}</li>
            <button onClick={handleDelete}>delete</button>


        </div>

    )
}

const Persons = ({persons,handleDelete}) => {
    return (
        <ul>
            {persons.map(person => <Stuff key={person.name}
                                          person={person}
                                          handleDelete={() => handleDelete(person.id)}/>)}
        </ul>
    )
}


const Filter = ({value, onChange}) => {
    return (
        <form>
            filter shown with<input value={value} onChange={onChange}/>
        </form>
    )
}

const PersonForm = ({onSubmit,value1,value2,onChange1,onChange2}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={value1} onChange={onChange1}/>
            </div>

            <div>
                number: <input value={value2} onChange={onChange2}/>
            </div>

            <div>
                <button type="submit">add</button>
            </div>

        </form>
    )
}


const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default {Stuff, PersonForm, Persons, Filter, Notification}