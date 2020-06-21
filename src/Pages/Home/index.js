import React, { Component } from 'react';
import './home.scss';

class Home extends Component {
    render() {
        return (
            <>
                <div className="home__header bg__setup">
                    <h1 className="fw__thin">Find <b className="fw__medium">perfect</b> book for <b className="fw__medium">evening</b></h1>
                    <form>
                        <input type="text" placeholder="What book are you looking for ?" required />
                    </form>
                </div>
                <div className="product__toplist">
                    <div className="product__desc">
                        <h4>Top of the last week</h4>
                        <p>The most desired movies of the last week</p>
                    </div>
                    <div className="product">
                        <img src="https://www.dramamilk.com/wp-content/uploads/2019/11/Hotel-del-luna-poster-best-drama-1.jpg"  />
                        <div>
                            <h5>Hotel del Luna</h5>
                            Hotel del Luna adalah serial televisi Korea Selatan yang dibintangi ...
                            <a className="fw__medium">Read more</a>
                        </div>
                    </div>
                    <div className="product">
                        <img src="http://www.jaehakim.com/wp-content/uploads/2555/04/DescendantsoftheSun-top.jpg"  />
                        <div>
                            <h5>Descendants of the Sun</h5>
                            Drama ini disiarkan di KBS2 mulai 24 Februari hingga 14 April 2016 ...
                            <a className="fw__medium">Read more</a>
                        </div>
                    </div>
                    <div className="product">
                        <img src="https://i.ytimg.com/vi/bF73VM91NPU/maxresdefault.jpg"  />
                        <div>
                            <h5>Pangako sa'yo</h5>
                            Pangako sa 'yo is a TV series starring Kristine Hermosa, Jericho ...
                            <a className="fw__medium">Read more</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;