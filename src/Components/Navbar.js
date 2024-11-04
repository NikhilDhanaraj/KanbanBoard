import '../Containers/App.css'
import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
        };
    }

    toggleOptions = () => {
        this.setState(prevState => ({ showOptions: !prevState.showOptions }));
    };

    render() {
        const { grouping, sorting, onGroupChange, onSortChange } = this.props;
        const { showOptions } = this.state;

        return (
            <div className="Navbar">
                <button onClick={this.toggleOptions}>
                    {showOptions ? '...' : 'Show Options'}
                </button>
                {showOptions && (
                    <div>
                        <label>
                            GROUP BY: 
                            <select className="custom-select" value={grouping} onChange={onGroupChange}>
                                <option value="priority">Priority</option>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                            </select>
                        </label>
                        {/* <br /> */}
                        <label>
                            SORT BY: 
                            <select className="custom-select" value={sorting} onChange={onSortChange}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </label>
                    </div>
                )}
            </div>
        );
    }
}

export default Navbar;
