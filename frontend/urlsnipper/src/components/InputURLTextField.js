import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { getShortUrl } from '../store/actions/getDataActions';
import { isURLValid } from '../helpers';

const InputURLTextField = (props) =>  {

  const [longURL, setLongURL] = useState("");
  const [shortUrlLink, setShortUrlLink] = useState('');
  const [longUrlLink, setLongUrlLink] = useState('');
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
  setShortUrlLink(props.urlData.data['urlShortAddress']);
  setLongUrlLink(props.urlData.data['urlLong']);
  setLongURL('');
}, [props.urlData]);

  const handleChange = event => {
    switch(event.target.id){
        case 'urlTextField':
            validateURL(event.target.value);
            setLongURL(event.target.value);
            break;
    default:
    }
  };

  const handleGetLink = () => {
    props.getShortUrl({longUrl : longURL});
    setValidUrl(false);
  }

  const validateURL = (givenUrl) => {
    isURLValid(givenUrl) ? setValidUrl(true) : setValidUrl(false)
  }

  function ButtonForLink() {

    if (validUrl){
      return (
        <Button 
              variant="contained"
              style = {{width: 200, marginTop:10}}
              onClick={handleGetLink} >
              get shorter link
        </Button>
      )
    } else {
      return (
        <Button 
              variant="contained"
              style = {{width: 200, marginTop:10}}
              disabled >
              get shorter link
        </Button>
      )
    }
  }
  
  return (
      <div>
        <Grid container spacing={2}>
          <Box p={4} width={400}>
            <TextField 
              id="urlTextField" 
              label="URL" 
              variant="outlined"
              onChange={handleChange}
              style = {{width: 400}}
              value = {longURL} />
          </Box>
        <Box p={4} width={200}>
          <ButtonForLink />
        </Box>
      </Grid>
      <div>
      <Typography
        p={5} 
        variant="subtitle2" 
        align="left"
        fontStyle="italic"
        style={{color:'red'}}
        > 
        {validUrl ? <div>valid URL</div> : <div>no valid URL</div>}
      </Typography>
      <Typography
        p={3} 
        variant="subtitle2" 
        fontStyle="italic"
        > 
        {longUrlLink === '' ? '' : <div>{longUrlLink}</div>}
        <Link href="statistics">
          {shortUrlLink === '' ? '' : <div>{shortUrlLink}</div>}
        </Link>
      </Typography>
      </div>
      </div>
   
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShortUrl: (data) => dispatch(getShortUrl(data))
  }
};

const mapStateToProps = state => ({
  urlData:state
});

export default connect(mapStateToProps, mapDispatchToProps)(InputURLTextField);