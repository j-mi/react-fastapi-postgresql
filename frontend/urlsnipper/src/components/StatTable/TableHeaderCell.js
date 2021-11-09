import { TableCell } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';

const TableHeaderCell = (props) =>  {

    return (
        <TableCell>
            <Typography variant="subtitle1" style={{ fontWeight: 600 }} > 
                {props.headerProps}
            </Typography>
        </TableCell>
    )

}; 

export default TableHeaderCell;
