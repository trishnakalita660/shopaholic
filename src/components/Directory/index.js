import React from 'react'
import ShopMan from '../../assets/man2.jpg'
import ShopWoman from '../../assets/woman2.jpg'
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
            <a>
              For Women
            </a>
          </div>
          <div
            className="item"
            style={{
              backgroundImage: `url(${ShopMan})`
            }}
          >
            <a >
              For Men
            </a>
          </div>
        </div>
      </div>
    );
  };
  

export default Directory
