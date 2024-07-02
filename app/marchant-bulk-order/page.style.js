import commonStyle from "@/app/components/styles";
const styles = {
    box : {
        marginBottom   : 2 ,
        padding :  5 ,
        
    },
    boxButton : {
      display : 'flex',
      justifyContent : 'flex-end'
    },
   
    label : {
        // display : 'flex',
        // justifyContent : 'flex-end',
        // alignItems : 'flex-end'
      },
      inputBox:{
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : 'center'
      },
      
      msg : {
        letterSpacing : 1.0,
        fontSize : 18,
        color :  commonStyle.color.red
      },
      successMsg : {
        display : 'flex',
      justifyContent : 'flex-end',
        letterSpacing : 1.0,
        fontSize : 14,
        color :  commonStyle.color.secondary
      }
}

export default styles ;