import React, { Component } from 'react';
import { popModalToogle, hidePopModal } from '../Modal';
import { BorderColorIcon, DeleteIcon } from '../Icons';
import { addBook, addAuthor, addGenre, updateBook, updateAuthor, updateGenre, deleteBook, deleteAuthor, deleteGenre } from '../../../Utils/Api/index';

class Table extends Component {
    showModal = (type, data) => {
        window.scrollTo(0, 0);
        let el = '';
        if (type === 'book') {
            el = <form id="modal__book" onSubmit={data ? (e) => this.handleUpdate(e, type, data.id) : (e) => this.handleAdd(e, type)}>
                <label>Title</label>
                <input type="text" name="title" required defaultValue={data ? data.title : ''} />
                <label>Description</label>
                <textarea rows="4" name="description" required defaultValue={data ? data.description : ''}></textarea>
                <label>Author</label>
                <select id="select__author">
                    {this.props.author ?
                        this.props.author.map(data => {
                            return <option value={data.id} key={data.id}>{data.name}</option>
                        })
                        :
                        <></>
                    }
                </select>
                <label>Genre</label>
                <select id="select__genre">
                    {this.props.genre ?
                        this.props.genre.map(data => {
                            return <option value={data.id} key={data.id}>{data.name}</option>
                        })
                        :
                        <></>
                    }
                </select>
                <label>Release Date</label>
                <input type="text" name="release_date" required defaultValue={data ? data.release_date : ''} />
                <label>Rating</label>
                <input type="number" pattern="[0-9]+([\,|\.][0-9]+)?" step="0.01" name="rating" required defaultValue={data ? data.rating : ''} />
                <label>Image</label>
                <input type="file" name="image" required/>
                <button className="bt fw__medium ft__cp">Add Book</button>
            </form>
        } else if (type === 'author') {
            el = <form id="modal__author" onSubmit={data ? (e) => this.handleUpdate(e, type, data.id) : (e) => this.handleAdd(e, type)}>
                <label>Title</label>
                <input type="text" required defaultValue={data ? data.name : ''} />
                <button className="bt fw__medium ft__cp">Add Author</button>
            </form>
        } else if (type === 'genre') {
            el = <form id="modal__genre" onSubmit={data ? (e) => this.handleUpdate(e, type, data.id) : (e) => this.handleAdd(e, type)}>
                <label>Title</label>
                <input type="text" required defaultValue={data ? data.name : ''} />
                <button className="bt fw__medium ft__cp">Add Genre</button>
            </form>
        } else if (type === 'delete') {
            el = <>
                <h5>Are you sure to delete it?</h5>
                <div>
                    <button className="bt fw__medium ft__cp" onClick={() => this.handleDelete(data.type, data.id)}>Delete</button>
                    <button className="bt fw__medium ft__cp default" onClick={() => hidePopModal()}>Cancel</button>
                </div>
            </>
        }
        popModalToogle(el);
    }

    handleDelete = (type, id) => {
        if (type === 'book') {
            deleteBook(id).then(
                window.location.reload()
            )
        } else if (type === 'author') {
            deleteAuthor(id).then(
                window.location.reload()
            )
        }
        else if (type === 'genre') {
            deleteGenre(id).then(
                window.location.reload()
            )
        }
    }

    handleAdd = (e, type) => {
        e.preventDefault();
        if (type === 'book') {
            let data = {};
            document.querySelectorAll('#modal__book input').forEach(el => {
                let name = el.getAttribute('name');
                let value = el.value;
                data[name] = value;
            });
            const select__author = document.querySelector('#select__author');
            const select__genre = document.querySelector('#select__genre');

            data.description = document.querySelector('#modal__book textarea').value;
            data.id_author = select__author.options[select__author.selectedIndex].value;
            data.id_genre = select__genre.options[select__genre.selectedIndex].value;
            data.image = document.querySelector('#modal__book input[type=file]').files[0];
            console.log(data)
            addBook(data).then(window.location.reload());
        } else if (type === 'author') {
            const name = e.target.querySelector('input').value;
            addAuthor(name).then(window.location.reload());
        }
        else if (type === 'genre') {
            const name = e.target.querySelector('input').value;
            addGenre(name).then(window.location.reload());
        }
    }

    handleUpdate = (e, type, id) => {
        e.preventDefault();
        if (type === 'book') {
            let data = {};
            document.querySelectorAll('#modal__book input').forEach(el => {
                let name = el.getAttribute('name');
                let value = el.value;
                data[name] = value;
            });
            const select__author = document.querySelector('#select__author');
            const select__genre = document.querySelector('#select__genre');

            data.description = document.querySelector('#modal__book textarea').value;
            data.id_author = select__author.options[select__author.selectedIndex].value;
            data.id_genre = select__genre.options[select__genre.selectedIndex].value;
            data.image = document.querySelector('#modal__book input[type=file]').files[0];
            updateBook(data, id).then(window.location.reload());
        } else if (type === 'author') {
            const name = e.target.querySelector('input').value;
            updateAuthor(name, id).then(window.location.reload());
        }
        else if (type === 'genre') {
            const name = e.target.querySelector('input').value;
            updateGenre(name, id).then(window.location.reload());
        }
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
                                            <div onClick={() => this.showModal("delete", { type: type, id: data.id })}><DeleteIcon /></div>
                                            {type === "book" ?
                                                data.status === 1 ?
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