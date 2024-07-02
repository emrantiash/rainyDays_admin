import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img from '../../assets/img/logo.svg';

export default function Logo(props) {
  return (
    <div>
      <Link className="navbar-brand" href="/">
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        > */}
           <Image src={img} alt="Logo"
            width={0} 
            // height={150}
          />


          {/* <div
            style={{
              // marginTop: 25
              marginTop : props.top 
            }}
          >
            <span style={{
              fontSize: 25,
              fontFamily: 'roboto',
              color: '#1d27d0',
            }}>
              𝕎𝕖𝔻𝕖𝕝𝕚𝕧𝕖𝕣
            </span>
          </div> */}

        {/* </div> */}

      </Link>
    </div>
  )
}
