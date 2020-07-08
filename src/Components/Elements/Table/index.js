import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BorderColorIcon, DeleteIcon } from '../Icons';
import { showModal } from './action';

class Table extends Component {
    render() {
        const datas = this.props.data;
        const author = this.props.author;
        const genre = this.props.genre;
        const type = this.props.type;
        return (
            <div className="database__content" id="database__content">
                <div>
                    <h4 className="ft__cp leelawade">{type}'s Datas</h4>
                    <button className="bt fw__medium ft__cp" onClick={() => showModal(type, {author: author, genre: genre})}>Add {type}</button>
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
                                                <Link to={`/book/${data.id}`}><h5 className="fw__medium">{data.title}</h5></Link>
                                                <h6 className="fw__thin">{data.rating} Rating</h6>
                                            </td>
                                        </>
                                        :
                                        <><td><h5 className="fw__medium">{data.name}</h5></td></>
                                    }
                                    <td>
                                        <h5 className="fw__medium ft__cp">{data.release_date}</h5>
                                    </td>
                                    <td className="tools">
                                        <div>
                                            <div onClick={() => showModal(type, {data: data, author: author, genre: genre})}><BorderColorIcon /></div>
                                            <div onClick={() => showModal("delete", { type: type, id: data.id })}><DeleteIcon /></div>
                                            {type === "book" ?
                                                data.status === 1 ?
                                                    <div className="able">Available</div>
                                                    :
                                                    <div className="disable" onClick={() => showModal("setStatus", data.id)}>Unavailable</div>
                                                : <></>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;