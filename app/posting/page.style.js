import commonStyle from "@/app/components/styles";

const styles = {
    container: {
        backgroundColor: commonStyle.color.secondary,
        padding: 10,
        color: 'white'
    },

    box: {
        marginBottom: 10,

    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        color: 'red'
    },
    successMsg : {
        letterSpacing : 0.5,
        fontSize : 15 ,
        color : commonStyle.color.secondary
    },
    errorMsg : {
        letterSpacing : 0.5,
        fontSize : 15 ,
        color : commonStyle.color.red
    }
}

export default styles;