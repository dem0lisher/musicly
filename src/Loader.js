import React from 'react';

const Loader = ({props}) => {
	return(
		<div id="loader" className="flex-row flex-center hidden">
      <img src="loading.gif" alt="Loader" height="50px" width="50px" />
    </div>
	);
}

export default Loader;