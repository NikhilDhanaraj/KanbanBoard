import React from 'react';
import '../Containers/App.css';

class TicketCard extends React.Component {
    renderCheckbox(status) {
        switch (status) {
            case 'Done':
                return <span className="checkbox tick">&#10003;</span>;
            case 'In progress':
                return <span className="checkbox filled">&#11044;</span>;
            case 'Todo':
                return <span className="checkbox empty">&#11042;</span>;
            case 'Backlog':
                return <span className="checkbox cross">✖</span>;
            default:
                return <span className="checkbox empty">&#11042;</span>;
        }
    }

    render() {
        const { ticket } = this.props;
        return (
            <div className='ticketCard'>
                <h2>{ticket.id}</h2>
                <div className="ticket-content">
                    <div className="checkbox-container">
                        {this.renderCheckbox(ticket.status)}
                    </div>
                    <h3 className="ticket-title">{ticket.title}</h3>
                </div>
                <p>{ticket.tag.join(', ')}</p>
            </div>
        );
    }
}

export default TicketCard;