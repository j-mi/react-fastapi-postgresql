import React from 'react';
import { Tooltip, IconButton, TableCell } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

export const RemoveUrl = (props) =>  {

    const handleDelete = () => {
        props.onClickDelete(props.shortUrl);
    }

    return (
        <Tooltip title="delete">
            <TableCell>
                <IconButton 
                    style= {{cursor: 'pointer'}}
                    onClick ={handleDelete}
                    >
                    <DeleteForever
                />
            </IconButton>
            </TableCell>
        </Tooltip>
    );
};