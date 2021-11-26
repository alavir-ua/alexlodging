import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loader = () => {
  return (
    <div className="sweet-loading text-center" style={{ marginTop: '3rem' }}>
      <HashLoader color={'#00004d'} loading={true} css="" size={80} />
    </div>
  )
}

export default Loader
