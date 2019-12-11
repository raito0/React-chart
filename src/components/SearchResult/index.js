import React from 'react';
import './style.scss';

class SearchResult extends React.Component {
    constructor(props){
        super(props);
        this.state={
            initialItems: [
                "Apples",
                "Broccoli",
                "Chicken",
                "Duck",
                "Eggs",
                "Fish",
                "Granola",
                "Hash Browns"
            ],
            item: [],
        };
    }
    filterList = (event) => {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(item => {
          return item.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        if(event.target.value === '') {
            this.setState({items: []});
        } else  {
            this.setState({items: updatedList});
        }
    }
    getInitialState = () => {
        return {
          initialItems: [
            "Apples",
            "Broccoli",
            "Chicken",
            "Duck",
            "Eggs",
            "Fish",
            "Granola",
            "Hash Browns"
          ],
          items: []
        }
    }
    render() {
        return(
            <div className='SearchResult'>
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList.bind(this)}/>
                        <button type="submit">
                            <span><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span> 
                        </button>

                    </fieldset>
                    
                </form>
                <ul className='list-group'>
                {
                    this.state.items && this.state.items.map(item => <li className="list-group-item" data-category={item} key={item}>{item}</li>)
                }
                </ul>
            </div>
        );
    }
}

export default SearchResult;