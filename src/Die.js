export default function Die(props) {
const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}

function generateDotValue() {
    if (props.value === 1) {
        return "\u2680"
    } else if (props.value === 2) {
        return "\u2681"
    } else if (props.value === 3) {
        return "\u2682"
    } else if (props.value === 4) {
        return "\u2683"
    } else if (props.value === 5) {
        return "\u2684"
    } else  {
        return "\u2685"
    }
}
    return (
        <div 
        className="die" 
        style={styles}
        onClick={props.holdDice}
        >
      
            <h2 className="die-number">{generateDotValue()}</h2>
            {/* <h2 className="die-number">{props.value}</h2> */}
        </div>
    )
}