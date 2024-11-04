import React from 'react';
import Main from '../Components/Main';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tickets: [],
            users: []
        };
    }

    componentDidMount() {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then(response => response.json())
            .then(data => {
                this.setState({ tickets: data.tickets, users: data.users });
                // console.log(this.state.users);
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    render() {
        const { tickets, users } = this.state;
        return (
            <div className="App">
                <Main tickets={tickets} users={users} />
            </div>
        );
    }
}

export default App;