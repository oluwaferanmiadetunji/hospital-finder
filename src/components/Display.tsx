/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

// eslint-disable-next-line react/prop-types
const Display: React.FC = () => {
  // const results = items;
  // if (!loading) console.log(results);

  return (
    <ul>
      <li>
        <p>
          <LocalHospitalIcon />
          Hospital 1
        </p>
      </li>
    </ul>
  );
};
export default Display;
