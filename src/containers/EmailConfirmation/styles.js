import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
        container: {

        },
        card: {
                minWidth: 200,
                background: 'transparent',
                backgroundColor: 'aliceblue',
                display: 'flex',
                padding: theme.spacing(5),
                margin: theme.spacing(2)
        },
        copyright: {
                marginTop: theme.spacing(4),
                whiteSpace: "nowrap",
                [theme.breakpoints.up("md")]: {
                        position: "absolute",
                        bottom: theme.spacing(2),
                },
        }

}));
