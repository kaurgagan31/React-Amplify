import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({
        formInput: {
                backgroundColor: 'transparent',
                width: 330,
                height: 10,
                marginLeft: theme.spacing(-1)
        },
        input: {
                width: 330,
                height: 30,
                marginLeft: theme.spacing(-1)
        },
        card: {
                width: 400,
                border: "0.5px solid black",
                backgroundColor: 'aliceblue',
                displayContent: 'left',
                textAlign: 'left',
                padding: theme.spacing(1),
                margin: theme.spacing(1)
        },
        content: {
                alignItems: "center",
                justifyContent: 'center',
                textJustify: "center",
                height: 120,
        },
        actions: {
                marginLeft: theme.spacing(1)
        },
        formData: {
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(2),
                margin: theme.spacing(2)
        },
        error: {
                color: "red"
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
