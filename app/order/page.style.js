import commonStyle from "../components/styles";

const styles = {
    container : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    containerInside : {
        display : 'flex',
        width : '50%',
        flexDirection : 'row',
        justifyContent : 'space-around',
        // backgroundColor : 'red'
    },
    box : {
        marginLeft : 20 ,
        width : '40%',
        display : 'flex',
        flexDirection : 'row',
        margin : 10 

    },
    myfont : {
        textTransform: 'capitalize',  
    },
    errorMsg : {
        display : 'flex',
        justifyContent : 'center',
        backgroundColor   : commonStyle.color.red,
        color : '#fff'
    }

}

export default styles;