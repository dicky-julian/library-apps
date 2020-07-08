import React from 'react';
import { addBook, addAuthor, addGenre, updateBook, updateAuthor, updateGenre, deleteBook, deleteAuthor, deleteGenre, returnBook } from '../../../Utils/Api/index';
import { popModalToogle, hidePopModal } from '../Modal';

const showModal = (type, datas) => {
    window.scrollTo(0, 0);
    const data = datas.data;
    let el = '';

    if (type === 'book') {
        el = <form id="modal__book" onSubmit={data ? (e) => handleUpdate(e, type, data.id) : (e) => handleAdd(e, type)}>
            <div className="error_form"></div>
            <label>Title</label>
            <input type="text" name="title" required defaultValue={data ? data.title : ''} />
            <label>Description</label>
            <textarea rows="4" name="description" required defaultValue={data ? data.description : ''}></textarea>
            <label>Author</label>
            <select id="select__author">
                {datas.author ?
                    datas.author.map(data => {
                        return <option value={data.id} key={data.id}>{data.name}</option>
                    }):<></>
                }
            </select>
            <label>Genre</label>
            <select id="select__genre">
                {datas.genre ?
                    datas.genre.map(data => {
                        return <option value={data.id} key={data.id}>{data.name}</option>
                    }):<></>
                }
            </select>
            <label>Release Date</label>
            <input type="text" name="release_date" required defaultValue={data ? data.release_date : ''} />
            <label>Rating</label>
            <input type="number" pattern="[0-9]+([\,|\.][0-9]+)?" step="0.01" name="rating" required defaultValue={data ? data.rating : ''} />
            <label>Image</label>
            <input type="file" name="image" required />
            <button className="bt fw__medium ft__cp">Add Book</button>
        </form>
    } else if (type === 'author') {
        el = <form id="modal__author" onSubmit={data ? (e) => handleUpdate(e, type, data.id) : (e) => handleAdd(e, type)}>
            <label>Title</label>
            <input type="text" required defaultValue={data ? data.name : ''} />
            <button className="bt fw__medium ft__cp">Add Author</button>
        </form>
    } else if (type === 'genre') {
        el = <form id="modal__genre" onSubmit={data ? (e) => handleUpdate(e, type, data.id) : (e) => handleAdd(e, type)}>
            <label>Title</label>
            <input type="text" required defaultValue={data ? data.name : ''} />
            <button className="bt fw__medium ft__cp">Add Genre</button>
        </form>
    } else if (type === 'delete') {
        el = <>
            <h5>Are you sure to delete it?</h5>
            <div>
                <button className="bt fw__medium ft__cp" onClick={() => handleDelete(data.type, data.id)}>Delete</button>
                <button className="bt fw__medium ft__cp default" onClick={() => hidePopModal()}>Cancel</button>
            </div>
        </>
    } else if (type === 'setStatus') {
        el = <>
            <h5>Are you sure to return this book?</h5>
            <div>
                <button className="bt fw__medium ft__cp" onClick={() => handleReturnBook(datas)}>Return</button>
                <button className="bt fw__medium ft__cp default" onClick={() => hidePopModal()}>Cancel</button>
            </div>
        </>
    }
    popModalToogle(el);
}

const handleAdd = (e, type) => {
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
        const extension = data.image.type.split('/')[1];
        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
            handleError('#modal__book', 'Image must be jpg, jpeg or png');
            return '';
        }

        if (data.image.size > 1000000) {
            handleError('#modal__book', 'Image size must be lower than 1 Mb');
            return '';
        }
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

const handleUpdate = (e, type, id) => {
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
        const extension = data.image.type.split('/')[1];
        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
            handleError('#modal__book', 'Image must be jpg, jpeg or png');
            return '';
        }

        if (data.image.size > 1000000) {
            handleError('#modal__book', 'Image size must be lower than 1 Mb');
            return '';
        }

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

const handleDelete = (type, id) => {
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

const handleReturnBook = (id) => {
    returnBook(id).then(window.location.reload())
}

const handleError = (el, msg) => {
    const element = document.querySelector(`${el} .error_form`);

    if (element) {
        element.innerHTML = `
        <div class="bt error" style="margin-bottom: 20px">${msg}</div>
        `
    };

    window.scrollTo(0, 0);
}

export {
    showModal
}