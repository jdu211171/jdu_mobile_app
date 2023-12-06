import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const MyComponent = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '日本語', value: 'jp'},
        {label: "O'zbekcha", value: 'uz'},
        {label: 'English', value: 'uk'}
    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
};

export default MyComponent;
