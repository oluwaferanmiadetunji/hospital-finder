import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  onChange: () => void;
}

export const SearchBar: React.FC<Props> = () => {
  return (
    <div>
      <TextField />
    </div>
  );
};
