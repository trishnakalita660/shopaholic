import React from 'react'
import ShopMan from '../../assets/man2.jpg'
import ShopWoman from '../../assets/woman2.jpg'
import { Link } from 'react-router-dom'
import './styles.scss'
const Directory = props => {
    return (
      <div className="directory">
        <div className="wrap">
          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopWoman})`
            }}
          >
          <Link to ='/search/womens'>
          <a>
             Women
            </a>
          </Link>
            
          </div>
          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopMan})`
            }}
          >
          <Link to ='/search/mens'>
          <a>
             Men
            </a>
          </Link>
          </div>
        </div>
      </div>
    );
  };
  

export default Directory
