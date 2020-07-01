import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
        copyright: {
                flexGrow: 1,
                align: "center",
                marginTop: theme.spacing(5),
                whiteSpace: "nowrap",
                [theme.breakpoints.up("md")]: {
                        position: "absolute",
                        bottom: theme.spacing(2),
                },
        }
}));
