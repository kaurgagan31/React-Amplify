import { makeStyles } from "@material-ui/styles";


export default makeStyles(theme => ({
        formInput: {
                padding: theme.spacing(1),
                backgroundColor: 'transparent',
        },
        input: {
                width: 330,
                height: 40,
                marginLeft: theme.spacing(-1)
        },
        card: {
                width: 400,
                border: "0.5px solid black",
                backgroundColor: 'lavender',
                justifyContent: 'left',
                textAlign: 'left',
                padding: theme.spacing(2),
                margin: theme.spacing(2)
        },
        content: {
                alignItems: "center",
                justifyContent: 'center',
                textJustify: "center",
        },
        avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
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
