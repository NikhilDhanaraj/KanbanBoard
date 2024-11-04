import React from 'react';
import '../Containers/App.css';
import TicketCard from './TicketCard';
import Navbar from './Navbar';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grouping: 'priority',
            sorting: 'priority'
        };
    }

    groupChange = (event) => {
        this.setState({ grouping: event.target.value });
    };

    sortChange = (event) => {
        this.setState({ sorting: event.target.value });
    };

    reversePriority(tempTickets) {
        const reversedKeys = Object.keys(tempTickets).reverse();
        const reversedTickets = {};

        reversedKeys.forEach(key => {
            reversedTickets[key] = tempTickets[Math.abs(key-4)];
        });

        return reversedTickets;
    }

    groupTickets() {
        const { tickets } = this.props;
        const { grouping, sorting } = this.state;
        let groupedTickets = {};

        switch (grouping) {
            case 'status':
                groupedTickets = this.groupBy(tickets, 'status');
                break;
            case 'user':
                groupedTickets = this.groupBy(tickets, 'userId');
                break;
            case 'priority':
            default:
                groupedTickets = this.groupBy(tickets, 'priority');
                groupedTickets = this.reversePriority(groupedTickets);
                break;
        }

        Object.keys(groupedTickets).forEach(group => {
            groupedTickets[group] = this.sortTickets(groupedTickets[group]);
        });

        const sortedGroupedKeys = Object.keys(groupedTickets).sort((a, b) => {
            if (sorting === 'priority') {
                return b - a;
            } else {
                const firstTitle = groupedTickets[a][0]?.title || '';
                const secondTitle = groupedTickets[b][0]?.title || '';
                return firstTitle.localeCompare(secondTitle);
            }
        });

        const sortedGroupedTickets = {};
        sortedGroupedKeys.forEach(key => {
            sortedGroupedTickets[key] = groupedTickets[key];
        });

        return sortedGroupedTickets;
    }


    groupBy(tickets, key) {
        return tickets.reduce((acc, ticket) => {
            const groupKey = ticket[key] ?? 'No data';
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(ticket);
            return acc;
        }, {});
    }

    sortTickets(tickets) {
        const { grouping } = this.state;

        return tickets.sort((a, b) => {
            if (grouping === 'priority') {
                return b.priority - a.priority;
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    }

    renderGroupLabel(key) {
        const { grouping } = this.state;
        const { users } = this.props;

        if (grouping === 'priority') {
            const priorityLabels = { 0: 'Urgent', 1: 'High', 2: 'Medium', 3: 'Low', 4: 'No priority' };
            return priorityLabels[key] || 'Unknown Priority';
        }else if (grouping === 'status') {
            return key;
        } else if (grouping === 'user') {
            const user = users.find(user => user.id === key);
            return user ? user.name : `User ID: ${key}`;
            // return `User ID: ${key}`;
        }
    }

    render() {
        const groupedTickets = this.groupTickets();
        
        return (
            <div className='Main'>
                {/* <div className="Nav">
                    <label>
                        Group by:
                        <select value={this.state.grouping} onChange={this.groupChange}>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                    <label>
                        Sort by:
                        <select value={this.state.sorting} onChange={this.sortChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                </div> */}
                <div className='NavBg'>
                    <Navbar
                        grouping={this.state.grouping}
                        sorting={this.state.sorting}
                        onGroupChange={this.groupChange}
                        onSortChange={this.sortChange}
                    />
                </div>
                <div className="kanban-board">
                    {Object.keys(groupedTickets).map(groupKey => (
                        <div key={groupKey} className="kanban-column">
                            <h2>{this.renderGroupLabel(groupKey)} ({groupedTickets[groupKey].length})</h2>
                            {groupedTickets[groupKey].map(ticket => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Main;