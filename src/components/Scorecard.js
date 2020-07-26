import React, {useState} from 'react';

const Scorecard = () => {

    // state for scorecard
    const [editing, setEditing] = useState(false)
    const [numHoles, setNumHoles] = useState('')

    // render scorecard options
    const scorecardOptions = () => {
        return(
            <div>
                <h2>Scorecard Options</h2>
                <div className="controls">
                    <p>How many holes?</p>
                    <button onClick={renderFront9} className="btn">Front 9</button>
                    <button onClick={renderBack9} className="btn">Back 9</button>
                    <button onClick={render18Holes} className="btn">18 Holes</button>
                </div>
            </div>
        )
    }

    //render front 9 holes
    const renderFront9 = () => {
        setNumHoles('f9')
    }

    //render back 9 holes
    const renderBack9 = () => {
        setNumHoles('b9')
    }

    //render 18 holes
    const render18Holes = () => {
        setNumHoles('18')
    }

    console.log(numHoles)

    return(
        <div className="scorecard">
            <main>
                <div className="inner-container">
                    <div className="scorecard-options card">
                        {
                            scorecardOptions()
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Scorecard