import commonStyle from "@/app/components/styles";
const styles = {
    box : {
        marginBottom   : 2 ,
        padding :  5 ,
        display : 'flex',
        // flexDirection : 'column'
        // borderBottom : '1px solid #a9adc7'
        
    },
    boxButton : {
      display : 'flex',
      justifyContent : 'flex-end'
    },
   
    label : {
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : 'center'
      },
      colon : {
        backgroundColor : commonStyle.color.green,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
      },
      buttonScope :{
         cursor : commonStyle.cursor,
         transitionDelay: '5s'
      },
      msg : {
        letterSpacing : 1.0,
        fontSize : 18,
        color :  commonStyle.color.red
      },
      successMsg : {
        letterSpacing : 1.0,
        fontSize : 18,
        color :  commonStyle.color.secondary
      }
}

export default styles ;