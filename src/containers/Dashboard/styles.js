import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({
        toolbar: {
                flexGrow: 1,
                justifyContent: "space-between"
        },
        logout: {
                cursor: 'pointer'
        },
        card: {
                border: "0.5px solid black",
                justifyContent: 'center',
                backgroundColor: 'aliceblue',
                padding: theme.spacing(1),
                margin: theme.spacing(2),
                height: 200
        },
        error: {
                color: "red"
        }
}));
