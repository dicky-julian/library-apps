import React, { Component } from 'react';
import { popModalToogle } from '../Modal';
import { BorderColorIcon, DeleteIcon } from '../Icons';

class Table extends Component {
    showModal = (type, data) => {
        let el = '';
        if (type === 'book') {
            el = <form id="modal_add_book" onSubmit={data ? this.addBook : this.updateBook}>
                <label>Title</label>
                <input type="text" required defaultValue={data ? data.title : ''}/>
                <label>Description</label>
                <textarea rows="4" required defaultValue={data ? data.description : ''}></textarea>
                <label>Release Date</label>
                <input type="text" required defaultValue={data ? data.release_date : ''}/>
                <label>Rating</label>
                <input type="number" required defaultValue={data ? data.rating : ''}/>
                <button className="bt fw__medium ft__cp">Add Book</button>
            </form>
        } else if (type === 'author') {
            el = <form id="modal_add_book">
                <label>Title</label>
                <input type="text" required defaultValue={data ? data.name : ''}/>
                <button className="bt fw__medium ft__cp">Add Author</button>
            </form>
        } else if (type === 'genre') {
            el = <form id="modal_add_book">
                <label>Title</label>
                <input type="text" required defaultValue={data ? data.name : ''}/>
                <button className="bt fw__medium ft__cp">Add Genre</button>
            </form>
        } else if (type === 'delete') {
            if (data === "book") {

            } else if (data === "author") {

            } else if (data === "genre") {

            }
            el = <>
            <h5>Are you sure to delete it?</h5>
            <div>
                <button className="bt fw__medium ft__cp">Delete</button>
                <button className="bt fw__medium ft__cp default">Cancel</button>
            </div>
            </>
        }
        popModalToogle(el);
    }

    addBook = () => {

    }

    updateBook = () => {

    }

    render() {
        const datas = this.props.data;
        const type = this.props.type;
        return (
            <div className="database__content" id="database__content">
                <div>
                    <h4 className="ft__cp leelawade">{type}'s Datas</h4>
                    <button className="bt fw__medium ft__cp" onClick={() => this.showModal(type)}>Add {type}</button>
                </div>
                <table>
                    <tbody>
                        {datas.map((data, index) => {
                            return (
                                <tr key={index}>
                                    {type === "book" ?
                                        <>
                                            <td>
                                                <img src={`http://localhost:3000/images/${data.image}`} alt={data.image} />
                                            </td>
                                            <td>
                                                <h5 className="fw__medium">{data.title}</h5>
                                                <h6 className="fw__thin">{data.rating} Rating</h6>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>
                                                <h5 className="fw__medium">{data.name}</h5>
                                            </td>
                                        </>
                                    }
                                    <td>
                                        <h5 className="fw__medium ft__cp">{data.release_date}</h5>
                                    </td>
                                    <td className="tools">
                                        <div>
                                            <div onClick={() => this.showModal(type, data)}><BorderColorIcon /></div>
                                            <div onClick={() => this.showModal("delete", type)}><DeleteIcon /></div>
                                            {type === "book" ?
                                                data.status === 2 ?
                                                    <div className="able">Available</div>
                                                    :
                                                    <div className="disable">Unavailable</div>
                                                :
                                                <></>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;