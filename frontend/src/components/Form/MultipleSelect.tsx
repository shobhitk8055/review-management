import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { User } from '@/types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  data,
  selectedEmp,
  setSelectedEmp,
}: {
  data: User[];
  selectedEmp: string[];
  setSelectedEmp: (i: string[]) => void;
}) {
  const handleChange = (event: SelectChangeEvent<typeof selectedEmp>) => {
    const {
      target: { value },
    } = event;
    setSelectedEmp(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedEmp}
          onChange={handleChange}
          input={<OutlinedInput label="Employees" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data.map((user) => (
            <MenuItem key={user.id} value={user.employeeId}>
              <Checkbox checked={selectedEmp.indexOf(user.employeeId) > -1} />
              <ListItemText primary={`${user.name} (${user.employeeId})`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
