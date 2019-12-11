import React from 'react';
import Confirm from 'react-confirm-bootstrap';

export default class ConfirmDialog extends React.Component{
    onConfirm() {
        // Preform your action.
        alert("hello");
    }

    render() {
        return (
            <Confirm
                onConfirm={this.onConfirm}
                body="Are you sure you want to delete this?"
                confirmText="Confirm Delete"
                title="Deleting Stuff">
                <button>Delete Stuff</button>
            </Confirm>
        );
    }
}