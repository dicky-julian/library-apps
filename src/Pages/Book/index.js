import React, { Component } from 'react';
import ProductList from '../../Components/Elements/ProductList';
import './book.scss';
import dummy from '../../dummy.json';

class Book extends Component {
    render() {
        const datas = [];

        for (let i=0; i<4; i++) {
            datas.push(dummy.book[i]);
        }
        return (
            <div className="book">
                <div className="book__header">
                    <div className="bg__setup" style={{ backgroundImage: "url('http://www.jaehakim.com/wp-content/uploads/2555/04/DescendantsoftheSun-top.jpg')" }}></div>
                </div>
                <div className="book__detail">
                    <div>
                        <div className="book__img bg__setup" style={{ backgroundImage: "url('http://www.jaehakim.com/wp-content/uploads/2555/04/DescendantsoftheSun-top.jpg')" }}></div>
                        <div className="detail__list">
                            <div>
                                <h6 className="fw__bold">Author</h6>
                                <h6>Masashi Kishimoto</h6>
                            </div>
                            <div>
                                <h6 className="fw__bold">Genre</h6>
                                <h6>Korean Drama</h6>
                            </div>
                            <div>
                                <h6 className="fw__bold">Release</h6>
                                <h6>2014</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="detail__info">
                                <div>
                                    <h3>9.8</h3>
                                    <h6>Ratings</h6>
                                </div>
                                <div>
                                    <h3>120</h3>
                                    <h6>Borrowed</h6>
                                </div>
                            </div>
                            <button className="bt fw__medium">borrow</button>
                        </div>
                        <div>
                            <h3>Descendant of The Sun</h3>
                            <h6>
                                Naruto adalah sebuah serial manga karya Masashi Kishimoto yang diadaptasi menjadi serial
                                anime. Manga Naruto bercerita seputar kehidupan tokoh utamanya, Naruto Uzumaki, seorang
                                ninja yang hiperaktif, periang, dan ambisius yang ingin mewujudkan keinginannya untuk
                                mendapatkan gelar Hokage, pemimpin dan ninja terkuat di desanya. Serial ini didasarkan
                                pada komik one-shot oleh Kishimoto yang diterbitkan dalam edisi Akamaru Jump pada
                                Agustus 1997.
                            </h6>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="product__highlight">
                    <h5>Popular Books</h5>
                    <ProductList data={datas} />
                </div>
            </div>
        )
    }
}

export default Book;