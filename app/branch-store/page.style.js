import commonStyle from "../components/styles";

const styles = {

    container : {
        width : '100%',
        margin : 10 ,
        height : 600 ,
        backgroundColor : commonStyle.color.lightGray,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    deliveryBox : {
        display : 'flex',
        justifyContent : 'flex-end'
    },
    box : {
        // width : '100%',
        // margin : 10 ,
        height : 'auto' ,
        backgroundColor : commonStyle.color.lightGray,
        // display : 'flex',
        // justifyContent : 'center',
        // alignItems : 'center',
    },
    pointer : {
        cursor : commonStyle.cursor
    },
    compromise :{
        display : 'flex',
        flexDirection : 'row'
    },
    deliveryMan : {
        fontSize : 12,
        color : commonStyle.color.orange
    },
    successMsg  : {
        cursor : commonStyle.cursor,
        display : 'flex',
        justifyContent : 'flex-start',
        padding : 5 ,
        fontSize : 12,
        color : commonStyle.color.orange
    },
    nextFont : {
        cursor : commonStyle.cursor,
        display : 'flex',
        justifyContent : 'flex-end',
        padding : 5 ,
        fontSize : 12,
        color : commonStyle.color.dynamicBlue
    }
}

export default styles ;