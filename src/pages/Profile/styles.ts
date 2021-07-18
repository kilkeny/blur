import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  layout: {
    padding: '70px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    marginBottom: '21px',
    width: '210px',
    height: '210px',
  },
  avatarForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  right: {
    width: '900px',
    padding: '100px',
    display: 'flex',
    alignItems: 'center',
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  field: {
    width: '283px',
    marginBottom: '60px',
  },
  button: {
    width: '130px',
    marginLeft: '10px',
  },
  hiddenInput: {
    visibility: 'hidden',
    height: 0,
    width: 0,
  },
});
