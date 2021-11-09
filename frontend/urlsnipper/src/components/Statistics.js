import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUrls } from '../store/actions/getDataActions';
import { removeUrl } from '../store/actions/setDataActions';
import { Table, TableBody, TableHead, TableRow } from '@material-ui/core/';
import { UrlDataRow } from './StatTable/UrlDataRow';
import TableHeaderCell from './StatTable/TableHeaderCell';

const Statistics = (props) =>  {

    const [listOfUrls, setListOfUrls] = useState([]);
    const [hostAddress, setHostAddress] = useState('');

    useEffect(() => {
       props.getAllUrls()
      }, []);
    
    useEffect(() => {
    setListOfUrls(props.urlData.data['stats']);
    setHostAddress(props.urlData.data['hostAddress']);
    }, [props.urlData]);

    const onClickDelete = (shortUrlToDelete) => {
        props.removeUrl(shortUrlToDelete);
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell headerProps={"snipped URL address"}></TableHeaderCell>
                    <TableHeaderCell headerProps={"original URL"}></TableHeaderCell>
                    <TableHeaderCell headerProps={"saved"}></TableHeaderCell>
                    <TableHeaderCell headerProps={"URL clicked"}></TableHeaderCell>
                    <TableHeaderCell headerProps={"action"}></TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {listOfUrls === undefined ? null : listOfUrls.map( function (url, ind) {
                    return (
                        <UrlDataRow
                        key={ind}
                        longUrl={url.longUrl}
                        shortUrl={url.shortUrl}
                        saved={url.saved}
                        urlClicked={url.clicked}
                        hostAddress={hostAddress}
                        onClickDelete={onClickDelete}
                        clickDates={url.clickDates}
                        ></UrlDataRow>
                    )
                })}
            </TableBody>
        </Table>
    );
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        getAllUrls: () => dispatch(getAllUrls()),
        removeUrl: (urlToDelete) => dispatch(removeUrl(urlToDelete))
    }
  }
  
  const mapStateToProps = state => ({
    urlData:state
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Statistics);