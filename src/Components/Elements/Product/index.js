import React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../Utils/service';

const ProductList = props => {
    const data = props.data;
    const click = props.click;
    return (
        <div className="product">
            <img src={`${baseUrl}/images/${data.image}`} alt="" />
            {click ?
                <div onClick={click} className='fw__medium c__pointer'>
                    {data.title}
                </div>
                :
                <Link to={data.id_book ? `/book/${data.id_book}` : `/book/${data.id}`} className='fw__medium'>
                    {data.title}
                </Link>
            }

            {data.description ?
                <p>{data.description.substring(0, 90)} ...</p>
                :
                <></>
            }
        </div>
    )
}

export default ProductList;