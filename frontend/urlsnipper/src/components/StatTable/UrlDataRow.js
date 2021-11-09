import { TableRow, TableCell } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { RemoveUrl } from './RemoveUrl';

export const UrlDataRow = (props) =>  {

    return (
        <>
        <TableRow>
            <TableCell >
                <Typography >
                    <a href={"//" + props.hostAddress + ":8000/" + props.shortUrl}>
                    {props.hostAddress + '/' + props.shortUrl}
                    </a>
                </Typography>
            </TableCell>
            <TableCell>{props.longUrl}</TableCell>
            <TableCell>{props.saved}</TableCell>
            <TableCell>{props.urlClicked}</TableCell>
            <RemoveUrl 
                shortUrl={props.shortUrl}
                onClickDelete={props.onClickDelete}/>
        </TableRow>
            {props.clickDates.length === 0 ? null : props.clickDates.map(function (date, ind){
                return(
                    <TableRow key={ind}>
                        <TableCell >{date}</TableCell>
                    </TableRow>
                )
            })}
        </>
    );
};