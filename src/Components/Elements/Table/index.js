import React, { Component } from 'react';
import { BorderColorIcon, DeleteIcon } from '../Icons';

class Table extends Component {
    render() {
        const datas = this.props.data;
        const type = this.props.type;
        return (
            <div className="database__content" id="database__content">
                <div>
                    <h4 className="ft__cp leelawade">{type}'s Datas</h4>
                    <button className="bt fw__medium">Add Book</button>
                </div>
                <table>
                    <tbody>
                        {
                            datas.book.slice(0, 5).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        {type === "book" ?
                                            <>
                                            <td>
                                                <img src={data.image} alt={data.image} />
                                            </td>
                                            <td>
                                                <h5 className="fw__medium">{data.title}</h5>
                                                <h6 className="fw__thin">Andrea Hirata</h6>
                                            </td>
                                            </>
                                            :
                                            <></>
                                        }
                                        <td>
                                            <h5 className="fw__medium">December, 2017</h5>
                                        </td>
                                        <td className="tools">
                                            <div>
                                                <div><BorderColorIcon /></div>
                                                <div><DeleteIcon /></div>
                                                {type === "book" ?
                                                    data.status === 1 ?  
                                                    <div className="able">Available</div>
                                                    :
                                                    <div className="disable">Unavailable</div>
                                                    :
                                                    <div></div>
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