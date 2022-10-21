import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

type ColorToggleButtonPropsTYpe = {
    value: string
}

export const ColorToggleButton = (props: ColorToggleButtonPropsTYpe) => {
    const [alignment, setAlignment] = React.useState('');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="">{props.value}</ToggleButton>
        </ToggleButtonGroup>
    );
}